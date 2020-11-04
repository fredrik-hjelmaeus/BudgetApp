const csv = require('csvtojson');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = function (req, res, next) {
  //return res.status(200).json({ msg: 'Successful response' });
  //console.log(test.csv);
  // console.log(req.files.foo);

  if (!req.files) {
    return res.status(400).send('No File Uploaded');
  }
  const file = req.files.file;

  let bank = 'nordea';
  let deLimit = { delimiter: [';', ';;', ';;;'] };

  // Check filename to check if it is a csv-file
  if (file.name.endsWith('csv') || file.name.endsWith('txt')) {
    if (file.name.endsWith('txt')) {
      deLimit = { delimiter: [',', ',,', ',,,'] };
      bank = 'handelsbanken';
    }
  } else {
    return res.status(400).send('Wrong filetype, only accepts csv!');
  }

  // swedbank delimiter
  deLimit = { delimiter: [',', ',,', ',,,'] };
  bank = 'swedbank';
  //file comes in as mimetype 'application/octet-stream' so mimetypecheck wont work
  //Make sure the file is a csv-file
  /* if (file.mimetype !== 'text/csv') {
    return res.status(400).send('Wrong filetype, only accepts csv!');
  } */
  //console.log(deLimit);
  file.mv(`${__dirname}/${file.name}`);
  let newpresets = [];

  csv(deLimit)
    .fromFile(`${__dirname}/${file.name}`)
    .then((source) => {
      if (bank === 'swedbank') {
        const belopp = JSON.stringify(source[1]).split(',')[10];
        const beskrivning = JSON.stringify(source[1]).split(',')[9];
        if (typeof belopp !== 'string' || typeof beskrivning !== 'string') {
          return res.status(400).send('CSV does not contain valid Swedbank-values!');
        }
        //console.log(JSON.stringify(source[1]).split(',')[10]);
        console.log(typeof belopp, typeof beskrivning);
      }
      if (bank === 'nordea') {
        // Check for new Nordea-csv
        if (source[0].Belopp === undefined || source[0].Rubrik === undefined) {
          console.log('invalid nordea file deleted');
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('CSV does not contain valid Nordea-values!');
        }
      } else {
        //  console.log(Object.keys(source[0])[6], Object.keys(source[0])[7]);
        // Check for handelsbanken txt name(Object.keys(source[0])[7]) and value(Object.keys(source[0])[6])
        if (typeof Object.keys(source[0])[6] !== 'string' || typeof Object.keys(source[0])[7] !== 'string') {
          console.log('invalid handelsbanken txt-file deleted');
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('TXT/CSV does not contain valid Handelsbanken-values!');
        }
      }

      // Push new values to array
      if (bank === 'nordea') {
        source.map((preset) =>
          newpresets.push({
            number: preset.Belopp,
            name: preset.Rubrik,
            id: uuidv4(),
          })
        );
      }
      if (bank === 'handelsbanken') {
        console.log(source.map((preset) => Object.keys(preset)[6]));
        /*     source.map((preset) =>
          newpresets.push({
            number: preset.Belopp,
            name: preset.Rubrik,
            id: uuidv4(),
          })
        ); */
      }

      if (newpresets.length === 0) {
        deleteFile(`${__dirname}/${file.name}`);
        return res.status(400).send('No values recognised!');
      }
      try {
        req.newpresets = newpresets;
        console.log('valid file');
        deleteFile(`${__dirname}/${file.name}`);
        next();
      } catch (err) {
        console.log('server error file');
        deleteFile(`${__dirname}/${file.name}`);
        res.status(500).json({ msg: 'Server Error' });
      }
    });
};

const deleteFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log('Successfully deleted file');
  });
};

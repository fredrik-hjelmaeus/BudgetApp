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
  //file comes in as mimetype 'application/octet-stream' so mimetypecheck wont work
  // Check filename to check if it is a csv-file

  if (file.name.endsWith('csv') || file.name.endsWith('txt')) {
    if (file.name.endsWith('txt')) {
      deLimit = { delimiter: [',', ',,', ',,,'] };
      bank = 'handelsbanken';
    }
  } else {
    return res.status(400).send('Wrong filetype, only accepts csv!');
  }
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
      //console.log(source);
      if (bank === 'nordea') {
        // Check for new Nordea-csv
        if (source[0].Belopp === undefined || source[0].Rubrik === undefined) {
          console.log('invalid nordea file deleted');
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('CSV does not contain valid Nordea-values!');
        }
      } else {
        // console.log(Object.keys(source));
        console.log(typeof Object.keys(source[0])[6], typeof Object.keys(source[0])[7]);
        // Check for Handelsbanken-txt-csv
        if (typeof Object.keys(source[0])[6] !== 'string' || typeof Object.keys(source[0])[7] !== 'string') {
          console.log('invalid handelsbanken txt-file deleted');
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('TXT/CSV does not contain valid Handelsbanken-values!');
        }
      }
      // Push new values to array
      source.map((preset) =>
        newpresets.push({
          number: preset.Belopp,
          name: preset.Rubrik,
          id: uuidv4(),
        })
      );
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

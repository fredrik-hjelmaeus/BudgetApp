const csv = require('csvtojson');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = function (req, res, next) {
  // Check if file was provided in the formdata
  if (!req.files) {
    return res.status(400).send('No File Uploaded');
  }

  let filetype;
  let deLimit;

  // Check if an object was provided in the formdata and set that objectname as filetype
  if (Object.getOwnPropertyNames(req.files)) {
    filetype = Object.getOwnPropertyNames(req.files)[0];
  }
  console.log(filetype);
  const file = req.files[filetype];
  console.log(file);
  console.log(file.name.endsWith);
  // Check fileextension
  if (file.name.endsWith('csv') || file.name.endsWith('txt')) {
    if (file.name.endsWith('txt') && filetype !== 'handelsbanken') {
      return res.status(400).send('Wrong filetype, only accepts csv!');
    }
    if (file.name.endsWith('csv') && filetype === 'handelsbanken') {
      return res.status(400).send('Wrong filetype, only accepts txt!');
    }
  } else {
    return res.status(400).send('Wrong filetype, only accepts csv!');
  }

  // Check what filetype-button the user pressed,set deLimit and return file
  function setDelimiter(type) {
    switch (type) {
      case 'RFC4180':
        return {};
      case 'nordea':
        return { delimiter: [';', ';;', ';;;'] };
      case 'swedbank':
        return { delimiter: [',', ',,', ',,,'] };
      case 'handelsbanken':
        return { delimiter: [',', ',,', ',,,'] };
      default:
        console.log('default');
        break;
    }
  }
  //set delimiter
  deLimit = setDelimiter(filetype);

  //file comes in as mimetype 'application/octet-stream' so mimetypecheck wont work
  /* if (file.mimetype !== 'text/csv') {
    return res.status(400).send('Wrong filetype, only accepts csv!');
  } */

  file.mv(`${__dirname}/${file.name}`);
  let newpresets = [];

  csv(deLimit)
    .fromFile(`${__dirname}/${file.name}`)
    .then((source) => {
      if (filetype === 'swedbank') {
        // here we need to check source[1] as fields with citation "" may have , in them.
        const belopp = JSON.stringify(source[1]).split(',')[10];
        const beskrivning = JSON.stringify(source[1]).split(',')[9];
        if (typeof belopp !== 'string' || typeof beskrivning !== 'string') {
          console.log('invalid swedbank file deleted');
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('CSV does not contain valid Swedbank-values!');
        }
      }
      if (filetype === 'nordea') {
        // Check for new Nordea-csv
        if (source[0].Belopp === undefined || source[0].Rubrik === undefined) {
          console.log('invalid nordea file deleted');
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('CSV does not contain valid Nordea-values!');
        }
      }
      if (filetype === 'handelsbanken') {
        // Check for handelsbanken txt name(Object.keys(source[0])[7]) and value(Object.keys(source[0])[6])
        if (typeof Object.keys(source[0])[6] !== 'string' || typeof Object.keys(source[0])[7] !== 'string') {
          console.log('invalid handelsbanken txt-file deleted');
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('TXT/CSV does not contain valid Handelsbanken-values!');
        }
      }

      // Push new values to array
      if (filetype === 'nordea') {
        source.map((preset) =>
          newpresets.push({
            number: preset.Belopp,
            name: preset.Rubrik,
            id: uuidv4(),
          })
        );
      }
      if (filetype === 'handelsbanken') {
        // console.log(source);
        /*     source.map((preset) =>
          newpresets.push({
            number: preset.Belopp,
            name: preset.Rubrik,
            id: uuidv4(),
          })
        ); */
      }
      if (filetype === 'swedbank') {
        source.slice(1).map((row) =>
          newpresets.push({
            number: JSON.stringify(row).split(',')[10],
            name: JSON.stringify(row).split(',')[9],
            id: uuidv4(),
          })
        );
      }
      if (filetype === 'RFC4180') {
        console.log(source.map((row) => row));
        source.map((row) =>
          newpresets.push({
            row,
            id: uuidv4(),
          })
        );
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

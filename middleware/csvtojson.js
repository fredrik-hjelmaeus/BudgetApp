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

  //file comes in as mimetype 'application/octet-stream' so mimetypecheck wont work
  // Check filename to check if it is a csv-file
  if (!file.name.endsWith('csv')) {
    return res.status(400).send('Wrong filetype, only accepts csv!');
  }
  //Make sure the file is a csv-file
  /* if (file.mimetype !== 'text/csv') {
    return res.status(400).send('Wrong filetype, only accepts csv!');
  } */
  //console.log(file);
  file.mv(`${__dirname}/${file.name}`);

  let newpresets = [];

  csv({ delimiter: [';', ';;', ';;;'] })
    .fromFile(`${__dirname}/${file.name}`)
    .then((source) => {
      // Check for new Nordea-csv
      if (source[0].Belopp === undefined || source[0].Rubrik === undefined) {
        console.log('invalid nordea file deleted');
        deleteFile(`${__dirname}/${file.name}`);
        return res
          .status(400)
          .send('CSV does not contain valid Nordea-values!');
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

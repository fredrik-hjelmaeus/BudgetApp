const csv = require('csvtojson');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
//const ofxConvert = require('../utils/ofxConvert');
const ofx = require('ofx');
module.exports = function (req, res, next) {
  // Check if file was provided in the formdata
  if (!req.files) {
    return res.status(400).send('No File Uploaded');
  }

  let deLimit;

  // Check if an object was provided in the formdata and set that objectname as filetype
  if (!Object.getOwnPropertyNames(req.files)) {
    console.log('Invalid data,filetype or object not found');
    return res.status(400).send('Invalid data');
  }
  const filetype = Object.getOwnPropertyNames(req.files)[0];
  const file = req.files[filetype];

  // Compare fileextension with provided filetype
  //ofx
  if (file.name.endsWith('ofx') && filetype === 'ofx') {
    console.log('ofx it is');
  } else {
    // csv and txt
    if (file.name.endsWith('csv') || file.name.endsWith('txt')) {
      if (file.name.endsWith('txt') && filetype !== 'handelsbanken') {
        console.log('Wrong filetype, only accepts csv!(handelsbanken)');
        return res.status(400).send('Wrong filetype, only accepts csv!');
      }
      /*     if (file.name.endsWith('csv') && filetype === 'handelsbanken') {
        console.log('Wrong filetype, only accepts txt!');
        return res.status(400).send('Wrong filetype, only accepts txt!');
      } */
    } else {
      if (filetype === 'ofx') {
        console.log('Wrong filetype, only accepts ofx!');
        return res.status(400).send('Wrong filetype, only accepts ofx!');
      } else {
        console.log('Wrong filetype, only accepts csv!');
        return res.status(400).send('Wrong filetype, only accepts csv!');
      }
    }
  }
  // csv

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

  // Push new values to array
  const pushData = (filetype, source) => {
    console.log('FILETYPE:', filetype);
    //nordea
    if (filetype === 'nordea') {
      console.log('NORDEA RAN');
      source.map((preset) =>
        newpresets.push({
          number: preset.Belopp,
          name: preset.Rubrik,
          id: uuidv4(),
        })
      );
    }

    // handelsbanken
    if (filetype === 'handelsbanken') {
      console.log(source[1]);
      /*       source.map((preset) =>
        newpresets.push({
          number: Object.keys(preset)[6],
          name: Object.keys(preset)[7],
          id: uuidv4(),
        })
      ); */
      //console.log(source.map((p) => Object.keys(p)));
    }

    // swedbank
    if (filetype === 'swedbank') {
      source.slice(1).map((row) =>
        newpresets.push({
          number: JSON.stringify(row).split(',')[10],
          name: JSON.stringify(row).split(',')[9],
          id: uuidv4(),
        })
      );
    }

    // RFC4180
    if (filetype === 'RFC4180') {
      //console.log(source.map((row) => Object.entries(row)));
      //console.log(source.map((row) => row));
      source.map((row) =>
        newpresets.push({
          row,
          id: uuidv4(),
        })
      );
    }

    // OFX
    if (filetype === 'ofx') {
      source.map((obj) =>
        newpresets.push({
          number: obj.value,
          name: obj.description,
          id: uuidv4(),
        })
      );
    }
  };

  // if ofx convert with ofx else convert with csvtojson
  if (filetype === 'ofx') {
    if (!file.name.endsWith('ofx')) {
      deleteFile(`${__dirname}/${file.name}`);
      return res.status(400).send('Invalid OFX file!');
    }
    let tempArr = [];
    let validOfx = true;
    fs.readFile(`${__dirname}/${file.name}`, 'utf8', function (err, ofxData) {
      if (err) {
        throw err;
      }

      try {
        const data = ofx.parse(ofxData);
        data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map((field) => {
          if (isNaN(field.TRNAMT)) {
            validOfx = false;
          }

          const transaction = { description: field.TRNTYPE, value: field.TRNAMT };
          tempArr.push(transaction);
        });
        if (!validOfx) {
          deleteFile(`${__dirname}/${file.name}`);
          return res.status(400).send('Invalid OFX file!');
        }
      } catch (err) {
        console.log(err);
      }

      // console.log(tempArr);
      pushData(filetype, tempArr);
      sendAndCleanup();
    });
  } else {
    csv(deLimit)
      .fromFile(`${__dirname}/${file.name}`)
      .then((source) => {
        console.log(Object.keys(source[0])[6]);
        console.log(Object.keys(source[0])[7]);

        // Validation of data by filetype
        if (filetype === 'swedbank') {
          console.log('swedbank csv ran');

          // here we need to check source[1] as fields with citation "" may have , in them.
          const belopp = JSON.stringify(source[1]).split(',')[10];
          const beskrivning = JSON.stringify(source[1]).split(',')[9];
          console.log(isNaN(belopp), isNaN(beskrivning), belopp, beskrivning);
          if (typeof belopp !== 'string' || typeof beskrivning !== 'string') {
            console.log('invalid swedbank file deleted');
            deleteFile(`${__dirname}/${file.name}`);
            return res.status(400).send('CSV does not contain valid Swedbank-values!');
          }
          if (isNaN(belopp)) {
            console.log('invalid swedbank number field');
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
          const belopp = Object.keys(source[0])[6];
          const beskrivning = Object.keys(source[0])[7];
          if (typeof beskrivning !== 'string' || typeof belopp !== 'string') {
            deleteFile(`${__dirname}/${file.name}`);
            return res.status(400).send('File does not contain valid Handelsbanken-values!');
          }
          if (isNaN(belopp)) {
            deleteFile(`${__dirname}/${file.name}`);
            return res.status(400).send('File does not contain valid Handelsbanken-values!');
          }
        }
        if (filetype === 'RFC4180') {
          console.log('rfc check run');
          let validRFC4180 = true;
          let rowlength = 0;
          source.map((row) => {
            if (rowlength === 0) {
              rowlength = Object.keys(row).length;
            } else {
              console.log('here');
              if (Object.keys(row).length !== rowlength) {
                console.log('there');
                validRFC4180 = false;
              }
            }
          });
          if (!validRFC4180) {
            console.log('this is working');
            deleteFile(`${__dirname}/${file.name}`);
            return res.status(400).send('CSV does not contain valid RFC4180-values!');
          }
        }

        pushData(filetype, source);
        sendAndCleanup();
      });
  }

  const sendAndCleanup = () => {
    if (newpresets.length === 0) {
      console.log('###########################################');
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
  };
};
const deleteFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log('Successfully deleted file');
  });
};

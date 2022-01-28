const csv = require('csvtojson');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
//const ofxConvert = require('../utils/ofxConvert');
const ofx = require('ofx');

// DATA STRUCTURE OF req.files:
// RFC4180 is the delimiter the user pressed.
/*   {
       RFC4180: {
         name: 'RFC4180_invalid.csv',
         data: <Buffer 31 39 39 37 2c 46 6f 72 64 2c 45 33 35 30 2c 66 65 62 2c 31 32 2c 2c 67 72 65 65 6e 2c 66 61 73 74 2c 54 65 73 74 2c 79 65 73 2c 6e 6f 0d 0a 59 65 61 
                ... 105 more bytes>,
         size: 155,
         encoding: '7bit',
         tempFilePath: '',
         truncated: false,
         mimetype: 'text/csv',
         md5: 'f60514b5b5fafeee8c4b84ed00e9cb55',
         mv: [Function: mv]
       }
     } 
*/

/*
     Check if correct file object was provided
     Check if delimiter match the file-extension
     Create a temp file on hd
     Check if ofx or csv
     Do conversion
     Filter out key/values you wan't on the converted object 
     Store the filtered data in new array (pushData)
     store data in req.newpresets 
     delete temp file
     go to next middleware
*/

const csvtojson = (req, res, next) => {
  //console.log(req.files);

  // Check if file was provided in the formdata
  if (!req.files) {
    return res.status(400).send('No File Uploaded');
  }

  let deLimit;

  // Check if an object was provided in the formdata
  if (!Object.getOwnPropertyNames(req.files)) {
    return res.status(400).send('Invalid data');
  }
  //  Set objectname as filetype
  const filetype = Object.getOwnPropertyNames(req.files)[0];
  const file = req.files[filetype];

  // Compare fileextension with provided filetype
  //ofx
  if (filetype === 'ofx' && !file.name.endsWith('ofx')) {
    return res.status(400).send('Wrong filetype, only accepts ofx!');
  }
  if (
    (filetype === 'RFC4180' && !file.name.endsWith('csv')) ||
    (filetype === 'swedbank' && !file.name.endsWith('csv')) ||
    (filetype === 'nordea' && !file.name.endsWith('csv')) ||
    (filetype === 'handelsbanken' && !file.name.endsWith('csv'))
  ) {
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

  const uploadPath = `${__dirname}/${file.name}`;

  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);
    console.log('file moved to', uploadPath);
    runConversion(filetype, file);
  });

  let newpresets = [];

  // Push new values to array
  const pushData = (filetype, source) => {
    // console.log('FILETYPE:', filetype);
    //nordea
    if (filetype === 'nordea') {
      // console.log('NORDEA RAN');
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
      source.map((preset) =>
        newpresets.push({
          number: Object.values(preset)[6][Object.values(preset)[6].length - 1],
          name: Object.values(preset)[7],
          id: uuidv4(),
        })
      );
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
  const runConversion = async (filetype, file) => {
    if (filetype === 'ofx') {
      if (!file.name.endsWith('ofx')) {
        await deleteFile(`${__dirname}/${file.name}`);
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

        pushData(filetype, tempArr);
        sendAndCleanup();
      });
    } else {
      // Promise
      try {
        csv(deLimit)
          .fromFile(`${__dirname}/${file.name}`)
          .then((source) => {
            // Validation of data by filetype
            if (filetype === 'swedbank') {
              // here we need to check source[1] as fields with citation "" may have , in them.
              const belopp = JSON.stringify(source[1]).split(',')[10];
              const beskrivning = JSON.stringify(source[1]).split(',')[9];
              if (typeof belopp !== 'string' || typeof beskrivning !== 'string') {
                deleteFile(`${__dirname}/${file.name}`);
                return res.status(400).send('CSV does not contain valid Swedbank-values!');
              }
              if (isNaN(belopp)) {
                deleteFile(`${__dirname}/${file.name}`);
                return res.status(400).send('CSV does not contain valid Swedbank-values!');
              }
            }
            if (filetype === 'nordea') {
              // Check for new Nordea-csv
              if (source[0].Belopp === undefined || source[0].Rubrik === undefined) {
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
              // check all number fields and make sure they are numbers
              for (const preset of source) {
                if (isNaN(Object.values(preset)[6][Object.values(preset)[6].length - 1])) {
                  deleteFile(`${__dirname}/${file.name}`);
                  return res.status(400).send('File does not contain valid Handelsbanken-values!');
                }
              }
            }
            if (filetype === 'RFC4180') {
              let validRFC4180 = true;
              let rowlength = 0;
              source.map((row) => {
                if (rowlength === 0) {
                  rowlength = Object.keys(row).length;
                } else {
                  if (Object.keys(row).length !== rowlength) {
                    validRFC4180 = false;
                  }
                }
              });
              if (!validRFC4180) {
                deleteFile(`${__dirname}/${file.name}`);

                return res.status(400).send('CSV does not contain valid RFC4180-values!');
              }
            }

            pushData(filetype, source);
            sendAndCleanup();
          });
      } catch (err) {
        console.log(err);
        return res.status(500).send('Something wrong: ', err.message);
      }
    }
  };

  const sendAndCleanup = async () => {
    try {
      if (newpresets.length === 0) {
        await deleteFile(`${__dirname}/${file.name}`);
        return res.status(400).send('No values recognised!');
      }
      // valid file
      req.newpresets = newpresets;
      await deleteFile(`${__dirname}/${file.name}`);
      next();
    } catch (err) {
      await deleteFile(`${__dirname}/${file.name}`);
      res.status(500).json({ msg: 'Server Error' });
    }
  };
};

const deleteFile = async (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    //console.log('Successfully deleted file');
  });
};

module.exports = csvtojson;

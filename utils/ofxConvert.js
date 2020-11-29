const ofx = require('ofx');
const fs = require('fs');
const util = require('util');

const ofxConvert = (file) => {
  fs.readFile(file, 'utf8', function (err, ofxData) {
    if (err) {
      throw err;
    }
    const data = ofx.parse(ofxData);
    const newArr = [];
    //console.log(util.inspect(data, false, null, true /* enable colors */));
    data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map((test) => {
      const transaction = { description: test.TRNTYPE, value: test.TRNAMT };
      newArr.push(transaction);
    });
    //console.log(newArr);
    return newArr;
    /*   console.log(
    util.inspect(
      data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map((test) => {
        test.TRNTYPE, test.TRNAMT;
      }),
      false,
      null,
      true
    )
  ); */
  });
};
module.exports = ofxConvert;

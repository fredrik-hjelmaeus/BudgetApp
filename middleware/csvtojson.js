const CSVtoJSON = require('csvtojson');

module.exports = function (req, res, next) {
  //return res.status(200).json({ msg: 'Successful response' });
  console.log('csvtojsonran');
  // console.log(req.files.foo);
  next();
};

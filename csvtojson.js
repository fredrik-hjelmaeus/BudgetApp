const fs = require('fs');
const CSVtoJSON = require('csvtojson');

const newpresets = [];
CSVtoJSON({ delimiter: [';', ';;', ';;;'] })
  .fromFile(
    `${__dirname}/_data/PERSONKONTO 1405 36 02319 - 2020.04.26 16.11.csv`
  )
  .then((source) => {
    source.map((preset) =>
      newpresets.push((preset = { number: preset.Belopp, name: preset.Rubrik }))
    );
    console.log(newpresets);
  });

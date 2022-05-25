import csv from "csvtojson";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ICsvPreset } from "./ICsvPreset";
const ofx = require("ofx"); // not migrated to ts

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

// Extending Express Request object with newpresets.
// So req.newspresets can hold the extracted csv-file-data and send it to next middleware.
declare global {
  namespace Express {
    export interface Request {
      newpresets: ICsvPreset[];
    }
  }
}

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

const csvtojson = (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.files);

  // Check if file was provided in the formdata
  if (!req.files) {
    return res.status(400).send("No File Uploaded");
  }

  // Check if an object was provided in the formdata
  if (!Object.getOwnPropertyNames(req.files)) {
    return res.status(400).send("Invalid data");
  }
  //  Set objectname as filetype
  const filetype: string = Object.getOwnPropertyNames(req.files)[0];

  const file = req.files[filetype] as UploadedFile;

  // Compare fileextension with provided filetype
  //ofx
  if (filetype === "ofx" && !file.name.endsWith("ofx")) {
    return res.status(400).send("Wrong filetype, only accepts ofx!");
  }
  if (
    (filetype === "RFC4180" && !file.name.endsWith("csv")) ||
    (filetype === "swedbank" && !file.name.endsWith("csv")) ||
    (filetype === "nordea" && !file.name.endsWith("csv")) ||
    (filetype === "handelsbanken" && !file.name.endsWith("csv"))
  ) {
    return res.status(400).send("Wrong filetype, only accepts csv!");
  }

  // Check what filetype-button the user pressed,set deLimit and return file
  function setDelimiter(type: string) {
    switch (type) {
      case "RFC4180":
        return {};
      case "nordea":
        return { delimiter: [";", ";;", ";;;"] };
      case "swedbank":
        return { delimiter: [",", ",,", ",,,"] };
      case "handelsbanken":
        return { delimiter: [",", ",,", ",,,"] };
      default:
        console.log("default");
        break;
    }
  }
  //set delimiter
  interface delimiterObject {
    delimiter?: string[];
  }
  const deLimit: delimiterObject | undefined = setDelimiter(filetype);

  type frontendMonthAndYear = {
    month: string;
    year: string;
  };

  const getMonthAndYearMetaDataFromFileName = (fileName: string): frontendMonthAndYear => {
    const fileNameSplit = fileName.split(" ");
    const month = fileNameSplit[0];
    const year = fileNameSplit[1];
    return { month, year };
  };

  const uploadPath: string = `${__dirname}/${file.name}`;

  file.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    runConversion(filetype, file);
  });

  let newpresets: ICsvPreset[] = [];

  // Push new values to array
  const pushData = (filetype: string, source: any[] | []) => {
    //nordea
    if (filetype === "nordea") {
      source.map((preset) => {
        const newNordeaObj: ICsvPreset = {
          number: parseInt(preset["Belopp"]),
          name: preset["Rubrik"],
          _id: uuidv4(),
        };
        newpresets.push(newNordeaObj);
      });
    }

    // handelsbanken
    if (filetype === "handelsbanken") {
      source.map((preset) => {
        const numberValues = Object.values(preset)[6] as number[];
        const lastNumberValue = numberValues[numberValues.length - 1];
        const nameValue = Object.values(preset)[7] as string;

        if (nameValue.length === 0 || lastNumberValue === undefined) {
          return res.status(400).send("File does not contain valid Handelsbanken-values!");
        }

        const newHandelsbankenObj: ICsvPreset = {
          number: lastNumberValue,
          name: nameValue,
          _id: uuidv4(),
        };
        newpresets.push(newHandelsbankenObj);
      });
    }

    // swedbank
    if (filetype === "swedbank") {
      source.slice(1).map((row) =>
        newpresets.push({
          number: Number(JSON.stringify(row).split(",")[10]),
          name: JSON.stringify(row).split(",")[9],
          _id: uuidv4(),
        })
      );
    }

    // RFC4180
    if (filetype === "RFC4180") {
      source.map((row) =>
        newpresets.push({
          row,
          _id: uuidv4(),
        })
      );
    }

    // OFX
    if (filetype === "ofx") {
      source.map((obj) =>
        newpresets.push({
          number: obj.value,
          name: obj.description,
          _id: uuidv4(),
        })
      );
    }
  };

  // if ofx convert with ofx else convert with csvtojson
  interface ofxDataField {
    TRNTYPE: string;
    TRNAMT: number;
  }
  interface ofxTransactionRow {
    description: string;
    value: number;
  }
  const runConversion = async (filetype: string, file: UploadedFile) => {
    if (filetype === "ofx") {
      if (!file.name.endsWith("ofx")) {
        await deleteFile(`${__dirname}/${file.name}`);
        return res.status(400).send("Invalid OFX file!");
      }
      let tempArr: ofxTransactionRow[] = [];
      let validOfx = true;
      fs.readFile(`${__dirname}/${file.name}`, "utf8", function (err, ofxData) {
        if (err) {
          throw err;
        }

        try {
          const data = ofx.parse(ofxData);
          data.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN.map((field: ofxDataField) => {
            if (isNaN(field.TRNAMT)) {
              validOfx = false;
            }

            const transaction: ofxTransactionRow = {
              description: field.TRNTYPE,
              value: field.TRNAMT,
            };
            tempArr.push(transaction);
          });
          if (!validOfx) {
            deleteFile(`${__dirname}/${file.name}`);
            return res.status(400).send("Invalid OFX file!");
          }
        } catch (err) {
          console.log(err);
          return res.status(400).send("Invalid OFX file!");
        }

        pushData(filetype, tempArr);
        sendAndCleanup();
      });
    } else {
      // Promise
      try {
        csv(deLimit)
          .fromFile(`${__dirname}/${file.name}`)
          .then((source: any[]) => {
            // Validation of data by filetype
            if (filetype === "swedbank") {
              // here we need to check source[1] as fields with citation "" may have , in them.
              const belopp = JSON.stringify(source[1]).split(",")[10]; // note: JSON.stringify is event-loop-blocking
              const beskrivning = JSON.stringify(source[1]).split(",")[9]; // note: JSON.stringify is event-loop-blocking
              if (typeof beskrivning !== "string") {
                deleteFile(`${__dirname}/${file.name}`);
                return res.status(400).send("CSV does not contain valid Swedbank-values!");
              }
              if (typeof belopp !== "string") {
                deleteFile(`${__dirname}/${file.name}`);
                return res.status(400).send("CSV does not contain valid Swedbank-values!");
              }
              const numberBelopp: number = parseFloat(belopp);
              if (isNaN(numberBelopp)) {
                deleteFile(`${__dirname}/${file.name}`);
                return res.status(400).send("CSV does not contain valid Swedbank-values!");
              }
            }
            if (filetype === "nordea") {
              // Check for new Nordea-csv
              const date: string | undefined = source[0]["Bokföringsdag"];
              const number: string | undefined = source[0]["Belopp"];
              const description: string | undefined = source[0]["Rubrik"];

              if (date === undefined || number === undefined || description === undefined) {
                deleteFile(`${__dirname}/${file.name}`);
                return res.status(400).send("CSV does not contain valid Nordea-values!");
              }

              // Create table with data from csv according to in what month&year user is opening the file in frontend.
              // get date from filename,which is provided from frontend
              const { month, year } = getMonthAndYearMetaDataFromFileName(file.name);
              function convertMonthToNumber(month: string): string {
                switch (month) {
                  case "January":
                    return "01";
                  case "February":
                    return "02";
                  case "March":
                    return "03";
                  case "April":
                    return "04";
                  case "May":
                    return "05";
                  case "June":
                    return "06";
                  case "July":
                    return "07";
                  case "August":
                    return "08";
                  case "September":
                    return "09";
                  case "October":
                    return "10";
                  case "November":
                    return "11";
                  case "December":
                    return "12";
                  default:
                    return "0";
                }
              }
              const monthNumber = convertMonthToNumber(month);

              const monthCsvData: Array<string> = [];
              source.map((row, index) => {
                if (index !== 0) {
                  const date: string | undefined = row["Bokföringsdag"];
                  if (date === undefined) {
                    deleteFile(`${__dirname}/${file.name}`);
                    return res.status(400).send("CSV does not contain valid Nordea-values!");
                  }

                  // extract month and year from date
                  const dateArr: Array<string> = date.split("-");
                  const csvYear: string = dateArr[0];
                  const csvMonth: string = dateArr[1];

                  if (csvYear === year && csvMonth === monthNumber) {
                    monthCsvData.push(row);
                  }
                }
              });

              pushData(filetype, monthCsvData);
              return sendAndCleanup();
            }

            if (filetype === "handelsbanken") {
              // Check for handelsbanken txt name(Object.keys(source[0])[7]) and value(Object.keys(source[0])[6])

              const belopp = Object.keys(source[0])[6];
              const beskrivning = Object.keys(source[0])[7];
              if (typeof beskrivning !== "string" || typeof belopp !== "string") {
                deleteFile(`${__dirname}/${file.name}`);
                return res.status(400).send("File does not contain valid Handelsbanken-values!");
              }
              // check all number fields and make sure they are numbers
              for (const preset of source) {
                //if(Object.values(preset)[6][Object.values(preset)[6].length - 1] !== undefined){

                const convertToNum = 111;
                // const convertToNum: number = parseFloat(Object.values(preset)[6][Object.values(preset)[6].length - 1]);
                if (isNaN(convertToNum)) {
                  deleteFile(`${__dirname}/${file.name}`);
                  return res.status(400).send("File does not contain valid Handelsbanken-values!");
                }
              }
            }
            if (filetype === "RFC4180") {
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

                return res.status(400).send("CSV does not contain valid RFC4180-values!");
              }
            }

            pushData(filetype, source);
            sendAndCleanup();
          });
      } catch (err: unknown) {
        console.log(err);
        if (err instanceof Error) return res.status(500).send("Something wrong: ");
      }
    }
  };

  const sendAndCleanup = async () => {
    try {
      if (newpresets.length === 0) {
        await deleteFile(`${__dirname}/${file.name}`);

        return res.status(400).send("No values recognised!");
      }
      // valid file
      req.newpresets = newpresets;
      await deleteFile(`${__dirname}/${file.name}`);
      next();
    } catch (err) {
      await deleteFile(`${__dirname}/${file.name}`);
      res.status(500).json({ msg: "Server Error" });
    }
  };
};

const deleteFile = async (filepath: string) => {
  fs.unlink(filepath, (err) => {
    if (err) throw err;
    console.log("Successfully deleted file");
  });
};

export = csvtojson;

import React from "react";
import PresetContext from "../../context/preset/presetContext";
import AlertContext from "../../context/alert/alertContext";
import CssContext from "../../context/css/cssContext";
import Alerts from "../layout/Alerts";
import SelectSupportedFileFormat from "./SelectSupportedFileFormat";

const SelectFile = () => {
  //context
  const alertContext = React.useContext(AlertContext);
  const presetContext = React.useContext(PresetContext);
  const cssContext = React.useContext(CssContext);
  const { toggleModal } = cssContext;
  const { setAlert } = alertContext;
  const { uploadCSV, error, csvpresets, clearPresetErrors, month, year } = presetContext;

  //state
  const [selectedFile, setSelectedFile] = React.useState<string | File>("");
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [format, setFormat] = React.useState("RFC4180");

  // Ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  interface IFile extends HTMLInputElement {
    files: FileList;
  }

  //logic
  const onFileChange: React.ChangeEventHandler<IFile> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
      setSelectedFile(e.target.files[0]);
      // e.target.value = "";
      // e.target.files = null; // resets value so same file can trigger onchange again. https://github.com/ngokevin/react-file-reader-input/issues/11
      // TODO: disabled above as its readonly value and typescript complains.
      // TODO: check if this is needed.
    }
  };

  const selectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFormat(e.target.value);
  };

  //useeffect listen for alerts from csvtojson-backend-middleware
  React.useEffect(() => {
    if (error === "No values recognised!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    if (error === "CSV does not contain valid Nordea-values!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    if (error === "Wrong filetype, only accepts csv!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    if (error === "CSV does not contain valid RFC4180-values!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    if (error === "Invalid OFX file!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    if (error === "Wrong filetype, only accepts ofx!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    if (error === "CSV does not contain valid Swedbank-values!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    if (error === "File does not contain valid Handelsbanken-values!") {
      setAlert(error, "danger");
      clearPresetErrors();
    }
    // eslint-disable-next-line
  }, [error]);

  //useeffect run uploadCSV when file is selected
  React.useEffect(() => {
    const sendFile = () => {
      const formData = new FormData();
      month &&
        year &&
        formData.append(
          format,
          selectedFile,
          month.concat(" ").concat(year.toString()).concat(" ").concat(selectedFileName)
        );
      uploadCSV(formData);
      setSelectedFile("");
      setSelectedFileName("");
    };
    if (selectedFile !== "") {
      sendFile();
      setSelectedFile("");
      setSelectedFileName("");
    }
  }, [selectedFile, selectedFileName, uploadCSV]);

  // detect if the uploadCSV resulted in valid csvs and then close this modal to give room for csvpresetcreatemodal
  React.useEffect(() => {
    if (format !== "RFC4180") {
      csvpresets && toggleModal("");
    } else {
      csvpresets && toggleModal("SelectCSVfields");
    }
  }, [csvpresets, format, toggleModal]);

  //jsx
  return (
    <div id="myModal" className="modal-csvprompt" style={{ display: "block" }}>
      {/* card */}
      <div className="selectfile__card selectfile__card__flex">
        <h2>Select one of the supported file formats</h2>
        <p className="py-1 px list li">For a default csv-formatting, choose RFC4180</p>
        {/* alert */}
        <Alerts />
        {/* Input */}
        <input
          style={{ display: "none" }}
          type="file"
          name="csvFile"
          onChange={onFileChange}
          ref={inputRef}
          data-testid="fileupload"
        />
        {/* Select File Format */}
        <SelectSupportedFileFormat selectChange={selectChange} format={format} />
        {/* Buttons */}
        <button
          type="button"
          className="btn selectfile__upload all-center"
          onClick={() => {
            inputRef?.current?.click();
          }}
        >
          Upload
        </button>
        <button
          type="button"
          className="btn selectfile__upload selectfile__cancel all-center"
          /* className='btn modal-csvpresets__btn__addtobudget modal-csvpresets__btn__addtobudget__cancel ' */
          onClick={() => {
            toggleModal("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SelectFile;

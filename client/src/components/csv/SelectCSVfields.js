import React, { useContext, useState, Fragment } from "react";
import PresetContext from "../../context/preset/presetContext";
import CsvSelectFieldsItem from "./CsvSelectFieldsItem";
import CssContext from "../../context/css/cssContext";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../../components/layout/Alerts";

// Here we modify csvpresets with name,id and number fields.
const SelectCSVfields = () => {
  // context
  const presetContext = useContext(PresetContext);
  const { csvpresets, clearCsv, updateCsvPresets } = presetContext;
  const { setAlert } = useContext(AlertContext);
  const cssContext = useContext(CssContext);
  const { toggleModal } = cssContext;

  // state
  const [selectPhase, setSelectPhase] = useState("description");
  const [fields, setFields] = useState({ description: "", value: "" });

  // logic
  const onClick = () => {};

  // validate selected value field by iterating csvpresets and make sure all fields is a number
  const validateValueField = (field) => {
    let isValid = true;
    csvpresets.map((preset) => (isNaN(preset.row[field]) ? (isValid = false) : null));
    return isValid;
  };

  // when a field is selected
  const fieldSelect = (e) => {
    if (selectPhase === "description") {
      setFields({ ...fields, description: e.target.value });
      setSelectPhase("value");
    }

    if (selectPhase === "value") {
      if (!validateValueField(e.target.value)) {
        setAlert("Please select a valid number field", "danger");
      } else {
        setFields({ ...fields, value: e.target.value });
        updateAndExit(e.target.value);
      }
    }
  };

  const updateAndExit = (fieldValue) => {
    // update csvpresets to complete INewPreset
    // Preparing data, adding name,number & id field to csvpresets, fullfilling INewPreset-interface-requirements
    csvpresets.map((preset) =>
      updateCsvPresets({
        id: preset.id,
        name: preset.row[fields.description],
        number: preset.row[fieldValue],
      })
    );
    // Moving on to CsvPresetCreateModal / Create Transactions were we turn INewPreset into ICsvPresetItem
    toggleModal("");
  };

  const onCancel = () => {
    toggleModal("");
    clearCsv();
  };

  // jsx
  return (
    <Fragment>
      {/* Modal */}
      <div id="myModal" className="modal-csvpresets" style={{ display: "block" }}>
        <div className="CsvSelectFieldsItem__modal-csvpresets__card">
          {/* Title */}
          <h1 className="all-center m-1">Select CSV fields</h1>

          {/* Alert */}
          <Alerts />
          {/* description/instruction */}
          <p>
            {selectPhase === "description" && (
              <h3 className="CsvSelectFieldsItem__flexrow">
                Please select the <strong className="text-danger px">description</strong> field.
              </h3>
            )}
            {selectPhase === "value" && (
              <h3 className="CsvSelectFieldsItem__flexrow">
                Please select the <strong className="text-success px">value</strong> field.
              </h3>
            )}
          </p>

          {/* Header-field constructed from CSV */}
          <CsvSelectFieldsItem
            rowItem={csvpresets[0]}
            key={0}
            header={true}
            fieldSelect={fieldSelect}
          />

          {/* csv-list */}
          {csvpresets.map((rowItem) => (
            <CsvSelectFieldsItem rowItem={rowItem} key={rowItem.id} />
          ))}

          {/* button add */}
          <button className="btn modal-csvpresets__btn__addtobudget all-center" onClick={onClick}>
            SUBMIT
          </button>

          {/* button cancel */}
          <button
            className="btn modal-csvpresets__btn__addtobudget modal-csvpresets__btn__addtobudget__cancel all-center"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default SelectCSVfields;

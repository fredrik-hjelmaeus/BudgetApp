import React, { useContext, useState, Fragment } from "react";
import PresetContext from "../../context/preset/presetContext";

import CssContext from "../../context/css/cssContext";
import AlertContext from "../../context/alert/alertContext";
import Alerts from "../layout/Alerts";
import SelectCSVfieldsItem from "./SelectCSVfieldsItem";

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

  const validateValueField = (field: string) => {
    let isValid = true;
    csvpresets &&
      csvpresets.map((preset) => (preset.row && isNaN(parseInt(field)) ? (isValid = false) : null)); // TODO: doublecheck parseInt works here
    return isValid;
  };

  // when a field is selected
  const fieldSelect: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (selectPhase === "description") {
      setFields({ ...fields, description: e.currentTarget.value });
      setSelectPhase("value");
    }

    if (selectPhase === "value") {
      if (!validateValueField(e.currentTarget.value)) {
        setAlert("Please select a valid number field", "danger");
      } else {
        setFields({ ...fields, value: e.currentTarget.value });
        updateAndExit(e.currentTarget.value);
      }
    }
  };

  const updateAndExit = (fieldValue: string) => {
    // update csvpresets to complete ICsvPreset
    // Preparing data, adding name,number & id field to csvpresets, fullfilling ICsvPreset-interface-requirements
    const { description } = fields;

    csvpresets &&
      csvpresets.map((preset) => {
        const presetRow = preset.row;
        if (presetRow) {
          updateCsvPresets({
            _id: preset._id,
            name: presetRow[parseInt(description)],
            number: parseInt(presetRow[parseInt(fieldValue)]) || 0,
          });
        }
        return preset;
      });
    // Moving on to CsvPresetCreateModal / Create Transactions were we turn ICsvPreset into ICsvPresetItem
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
          {csvpresets && (
            <SelectCSVfieldsItem
              rowItem={csvpresets[0]}
              key={0}
              header={true}
              fieldSelect={fieldSelect}
            />
          )}

          {/* csv-list */}
          {csvpresets &&
            csvpresets.map((rowItem) => (
              <SelectCSVfieldsItem rowItem={rowItem} key={rowItem._id} header={false} />
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

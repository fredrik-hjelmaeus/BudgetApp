import React, { useContext, useEffect, useState, Fragment } from "react";
import PresetContext from "../../context/preset/presetContext";
import { INewPreset } from "../../frontend-types/INewPreset";
import CsvPresetItem from "./CsvPresetItem";

import CsvPrompt from "./CsvPrompt";

const CsvPresetCreateModal = () => {
  // context
  const presetContext = useContext(PresetContext);
  const { submitCsvItems, clearCsv, newPresets, csvpresets, doSubmitCsv } = presetContext;

  // state
  const [Prompt, setPrompt] = useState(false);
  const [validCsv, setValidCsv] = useState<INewPreset[] | null>(null);

  // logic
  const onClick = () => {
    console.log("onClick");
    console.log(newPresets?.length, csvpresets?.length);

    if (newPresets?.length !== csvpresets?.length) {
      console.log("prompting user as all presets havent been handled yet");
      setValidCsv(countUserHandledCsvItems());
      setPrompt(true);
    } else {
      submitCsvItems("step2");
    }
  };

  const countUserHandledCsvItems = (): INewPreset[] | null => {
    if (newPresets) {
      return newPresets.filter(
        (item) => item.category !== "Select Category" || item.markdelete === true
      );
    } else {
      return null;
    }
  };

  const onExit = () => {
    submitCsvItems("");
    clearCsv();
  };

  //useEffect
  useEffect(() => {
    doSubmitCsv === "" && submitCsvItems("step1");

    //check for valid csv to add by filter out all with not valid cat and markdel set to true
    console.log(newPresets?.length, csvpresets?.length);
    // When newPresets and csvpresets is the same length, all csv items have been handled by the user.
    if (doSubmitCsv === "step2" && newPresets?.length === csvpresets?.length) {
      // checkcsv looks how many csv items user selected categories and what was marked for deletion.
      const checkcsv = countUserHandledCsvItems();

      setValidCsv(checkcsv);
      console.log("newPresets-listener: ", newPresets, checkcsv, csvpresets);
      // if there are no valid csv items, or
      if (
        checkcsv?.length !== 0 &&
        checkcsv?.length !== newPresets?.length
        // &&  csvpresets === null
      ) {
        console.log("some csv items have not been handled by the user");
        console.log("prompting user");
        setPrompt(true);
      } else {
        console.log("all csv items have been handled by the user");
        console.log("setting submit in submitCsvItems");
        submitCsvItems("submit");
      }

      if (newPresets && newPresets.length <= 1) {
        console.log("clearCsv ran", newPresets);
        clearCsv();
        setPrompt(false);
      }
    }
    //eslint-disable-next-line
  }, [newPresets, doSubmitCsv]); //breaks if you add clearCsv and submitCsvItems

  // jsx
  return (
    <Fragment>
      {Prompt && <CsvPrompt setPrompt={setPrompt} validCsv={validCsv} />}
      <div id="myModal" className="modal-csvpresets" style={{ display: "block" }}>
        <div className="modal-csvpresets__card">
          <h1 className="all-center m-1">
            {doSubmitCsv !== "submit" ? "Create Transactions" : "Transactions added!"}
          </h1>

          {csvpresets?.map((item) => (
            <CsvPresetItem Item={item} key={item._id} />
          ))}

          {doSubmitCsv !== "submit" && (
            <button className="btn modal-csvpresets__btn__addtobudget all-center" onClick={onClick}>
              ADD TO BUDGET
            </button>
          )}
          <button
            className="btn modal-csvpresets__btn__addtobudget modal-csvpresets__btn__addtobudget__cancel all-center"
            onClick={onExit}
          >
            {doSubmitCsv !== "submit" ? "Cancel" : "Exit"}
          </button>
        </div>
      </div>
    </Fragment>
  );
};
export default CsvPresetCreateModal;

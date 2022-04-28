import React, { useContext } from "react";
import PresetContext from "../../context/preset/presetContext";
import { INewPreset } from "../../frontend-types/INewPreset";
interface CsvPromptProps {
  setPrompt: (value: boolean) => void;
  validCsv: INewPreset[] | null;
}

const CsvPrompt = ({ setPrompt, validCsv }: CsvPromptProps) => {
  const presetContext = useContext(PresetContext);
  const { submitCsvItems, newPresets } = presetContext;
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (e.currentTarget.name === "cancel") {
      //TODO currentTarget instead of target works?
      setPrompt(false);
      submitCsvItems("");
    }
    if (e.currentTarget.name === "add") {
      submitCsvItems("submit");
    }
  };

  return (
    <div id="myModal" className="modal-csvprompt" style={{ display: "block" }}>
      <div className="modal-csvpresets__card modal-csvpresets__card__flex">
        <h1 className="all-center modal-csvpresets__flex">
          {newPresets && validCsv && newPresets.length - validCsv.length} of{" "}
          {newPresets && newPresets.length} transactions does not have a category selected
        </h1>
        <div>
          <button
            className="btn modal-csvpresets__btn__addtobudget all-center"
            name="add"
            onClick={onClick}
          >
            Add the {validCsv && validCsv.length} transactions that has a category specified
          </button>
          <button
            className="btn modal-csvpresets__btn__goback all-center"
            name="cancel"
            onClick={onClick}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};
export default CsvPrompt;

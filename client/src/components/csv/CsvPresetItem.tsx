import React, { Fragment, useContext, useState, useRef, useEffect } from "react";
import { ICsvPreset } from "../../../../middleware/ICsvPreset";
import PresetContext from "../../context/preset/presetContext";
import { INewPreset } from "../../frontend-types/INewPreset";

import DeleteButton from "../presets/DeleteButton";
import DropdownMenu from "../presets/DropdownMenu";

// Here we modify csvpresets, adding month,year,category,piggybank and markdelete.
// Final form before creating an preset/IPreset.

const CsvPresetItem = ({ Item }: { Item: ICsvPreset }) => {
  const presetContext = useContext(PresetContext);
  const { month, year, doSubmitCsv, updateCsvPresets, addPreset, removeCSV, setNewPresets } =
    presetContext;
  const { _id, number, name } = Item;

  //local preset used to update preset via function presetContext.sendEdit
  const [localpreset, setlocalPreset] = useState<INewPreset>({
    _id: _id,
    name: name ? name : "",
    number: number ? number : 0,
    month: month ? month : "",
    year: year ? year : 0,
    category: "Select Category",
    type: "overhead",
    piggybank: [{ month: month ? month : "", year: year ? year : 0, savedAmount: 0 }],
    markdelete: false,
  });

  const onBlur = () => {
    setInputMode("");
  };

  // state to activate input mode
  const [InputMode, setInputMode] = useState("");

  useEffect(() => {
    InputMode === "edit category" &&
      setlocalPreset({ ...localpreset, category: "Select Category" });
    InputMode === "category" && inputCategoryRef?.current?.focus();
  }, [InputMode, localpreset]);

  // calls onBlur when category is selected
  useEffect(() => {
    onBlur();
  }, [localpreset.category]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setInputMode(e.currentTarget.name);
  };
  const onDropdownClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setlocalPreset({ ...localpreset, category: e.currentTarget.name });
    setInputMode("");
  };

  // Init refs
  const inputCategoryRef = useRef<HTMLInputElement>(null);

  // state to handle deletebutton-hover
  const [DelbtnColor, setDelbtnColor] = useState(false);

  //on delete button hover
  const onHover = () => {
    setDelbtnColor(true);
  };
  //on delete button stop hover
  const stopHover = () => {
    setDelbtnColor(false);
  };
  const onDelete = () => {
    setlocalPreset({ ...localpreset, markdelete: !localpreset.markdelete });
  };

  const addToDB = () => {
    // TODO: add to db should be done/called once in presetContext on csvpresets,
    // filtering out markdelete and no category selected presets.
    // Atm we are calling database on every CsvPresetItem.
    if (name && number && month && year) {
      addPreset({
        name: name,
        number: number,
        month: month,
        year: year,
        category: localpreset.category,
        type: localpreset.type,
        piggybank: [{ month, year, savedAmount: 0 }],
      });
      removeCSV(localpreset._id);
    }
  };

  useEffect(() => {
    doSubmitCsv === "step1" &&
      localpreset.category !== "Select Category" &&
      setNewPresets(localpreset);

    doSubmitCsv === "submit" &&
      localpreset.category !== "Select Category" &&
      localpreset.markdelete !== true &&
      addToDB();
    //eslint-disable-next-line
  }, [doSubmitCsv]);

  return (
    <Fragment>
      {/* name */}
      <div
        className={
          localpreset.markdelete
            ? "modal-csvpresets__grid markgraydelete"
            : "modal-csvpresets__grid"
        }
      >
        <div
          className={
            localpreset.markdelete
              ? "btn-form modal-csvpresets__item markgraydelete disable__hover"
              : "text-primary btn-form modal-csvpresets__item"
          }
        >
          {name}
        </div>
        {/* number */}
        <div
          className={
            localpreset.markdelete
              ? "btn-form modal-csvpresets__item markgraydelete disable__hover"
              : number && number > 0
              ? "text-success btn-form modal-csvpresets__item"
              : "text-danger btn-form modal-csvpresets__item"
          }
          //   type="text"
        >
          {number}
        </div>
        {/* monthyear */}
        <div
          className={
            localpreset.markdelete
              ? "btn-form modal-csvpresets__item csvpresets__item__monthyear disable__hover"
              : "btn-form modal-csvpresets__item csvpresets__item__monthyear"
          }
        >
          {month}/{year}
        </div>

        {/* category */}

        <DropdownMenu
          onDropdownClick={onDropdownClick}
          localpreset={localpreset}
          onClick={onClick}
        />

        {/* delete */}
        <div className="btn-form modal-csvpresets__item">
          <DeleteButton
            name={name ? name : "Unnamed"}
            onHover={onHover}
            stopHover={stopHover}
            localpreset={localpreset}
            onDelete={onDelete}
            DelbtnColor={DelbtnColor}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default CsvPresetItem;

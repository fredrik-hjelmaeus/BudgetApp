import React, { Fragment, useState, useContext, useEffect } from "react";
import PresetContext from "../../context/preset/presetContext";
import GuideContext from "../../context/guide/guideContext";
import AlertContext from "../../context/alert/alertContext";
import CssContext from "../../context/css/cssContext";
import CheckBoxField from "./CheckBoxField";
import SelectField from "./SelectField";
import Alerts from "../layout/Alerts";
import { IPreset } from "../../frontend-types/IPreset";

const PresetForm = () => {
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);
  const guideContext = useContext(GuideContext);

  const { guide } = guideContext;
  const { presets, addPreset, calcSum, month, year, error, MonthSum } = presetContext;
  const { setAlert } = alertContext;
  const { toggleModal } = cssContext;

  useEffect(() => {
    if (guide !== "8" && guide !== "9" && guide !== "10") {
      setPreset({
        name: "",
        number: 0,
        month: month ? month : "",
        year: year ? year : 0,
        category,
        type: "overhead",
        piggybank: [{ month: month ? month : "", year: year ? year : 0, savedAmount: 0 }],
      });
    }

    if (error) setAlert(error, "danger");
    // eslint-disable-next-line
  }, [month, presets, error]);

  const [expand, setExpand] = useState(false);

  const [preset, setPreset] = useState<IPreset>({
    name: "",
    number: 0,
    month: month ? month : "",
    year: year ? year : 0,
    category: "Select an category ^",
    type: "overhead",
    piggybank: [{ month: month ? month : "", year: year ? year : 0, savedAmount: 0 }],
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPreset({ ...preset, [e.target.name]: e.target.value });
  };

  const selectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setPreset({ ...preset, category: e.target.value });
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (preset.type === "savings") {
      if (MonthSum && preset.number > MonthSum) {
        setAlert("Insufficient month surplus for this saving", "danger");
        return;
      }
    }

    if (preset.category !== "Select an category ^") {
      if (preset.name === "" || preset.number === 0) {
        setAlert("Please fill in both fields", "danger");
        return;
      } else {
        if (preset.type === "purchase") {
          addPreset({
            name: preset.name,
            number: Math.abs(preset.number),
            month: preset.month,
            year: preset.year,
            category: preset.category,
            type: preset.type,
            piggybank: preset.piggybank,
          });
        } else {
          addPreset(preset);
        }
        if (preset.name !== "" || preset.number !== 0) {
          calcSum();
        }
      }

      setPreset({
        name: "",
        number: 0,
        month: month ? month : "",
        year: year ? year : 0,
        category: "Select an category ^",
        type: "overhead",
        piggybank: [{ month: month ? month : "", year: year ? year : 0, savedAmount: 0 }],
      });
    } else {
      setAlert("Please select an category", "danger");
    }
  };

  const toggleExpand = () => {
    setExpand(!expand);
  };

  // expands the budget tab for the guide
  useEffect(() => {
    guide === "5" && setExpand(false);
    guide &&
      !isNaN(parseInt(guide)) &&
      parseInt(guide) >= 6 &&
      parseInt(guide) <= 11 &&
      setExpand(true);
    guide === "8" && setPreset({ ...preset, type: "capital" });
    guide === "9" && setPreset({ ...preset, type: "savings" });
    guide === "10" && setPreset({ ...preset, type: "purchase" });
    // eslint-disable-next-line
  }, [guide]);

  const { name, number, category } = preset;

  return (
    <Fragment>
      {expand === true && (
        <button
          className="btn closebtn mt-1"
          data-testid="presetform_closebtn"
          value="close"
          onClick={toggleExpand}
        ></button>
      )}
      {/* expanded form */}
      {expand === true && (
        <form
          onSubmit={onSubmit}
          className={
            guide && !isNaN(parseInt(guide)) && parseInt(guide) >= 6 && parseInt(guide) < 12
              ? "presetform guide__presetform"
              : "presetform"
          }
        >
          <Alerts />

          <h2 className="text-primary all-center presetformtitle"> ADD TO BUDGET</h2>

          <span className="presetformspan">
            <input
              className={guide === "6" ? "presetformname guide__presetformname" : "presetformname"}
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
            <input
              className={
                guide === "6" ? "presetformnumber guide__presetformnumber" : "presetformnumber"
              }
              type="number"
              placeholder="Number"
              name="number"
              value={number}
              onChange={onChange}
            />
          </span>

          <SelectField guide={guide} selectChange={selectChange} category={category} />

          <div
            className="presetform__optionsfield"
            data-tooltip={
              guide === "8"
                ? "To add initial capital to your account, you select capital here. This will be added to your account balance and year summary"
                : guide === "9"
                ? "To add savings from your month surplus, you select savings here"
                : guide === "10"
                ? "To setup a purchase plan you select purchase here and fill in the cost of the purchase in Number field."
                : null
            }
          >
            <CheckBoxField guide={guide} preset={preset} onChange={onChange} />

            <div>
              <button
                data-tooltip={
                  guide === "7" ? "You can also upload month-transactions from a file" : null
                }
                type="button"
                className={guide === "7" ? "btn presetform__upload" : "btn presetform__upload"}
                onClick={() => {
                  toggleModal("SelectFile");
                }}
              >
                {" "}
                Upload CSV-file
              </button>
            </div>
          </div>

          <div>
            <input type="submit" value={"ADD TO BUDGET"} className="btn btn-presetformadd" />
          </div>
        </form>
      )}
      {/* closed form */}
      {expand === false && (
        <div
          className={
            guide === "5" ? "presetformclosed guide__presetformclosed" : "presetformclosed"
          }
        >
          <button
            className="btn btn-presetformadd"
            onClick={toggleExpand}
            data-tooltip={guide === "5" ? "To open add to budget you click here" : null}
          >
            ADD TO BUDGET
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default PresetForm;

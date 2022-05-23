import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import CssContext from "../../context/css/cssContext";
import PresetContext from "../../context/preset/presetContext";
import SelectField from "./SelectField";
import CheckBoxField from "./CheckBoxField";

import Alerts from "../layout/Alerts";

const EditPreset = () => {
  // Context
  const alertContext = useContext(AlertContext);
  const presetContext = useContext(PresetContext);
  const cssContext = useContext(CssContext);

  const { edit, sendEdit, calcSum, MonthSum } = presetContext;
  const { setAlert } = alertContext;
  const { toggleModal } = cssContext;
  //State
  const [localPreset, setLocalPreset] = useState({
    // TODO: default values may be wrong, ts complains otherwise
    _id: edit?._id || "",
    name: edit?.name ? edit?.name : "",
    number: edit?.number ? edit?.number : 0,
    month: edit?.month ? edit?.month : "",
    year: edit?.year ? edit?.year : 0,
    type: edit?.type ? edit?.type : "",
    category: edit?.category ? edit?.category : "",
    piggybank: edit?.piggybank ? edit?.piggybank : [],
  });
  const { name, number, type, category } = localPreset;

  // Logic
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalPreset({ ...localPreset, [e.target.name]: e.target.value });
  };

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalPreset({ ...localPreset, category: e.target.value });
  };

  const onSubmitEditPreset = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // client side field validation
    if (number !== undefined && MonthSum !== null) {
      if (type === "savings" && number > MonthSum) {
        setAlert("Insufficient Month Surplus for this saving number", "danger");
        return;
      }
      if (name === "" || number === 0) {
        setAlert("Name and Number is required fields", "danger");
        return;
      }
      if (category === "Select an category") {
        setAlert("You need to provide an category", "danger");
        return;
      }
    }

    sendEdit(localPreset);
    calcSum();
    toggleModal("");
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    toggleModal("");
  };

  return (
    <div id="myModal" className="modal-register" style={{ display: "block" }}>
      <div className="modal-content-register" style={{ height: "auto" }}>
        <span>
          <button className="closebtn" value="close" onClick={onClick}></button>
        </span>

        <div className="modalloginheader">
          <h1>Edit</h1>
        </div>

        <div className="form-container">
          <Alerts />
          <form onSubmit={onSubmitEditPreset}>
            <div className="flexrow">
              <div>
                <label className="form-text label" htmlFor="name">
                  Name:
                </label>
              </div>
              <div className="form-text">
                <input
                  type="name"
                  id="name"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="flexrow ">
              <div>
                <label className="form-text label" htmlFor="Number">
                  Number
                </label>
              </div>
              <div className="form-text">
                <input
                  type="number"
                  id="Number"
                  placeholder="Number"
                  name="number"
                  value={number}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <SelectField selectChange={selectChange} category={category} />
            <CheckBoxField preset={localPreset} onChange={onChange} />
            <button type="submit" className="btn btn-dark btn-block my-1" value="register">
              Update
            </button>
          </form>
          <button onClick={onClick} className="btn btn-block my-1" value="close">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPreset;

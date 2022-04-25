import React from "react";

interface SelectFieldProps {
  guide?: string;
  selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  category: string;
}

const SelectField = ({ guide, selectChange, category }: SelectFieldProps) => {
  return (
    <span className="presetformselectcategory">
      <select
        onChange={selectChange}
        className={
          guide && guide === "6" ? "text-dark guide__presetformselectcategory" : "text-dark"
        }
        value={category}
      >
        <option value="Select an category">Select an category</option>
        <option value="Commute">Commute</option>
        <option value="Car">Car</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Housing">Housing</option>
        <option value="Insurance">Insurance</option>
        <option value="Child benefit">Child benefit</option>
        <option value="Childcare">Childcare</option>
        <option value="Salary">Salary</option>
        <option value="Sport Activities">Sport Activities</option>
        <option value="Clothing">Clothing</option>
        <option value="Entertainment Electronics">Entertainment Electronics</option>
        <option value="Entertainment Subscriptions">Entertainment Subscriptions</option>
        <option value="Entertainment Hobby">Entertainment Hobby</option>
        <option value="Phone">Phone</option>
        <option value="Internet">Internet</option>
        <option value="Computer">Computer</option>
        <option value="Giving">Giving</option>
        <option value="Student loan">Student loan</option>
        <option value="Electrical bill">Electrical bill</option>
        <option value="Reminderfees">Reminderfees</option>
        <option value="Bank fee">Bank fee</option>
      </select>
    </span>
  );
};
export default SelectField;

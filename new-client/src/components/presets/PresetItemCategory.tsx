import React from "react";
import { IPreset } from "../../frontend-types/IPreset";

interface PresetItemCategoryProps {
  localpreset: IPreset;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  category: string;
}

const PresetItemCategory = ({ localpreset, onClick, category }: PresetItemCategoryProps) => {
  return (
    <>
      <div className="dropdown"></div>
      <button onClick={onClick} className="dropbtn">
        <img
          src={`/icons/${category.replace(" ", "_")}.svg`}
          alt={`${category} icon`}
          style={{
            height: "20px",
            width: "20px",
          }}
          //name="edit category"
        />
      </button>
    </>
  );
};
export default PresetItemCategory;

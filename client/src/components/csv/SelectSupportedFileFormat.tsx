import React from "react";

interface SelectSupportedFileFormatProps {
  selectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  format: string;
}

const SelectSupportedFileFormat = ({ selectChange, format }: SelectSupportedFileFormatProps) => {
  return (
    <span className="selectsupportedfileformat">
      <select
        onChange={selectChange}
        className="text-dark selectsupportedfileformat__select"
        value={format}
      >
        <option value="RFC4180" className="selectsupportedfileformat__option">
          RFC4180
        </option>
        <option value="ofx" className="selectsupportedfileformat__option">
          OFX
        </option>
        <option value="nordea" className="selectsupportedfileformat__option">
          Nordea
        </option>
        <option value="swedbank" className="selectsupportedfileformat__option">
          Swedbank
        </option>
        <option value="handelsbanken" className="selectsupportedfileformat__option">
          Handelsbanken
        </option>
      </select>
    </span>
  );
};
export default SelectSupportedFileFormat;

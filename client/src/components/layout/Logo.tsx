import React from "react";
import { LogoIcon } from "./logo/LogoIcon";
//import logoicon2 from "./logo/logo_color.svg";

interface LogoProps {
  title?: string;
}

const Logo = ({ title }: LogoProps) => (
  <div className="Logo">
    <h1 className="Logo__card text-light">
      {/*  <img src={logoicon2} alt='logo' style={{ width: '66px', margin: 'auto', marginBottom: '10px' }} /> */}
      <div style={{ width: "66px", margin: "auto", marginBottom: "10px" }}>
        <LogoIcon />
      </div>
      {title && <div className="all-center Logo__text">{title}</div>}
    </h1>
  </div>
);
export default Logo;

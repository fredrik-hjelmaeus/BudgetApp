import * as React from "react";

interface LogoIconProps {
  width?: string;
}
export const LogoIcon = ({ width }: LogoIconProps) => (
  <svg
    data-v-fde0c5aa=""
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-10 -10 50 50"
    className="iconLeft"
    style={
      width === undefined
        ? { width: "66px", margin: "auto", marginBottom: "10px" }
        : { width: width }
    }
  >
    {/* <defs>
      <linearGradient
        data-v-fde0c5aa=""
        gradientTransform="rotate(25)"
        id="myGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop data-v-fde0c5aa="" offset="0%" stop-color="#b6b6b6" stop-opacity="1"></stop>
        <stop data-v-fde0c5aa="" offset="100%" stop-color="#dddddd" stop-opacity="1"></stop>
      </linearGradient>
    </defs> */}
    <g
      data-v-fde0c5aa=""
      id="2bfd90fe-b0fc-495b-99ea-07ee1c4e6943"
      stroke="none"
      // fill="url('#myGradient')"
      fill="white" // TODO: temporary override of gradient that isnt made ts-compatible by me yet
    >
      <path d="M9.382 8.675h13.943v13.943L32 31.293V0H.707zM22.618 23.325H8.675V9.382L0 .707V32h31.293z"></path>
    </g>
  </svg>
);

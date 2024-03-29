import React from "react";
const FacebookIconSVG = ({ size }: { size: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
  >
    <defs>{/* <style>.a{fill:none;}.b{fill:#fff;fill-rule:evenodd;}</style> */}</defs>
    <g transform="translate(0 -0.001)">
      <rect className="a" width="16" height="16" transform="translate(0 0.001)" />
      <path
        className="b"
        fill="#fff"
        fillRule="evenodd"
        d="M85.422,16V8.711h2.489l.356-2.844H85.422V4.089c0-.8.267-1.422,1.422-1.422h1.511V.089C88,.089,87.111,0,86.133,0a3.431,3.431,0,0,0-3.644,3.733V5.867H80V8.711h2.489V16Z"
        transform="translate(-76 0.001)"
      />
    </g>
  </svg>
);
export default FacebookIconSVG;

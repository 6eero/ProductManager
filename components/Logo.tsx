import React from "react";

const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 197 197"
    width="200px"
    height="200px"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={197} height={197} rx={98.5} fill="#105EA9" />
    <path
      d="M76 167L83.5 113.5H51V87.5H146V113.5H115.5L108 167H76Z"
      fill="white"
    />
    <circle cx={100.5} cy={56.5} r={26.5} fill="#F59C10" />
  </svg>
);

export default Logo;

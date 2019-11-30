import React from 'react'

export default (props: Object) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="26"
      viewBox="0 0 32 26"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M1.5 13H30M20 1l11 12-11 12" />
      </g>
    </svg>
  )
}

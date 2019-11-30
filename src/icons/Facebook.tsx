import React from 'react'

export default (props: Object) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path
          fill="currentColor"
          d="M18.896 0H1.104C.494 0 0 .494 0 1.103v17.771c0 .61.494 1.103 1.104 1.103h9.579V12.24H8.076V9.226h2.607V7.002c0-2.58 1.577-3.985 3.882-3.985 1.104 0 2.052.082 2.329.119v2.697h-1.598c-1.254 0-1.496.595-1.496 1.468v1.925h2.989l-.39 3.015h-2.6v7.736h5.097c.61 0 1.104-.494 1.104-1.103V1.103C20 .493 19.506 0 18.896 0"
        />
      </g>
    </svg>
  )
}

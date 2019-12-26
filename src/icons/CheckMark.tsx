import React from 'react'

export const Icon: React.FC<{ className?: string }> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="11"
      viewBox="0 0 15 11"
      {...props}
    >
      <path
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5.366L5.418 10 14 1"
      />
    </svg>
  )
}

export default Icon

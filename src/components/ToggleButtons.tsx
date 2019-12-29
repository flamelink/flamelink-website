import React from 'react'
import { css } from '@emotion/core'
import { Group } from 'reakit/Group'
import Button from './Button'

export type ToggleButtonsProps = {
  options: string[]
  selected?: string
  className?: string
  onChange(option: string): void
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({
  selected,
  options,
  onChange,
  className
}) => {
  return (
    <Group
      className={`flex flex-row flex-no-wrap justify-center items-stretch ${className}`}
    >
      {options.map(option => (
        <Button
          key={option}
          onClick={() => onChange(option)}
          data-selected={selected}
          color="primary"
          variant={selected === option ? 'contained' : 'outlined'}
          className="flex-shrink flex-grow-0"
          css={props => css`
            min-width: 9rem;

            @media screen and (min-width: ${props.screens.md}) {
              min-width: 10rem;
            }
          `}
        >
          {option}
        </Button>
      ))}
    </Group>
  )
}

ToggleButtons.defaultProps = {
  className: '',
  options: [],
  onChange: () => {}
}

export default ToggleButtons

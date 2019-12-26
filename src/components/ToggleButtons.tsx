import React from 'react'
import { Group } from 'reakit/Group'
import { Button } from 'reakit/Button'

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
    <Group className={className}>
      {options.map(option => (
        <Button
          key={option}
          onClick={() => onChange(option)}
          data-selected={selected}
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

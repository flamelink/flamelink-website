import React from 'react'
import { Button as BaseButton } from 'reakit/Button'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

interface ButtonProps {
  variant?: 'text' | 'contained' | 'outlined'
  color?: 'primary' | 'secondary'
  [key: string]: unknown
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, color, ...props }, ref) => {
    const baseStyles = () => css`
      text-transform: uppercase;
      transition: all 250ms ease-in-out;
      padding: 0.8125rem 1.5rem;
    `

    let btnStyles

    switch (variant) {
      case 'text': {
        if (color === 'primary') {
          btnStyles = p => css`
            color: ${p.theme.colors.primary};

            :hover {
              background-color: ${p.theme.colors['primary-light']};
              color: ${p.theme.colors['primary-dark']};
            }
          `
        }
        if (color === 'secondary') {
          btnStyles = p => css`
            color: ${p.theme.colors.white};

            :hover {
              background-color: ${p.theme.colors['primary-light']};
              color: ${p.theme.colors['primary-dark']};
            }
          `
        }
        break
      }

      case 'contained': {
        if (color === 'primary') {
          btnStyles = p => css`
            border-width: 2px;
            border-color: ${p.theme.colors.primary};
            background-color: ${p.theme.colors.primary};
            color: ${p.theme.colors.white};

            :hover {
              border-color: ${p.theme.colors['primary-dark']};
              background-color: ${p.theme.colors['primary-dark']};
              color: ${p.theme.colors.white};
            }
          `
        }
        if (color === 'secondary') {
          btnStyles = p => css`
            border-width: 2px;
            border-color: ${p.theme.colors.white};
            background-color: ${p.theme.colors.white};
            color: ${p.theme.colors.primary};

            :hover {
              border-color: ${p.theme.colors['primary-dark']};
              background-color: ${p.theme.colors['primary-dark']};
              color: ${p.theme.colors.white};
            }
          `
        }
        break
      }

      case 'outlined': {
        if (color === 'primary') {
          btnStyles = p => css`
            border-width: 2px;
            border-color: ${p.theme.colors.primary};
            color: ${p.theme.colors.primary};

            :hover {
              border-color: ${p.theme.colors['primary-dark']};
              color: ${p.theme.colors['primary-dark']};
            }
          `
        }
        if (color === 'secondary') {
          btnStyles = p => css`
            border-width: 2px;
            border-color: ${p.theme.colors.white};
            color: ${p.theme.colors.white};

            :hover {
              border-color: ${p.theme.colors['primary-dark']};
              background-color: ${p.theme.colors['primary-dark']};
              color: ${p.theme.colors.white};
            }
          `
        }
        break
      }

      default:
        break
    }

    const Btn = styled(BaseButton)`
      ${baseStyles}
      ${btnStyles}
    `

    return <Btn ref={ref} {...props} />
  }
)

Button.defaultProps = {
  variant: 'text',
  color: 'primary'
}

export default Button

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
      padding: 0.875rem 1.5rem;
      line-height: 1;
      font-weight: 500;
      display: inline-block;
    `

    let btnStyles

    switch (variant) {
      case 'text': {
        if (color === 'primary') {
          btnStyles = p => css`
            color: ${p.theme.colors.brand};

            :hover {
              background-color: ${p.theme.colors['brand-light']};
              color: ${p.theme.colors.brand};
            }
          `
        } else if (color === 'secondary') {
          btnStyles = p => css`
            color: ${p.theme.colors.white};

            :hover {
              background-color: ${p.theme.colors['brand-light']};
              color: ${p.theme.colors.brand};
            }
          `
        }
        break
      }

      case 'contained': {
        if (color === 'primary') {
          btnStyles = p => css`
            border-width: 2px;
            border-color: ${p.theme.colors.brand};
            background-color: ${p.theme.colors.brand};
            color: ${p.theme.colors.white};

            :hover {
              border-color: ${p.theme.colors['brand-dark']};
              background-color: ${p.theme.colors['brand-dark']};
              color: ${p.theme.colors.white};
            }
          `
        } else if (color === 'secondary') {
          btnStyles = p => css`
            border-width: 2px;
            border-color: ${p.theme.colors.white};
            background-color: ${p.theme.colors.white};
            color: ${p.theme.colors.brand};

            :hover {
              border-color: ${p.theme.colors['brand-dark']};
              background-color: ${p.theme.colors['brand-dark']};
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
            border-color: ${p.theme.colors.brand};
            color: ${p.theme.colors.brand};

            :hover {
              border-color: ${p.theme.colors['brand-dark']};
              background-color: ${p.theme.colors['brand-dark']};
              color: ${p.theme.colors.white};
            }
          `
        } else if (color === 'secondary') {
          btnStyles = p => css`
            border-width: 2px;
            border-color: ${p.theme.colors.white};
            color: ${p.theme.colors.white};

            :hover {
              border-color: ${p.theme.colors['brand-dark']};
              background-color: ${p.theme.colors['brand-dark']};
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

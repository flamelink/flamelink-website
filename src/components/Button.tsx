import React from 'react'
import { Button as BaseButton } from 'reakit/Button'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

type ButtonProps = {
  variant?: 'text' | 'contained' | 'outlined'
  color?: 'primary' | 'secondary'
  icon?: React.ReactNode
  [key: string]: unknown
}

type StyledButtonProps = {
  ['data-has-icon']: boolean
  theme: any
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, color, icon, children, ...props }, ref) => {
    const baseStyles = (props: StyledButtonProps) =>
      css`
        text-transform: uppercase;
        transition: all 250ms ease-in-out;
        padding: 0.875rem 1.5rem;
        line-height: 1;
        font-weight: 500;
        display: inline-block;

        ${props['data-has-icon'] &&
          css`
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              margin-left: 0.5rem;
              font-size: 1rem;
              line-height: 1;
              transform: scale(1.5);
            }
          `}
      `

    let btnStyles

    switch (variant) {
      case 'text': {
        if (color === 'primary') {
          btnStyles = (p: StyledButtonProps) => css`
            color: ${p.theme.colors.brand};

            :hover {
              background-color: ${p.theme.colors['brand-light']};
              color: ${p.theme.colors.brand};
            }
          `
        } else if (color === 'secondary') {
          btnStyles = (p: StyledButtonProps) => css`
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
          btnStyles = (p: StyledButtonProps) => css`
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
          btnStyles = (p: StyledButtonProps) => css`
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
          btnStyles = (p: StyledButtonProps) => css`
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
          btnStyles = (p: StyledButtonProps) => css`
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

    return (
      <Btn ref={ref} data-has-icon={Boolean(icon)} {...props}>
        {icon ? (
          <>
            <span>{children}</span>
            {icon}
          </>
        ) : (
          children
        )}
      </Btn>
    )
  }
)

Button.defaultProps = {
  variant: 'text',
  color: 'primary'
}

export default Button

import React from 'react'
import { Portal } from 'reakit/Portal'
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from 'reakit/Dialog'
import { css } from '@emotion/core'

interface Props {
  disclosure: React.ReactElement
  ['aria-label']: string
}

const Modal: React.FC<Props> = ({ disclosure, ...props }) => {
  const dialog = useDialogState()

  return (
    <>
      <DialogDisclosure {...dialog} {...disclosure.props}>
        {disclosureProps => React.cloneElement(disclosure, disclosureProps)}
      </DialogDisclosure>
      <Portal>
        <DialogBackdrop
          {...dialog}
          css={css`
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 998;

            @supports (backdrop-filter: blur(10px)) {
              backdrop-filter: blur(1px);
            }
          `}
        />
      </Portal>
      <Dialog
        {...dialog}
        css={css`
          position: fixed;
          top: 2rem;
          right: 2rem;
          bottom: 2rem;
          left: 2rem;
          z-index: 999;
        `}
        {...props}
      />
    </>
  )
}

export default Modal

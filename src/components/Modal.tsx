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
  [key: string]: unknown
}

const Modal: React.FC<Props> = ({ disclosure, ...props }) => {
  const dialog = useDialogState()

  // TODO: a nice open animation
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
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
          width: calc(100vw - 4rem);
          height: calc(100vh - 4rem);

          @media screen and (min-width: 768px) {
            width: 50vw;
            height: 50vh;
          }
        `}
        {...props}
      />
    </>
  )
}

export default Modal

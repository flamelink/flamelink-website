import React from 'react'
import { Portal } from 'reakit/Portal'
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from 'reakit/Dialog'

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
        <DialogBackdrop {...dialog} />
      </Portal>
      <Dialog {...dialog} {...props} />
    </>
  )
}

export default Modal

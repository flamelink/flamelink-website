import React from 'react'
import { Portal } from 'reakit/Portal'
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop
} from 'reakit/Dialog'
import { css } from '@emotion/core'
import { useSpring, animated, AnimatedValue } from 'react-spring'

interface Props {
  disclosure: React.ReactElement
  ['aria-label']: string
  fullWidth?: boolean
  springStyle?: AnimatedValue<any>
  [key: string]: unknown
}

const Modal: React.FC<Props> = ({
  disclosure,
  fullWidth,
  children,
  springStyle,
  ...props
}) => {
  const dialog = useDialogState({ unstable_animated: true })
  const { opacity, scale } = useSpring({
    opacity: dialog.visible ? 1 : 0,
    scale: dialog.visible ? 1 : 0,
    onRest: dialog.unstable_stopAnimation,
    config: name => ({
      tension: name === 'opacity' ? 250 : 300,
      friction: 25
    })
  })

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
            transition: all 250ms linear;
            opacity: ${dialog.visible ? 1 : 0};

            @supports (backdrop-filter: blur(10px)) {
              backdrop-filter: blur(1px);
            }
          `}
        />
      </Portal>
      <Dialog
        {...dialog}
        hideOnEsc
        hideOnClickOutside
        preventBodyScroll
        as={animated.div}
        style={
          springStyle || {
            opacity,
            top: '50%',
            left: '50%',
            transformOrigin: 'center center',
            transform: scale.interpolate(
              (s = 0) => `translate(-50%, ${50 - s * 100}%) scaleY(${s})`
            )
          }
        }
        css={css`
          position: fixed;
          z-index: 999;

          ${fullWidth
            ? css`
                width: 100vw;
                height: 100vh;
              `
            : css`
                width: calc(100vw - 4rem);
                height: calc(100vh - 4rem);

                @media screen and (min-width: 768px) {
                  width: 90vw;
                  height: 90vh;
                }
              `}
        `}
        {...props}
      >
        {typeof children === 'function' ? children({ dialog }) : children}
      </Dialog>
    </>
  )
}

Modal.defaultProps = {
  fullWidth: false,
  springStyle: undefined
}

export default Modal

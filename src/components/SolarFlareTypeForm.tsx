import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
import Button from './Button'

const URL = process.env.GATSBY_TYPEFORM_SOLAR_FLARE_URL

type SolarFlareTypeFormProps = {
  buttonText: string
  buttonClassName: string
}

const SolarFlareTypeForm = ({
  buttonText = 'Contact Us',
  buttonClassName = ''
}: SolarFlareTypeFormProps): JSX.Element => {
  const typeformRef = React.useRef()

  const openForm = React.useCallback(() => {
    typeformRef.current?.typeform?.open()
  }, [])

  return (
    <>
      <ReactTypeformEmbed
        popup
        autoOpen={false}
        url={URL}
        hideHeaders
        hideFooter
        buttonText="Go!"
        style={{ display: 'none' }}
        ref={typeformRef}
      />
      <Button
        variant="contained"
        color="primary"
        className={buttonClassName}
        onClick={openForm}
      >
        {buttonText}
      </Button>
    </>
  )
}

export default SolarFlareTypeForm

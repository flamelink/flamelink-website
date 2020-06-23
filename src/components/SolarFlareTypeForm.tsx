import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'

const URL = process.env.GATSBY_TYPEFORM_SOLAR_FLARE_URL

type SolarFlareTypeFormProps = {
  disclosure: JSX.Element
  popup?: boolean
}

const SolarFlareTypeForm = ({
  disclosure,
  popup = true
}: SolarFlareTypeFormProps): JSX.Element => {
  const typeformRef = React.useRef()

  const openForm = React.useCallback(() => {
    typeformRef.current?.typeform?.open()
  }, [])

  return (
    <>
      <ReactTypeformEmbed
        popup={popup}
        autoOpen={!popup}
        url={URL}
        hideHeaders
        hideFooter
        buttonText="Start"
        style={popup ? { display: 'none' } : { height: '100vh' }}
        ref={typeformRef}
      />
      {React.cloneElement(disclosure, {
        onClick: openForm
      })}
    </>
  )
}

export default SolarFlareTypeForm

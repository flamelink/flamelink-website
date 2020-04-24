import React from 'react'
import { css } from '@emotion/core'
import SEO from '../components/SEO'
import { Section } from '../components/Section'
import SolarFlareTypeForm from '../components/SolarFlareTypeForm'

const EnterpriseEnquiry = () => {
  return (
    <>
      <SEO
        keywords={['flamelink', 'enterprise', 'custom plan', 'solar flare']}
        title="Enterprise Enquiry"
        description="Flamelink is Enterprise ready. Please get in touch and we can discuss your custom needs."
        url="/enterprise-enquiry"
      />
      <main
        css={css`
          scroll-snap-type: x proximity;
          margin-top: -7rem;
          width: 100%;
          height: 100vh;

          > section {
            height: 100vh;
          }
        `}
      >
        <Section className="bg-white relative">
          <SolarFlareTypeForm popup={false} disclosure={<div />} />
        </Section>
      </main>
    </>
  )
}

export default EnterpriseEnquiry

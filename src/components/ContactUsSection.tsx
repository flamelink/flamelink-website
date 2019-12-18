import React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { Section, SectionTitle } from './Section'

export type Props = {}

const ContactUsSection: React.FC<Props> = ({}) => {
  return (
    <Section className="bg-brand" pattern>
      <SectionTitle
        css={css`
          ${tw`text-white leading-none`}
        `}
      >
        Let's Talk!
      </SectionTitle>
    </Section>
  )
}

ContactUsSection.defaultProps = {}

export default ContactUsSection

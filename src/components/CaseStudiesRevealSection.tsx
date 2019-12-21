import React from 'react'
import { Box } from 'reakit/Box'
import { css } from '@emotion/core'
import get from 'lodash/get'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { Section, SectionContainer, SectionTitle } from './Section'
import CaseStudyRevealItem from './CaseStudyRevealItem'

type Props = {
  title?: string
  caseStudies: any[] // TODO: fix
}

const CaseStudiesRevealSection: React.FC<Props> = ({ title, caseStudies }) => {
  return (
    <Section className="bg-white">
      {title ? (
        <SectionContainer>
          <SectionTitle>{title}</SectionTitle>
        </SectionContainer>
      ) : null}
      <ul className="w-full h-auto">
        {caseStudies.map((caseStudy, index) => (
          <CaseStudyRevealItem
            key={index}
            {...caseStudy}
            imagePosition={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </ul>
    </Section>
  )
}

CaseStudiesRevealSection.defaultProps = {
  title: '',
  caseStudies: []
}

export default CaseStudiesRevealSection

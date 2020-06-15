import React from 'react'
import { css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import { Box } from 'reakit/Box'
import { PricingPlan } from '../../types/pricing'
import PlanFeaturesList from './PlanFeaturesList'

type LargePricingCardProps = {
  plan: PricingPlan
  cta?: JSX.Element | null
  type?: 'primary' | 'secondary'
}

const LargePricingCard = ({
  plan,
  cta = null,
  type = 'secondary'
}: LargePricingCardProps) => {
  const isPrimary = type === 'primary'

  const { bgPattern } = useStaticQuery(graphql`
    query LargePricingCardQueries {
      bgPattern: file(name: { eq: "background" }) {
        publicURL
      }
    }
  `)

  return (
    <article
      className={`${
        isPrimary ? 'bg-brand text-white' : 'bg-white text-heading'
      } shadow w-full flex flex-col md:flex-row md:justify-between items-stretch px-6 md:px-10 pt-10 pb-2`}
      css={css`
        ${isPrimary
          ? `
            background-image: url(${bgPattern.publicURL});
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            `
          : ''}
      `}
    >
      <Box className="text-center md:text-left mb-8">
        <header>
          <h2 className="text-5xl leading-none font-normal mb-5">
            {plan.name}
          </h2>
          <h3
            className={`${
              isPrimary ? 'text-current' : 'text-gray-550'
            } text-base font-light leading-snug max-w-md`}
          >
            {plan.tagline}
          </h3>
        </header>
        <Box className="flex flex-row justify-center md:justify-start items-baseline font-light py-8 ml-0 md:ml-4 flex-grow-0 text-current">
          <span
            css={css`
              position: relative;
              font-size: 5rem;
              line-height: 0.7;
            `}
          >
            <sup
              css={css`
                font-size: 1.8125rem;
                line-height: 1;
                position: absolute;
                top: 0;
                left: -1ch;
              `}
            >
              {plan.currency}
            </sup>
            {plan.priceMonthly || '0'}
            <sub
              className="text-sm leading-none absolute"
              css={css`
                bottom: -0.25rem;
                right: -3ch;
              `}
            >
              /mo
            </sub>
          </span>
        </Box>
        {cta}
      </Box>
      <Box className="mb-8 md:self-center md:w-1/3 max-w-full">
        <PlanFeaturesList
          features={get(plan, 'features', [])}
          className={` ${isPrimary ? 'text-white' : 'text-heading'}`}
        />
      </Box>
    </article>
  )
}

export default LargePricingCard

import React from 'react'
import { css } from '@emotion/core'
import { PricingPlan } from '../../types/pricing'

type PlanFeaturesListProps = {
  features: PricingPlan['features']
  caged?: boolean
  className?: string
}

const PlanFeaturesList = ({
  features,
  caged = false,
  className = ''
}: PlanFeaturesListProps) => {
  return (
    <ul
      className={`${caged ? 'text-base' : 'text-base md:text-lg'} ${className}`}
      css={
        caged
          ? css`
              li {
                line-height: 1.875;
                border-bottom: 1px solid #c8c8c8;

                &:first-of-type {
                  border-top: 1px solid #c8c8c8;
                }
              }
            `
          : css`
              li {
                line-height: 2;
                border-bottom: 1px solid currentColor;

                &:last-of-type {
                  border-bottom: none;
                }
              }
            `
      }
    >
      {features.map(feature => (
        <li
          key={feature.key}
          className="flex flex-row justify-between align-baseline text-current font-normal px-1"
        >
          <span className="mr-4">{feature.key}</span>
          <span>{feature.value}</span>
        </li>
      ))}
    </ul>
  )
}

export default PlanFeaturesList

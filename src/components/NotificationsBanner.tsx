import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import get from 'lodash/get'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import { IoIosCheckmarkCircleOutline as SuccessIcon } from 'react-icons/io'
import { Box } from 'reakit/Box'
import {
  unstable_Form as Form,
  unstable_FormLabel,
  unstable_FormInput,
  unstable_FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from 'reakit/Form'
import { Section, SectionContainer, SectionTitle } from './Section'
import Button from './Button'
import { useContactUsForm } from '../hooks/contact-us-form'

const NotificationsBanner: React.FC = () => {
  const { flamelinkNotificationBannerContent } = useStaticQuery(graphql`
    query NotificationBannerQuery {
      flamelinkNotificationBannerContent {
        showBanner
        textColour
        backgroundColour
        linkHoverColour
        notification {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)

  const bgColour = flamelinkNotificationBannerContent.backgroundColour
  const textColour = flamelinkNotificationBannerContent.textColour
  const hoverColour = flamelinkNotificationBannerContent.linkHoverColour
  const notification = flamelinkNotificationBannerContent.notification

  if (flamelinkNotificationBannerContent.showBanner) {
    return (
      <div
        className="py-3 text-center text-lg uppercase"
        css={css`
          background-color: ${bgColour};
          color: ${textColour};
          a {
            text-decoration: underline;
          }
          a:hover {
            color: ${hoverColour};
          }
        `}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: get(notification, 'childMarkdownRemark.html', notification)
          }}
        ></span>
      </div>
    )
  } else {
    return null
  }
}

export default NotificationsBanner

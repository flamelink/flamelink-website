import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import get from 'lodash/get'
import { css } from '@emotion/core'

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

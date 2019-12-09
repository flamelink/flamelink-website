import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from 'reakit/Form'
import ExternalLink from './ExternalLink'
import Logo from './Logo'
import FacebookIcon from '../icons/Facebook'
import TwitterIcon from '../icons/Twitter'
import YouTubeIcon from '../icons/YouTube'
import GitHubIcon from '../icons/GitHub'
import InstagramIcon from '../icons/Instagram'
import LinkedInIcon from '../icons/LinkedIn'
import {
  FACEBOOK_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
  GITHUB_LINK,
  TERMS_AND_CONDITIONS_LINK,
  PRIVACY_POLICY_LINK,
  FLAMELINK_REGISTRATION_LINK,
  DOCUMENTATION_LINK,
  APP_CHANGELOG_LINK,
  LINKEDIN_LINK,
  INSTAGRAM_LINK
} from '../constants'
import ArrowRight from '../icons/ArrowRight'

const FooterNav = tw.nav`
  sm:flex sm:flex-1
  justify-between
  items-start
  flex-wrap
  max-w-6xl
  mx-auto
  px-12 sm:px-8 py-12 md:pt-25 md:pb-20
  text-base text-white
  text-center sm:text-left
  leading-normal
`

const Column = tw.div`
  flex
  flex-col
  justify-start
  items-stretch sm:items-start
  sm:w-1/2
  md:w-auto
  mb-8 md:mb-5
`

const StripedToe = styled.div`
  height: 1.25rem;
  background-color: ${props => props.theme.colors.gray[800]};
  background-image: ${props => `repeating-linear-gradient(
    -45deg,
    ${props.theme.colors.gray[800]} 0,
    ${props.theme.colors.gray[800]} 5px,
    ${props.theme.colors.brand} 5px,
    ${props.theme.colors.brand} 7px
  )`};
  position: sticky;
  bottom: 0;
`

const NavLink = styled.a`
  ${tw`
  hover:text-brand
  leading-relaxed
  outline-none
  focus:text-brand-dark
  `}

  transition: all 250ms ease;
`

const SocialLinks = tw.ul`
  flex
  justify-center sm:justify-start
  items-center
  mt-5
`

const SocialLink = styled.li`
  ${tw`text-white hover:text-brand cursor-pointer`}

  transition: all 250ms ease;

  &:not(:last-child) {
    margin-right: 1.375rem;
  }
`

function Footer() {
  const form = useFormState({
    values: { email: '' },
    onValidate: values => {
      if (!values.email) {
        const errors = {
          email: 'Please specify a valid email address'
        }
        throw errors
      }
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <footer className="bg-gray-800">
      <FooterNav>
        <Column
          css={css`
            ${tw`-mt-2`}
          `}
        >
          <div className="mb-4 md:mb-6">
            <Logo className="inline-block" />
          </div>
          <NavLink as={ExternalLink} href={TERMS_AND_CONDITIONS_LINK}>
            Terms &amp; Conditions
          </NavLink>
          <NavLink as={ExternalLink} href={PRIVACY_POLICY_LINK}>
            Privacy Policy
          </NavLink>
          <NavLink as={Link} to="/security">
            Security
          </NavLink>
          <small className="text-base mt-5">&copy; 2018 Flamelink</small>
          <SocialLinks>
            <SocialLink>
              <ExternalLink
                className="outline-none focus:text-brand-dark"
                href={GITHUB_LINK}
              >
                <GitHubIcon />
              </ExternalLink>
            </SocialLink>
            <SocialLink>
              <ExternalLink
                className="outline-none focus:text-brand-dark"
                href={YOUTUBE_LINK}
              >
                <YouTubeIcon />
              </ExternalLink>
            </SocialLink>
            <SocialLink>
              <ExternalLink
                className="outline-none focus:text-brand-dark"
                href={TWITTER_LINK}
              >
                <TwitterIcon />
              </ExternalLink>
            </SocialLink>
            <SocialLink>
              <ExternalLink
                className="outline-none focus:text-brand-dark"
                href={LINKEDIN_LINK}
              >
                <LinkedInIcon />
              </ExternalLink>
            </SocialLink>
            <SocialLink>
              <ExternalLink
                className="outline-none focus:text-brand-dark"
                href={FACEBOOK_LINK}
              >
                <FacebookIcon />
              </ExternalLink>
            </SocialLink>
            <SocialLink>
              <ExternalLink
                className="outline-none focus:text-brand-dark"
                href={INSTAGRAM_LINK}
              >
                <InstagramIcon />
              </ExternalLink>
            </SocialLink>
          </SocialLinks>
        </Column>

        <Column>
          <h3 className="font-medium mb-2 md:mb-5 uppercase">
            Newsletter Signup
          </h3>
          <p className="w-56 md:w-64 mb-6 mx-auto sm:mx-0">
            Sign up to our newsletter and always stay in touch with the hottest
            news.
          </p>

          <Form {...form} className="w-full">
            <FormLabel
              {...form}
              name="email"
              className="relative block mx-auto max-w-xs"
            >
              <FormInput
                {...form}
                name="email"
                placeholder="Email Address"
                className="bg-gray-600 text-white text-sm py-3 pl-3 pr-4 w-full placeholder-white focus:placeholder-white focus:shadow focus:bg-brand-dark"
                css={css`
                  & ~ button:focus {
                    outline: 0;
                  }
                `}
              />
              <FormSubmitButton
                {...form}
                className="absolute inset-y-0 right-0 mr-3 opacity-50 hover:opacity-100 outline-none focus:opacity-100 focus:text-brand-dark"
              >
                <ArrowRight
                  css={css`
                    height: 0.8rem;
                  `}
                />
              </FormSubmitButton>
            </FormLabel>
            <FormMessage
              {...form}
              name="email"
              className="text-red-600 text-xs mt-2 absolute"
            />
          </Form>
        </Column>

        <Column>
          <h3 className="font-medium mb-2 md:mb-5 uppercase">Flamelinks</h3>
          <NavLink as={ExternalLink} href={FLAMELINK_REGISTRATION_LINK}>
            Register Today
          </NavLink>
        </Column>

        <Column
          css={css`
            ${tw`mb-0 sm:mb-0`}
          `}
        >
          <h3 className="font-medium mb-2 md:mb-5 uppercase">Support</h3>
          <NavLink as={ExternalLink} href={DOCUMENTATION_LINK}>
            Documentation
          </NavLink>
          <NavLink as={ExternalLink} href={APP_CHANGELOG_LINK}>
            Changelog
          </NavLink>
          <NavLink as={ExternalLink} href={GITHUB_LINK}>
            SDK's
          </NavLink>
        </Column>
      </FooterNav>
      <StripedToe />
    </footer>
  )
}

export default Footer

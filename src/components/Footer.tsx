import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
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

const StripedToe = styled.div`
  height: 1.25rem;
  background-color: transparent;
  background-image: ${props => `repeating-linear-gradient(
    -45deg,
    transparent 0,
    transparent 5px,
    ${props.theme.colors.brand} 5px,
    ${props.theme.colors.brand} 7px
  )`};
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
      <nav className="sm:flex sm:flex-1 justify-between max-w-6xl mx-auto px-8 py-25 text-base text-white leading-normal">
        <div className="flex flex-col justify-start items-start mb-5 -mt-2">
          <span className="font-medium mb-3 md:mb-6">
            <Logo />
          </span>
          <ExternalLink
            className="hover:text-brand"
            href="https://firebasestorage.googleapis.com/v0/b/flamelink-website.appspot.com/o/flamelink%2Fmedia%2F1542263734745_Flamelink%20Terms%20and%20Conditions.pdf?alt=media&token=ce193870-f339-4b07-9af0-d2e2926c7aee"
          >
            Terms &amp; Conditions
          </ExternalLink>
          <ExternalLink
            className="hover:text-brand"
            href="https://firebasestorage.googleapis.com/v0/b/flamelink-website.appspot.com/o/flamelink%2Fmedia%2F1542263738168_Flamelink%20Privacy%20Policy.pdf?alt=media&token=ce193870-f339-4b07-9af0-d2e2926c7aee"
          >
            Privacy Policy
          </ExternalLink>
          <Link className="hover:text-brand" to="/security">
            Security
          </Link>
          <small className="text-base mt-3">&copy; 2020 Flamelink</small>
        </div>

        <div className="flex flex-col justify-start items-start mb-5">
          <h3 className="font-medium mb-2 md:mb-5 uppercase">
            Newsletter Signup
          </h3>
          <p className="w-56 md:w-64 mb-5">
            Sign up to our newsletter and always stay in touch with the hottest
            news.
          </p>

          <Form {...form} className="w-full">
            <FormLabel {...form} name="email" className="relative block">
              <FormInput
                {...form}
                name="email"
                placeholder="Email Address"
                className="bg-gray-600 text-white text-sm py-3 pl-3 pr-4 w-full"
              />
              <FormSubmitButton
                {...form}
                className="absolute inset-y-0 right-0 mr-3 opacity-50 hover:opacity-100"
              >
                →
              </FormSubmitButton>
            </FormLabel>
            <FormMessage
              {...form}
              name="email"
              className="text-red-600 text-xs mt-2 absolute"
            />
          </Form>
        </div>

        <div className="flex flex-col justify-start items-start mb-5">
          <h3 className="font-medium mb-2 md:mb-5 uppercase">Flamelinks</h3>
          <ExternalLink
            className="hover:text-brand"
            href="https://app.flamelink.io/register"
          >
            Register Today
          </ExternalLink>
        </div>

        <div className="flex flex-col justify-start items-start mb-5">
          <h3 className="font-medium mb-2 md:mb-5 uppercase">Support</h3>
          <ExternalLink
            className="hover:text-brand"
            href="https://intercom.help/flamelink"
          >
            Documentation
          </ExternalLink>
          <ExternalLink
            className="hover:text-brand"
            href="https://headwayapp.co/flamelink-changelog"
          >
            Changelog
          </ExternalLink>
          <ExternalLink
            className="hover:text-brand"
            href="https://github.com/flamelink"
          >
            SDK's
          </ExternalLink>
        </div>
      </nav>
      <StripedToe />
    </footer>
  )
}

export default Footer

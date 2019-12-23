import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import Img from 'gatsby-image'
import { string, object } from 'yup'
import set from 'lodash/set'
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from 'reakit/Form'
import { FaSmile as SuccessIcon } from 'react-icons/fa'
import AppProviders from '../components/AppProviders'
import SEO from '../components/SEO'
import Button from '../components/Button'

const schema = object().shape({
  name: string()
    .min(1)
    .required('Please enter your name'),
  email: string()
    .email()
    .required('Please enter a valid email')
})

function SlackPage() {
  const form = useFormState({
    resetOnUnmount: true,
    resetOnSubmitSucceed: false,
    values: { email: '', name: '' },
    onValidate: values =>
      schema.validate(values, { abortEarly: false }).then(
        () => {
          // success no-op
        },
        error => {
          if (error.inner.length) {
            throw error.inner.reduce(
              (acc: Object, curr: any) => set(acc, curr.path, curr.message),
              {}
            )
          }
        }
      ),
    onSubmit: async user => {
      const token =
        'xoxp-208585875490-265304393957-264650997009-d6db6f74da57665c006c72c428b60746'

      const url = `https://slack.com/api/users.admin.invite?token=${encodeURIComponent(
        token
      )}&email=${encodeURIComponent(
        user.email
      )}&first_name=${encodeURIComponent(user.name)}&resend=true`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      })

      const json = await response.json()

      if (json.ok) {
        return
      }

      let errorMessage = 'Something went wrong with the invitation.'

      switch (json.error) {
        case 'already_in_team': {
          errorMessage = 'You are already part of our Slack workspace'
          break
        }

        case 'already_in_team_invited_user': {
          errorMessage = 'You have already been invited to our Slack workspace'
          break
        }

        case 'invalid_email': {
          errorMessage = 'Slack says your email is invalid'
          break
        }

        case 'invite_limit_reached': {
          errorMessage =
            'We\'ve reached our invite limit. Please contact us on support@flamelink.io'
          break
        }

        case 'sent_recently': {
          errorMessage = 'Check your inbox. You\'ve been invited recently'
          break
        }

        case 'user_disabled': {
          errorMessage = 'Your user account has been deactivated'
          break
        }

        default:
          break
      }

      // eslint-disable-next-line no-throw-literal
      throw { email: errorMessage }
    }
  })

  const {
    slackImage,
    bgPattern,
    flamelinkSlackPageContent: {
      title,
      excerpt,
      nameFieldLabel,
      emailFieldLabel,
      ctaText
    }
  } = useStaticQuery(graphql`
    query SlackPageQueries {
      flamelinkSlackPageContent {
        title
        excerpt
        nameFieldLabel
        emailFieldLabel
        ctaText
      }
      slackImage: file(name: { eq: "slack-x-flamelink" }) {
        name
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      bgPattern: file(name: { eq: "background" }) {
        publicURL
      }
    }
  `)

  return (
    <AppProviders>
      <SEO title="Slack" />
      <main
        className="flex flex-col justify-center bg-brand items-center min-h-screen w-screen px-8 py-12"
        css={css`
          width: 100%;
          background-image: url(${bgPattern.publicURL});
          background-position: top center;
          background-repeat: no-repeat;
          background-size: cover;
        `}
      >
        <Link
          to="/"
          className="w-full max-w-lg md:max-w-md lg:max-w-sm h-auto block mx-auto mb-8"
        >
          <Img fluid={slackImage.childImageSharp.fluid} alt={slackImage.name} />
        </Link>
        <h1 className="text-white text-center text-3xl sm:text-4xl md:text-5xl leading-none font-thin mb-10">
          {title}
        </h1>
        {form.submitSucceed ? (
          <>
            <p className="text-center mb-10 text-white flex justify-center items-center">
              <SuccessIcon className="mr-2 text-lg" /> Thank you, your invite
              has been sent.
            </p>
            <Button variant="contained" color="secondary" as={Link} to="/">
              Go back home
            </Button>
          </>
        ) : (
          <Form
            {...form}
            className="bg-white text-body py-10 px-8 md:px-12 max-w-xl shadow"
          >
            <p className="text-center text-sm leading-normal mb-10 md:px-4">
              {excerpt}
            </p>
            <div className="md:px-12">
              <FormLabel {...form} name="name" className="block mb-2">
                {nameFieldLabel}
              </FormLabel>
              <FormInput
                {...form}
                name="name"
                className="border border-gray-400 text-sm py-3 pl-3 pr-4 mb-1 w-full placeholder-body outline-none focus:border-brand focus:shadow"
              />
              <FormMessage
                {...form}
                name="name"
                className="text-red-600 text-xs mt-0 mb-2"
              />
              <FormLabel {...form} name="email" className="block mb-2">
                {emailFieldLabel}
              </FormLabel>
              <FormInput
                {...form}
                name="email"
                className="border border-gray-400 text-sm py-3 pl-3 pr-4 mb-1 w-full placeholder-body outline-none focus:border-brand focus:shadow"
              />
              <FormMessage
                {...form}
                name="email"
                className="text-red-600 text-xs mt-0 mb-9"
              />
              <FormSubmitButton
                {...form}
                className="w-full bg-brand text-white hover:bg-brand-dark mb-5"
                css={css`
                  text-transform: uppercase;
                  transition: all 250ms ease-in-out;
                  padding: 0.875rem 1.5rem;
                  line-height: 1;
                `}
              >
                {ctaText}
              </FormSubmitButton>
            </div>
          </Form>
        )}
      </main>
    </AppProviders>
  )
}

export default SlackPage

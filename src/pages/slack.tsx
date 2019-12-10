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
  const [formSubmitted, setFormSubmitted] = React.useState(false)
  const [formErrors, setFormErrors] = React.useState<null | Error>(null)

  const form = useFormState({
    resetOnUnmount: true,
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
    onSubmit: user => {
      const token =
        'xoxp-208585875490-265304393957-264650997009-d6db6f74da57665c006c72c428b60746'

      const url = `https://slack.com/api/users.admin.invite?token=${encodeURIComponent(
        token
      )}&email=${encodeURIComponent(
        user.email
      )}&first_name=${encodeURIComponent(user.name)}`

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      })
        .then(() => {
          setFormErrors(null)
          setFormSubmitted(true)
        })
        .catch(error => {
          setFormErrors(error)
          setFormSubmitted(false)
          // TODO: log to Sentry
          console.log({ error })
        })
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
    query PageQueries {
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
          fluid {
            base64
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
            presentationWidth
            presentationHeight
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
        className="flex flex-col justify-center bg-brand items-center min-h-screen w-screen"
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
          className="w-full max-w-lg md:max-w-md lg:max-w-sm h-auto block mx-auto my-10"
        >
          <Img fluid={slackImage.childImageSharp.fluid} alt={slackImage.name} />
        </Link>
        <h1 className="text-white text-5xl font-thin mb-10">{title}</h1>
        {formSubmitted ? (
          <>
            <p className="text-center mb-10 text-white">
              Thank you, your invite has been sent.
            </p>
            <Button variant="contained" color="secondary" as={Link} to="/">
              Go back home
            </Button>
          </>
        ) : (
          <Form
            {...form}
            className="bg-white text-body py-10 px-12 mx-8 max-w-xl"
          >
            <p className="text-center mb-10">{excerpt}</p>
            {formErrors && (
              <p className="text-center mb-10 text-red-700">
                An error has occurred. Please refresh and try again.
              </p>
            )}
            <div className="px-12">
              <FormLabel {...form} name="name" className="block mb-2">
                {nameFieldLabel}
              </FormLabel>
              <FormInput
                {...form}
                name="name"
                className="border-2 border-gray-400 text-sm py-3 pl-3 pr-4 mb-3 w-full placeholder-body focus:placeholder-white focus:shadow focus:bg-brand-dark"
                css={css`
                  & ~ button:focus {
                    outline: 0;
                  }
                `}
              />
              <FormMessage
                {...form}
                name="name"
                className="text-red-600 text-xs mt-2 mb-10"
              />
              <FormLabel {...form} name="email" className="block mb-2">
                {emailFieldLabel}
              </FormLabel>
              <FormInput
                {...form}
                name="email"
                className="border-2 border-gray-400 text-sm py-3 pl-3 pr-4 mb-0 w-full placeholder-body focus:placeholder-white focus:shadow focus:bg-brand-dark"
                css={css`
                  & ~ button:focus {
                    outline: 0;
                  }
                `}
              />
              <FormMessage
                {...form}
                name="email"
                className="text-red-600 text-xs mt-2 mb-10"
              />
              <FormSubmitButton
                {...form}
                className="w-full bg-brand text-white hover:bg-brand-dark"
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

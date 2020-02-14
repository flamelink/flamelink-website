import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import Img from 'gatsby-image'
import { string, object } from 'yup'
import set from 'lodash/set'
import { Box } from 'reakit/Box'
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
import { SlackPageQueriesQuery } from '../../types/graphql-types'
import { getFirebaseApp } from '../utils/firebase'

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
      try {
        const firebaseApp = await getFirebaseApp()

        await firebaseApp
          .firestore()
          .collection('slackInvites')
          .add({
            ...user,
            created: Date.now()
          })

        console.log(
          '[FLAMELINK]: Successfully submitted slack invite form',
          user
        )
      } catch (error) {
        console.error(error)

        // eslint-disable-next-line no-throw-literal
        throw { email: error.message }
      }
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
  }: SlackPageQueriesQuery = useStaticQuery(graphql`
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
      <SEO
        title="Slack"
        keywords={['flamelink', 'slack', 'community', 'support']}
        url="/slack"
        description={excerpt}
      />
      <main
        className="flex flex-col justify-center bg-brand items-center min-h-screen w-screen px-4 pb-12 pt-40"
        css={css`
          margin-top: -7rem;
          width: 100%;
          background-image: url(${bgPattern.publicURL});
          background-position: top center;
          background-repeat: no-repeat;
          background-size: cover;
        `}
      >
        <Box className="w-full max-w-lg md:max-w-md lg:max-w-sm h-auto block mx-auto mb-8">
          <Img fluid={slackImage.childImageSharp.fluid} alt={slackImage.name} />
        </Box>
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

import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/core'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import {
  unstable_useFormState as useFormState,
  unstable_Form as Form,
  unstable_FormLabel as FormLabel,
  unstable_FormInput as FormInput,
  unstable_FormMessage as FormMessage,
  unstable_FormSubmitButton as FormSubmitButton
} from 'reakit/Form'
import SEO from '../components/SEO'

function SlackPage() {
  const form = useFormState({
    values: { email: '', name: '' },
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

  const { slackImage, bgImage } = useStaticQuery(graphql`
    query ImagesQuery {
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
      bgImage: file(name: { eq: "background-pattern" }) {
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
    }
  `)

  return (
    <>
      <SEO title="Slack" />
      <BackgroundImage
        Tag="main"
        className="flex flex-col justify-center items-center bg-brand min-h-screen w-screen"
        fluid={bgImage.childImageSharp.fluid}
      >
        <Link
          to="/"
          className="w-full max-w-lg md:max-w-md lg:max-w-sm h-auto block mx-auto my-10"
        >
          <Img fluid={slackImage.childImageSharp.fluid} />
        </Link>
        <h1 className="text-white text-5xl font-thin mb-10">
          Join our Slack community!
        </h1>
        <Form
          {...form}
          className="bg-white text-body py-10 px-12 mx-8 max-w-xl"
        >
          <p className="text-center mb-10">
            Join our Flamelink Slack community now. We'll answer any questions
            you have, offer product support and listen to any feedback you have
            about new features or improvements. We're also down with you sending
            us a meme or two.
          </p>
          <div className="px-12">
            <FormLabel {...form} name="name" className="block mb-2">
              Your Name
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
            <FormLabel {...form} name="email" className="block mb-2">
              Email Address
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
              Join Now
            </FormSubmitButton>
          </div>
        </Form>
      </BackgroundImage>
    </>
  )
}

export default SlackPage

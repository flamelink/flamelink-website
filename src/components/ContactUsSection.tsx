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

const FormLabel = styled(unstable_FormLabel)`
  ${tw`relative block mx-auto w-full mb-8`}
`

const FormInput = styled(unstable_FormInput)`
  ${tw`
    py-3 px-3 sm:px-4
    mb-0
    w-full
    text-base
    text-white
    border-2 border-white
    focus:border-brand-dark bg-brand-dark
    outline-none
  `}

  background-color: rgba(255, 255, 255, 0.1);

  :focus {
    ${tw`bg-brand-dark`}
  }
`

const FormMessage = styled(unstable_FormMessage)`
  ${tw`text-red-100 text-xs mt-1 absolute`}
`

const ContactUsSection: React.FC = () => {
  const { flamelinkContactFormContent } = useStaticQuery(graphql`
    query ContactUsFormQuery {
      flamelinkContactFormContent {
        sectionTitle
        submitButtonText
        flamelink_fields {
          nameFieldPlaceholder
          emailFieldPlaceholder
          messageFieldPlaceholder
        }
      }
    }
  `)

  const form = useContactUsForm()

  return (
    <Section className="bg-brand" pattern>
      <Box
        css={css`
          ${tw`z-10 max-w-lg w-full`}
        `}
      >
        <SectionContainer>
          <SectionTitle
            css={css`
              ${tw`text-white mb-15`}
            `}
          >
            {get(flamelinkContactFormContent, 'sectionTitle', '')}
          </SectionTitle>
          {form.submitSucceed ? (
            <p className="text-center text-white leading-normal flex justify-start items-center">
              <SuccessIcon className="mr-2 text-lg" /> Thanks! Someone will get
              back to you soon.
            </p>
          ) : (
            <Form
              {...form}
              className={`flex flex-col justify-start items-end w-full mb-0 ${
                form.submitting ? 'opacity-50' : 'opacity-100'
              }`}
              css={css`
                transition: opacity 250ms linear;
              `}
            >
              <FormLabel {...form} name="name">
                <FormInput
                  {...form}
                  name="name"
                  type="text"
                  className="placeholder-white"
                  placeholder={get(
                    flamelinkContactFormContent,
                    'flamelink_fields.nameFieldPlaceholder',
                    ''
                  )}
                />
                <FormMessage {...form} name="name" />
              </FormLabel>

              <FormLabel {...form} name="email">
                <FormInput
                  {...form}
                  name="email"
                  type="email"
                  className="placeholder-white"
                  placeholder={get(
                    flamelinkContactFormContent,
                    'flamelink_fields.emailFieldPlaceholder',
                    ''
                  )}
                />
                <FormMessage {...form} name="email" />
              </FormLabel>

              <FormLabel {...form} name="message">
                <FormInput
                  {...form}
                  name="message"
                  as="textarea"
                  className="placeholder-white"
                  placeholder={get(
                    flamelinkContactFormContent,
                    'flamelink_fields.messageFieldPlaceholder',
                    ''
                  )}
                />
                <FormMessage {...form} name="message" />
              </FormLabel>

              <FormSubmitButton
                {...form}
                as={Button}
                variant="outlined"
                color="secondary"
                disabled={form.validating || form.submitting}
              >
                {get(flamelinkContactFormContent, 'submitButtonText', '')}
              </FormSubmitButton>
            </Form>
          )}
        </SectionContainer>
      </Box>
    </Section>
  )
}

export default ContactUsSection

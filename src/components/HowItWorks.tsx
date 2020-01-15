import React from 'react'
import { Box } from 'reakit/Box'
import get from 'lodash/get'
import { css } from '@emotion/core'
import { Section, SectionContainer, SectionTitle } from './Section'
import VisibilityObserver, {
  VisibilityObserverPayload
} from './VisibilityObserver'

const HowItWorks = ({ data }) => {
  const { steps, title } = data
  return (
    <VisibilityObserver threshold={0.7} once>
      {({ isIntersecting }: VisibilityObserverPayload) => (
        <Section className="bg-white">
          <SectionContainer>
            <SectionTitle>{title || ''}</SectionTitle>
            <Box className="flex-initial w-full -mt-4 md:mt-0 mx-4">
              <ol className="flex flex-col md:flex-row justify-center items-stretch md:text-center max-w-full">
                {(steps || []).map((step, stepIndex) => (
                  <li
                    key={step.uniqueKey}
                    className="mb-0 w-full"
                    css={props => css`
                      max-width: 15rem;

                      &:last-child {
                        margin-bottom: 0;
                      }

                      transition: all 200ms ease-out;
                      transition-delay: ${100 * stepIndex}ms;

                      ${isIntersecting ||
                      get(props, 'device.prefersReducedMotion', false)
                        ? css`
                            opacity: 1;
                            transform: translate(0px, 0px);
                          `
                        : css`
                            opacity: 0;
                            transform: translate(0px, -${0.75 * stepIndex}rem);

                            @media screen and (min-width: 768px) {
                              transform: translate(
                                -${0.75 * stepIndex}rem,
                                0px
                              );
                            }
                          `}
                    `}
                  >
                    <Box className="flex flex-row md:flex-col justify-start items-stretch md:items-center">
                      {get(step, 'icon[0].url') && (
                        <Box className="flex flex-col md:flex-row flex-no-wrap justify-center items-center md:w-full md:mb-5">
                          <span
                            className={`block flex-grow ${
                              stepIndex === 0 ? 'bg-transparent' : ' bg-brand'
                            }`}
                            css={css`
                              width: 2px;

                              @media screen and (min-width: 768px) {
                                height: 2px;
                                width: auto;
                              }
                            `}
                          />
                          <span className="w-10 h-10 flex-grow-0">
                            <img
                              src={step.icon[0].url}
                              alt=""
                              loading="lazy"
                              width="40"
                              height="40"
                            />
                          </span>
                          <span
                            className={`block flex-grow ${
                              stepIndex === steps.length - 1
                                ? 'bg-transparent'
                                : ' bg-brand'
                            }`}
                            css={css`
                              width: 2px;

                              @media screen and (min-width: 768px) {
                                height: 2px;
                                width: auto;
                              }
                            `}
                          />
                        </Box>
                      )}
                      <h3
                        className="text-xl text-center leading-tight max-w-full"
                        css={css`
                          padding-left: 1.8175rem;
                          padding-right: 1.8175rem;
                          margin-bottom: 1rem;
                          margin-top: 1rem;

                          @media screen and (min-width: 768px) {
                            margin-bottom: 0.625rem;
                            margin-top: 0;
                          }
                        `}
                      >
                        {step.title}
                      </h3>
                      <span
                        className="text-sm text-center hidden md:block max-w-full"
                        style={{
                          paddingLeft: '1.8175rem',
                          paddingRight: '1.8175rem'
                        }}
                      >
                        {step.excerpt}
                      </span>
                    </Box>
                  </li>
                ))}
              </ol>
            </Box>
          </SectionContainer>
        </Section>
      )}
    </VisibilityObserver>
  )
}

export default HowItWorks

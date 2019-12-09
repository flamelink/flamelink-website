import React from 'react'

type Props = {
  title?: string
  style?: Object
}

const PageBanner: React.FC<Props> = ({ title, children, style }) => {
  return (
    <section
      id="pageBanner"
      className="bg-brand w-screen pt-48 pb-20"
      style={{ marginTop: '-7rem', ...(style || {}) }}
    >
      {title ? (
        <h1 className="text-white font-normal text-5xl uppercase text-center">
          {title}
        </h1>
      ) : (
        children
      )}
    </section>
  )
}

export default PageBanner

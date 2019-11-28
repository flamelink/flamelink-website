import React from 'react'

type Props = {
  title?: string
}

const PageBanner: React.FC<Props> = ({ title, children }) => {
  return (
    <section
      id="pageBanner"
      className="bg-brand w-screen pt-48 pb-20"
      style={{ marginTop: '-7rem' }}
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

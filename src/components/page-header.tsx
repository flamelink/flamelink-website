import React from 'react'

type Props = {
  title?: string
}

const PageHeader: React.FC<Props> = ({ title, children }) => {
  return (
    <header className="bg-primary w-screen py-20">
      {title ? (
        <h1 className="text-white font-light text-5xl uppercase text-center">
          {title}
        </h1>
      ) : (
        children
      )}
    </header>
  )
}

export default PageHeader

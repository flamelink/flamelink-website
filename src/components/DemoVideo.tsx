import React from 'react'

const DemoVideo = ({ visible }: { visible: boolean }) => {
  if (!visible) {
    return null
  }

  return (
    <iframe
      className="w-full h-full"
      width="100%"
      height="100%"
      allowFullScreen
      frameBorder="0"
      src="https://www.youtube.com/embed/8Cw5ktNADBQ?autoplay=1"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      title="Player for Flamelink.io a Firebase CMS"
    ></iframe>
  )
}

export default DemoVideo

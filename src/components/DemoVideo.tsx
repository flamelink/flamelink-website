import React from 'react'

const DemoVideo = () => {
  return (
    <iframe
      className="w-full h-full"
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      allowTransparency
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      title="Player for Flamelink.io a Firebase CMS"
      src="https://www.youtube-nocookie.com/embed/8Cw5ktNADBQ?=controls=0&amp;rel=0&amp;showinfo=0&amp;autoplay=0&amp;iv_load_policy=3&amp;cc_load_policy=1&amp;cc_lang_pref=en&amp;wmode=transparent&amp;modestbranding=1&amp;disablekb=0&amp;origin=https%3A%2F%2Fflamelink.io&amp;enablejsapi=0&amp;widgetid=4"
    />
  )
}

export default DemoVideo

import React from 'react'

export const useMediaQuery = (
  query: string,
  defaultMatch: boolean = false
): boolean => {
  const [matchQuery, setMatchQuery] = React.useState(defaultMatch)
  const handleQueryChange = React.useCallback(
    event => setMatchQuery(event.matches),
    []
  )

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    setMatchQuery(mediaQueryList.matches)
    mediaQueryList.addListener(handleQueryChange)
    return () => mediaQueryList.removeListener(handleQueryChange)
  }, [handleQueryChange, query])

  return matchQuery
}

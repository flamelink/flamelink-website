export const refitKeys = (o: any, keyMap: any): {} => {
  let build: any, key, destKey, value

  build = Array.isArray(o) ? [] : {}

  for (key in o) {
    // Get the destination key
    destKey = keyMap[key] || key

    // Get the value
    value = o[key]

    // If this is an object, recurse
    if (typeof value === 'object') {
      value = refitKeys(value, keyMap)
    }

    // Set it on the result using the destination key
    build[destKey] = value
  }
  return build
}

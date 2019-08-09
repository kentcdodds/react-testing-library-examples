function reportError() {
  // in a real app this would report an error
  // but this isn't a real app and is only here to be mocked.
  return Promise.resolve({success: true})
}

export {reportError}

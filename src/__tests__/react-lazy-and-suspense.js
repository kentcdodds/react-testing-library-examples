// normally you'll put this in a setup file (like src/setupTests.js in create-react-app)
// but we'll do it here for copy/paste-ability :)
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'

import React from 'react'
import {render, waitForElement} from 'react-testing-library'

const LazyComponent = React.lazy(() => import('../lazy-component'))

function Main() {
  return (
    <div>
      <div>Lazy loaded component is here:</div>
      <LazyComponent />
    </div>
  )
}

function App() {
  return (
    <React.Suspense fallback="loading...">
      <Main />
    </React.Suspense>
  )
}

test('renders lazy', async () => {
  // this is how you test a component that needs a suspense component
  // just render it with your own suspense!
  const {getByText} = render(
    <React.Suspense fallback="test loading">
      <Main />
    </React.Suspense>,
  )
  const lazyElement = await waitForElement(() => getByText(/i am lazy/i))
  expect(lazyElement).toBeInTheDocument()
})

test('app renders stuff!', async () => {
  // this is how you render a component that has it's own suspense.
  // no need to render our own suspense in the test.
  const {getByText} = render(<App />)
  const lazyElement = await waitForElement(() => getByText(/i am lazy/i))
  expect(lazyElement).toBeInTheDocument()
})

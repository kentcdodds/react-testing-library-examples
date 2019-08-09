import React from 'react'
import {render, waitForElement} from '@testing-library/react'

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

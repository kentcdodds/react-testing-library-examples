import * as React from 'react'
import {render} from 'react-dom'

function App() {
  return (
    <div>
      <h1>
        react-testing-library examples{' '}
        <span role="img" aria-label="goat">
          🐐
        </span>
      </h1>
      <div>
        <p>{`
          This is an example project of how to test react components using
          react-testing-library and Jest. The idea is that most of the tests
          should be runnable in codesandbox to make it easy to try things out,
          fork, contribute, etc. However, there will be some tests which do not
          work in codesandbox and we'll put those in a special folder called
          __local_tests__. Locally (and in CI) all tests are run via the "test"
          script, in codesandbox only the tests in __tests__ will be run.
          If you can make it work in codesandbox then do because it's a lot
          easier for people to tinker with things in codesandbox.
        `}</p>
        <p>
          <a href="https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples">
            Open this in codesandbox
          </a>{' '}
          to play around with things. You can also use the codesandbox to
          contribute to{' '}
          <a href="https://github.com/kentcdodds/react-testing-library-examples">
            the project on GitHub
          </a>
          !
        </p>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))

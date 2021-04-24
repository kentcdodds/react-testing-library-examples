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
          fork, contribute, etc. Either clone the repo locally or run the tests
          in a terminal in codesandbox (run "npm test") and it should watch your
          changes in the codesandbox and re-run the tests as you make changes.
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

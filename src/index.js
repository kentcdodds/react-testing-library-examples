import React from 'react'
import {render} from 'react-dom'

function App() {
  return (
    <div>
      <h1>react-testing-library examples 🐐</h1>
      <div>
        <p>{`
          This is an example project of how to test react components
          using react-testing-library and Jest. The idea is that most
          of the tests should be runnable in codesandbox to make it
          easy to try things out, fork, contribute, etc. However,
          there will be some tests which do not work in codesandbox
          and we'll put those in a special folder called __local_tests__.
        `}</p>
        <p>{`
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

import React from 'react'
import {render} from 'react-dom'

const App = () => (
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
    </div>
  </div>
)

render(<App />, document.getElementById('root'))

// normally you'll put this in a setup file (like src/setupTests.js in create-react-app)
// but we'll do it here for copy/paste-ability :)
import 'react-testing-library/cleanup-after-each'
import 'jest-dom/extend-expect'

import React from 'react'
import {withRouter} from 'react-router'
import {render} from 'react-testing-library'

// pretend this is in another file, and we:
// import {LocationDisplay} from './location-display'
const LocationDisplay = withRouter(({location}) => (
  <div data-testid="location-display">{location.pathname}</div>
))

// your tests should look like this below:

jest.mock('react-router', () => ({
  withRouter: Comp => props => <Comp {...props} />,
}))

test('displays location', () => {
  const pathname = '/some-route'
  const {getByTestId} = render(<LocationDisplay location={{pathname}} />)
  expect(getByTestId('location-display')).toHaveTextContent(pathname)
})

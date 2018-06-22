import 'jest-dom/extend-expect'
import React from 'react'
import {withRouter} from 'react-router'
import {render, fireEvent, cleanup} from 'react-testing-library'

afterEach(cleanup)

// pretend this is in another file, and we:
// import {LocationDisplay} from './location-display'
const LocationDisplay = withRouter(({location}) => (
  <div data-testid="location-display">{location.pathname}</div>
))

jest.mock('react-router', () => ({
  withRouter: Comp => props => <Comp {...props} />,
}))

test('displays location', () => {
  const pathname = '/some-route'
  const {getByTestId} = render(<LocationDisplay location={{pathname}} />)
  expect(getByTestId('location-display')).toHaveTextContent(pathname)
})

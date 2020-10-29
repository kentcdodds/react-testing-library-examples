import * as React from 'react'
import {withRouter} from 'react-router'
import {render, screen} from '@testing-library/react'

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
  render(<LocationDisplay location={{pathname}} />)
  expect(screen.getByTestId('location-display')).toHaveTextContent(pathname)
})

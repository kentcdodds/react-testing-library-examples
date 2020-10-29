import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from 'react-router-dom'

const About = () => <div>You are on the about page</div>
const Home = () => <div>You are home</div>
const NoMatch = () => <div>No match</div>

const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

const App = () => (
  <div>
    <Link to="/">Home</Link>

    <Link to="/about">About</Link>

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <Route>
        <NoMatch />
      </Route>
    </Switch>

    <LocationDisplay />
  </div>
)

// Ok, so here's what your tests might look like

// this is a handy function that I would utilize for any component
// that relies on the router being in context
const render = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return rtlRender(ui, {wrapper: Router})
}

test('full app rendering/navigating', () => {
  render(<App />)
  expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  userEvent.click(screen.getByText(/about/i))

  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument()
})

test('landing on a bad page', () => {
  render(<App />, {route: '/something-that-does-not-match'})

  expect(screen.getByText(/no match/i)).toBeInTheDocument()
})

test('rendering a component that uses useLocation', () => {
  const route = '/some-route'
  render(<LocationDisplay />, {route})

  // avoid using test IDs when you can
  expect(screen.getByTestId('location-display')).toHaveTextContent(route)
})

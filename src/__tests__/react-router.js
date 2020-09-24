import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
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
const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, {wrapper: Router})
}

test('full app rendering/navigating', () => {
  renderWithRouter(<App />)
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(screen.getByText(/you are home/)).toBeInTheDocument()

  const leftClick = {button: 0}
  userEvent.click(screen.getByText(/about/i), leftClick)

  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(screen.getByText(/you are on the about page/)).toBeInTheDocument()
})

test('landing on a bad page', () => {
  renderWithRouter(<App />, {route: '/something-that-does-not-match'})

  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(screen.getByText(/no match/)).toBeInTheDocument()
})

test('rendering a component that uses withRouter', () => {
  const route = '/some-route'
  renderWithRouter(<LocationDisplay />, {route})

  expect(screen.getByTestId('location-display').textContent).toBe(route)
})

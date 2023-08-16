import * as React from 'react'
import {CSSTransition, Transition} from 'react-transition-group'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}

function HiddenMessage({initialShow = false}) {
  const [show, setShow] = React.useState(initialShow)
  const toggle = () => setShow(s => !s)
  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <Fade in={show}>
        <div>Hello world</div>
      </Fade>
    </div>
  )
}

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({children}) => children)
  const FakeCSSTransition = jest.fn()
  return {CSSTransition: FakeCSSTransition, Transition: FakeTransition}
})

beforeEach(() => {
  Transition.mockImplementation(({children}) => children)
  CSSTransition.mockImplementation(props =>
    props.in ? <Transition>{props.children}</Transition> : null,
  )
})

test('you can mock things with jest.mock', async () => {
  // render(<CSSTransition>hi</CSSTransition>)
  render(<HiddenMessage initialShow={true} />)
  expect(screen.getByText('Hello world')).toBeTruthy() // we just care it exists
  // hide the message
  await userEvent.click(screen.getByText('Toggle'))
  // in the real world, the CSSTransition component would take some time
  // before finishing the animation which would actually hide the message.
  // So we've mocked it out for our tests to make it happen instantly
  expect(screen.queryByText('Hello World')).toBeNull() // we just care it doesn't exist
})

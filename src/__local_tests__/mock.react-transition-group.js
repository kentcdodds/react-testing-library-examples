import * as React from 'react'
import {CSSTransition} from 'react-transition-group'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}

class HiddenMessage extends React.Component {
  state = {show: this.props.initialShow || false}
  toggle = () => {
    this.setState(({show}) => ({show: !show}))
  }
  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <Fade in={this.state.show}>
          <div>Hello world</div>
        </Fade>
      </div>
    )
  }
}

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({children}) => children)
  const FakeCSSTransition = jest.fn((props) =>
    props.in ? <FakeTransition>{props.children}</FakeTransition> : null,
  )
  return {CSSTransition: FakeCSSTransition, Transition: FakeTransition}
})

test('you can mock things with jest.mock', () => {
  render(<HiddenMessage initialShow={true} />)
  expect(screen.getByText('Hello world')).toBeTruthy() // we just care it exists
  // hide the message
  userEvent.click(screen.getByText('Toggle'))
  // in the real world, the CSSTransition component would take some time
  // before finishing the animation which would actually hide the message.
  // So we've mocked it out for our tests to make it happen instantly
  expect(screen.queryByText('Hello World')).toBeNull() // we just care it doesn't exist
})

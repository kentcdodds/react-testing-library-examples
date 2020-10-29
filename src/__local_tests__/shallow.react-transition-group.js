import * as React from 'react'
import {CSSTransition} from 'react-transition-group'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// NOTE: True shallow rendering is not possible with React Testing Library
// This is by design: https://kcd.im/shallow
// But mocking can be useful in some situations, so this is an example of that.

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
  const FakeCSSTransition = jest.fn(() => null)
  return {CSSTransition: FakeCSSTransition}
})

test('you can mock things with jest.mock', () => {
  render(<HiddenMessage initialShow={true} />)
  const context = expect.any(Object)
  const children = expect.any(Object)
  const defaultProps = {children, timeout: 1000, className: 'fade'}
  expect(CSSTransition).toHaveBeenCalledWith(
    {in: true, ...defaultProps},
    context,
  )
  userEvent.click(screen.getByText(/toggle/i))
  expect(CSSTransition).toHaveBeenCalledWith(
    {in: true, ...defaultProps},
    context,
  )
})

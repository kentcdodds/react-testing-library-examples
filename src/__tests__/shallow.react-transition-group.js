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
  const FakeCSSTransition = jest.fn()
  return {CSSTransition: FakeCSSTransition}
})

beforeEach(() => {
  CSSTransition.mockImplementation(() => null)
})

test('you can mock things with jest.mock', async () => {
  render(<HiddenMessage initialShow={true} />)
  const context = expect.any(Object)
  const children = expect.any(Object)
  const defaultProps = {children, timeout: 1000, className: 'fade'}
  expect(CSSTransition).toHaveBeenCalledWith(
    {in: true, ...defaultProps},
    context,
  )
  await userEvent.click(screen.getByText(/toggle/i))
  expect(CSSTransition).toHaveBeenCalledWith(
    {in: true, ...defaultProps},
    context,
  )
})

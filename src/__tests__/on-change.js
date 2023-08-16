import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function UpperInput() {
  const [upper, setUpper] = React.useState('')
  const handleChange = e => setUpper(e.currentTarget.value.toUpperCase())
  return (
    <div>
      <label htmlFor="upper">Upper</label>
      <input id="upper" value={upper} onChange={handleChange} />
    </div>
  )
}

test('sets the value to the upper version of the value', async () => {
  render(<UpperInput />)
  const upperInput = screen.getByLabelText(/upper/i)
  const text = 'stuff'
  await userEvent.type(upperInput, text)
  expect(upperInput.value).toEqual(text.toUpperCase())
})

test('checkboxes (and radios) must use click', async () => {
  const handleChange = jest.fn()
  const {container} = render(<input type="checkbox" onChange={handleChange} />)
  const checkbox = container.firstChild
  // for checkboxes, the event that's fired is the click event,
  // and that causes the change event handler to be called.
  // learn more: https://github.com/testing-library/react-testing-library/issues/156
  await userEvent.click(checkbox)
  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(checkbox.checked).toBe(true)
})

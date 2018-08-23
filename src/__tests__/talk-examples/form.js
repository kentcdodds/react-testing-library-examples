import React from 'react'
import ReactDOM from 'react-dom'
import {Simulate} from 'react-dom/test-utils'
import {render, fireEvent} from 'react-testing-library'

function Login({onSubmit}) {
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <LabeledInput label="username" />
        <LabeledInput label="password" type="password" />
        <button type="submit">submit</button>
      </Form>
    </div>
  )
}

function Form({onSubmit, children}) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        const elementValues = getElementValues(event.target)
        onSubmit(elementValues)
      }}
    >
      {children}
    </form>
  )
}

function getElementValues(formNode) {
  return Object.getOwnPropertyNames(formNode.elements).reduce((obj, key) => {
    obj[key] = formNode.elements[key].value
    return obj
  }, {})
}

function LabeledInput({label, type = 'text'}) {
  return (
    <React.Fragment>
      <label htmlFor={label}>{label}</label>
      <input id={label} placeholder={label} type={type} />
    </React.Fragment>
  )
}

test('raw ReactDOM version', () => {
  const handleSubmit = jest.fn()
  const container = document.createElement('div')

  ReactDOM.render(<Login onSubmit={handleSubmit} />, container)
  const inputs = container.querySelectorAll('input')
  const usernameInput = inputs[0]
  usernameInput.value = 'chucknorris'
  const passwordInput = inputs[1]
  passwordInput.value = 'I need no password'
  const form = container.querySelector('form')
  Simulate.submit(form)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      username: 'chucknorris',
      password: 'I need no password',
    }),
  )
})

test('react-testing-library version', () => {
  const handleSubmit = jest.fn()

  const {getByLabelText, getByText} = render(<Login onSubmit={handleSubmit} />)
  const usernameInput = getByLabelText(/username/i)
  usernameInput.value = 'chucknorris'
  const passwordInput = getByLabelText(/password/i)
  passwordInput.value = 'I need no password'
  fireEvent.click(getByText(/submit/i))

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      username: 'chucknorris',
      password: 'I need no password',
    }),
  )
})

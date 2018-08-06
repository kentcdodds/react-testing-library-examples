import React from 'react'
import {render, fireEvent, cleanup} from 'react-testing-library'

afterEach(cleanup)

class SignIn extends React.Component {
  state = {email: '', password: ''}

  onEmailChange = e => {
    this.setState({email: e.target.value})
  }

  onPasswordChange = e => {
    this.setState({password: e.target.value})
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={this.state.email}
          onChange={this.onEmailChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
      </form>
    )
  }
}

test('SignIn form email and password fields should change', () => {
  const {getByLabelText} = render(<SignIn />)
  const emailInput = getByLabelText('Email')
  const passwordInput = getByLabelText('Password')
  // due to the way React tracks input values, you cannot
  // simply set the `.value` property of an input node and fire a change event
  // so fireEvent allows you to specify properties you want applied to the
  // target in a way that side-step's React's tracking so you can correctly
  // test the onChange handler's behavior
  fireEvent.change(emailInput, {target: {value: 'test@test.com'}})
  fireEvent.change(passwordInput, {target: {value: '12345678'}})
  expect(emailInput.value).toEqual('test@test.com')
  expect(passwordInput.value).toEqual('12345678')
})

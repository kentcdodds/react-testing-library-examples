// this is similar to __local_tests__/async-with-mock.js
// except this one uses a form of dependency injection because
// jest.mock is not available in codesandbox
import React from 'react'
import axios from 'axios'
import {render, fireEvent, screen} from '@testing-library/react'

class Fetch extends React.Component {
  static defaultProps = {axios}
  state = {}
  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.fetch()
    }
  }
  fetch = async () => {
    const response = await this.props.axios.get(this.props.url)
    this.setState({data: response.data})
  }
  render() {
    const {data} = this.state
    return (
      <div>
        <button onClick={this.fetch}>Fetch</button>
        {data ? <span data-testid="greeting">{data.greeting}</span> : null}
      </div>
    )
  }
}

test('Fetch makes an API call and displays the greeting', async () => {
  const fakeAxios = {
    get: jest.fn(() => Promise.resolve({data: {greeting: 'hello there'}})),
  }
  const url = 'https://example.com/get-hello-there'
  render(<Fetch url={url} axios={fakeAxios} />)
  fireEvent.click(screen.getByText(/fetch/i))

  const greetingNode = await screen.findByTestId('greeting')

  expect(fakeAxios.get).toHaveBeenCalledTimes(1)
  expect(fakeAxios.get).toHaveBeenCalledWith(url)
  expect(greetingNode).toHaveTextContent('hello there')
})

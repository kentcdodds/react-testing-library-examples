// this is similar to the __tests__/async.js file
// except this one uses jest.mock (which is not available in codesandbox).
import React from 'react'
import axios from 'axios'
import {render, fireEvent, screen} from '@testing-library/react'

jest.mock('axios', () => ({get: jest.fn()}))

class Fetch extends React.Component {
  state = {}
  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.fetch()
    }
  }
  fetch = async () => {
    const response = await axios.get(this.props.url)
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
  axios.get.mockResolvedValueOnce({data: {greeting: 'hello there'}})
  const url = 'https://example.com/get-hello-there'
  render(<Fetch url={url} />)
  fireEvent.click(screen.getByText(/fetch/i))

  const greetingNode = await screen.findByTestId('greeting')

  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith(url)
  expect(greetingNode).toHaveTextContent('hello there')
})

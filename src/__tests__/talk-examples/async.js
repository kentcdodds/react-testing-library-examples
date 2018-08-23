import React from 'react'
import axios from 'axios'
import {render, fireEvent, waitForElement} from 'react-testing-library'
import 'jest-dom/extend-expect'

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

jest.mock('axios', () => ({get: jest.fn()}))

test('Fetch makes an API call and displays the greeting', async () => {
  axios.get.mockResolvedValueOnce({data: {greeting: 'hello there'}})
  const url = 'https://example.com/get-hello-there'
  const {container, getByText, getByTestId} = render(<Fetch url={url} />)
  fireEvent.click(getByText(/fetch/i))

  const greetingNode = await waitForElement(() => getByTestId('greeting'))

  expect(axios.get).toHaveBeenCalledTimes(1)
  expect(axios.get).toHaveBeenCalledWith(url)
  expect(greetingNode).toHaveTextContent('hello there')

  // oh, ans snapshots work:
  expect(container.firstChild).toMatchSnapshot()
})

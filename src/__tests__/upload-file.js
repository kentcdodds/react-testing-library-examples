import 'jest-dom/extend-expect'
import React, {Component} from 'react'
import {render, cleanup, fireEvent} from 'react-testing-library'

afterEach(cleanup)

class UploadFile extends Component {
  state = {
    uploadedFileName: null,
  }

  handleUploadFile = e => {
    const file = e.target.files[0]
    this.setState({
      uploadedFileName: file.name,
    })
  }

  render() {
    return (
      <div>
        <label htmlFor="upload-file">Upload File</label>
        <input
          type="file"
          id="upload-file"
          name="upload-file"
          onChange={this.handleUploadFile}
        />
        {this.state.uploadedFileName && (
          <div>
            You have uploaded a file named {this.state.uploadedFileName}
          </div>
        )}
      </div>
    )
  }
}

test('Show the uploaded file name after the user uploads a file', () => {
  const {getByLabelText, getByText, container} = render(<UploadFile />)

  const file = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png',
  })

  const inputEl = getByLabelText('Upload File')

  // input.files is a read-only property
  // so this is not allowed
  // input.files = [file]

  // But DOM properties are reconfigurable
  // I got this while reading through a related JSDOM Github issue
  // https://github.com/jsdom/jsdom/issues/1272#issuecomment-150670691
  Object.defineProperty(inputEl, 'files', {
    value: [file],
  })

  // If you want to trigger the onChange handler of a controlled component
  // with a different event.target.value, sending value through
  // eventProperties won't work like it does with Simulate.
  // You need to change the element's value property,
  // then use fireEvent to fire a change DOM event.
  // https://github.com/kentcdodds/react-testing-library#fireeventeventnamenode-htmlelement-eventproperties-object
  fireEvent.change(inputEl)

  expect(container).toContainElement(getByText(/chucknorris\.png/))
})

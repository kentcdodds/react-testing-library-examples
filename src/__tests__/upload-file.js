import React, {Component} from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

class UploadFile extends Component {
  state = {
    uploadedFileName: null,
  }

  handleUploadFile = (e) => {
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
  render(<UploadFile />)
  const inputEl = screen.getByLabelText(/upload file/i)

  const file = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png',
  })
  userEvent.upload(inputEl, file)

  expect(screen.getByText(/chucknorris\.png/)).toBeInTheDocument()
})

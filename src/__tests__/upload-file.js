import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import {useState} from 'react'

const UploadFile = () => {
  const [uploadedFileName, setUploadedFileName] = useState(null)

  const handleUploadFile = ({target: {files}}) =>
    setUploadedFileName(files[0].name)

  return (
    <div>
      <label htmlFor="upload-file">Upload File</label>

      <input
        id="upload-file"
        name="upload-file"
        onChange={handleUploadFile}
        type="file"
      />

      {uploadedFileName && (
        <div>You have uploaded a file named {uploadedFileName}</div>
      )}
    </div>
  )
}

test('Show the uploaded file name after the user uploads a file', async () => {
  render(<UploadFile />)
  const inputEl = screen.getByLabelText(/upload file/i)

  const file = new File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png',
  })
  await userEvent.upload(inputEl, file)

  expect(screen.getByText(/chucknorris\.png/)).toBeInTheDocument()
})

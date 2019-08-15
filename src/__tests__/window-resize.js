import {render} from '@testing-library/react'
import matchMediaPolyfill from 'mq-polyfill'
import React from 'react'

function WindowSize () {
  return (
    <div>
      <label htmlFor='inner-width'>Inner Width</label>
      <div id='inner-width'>{window.innerWidth}</div>
      <label htmlFor='inner-height'>Inner Height</label>
      <div id='inner-height'>{window.innerHeight}</div>
      <label htmlFor='outer-width'>Outer Width</label>
      <div id='outer-width'>{window.outerWidth}</div>
      <label htmlFor='outer-height'>Outer Height</label>
      <div id='outer-height'>{window.outerHeight}</div>
    </div>
  )
}

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
  console.log('test')
})

test('shows default window size correctly', () => {
  const {getByLabelText} = render(<WindowSize />)

  expect(getByLabelText('Inner Width')).toHaveTextContent(1024)
  expect(getByLabelText('Inner Height')).toHaveTextContent(768)
  expect(getByLabelText('Outer Width')).toHaveTextContent(1024)
  expect(getByLabelText('Outer Height')).toHaveTextContent(768)
})

test('shows modified window size correctly', () => {
  window.resizeTo(800, 300)

  const {getByLabelText} = render(<WindowSize />)

  expect(getByLabelText('Inner Width')).toHaveTextContent(800)
  expect(getByLabelText('Inner Height')).toHaveTextContent(300)
  expect(getByLabelText('Outer Width')).toHaveTextContent(800)
  expect(getByLabelText('Outer Height')).toHaveTextContent(300)
})

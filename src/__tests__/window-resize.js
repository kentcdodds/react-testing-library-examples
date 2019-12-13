import React from 'react'
import matchMediaPolyfill from 'mq-polyfill'
import {render, screen} from '@testing-library/react'

function WindowSize() {
  return (
    <div>
      <label htmlFor="inner-width">Inner Width</label>
      <div id="inner-width">{window.innerWidth}</div>
      <label htmlFor="inner-height">Inner Height</label>
      <div id="inner-height">{window.innerHeight}</div>
      <label htmlFor="outer-width">Outer Width</label>
      <div id="outer-width">{window.outerWidth}</div>
      <label htmlFor="outer-height">Outer Height</label>
      <div id="outer-height">{window.outerHeight}</div>
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
})

test('shows default window size correctly', () => {
  render(<WindowSize />)

  expect(screen.getByLabelText('Inner Width')).toHaveTextContent(1024)
  expect(screen.getByLabelText('Inner Height')).toHaveTextContent(768)
  expect(screen.getByLabelText('Outer Width')).toHaveTextContent(1024)
  expect(screen.getByLabelText('Outer Height')).toHaveTextContent(768)
})

test('shows modified window size correctly', () => {
  window.resizeTo(800, 300)

  render(<WindowSize />)

  expect(screen.getByLabelText('Inner Width')).toHaveTextContent(800)
  expect(screen.getByLabelText('Inner Height')).toHaveTextContent(300)
  expect(screen.getByLabelText('Outer Width')).toHaveTextContent(800)
  expect(screen.getByLabelText('Outer Height')).toHaveTextContent(300)
})

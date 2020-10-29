import * as React from 'react'
import matchMediaPolyfill from 'mq-polyfill'
import {render, screen} from '@testing-library/react'

function WindowSize() {
  return (
    <div>
      <label id="inner-width">Inner Width</label>
      <div aria-labelledby="inner-width">{window.innerWidth}</div>
      <label id="inner-height">Inner Height</label>
      <div aria-labelledby="inner-height">{window.innerHeight}</div>
      <label id="outer-width">Outer Width</label>
      <div aria-labelledby="outer-width">{window.outerWidth}</div>
      <label id="outer-height">Outer Height</label>
      <div aria-labelledby="outer-height">{window.outerHeight}</div>
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

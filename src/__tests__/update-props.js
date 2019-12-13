// This is an example of how to update the props of a rendered component.
// the basic idea is to simply call `render` again and provide the same container
// that your first call created for you.

import React from 'react'
import {render, screen} from '@testing-library/react'

let idCounter = 1

class NumberDisplay extends React.Component {
  id = idCounter++ // to ensure we don't remount a different instance
  render() {
    return (
      <div>
        <span data-testid="number-display">{this.props.number}</span>
        <span data-testid="instance-id">{this.id}</span>
      </div>
    )
  }
}

test('calling render with the same component on the same container does not remount', () => {
  const {rerender} = render(<NumberDisplay number={1} />)
  expect(screen.getByTestId('number-display').textContent).toBe('1')

  // re-render the same component with different props
  rerender(<NumberDisplay number={2} />)
  expect(screen.getByTestId('number-display').textContent).toBe('2')

  expect(screen.getByTestId('instance-id').textContent).toBe('1')
})

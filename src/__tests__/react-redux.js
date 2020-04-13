import React from 'react'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {render as rtlRender, screen, fireEvent} from '@testing-library/react'

// counter.js
const Counter = ({dispatch, count}) => {
  const increment = () => {
    dispatch({type: 'INCREMENT'})
  }

  const decrement = () => {
    dispatch({type: 'DECREMENT'})
  }

  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span data-testid="count-value">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

// normally this would be:
// export default connect(state => ({count: state.count}))(Counter)
// but for this test we'll give it a variable name
// because we're doing this all in one file
const ConnectedCounter = connect((state) => ({count: state.count}))(Counter)

// app.js
const initialReducerState = {
  count: 0,
}

function reducer(state = initialReducerState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
      }
    default:
      return state
  }
}

// normally here you'd do:
// const store = createStore(reducer)
// ReactDOM.render(
//   <Provider store={store}>
//     <Counter />
//   </Provider>,
//   document.getElementById('root'),
// )
// but for this test we'll umm... not do that :)

// Now here's what your test will look like:

// this is a handy function that I normally make available for all my tests
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
function render(
  ui,
  {
    initialState = initialReducerState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

test('can render with redux with defaults', () => {
  render(<ConnectedCounter />)
  fireEvent.click(screen.getByText('+'))
  expect(screen.getByTestId('count-value')).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  render(<ConnectedCounter />, {
    initialState: {count: 3},
  })
  fireEvent.click(screen.getByText('-'))
  expect(screen.getByTestId('count-value')).toHaveTextContent('2')
})

test('can render with redux with custom store', () => {
  // this is a silly store that can never be changed
  const store = createStore(() => ({count: 1000}))
  render(<ConnectedCounter />, {
    store,
  })
  fireEvent.click(screen.getByText('+'))
  expect(screen.getByTestId('count-value')).toHaveTextContent('1000')
  fireEvent.click(screen.getByText('-'))
  expect(screen.getByTestId('count-value')).toHaveTextContent('1000')
})

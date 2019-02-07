import 'jest-dom/extend-expect'
import React, {useContext} from 'react'
import {render, cleanup, testHook} from 'react-testing-library'
import {NameContext, NameProvider} from '../react-context'

afterEach(cleanup)

// This is a very simple example hook that utilizes `useContext()`. Your custom
// hook will probably be more complicated than this, but the purpose of this
// example is specifically to show how to test the context part.
function useGreeting() {
  const name = useContext(NameContext);
  return `Hello, ${name}!`;
}

// This helper component allows us to call the hook in a component context as
// per the Rules of Hooks (https://reactjs.org/docs/hooks-rules.html). We're
// just testing the custom hook, so this doesn't need to return anything.
function TestHook({ callback }) {
  callback()
  return null
}

// This function works the same way as `testHook()`, except now the hook will
// run in a child of the Provider.
function testHookWithNameProvider(callback) {
  render(
    <NameProvider first="Han" last="Solo">
      <TestHook callback={callback} />
    </NameProvider>,
  )
}

// You can use `testHook()` to test the hook outside of the provider
test('provides the context default value', () => {
  let name
  testHook(() => (name = useGreeting()))
  expect(name).toBe('Hello, Unknown!')
})

// You can use `testHookWithNameProvider()` to test the hook within the provider
test('provides the context value', () => {
  let name
  testHookWithNameProvider(() => (name = useGreeting()))
  expect(name).toBe('Hello, Han Solo!')
})

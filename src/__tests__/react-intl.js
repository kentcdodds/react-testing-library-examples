import 'intl'
import * as React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import {IntlProvider, FormattedDate} from 'react-intl'

const FormatDateView = () => {
  return (
    <div data-testid="date-display">
      <FormattedDate
        value="2019-03-11"
        timeZone="utc"
        day="2-digit"
        month="2-digit"
        year="numeric"
      />
    </div>
  )
}

function render(ui, options) {
  function Wrapper({children}) {
    return <IntlProvider locale="pt">{children}</IntlProvider>
  }
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...options}),
  }
}

// this should work, but for some reason it's not able to load the locale
// even though we have the IntlPolyfill installed
// I promise it is. Just try console.log(global.IntlPolyfill)
test('it should render FormattedDate and have a formated pt date', () => {
  render(<FormatDateView />)
  expect(screen.getByTestId('date-display')).toHaveTextContent('11/03/2019')
})

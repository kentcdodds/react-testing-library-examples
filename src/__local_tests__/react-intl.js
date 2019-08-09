import React from 'react'
import {render as rtlRender} from '@testing-library/react'
import {IntlProvider, FormattedDate} from 'react-intl'
import IntlPolyfill from 'intl'

global.IntlPolyfill = IntlPolyfill

// Test enviroment run as server enviroment and should have polyfill to locale
// https://formatjs.io/guides/runtime-environments/#server
if (global.Intl) {
  Intl.NumberFormat = IntlPolyfill.NumberFormat
  Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
} else {
  global.Intl = IntlPolyfill
}

// for some reason the next line here is breaking on codesandbox. Not sure why...
require('intl/locale-data/jsonp/pt')

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

test('it should render FormattedDate and have a formated pt date', () => {
  const {getByTestId} = render(<FormatDateView />)
  expect(getByTestId('date-display')).toHaveTextContent('11/03/2019')
})

import * as React from 'react'
import {reportError} from './utils'

class ErrorBoundary extends React.Component {
  state = {hasError: false}
  componentDidCatch(error, info) {
    this.setState({hasError: true})
    reportError(error, info)
  }
  render() {
    return this.state.hasError ? (
      <div>There was a problem</div>
    ) : (
      this.props.children
    )
  }
}

function Bomb() {
  return window['💣'].caboom()
}

function BombButton() {
  const [renderBomb, setRenderBomb] = React.useState(false)
  const handleBombClick = () => setRenderBomb(true)
  return (
    <ErrorBoundary>
      {renderBomb ? (
        <Bomb />
      ) : (
        <button onClick={handleBombClick}>
          <span role="img" aria-label="bomb">
            💣
          </span>
        </button>
      )}
    </ErrorBoundary>
  )
}

export {BombButton}

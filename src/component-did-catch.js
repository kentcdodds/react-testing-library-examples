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

class Bomb extends React.Component {
  render() {
    return this['💣'].caboom()
  }
}

class BombButton extends React.Component {
  state = {renderBomb: false}
  handleBombClick = () => this.setState({renderBomb: true})
  render() {
    return (
      <ErrorBoundary>
        {this.state.renderBomb ? (
          <Bomb />
        ) : (
          <button onClick={this.handleBombClick}>
            <span role="img" aria-label="bomb">
              💣
            </span>
          </button>
        )}
      </ErrorBoundary>
    )
  }
}

export {BombButton}

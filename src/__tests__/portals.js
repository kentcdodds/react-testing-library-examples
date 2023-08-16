import { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// this is only here for HMR/codesandbox purposes
// in a real scenario, you'd probably just do the stuff
// that's in the if statement.
let modalRoot = document.getElementById('modal-root')
if (!modalRoot) {
  modalRoot = document.createElement('div')
  modalRoot.setAttribute('id', 'modal-root')
  document.body.appendChild(modalRoot)
}

const Modal = ({ onClose, children }) => {
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const elToAppend = el.current;
    modalRoot.appendChild(elToAppend)
    return () => {
      modalRoot.removeChild(elToAppend)
    }
  }, []);

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          padding: 20,
          background: '#fff',
          borderRadius: '2px',
          display: 'inline-block',
          minHeight: '300px',
          margin: '1rem',
          position: 'relative',
          minWidth: '300px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          justifySelf: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <hr />
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    el.current,
  )
}

test('modal shows the children and a close button', async () => {
  // Arrange
  const handleClose = jest.fn()

  // Act
  render(
    <Modal onClose={handleClose}>
      <div>test</div>
    </Modal>,
  )
  // Assert
  expect(screen.getByText('test')).toBeTruthy()

  // Act
  await userEvent.click(screen.getByText(/close/i))

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1)
})

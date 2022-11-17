import clsx from 'clsx'
function Modal({ className, text, isShow, onClick }) {
  return (
    <div
      className={clsx(className, isShow ? '' : 'd-none')}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal__content">
        <p className="modal__detail">{text}</p>
        <div className="button button__accept" role="button" onClick={onClick}>
          {'確定'}
        </div>
      </div>
    </div>
  )
}

export default Modal

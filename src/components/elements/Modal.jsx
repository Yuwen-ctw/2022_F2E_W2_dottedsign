function Modal({ className, text }) {
  return (
    <div className={className} role="dialog" aria-modal="true">
      <div className="modal__content">
        <p className="modal__detail">{text}</p>
        <div className="button button__accept" role="button">
          {'確定'}
        </div>
      </div>
    </div>
  )
}

export default Modal

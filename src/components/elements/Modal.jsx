import clsx from 'clsx'
function Modal({ className, isShow, children, onClick }) {
  return (
    <div
      className={clsx(className, isShow ? '' : 'd-none')}
      role="dialog"
      aria-modal="true"
      onClick={onClick}
    >
      <div className="modal__content">{children}</div>
    </div>
  )
}

export default Modal

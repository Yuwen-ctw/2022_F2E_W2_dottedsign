function CheckContent({ onClose }) {
  return (
    <>
      <p className="modal__detail">請置入簽名後再完成簽屬</p>
      <div className="button button__accept" role="button" onClick={onClose}>
        {'確定'}
      </div>
    </>
  )
}

export default CheckContent

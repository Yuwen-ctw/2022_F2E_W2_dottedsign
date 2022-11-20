function CheckDownload({ onClose }) {
  return (
    <>
      <p className="modal__detail">尚未儲存文件，確定要離開且刪除？</p>
      <div className="modal__buttons">
        <div className="button button__cancle" role="button" onClick={onClose}>
          {'取消'}
        </div>
        <a
          href="https://yuwen-ctw.github.io/2022_F2E_W2_dottedsign/"
          className="button button__accept"
          role="button"
        >
          {'確定'}
        </a>
      </div>
    </>
  )
}

export default CheckDownload

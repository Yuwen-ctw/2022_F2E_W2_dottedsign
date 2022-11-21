import { useRef, useState } from 'react'
import Modal from '../../elements/Modal'
import readPdf from '../../utilities/readPdf'
import icons from '../../../images'

function LoadFile({ onUpLoad }) {
  const inputRef = useRef(null)
  const modalText = useRef('')
  const [isInvalid, setIsInvalid] = useState(false)

  function handleInputChange(e) {
    // get file
    const file = e.target.files[0]
    // get size (MB)
    const fileSize = Number((file.size / 1024 / 1024).toFixed(2))
    const isValid = file.name.match(/\.(pdf)$/i)
    if (!isValid) {
      setIsInvalid(true)
      modalText.current = '檔案格式錯誤請重新選擇'
      return
    }
    if (fileSize > 10) {
      setIsInvalid(true)
      modalText.current = '檔案超過10 MB，請重新選擇'
      return
    }
    // utilitiy
    readPdf(file).then(onUpLoad)
  }

  function handleAlertOK() {
    setIsInvalid(false)
    inputRef.current.value = ''
  }

  return (
    <section className="section__load-file">
      <div className="load-file__image">
        <label className="load-file__image-label" htmlFor="input-file">
          <img
            className="load-file__image-link"
            src={icons.fileImage}
            alt="file"
          ></img>
        </label>
      </div>
      <div className="load-file__input-container">
        <label className="load-file__input-label" htmlFor="input-file">
          選擇檔案
          <input
            ref={inputRef}
            accept=".pdf,.PDF"
            className="load-file__input"
            type="file"
            name="input-file"
            id="input-file"
            onChange={handleInputChange}
          />
        </label>
        <p className="load-file__description load-file__description--method">
          (或拖移檔案到此處)
        </p>
        <p className="load-file__description load-file__description--limit">
          (限10MB 內的PDF或JPG檔)
        </p>
      </div>
      <Modal isShow={isInvalid} className={'load-file__modal'}>
        <AlertFileFormat message={modalText.current} onClick={handleAlertOK} />
      </Modal>
    </section>
  )
}

export default LoadFile

function AlertFileFormat({ message, onClick }) {
  return (
    <>
      <p className="modal__detail">{message}</p>
      <div className="button button__accept" role="button" onClick={onClick}>
        {'確定'}
      </div>
    </>
  )
}

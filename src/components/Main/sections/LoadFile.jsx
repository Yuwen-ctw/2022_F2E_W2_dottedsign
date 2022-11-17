import Modal from '../../elements/Modal'
import { useRef, useState } from 'react'
import fileImage from '../../../images/File.png'

function LoadFile() {
  const inputRef = useRef(null)
  const [isShow, setIsShow] = useState(false)
  const modalText = useRef('')
  function handleInputChange(e) {
    const file = e.target.files[0]
    // get size (MB)
    const fileSize = Number((file.size / 1024 / 1024).toFixed(2))
    const isValid = file.name.match(/\.(pdf|jpg|jpeg|png)$/i)
    if (!isValid) {
      setIsShow(true)
      modalText.current = '檔案格式錯誤請重新選擇'
    }
    if (fileSize > 10) {
      setIsShow(true)
      modalText.current = '檔案超過10 MB，請重新選擇'
    }
  }
  function handleButtonClick() {
    setIsShow(false)
    inputRef.current.value = ''
  }
  return (
    <section className="section__load-file">
      <div className="load-file__image">
        <label className="load-file__image-label" htmlFor="input-file">
          <img
            className="load-file__image-link"
            src={fileImage}
            alt="file"
          ></img>
        </label>
      </div>
      <div className="load-file__input-container">
        <label className="load-file__input-label" htmlFor="input-file">
          選擇檔案
          <input
            ref={inputRef}
            title="  "
            accept=".jpg,.jpeg,.pdf,.PDF"
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
      <Modal
        isShow={isShow}
        onClick={handleButtonClick}
        className={'load-file__modal'}
        text={modalText.current}
      />
    </section>
  )
}

export default LoadFile

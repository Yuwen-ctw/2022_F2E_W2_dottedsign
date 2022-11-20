/* global  pdfjsLib */
import Modal from '../../elements/Modal'
import { useRef, useState } from 'react'
import icons from '../../../images'
// import Process from '../Process'
// import loadingAnimate from '../../../images/GNsign_loading.json'

function LoadFile({ onUpLoad, switchPhase }) {
  const inputRef = useRef(null)
  const modalText = useRef('')
  const [isShow, setIsShow] = useState(false)
  // const [isLoad, setIsLoad] = useState(false)

  function handleInputChange(e) {
    const file = e.target.files[0]
    const fileName = file.name.replace(/\.\w*/, '')
    // get size (MB)
    const fileSize = Number((file.size / 1024 / 1024).toFixed(2))
    const isValid = file.name.match(/\.(pdf|jpg|jpeg|png)$/i)

    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      if (!isValid) {
        setIsShow(true)
        reject((modalText.current = '檔案格式錯誤請重新選擇'))
      } else if (fileSize > 10) {
        setIsShow(true)
        reject((modalText.current = '檔案超過10 MB，請重新選擇'))
      } else {
        reader.onload = async function () {
          const Base64Prefix = 'data:application/pdf;base64,'
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            // 將 base64 中的前綴刪去，並進行解碼
            'https://mozilla.github.io/pdf.js/build/pdf.worker.js'
          const data = atob(reader.result.substring(Base64Prefix.length))
          const pdfDoc = await pdfjsLib.getDocument({ data }).promise
          const totalPage = pdfDoc.numPages
          let pdfDatabyPage = []
          pdfDatabyPage.fileName = fileName
          for (let i = 1; i <= totalPage; i++) {
            const pageData = await pdfDoc.getPage(i)
            pdfDatabyPage.push(pageData)
          }
          switchPhase()
          // setIsLoad(false)
          resolve(onUpLoad(pdfDatabyPage))
        }
        reader.readAsDataURL(file)
      }
    })
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
      <Modal isShow={isShow} className={'load-file__modal'}>
        <p className="modal__detail">{modalText.current}</p>
        <div
          className="button button__accept"
          role="button"
          onClick={handleButtonClick}
        >
          {'確定'}
        </div>
      </Modal>
      {/* {isLoad && (
        <Process
          text={'簽名優化中...'}
          animationData={loadingAnimate}
          duration={2000}
        ></Process>
      )} */}
    </section>
  )
}

export default LoadFile

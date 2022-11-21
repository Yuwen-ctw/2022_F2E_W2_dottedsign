// icons
import icons from '../../../images'
import okAnimate from '../../../images/ok.json'
import wrongAnimate from '../../../images/wrong.json'
// hooks
import { useEffect, useState, useRef } from 'react'
// utilitues
import renderPdf from '../../utilities/renderPdf'
import customFabricDeleteIcon from '../../utilities/customFabricDeleteIcon'
// components
import Logo from '../../elements/Logo'
import Modal from '../../elements/Modal'
import Signatures from './components/Signatures'
import Process from '../Process'
import CheckContent from './components/CheckContent'
import CheckDownload from './components/CheckDownload'
import WordingContent from './components/WordingContent'
// modules
import { jsPDF } from 'jspdf'

function SignInsert({ pdfByPages }) {
  // init render state
  const effectRan = useRef(false)
  // variables between re-render
  const fabricCanvasRef = useRef(null)
  const pdfRef = useRef(new jsPDF())
  const signRef = useRef(null)
  const downloadMessageRef = useRef(null)
  // re-render trigger
  const [page, setPage] = useState(0)
  const [isEdit, setIsEdit] = useState(true)
  const [isPickingSign, setIsPickingSign] = useState(false)
  const [isDownload, setIsDownload] = useState(false)
  const [isWording, setIsWording] = useState(false)
  const [checkSign, setCheckSign] = useState(false)
  const [checkDownload, setCheckDownload] = useState(false)

  // init render
  useEffect(() => {
    if (effectRan.current === false) {
      // initialized the fabricJS in #canvas element, and render page 1
      fabricCanvasRef.current = new fabric.Canvas('canvas')
      renderPdf(pdfByPages[0], fabricCanvasRef.current)
      customFabricDeleteIcon()
    }
    return () => (effectRan.current = true)
  }, [pdfByPages])

  // handlers
  function handleClickSave() {
    // check if signed or not
    if (fabricCanvasRef.current.getObjects().length === 0) {
      setCheckSign(true)
      return
    }
    // get pdf instance
    const pdf = pdfRef.current
    // discard the select controller, stop trasform
    fabricCanvasRef.current.discardActiveObject().renderAll()
    fabricCanvasRef.current.removeListeners()
    // translate to dataURL and store to session storage
    const image = fabricCanvasRef.current.toDataURL('image/png')
    sessionStorage.setItem('dataURL', image)
    // add to pdf instance
    const width = pdf.internal.pageSize.width
    const height = pdf.internal.pageSize.height
    pdf.addImage(image, 'png', 0, 0, width, height)
    setIsEdit(false)
  }

  function handleClickDownload() {
    // get sign history list from local storage
    const historyFile = JSON.parse(localStorage.getItem('signHistory')) || []
    // get current dataURL from session storage
    const data = sessionStorage.getItem('dataURL')
    // store to local storage
    const fileName = pdfByPages.fileName
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const id = Math.floor(Math.random() * 100000)
    const timeStamp = `${year}/${month}/${date}`
    historyFile.push({ dataURL: data, fileName, id, timeStamp: timeStamp })
    localStorage.setItem('signHistory', JSON.stringify(historyFile))
    // get pdf
    const pdf = pdfRef.current
    // try to download
    try {
      pdf.save(`${fileName}_signed.pdf`)
      downloadMessageRef.current = {
        text: '下載成功',
        animationData: okAnimate,
      }
      setIsDownload(true)
    } catch (e) {
      // if error
      console.log(e)
      downloadMessageRef.current = {
        text: '下載失敗，請稍後再試',
        animationData: wrongAnimate,
      }
      setIsDownload(true)
    }
  }

  function handleSignPick(src) {
    // get src and insert to canvas
    signRef.current = src
    fabric.Image.fromURL(src, image => {
      image.top = 100
      image.left = 100
      image.scaleX = 0.5
      image.scaleY = 0.5
      fabricCanvasRef.current.add(image)
    })
    setIsPickingSign(false)
  }

  function handleInsertAgree() {
    fabric.Image.fromURL(icons.agreeIcon, image => {
      image.top = 100
      image.left = 100
      image.scaleX = 0.5
      image.scaleY = 0.5
      fabricCanvasRef.current.add(image)
    })
  }

  function handleToolkitClick(e) {
    const tool = e.target.id
    if (!tool) return
    switch (tool) {
      case 'sign':
        setIsPickingSign(true)
        break
      case 'date':
        handleDateTool()
        break
      case 'word':
        setIsWording(true)
        break
      case 'check':
        handleInsertAgree()
        break
      default:
        throw new Error('get wrong dom element id')
    }
  }

  function handleDateTool() {
    const dateObj = new Date()
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const dateText = `${year}/${month}/${date}`
    const today = new fabric.Text(dateText, {
      fontSize: 16,
      top: 100,
      left: 100,
    })
    fabricCanvasRef.current.add(today)
  }

  function handleTextTool(text) {
    if (text.trim().length === 0) return
    setIsWording(false)
    const newiText = new fabric.IText(text, {
      top: 100,
      left: 100,
      fontSize: 16,
    })
    fabricCanvasRef.current.add(newiText)
  }

  function handleLeaveModal() {
    if (isPickingSign) setIsPickingSign(false)
    if (isWording) setIsWording(false)
    if (checkSign) setCheckSign(false)
    if (checkDownload) setCheckDownload(false)
  }

  function handleToHomePage(e) {
    if (isDownload) return
    e.preventDefault()
    setCheckDownload(true)
  }

  function handleNextPage() {
    if (page === pdfByPages.length - 1) return
    renderPdf(pdfByPages[page + 1], fabricCanvasRef.current)
    setPage(page + 1)
  }

  function handelPrevPage() {
    if (page === 0) return
    renderPdf(pdfByPages[page - 1], fabricCanvasRef.current)
    setPage(page - 1)
  }

  return (
    <section className="section__signInsert">
      <Logo onClick={handleToHomePage} />

      <div className="section__wrapper">
        <FilePaginator
          currentPage={page}
          totalPage={pdfByPages.length}
          onClickNext={handleNextPage}
          onClickPrev={handelPrevPage}
        />

        {isEdit && <Button text={'完成簽署'} onClick={handleClickSave} />}
        {!isEdit && <HomeButton onClick={handleToHomePage} />}

        <div className="file-content__wrapper">
          <canvas className="file" id="canvas"></canvas>
        </div>

        <Scaler percentage={100} />
        {isEdit && <Toolkit onClick={handleToolkitClick} />}
        {!isEdit && <Button text={'儲存'} onClick={handleClickDownload} />}
      </div>

      {/* modals*/}
      <Modal className={'signInsert__modal'} isShow={isPickingSign}>
        <Signatures onPick={handleSignPick} onClose={handleLeaveModal} />
      </Modal>
      <Modal className={'signInsert__modal--isInsert'} isShow={checkSign}>
        <CheckContent onClose={handleLeaveModal} />
      </Modal>
      <Modal className={'signInsert__modal--isDownload'} isShow={checkDownload}>
        <CheckDownload onClose={handleLeaveModal} />
      </Modal>
      <Modal className={'signInsert__modal--isWording'} isShow={isWording}>
        <WordingContent onClose={handleLeaveModal} onUseWord={handleTextTool} />
      </Modal>

      {isDownload && (
        <Process
          text={downloadMessageRef.current.text}
          animationData={downloadMessageRef.current.animationData}
          loop={0}
        >
          <a
            className="button button__homepage"
            href="https://yuwen-ctw.github.io/2022_F2E_W2_dottedsign/"
          >
            回首頁
          </a>
        </Process>
      )}
    </section>
  )
}

export default SignInsert

// components
function FilePaginator({ currentPage, totalPage, onClickPrev, onClickNext }) {
  return (
    <div className="file-paginator">
      <div className="file-paginator__button file-paginato__button--prev">
        <img src={icons.backIcon} alt="back" onClick={onClickPrev} />
      </div>
      <div className="file-paginator__page">
        <span className="page page--now">{currentPage + 1}</span>
        <span className="page page--slash">/</span>
        <span className="page page--total">{totalPage}</span>
      </div>
      <div className="file-paginator__button file-paginato__button--next">
        <img src={icons.nextIcon} alt="next" onClick={onClickNext} />
      </div>
    </div>
  )
}

function Button({ onClick, text }) {
  const styleModifier = text === '儲存' ? 'button--tool' : ''
  return (
    <div
      className={`button button__complete ${styleModifier}`}
      onClick={onClick}
    >
      {text}
    </div>
  )
}

function HomeButton({ onClick }) {
  return (
    <div className="button button__homePage" onClick={onClick}>
      回首頁
    </div>
  )
}

function Toolkit({ onClick }) {
  return (
    <div className="toolkit">
      <div className="toolkit__item">
        <div className="toolkit-img" id="sign" onClick={onClick}></div>
        <span className="toolkit__label toolkit__label--sign">簽名</span>
      </div>
      <div className="toolkit__item">
        <div className="toolkit-img" id="check" onClick={onClick}></div>
        <span className="toolkit__label toolkit__label--check">勾選</span>
      </div>
      <div className="toolkit__item">
        <div className="toolkit-img" id="date" onClick={onClick}></div>
        <span className="toolkit__label toolkit__label--date">日期</span>
      </div>
      <div className="toolkit__item">
        <div className="toolkit-img" id="word" onClick={onClick}></div>
        <span className="toolkit__label toolkit__label--word">插入文字</span>
      </div>
    </div>
  )
}

function Scaler({ percentage }) {
  return (
    <div className="scaler">
      <img src={icons.zoominIcon} alt="zoomin" />
      <span className="scaler__scale">{percentage}%</span>
      <img src={icons.zoomoutIcon} alt="zoomout" />
    </div>
  )
}

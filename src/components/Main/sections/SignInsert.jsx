/* global fabric */
// icons
import Logo from '../../elements/Logo'
import backIcon from '../../../images/Back.png'
import nextIcon from '../../../images/Details.png'
import signIcon from '../../../images/sign.png'
import checkIcon from '../../../images/check.png'
import dateIcon from '../../../images/date.png'
import wordIcon from '../../../images/word.png'
import zoominIcon from '../../../images/zoom-in.png'
import zoomoutIcon from '../../../images/zoom-out.png'
import okAnimate from '../../../images/ok.json'
import wrongAnimate from '../../../images/wrong.json'
// hooks
import { useEffect, useState, useRef } from 'react'
// utilitues
import printPdf from '../../utilities/printPdf.js'
import pdfToImage from '../../utilities/pdfToImage'
// components
import Modal from '../../elements/Modal'
import Signatures from './components/Signatures'
import Process from '../Process'
import CheckContent from './components/CheckContent'
import CheckDownload from './components/CheckDownload'
// modules
import { jsPDF } from 'jspdf'

function SignInsert({ document }) {
  // init render
  const effectRan = useRef(false)
  const fabricCanvasRef = useRef(null)
  const pdfRef = useRef(null)
  // variables between re-render
  const signRef = useRef(null)
  const canvasRef = useRef(null)
  const downloadMessageRef = useRef(null)
  // re-render trigger
  const [isEdit, setIsEdit] = useState(true)
  const [checkSign, setCheckSign] = useState(false)
  const [isPickingSign, setIsPickingSign] = useState(false)
  const [isDownload, setIsDownload] = useState(false)
  const [checkDownload, setCheckDownload] = useState(false)
  // handlers
  function handleClickSave() {
    // check if signed or not
    if (fabricCanvasRef.current.getObjects().length === 0) {
      setCheckSign(true)
      return
    }
    const pdf = pdfRef.current
    fabricCanvasRef.current.discardActiveObject().renderAll()
    const image = fabricCanvasRef.current.toDataURL('image/png')
    fabricCanvasRef.current.removeListeners()
    const width = pdf.internal.pageSize.width
    const height = pdf.internal.pageSize.height
    pdf.addImage(image, 'png', 0, 0, width, height)
    setIsEdit(false)
  }
  function handleClickDownload() {
    // get pdf
    const pdf = pdfRef.current
    // try to download
    try {
      pdf.save('download.pdf')
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

  function handlePickSign(src) {
    // get src and insert to canvas
    signRef.current = src
    fabric.Image.fromURL(src, image => {
      image.top = 100
      image.scaleX = 0.5
      image.scaleY = 0.5
      fabricCanvasRef.current.add(image)
    })
    // delete the previous sign if exist
    const currentSign = fabricCanvasRef.current.getObjects()[0]
    currentSign && fabricCanvasRef.current.remove(currentSign)
    setIsPickingSign(false)
  }

  function handleToolkitClick(e) {
    const tool = e.target.id.match(/(?<=-).+/)[0]
    if (!tool) return
    switch (tool) {
      case 'sign':
        setIsPickingSign(true)
        break
      case 'date':
        handleDateTool()
        break
      case 'word':
        handleTextTool()
        break
      default:
        console.log(456)
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
    })
    fabricCanvasRef.current.add(today)
  }

  function handleTextTool() {
    const newiText = new fabric.IText('雙擊我新增文字', {
      top: 100,
      fontSize: 16,
    })
    fabricCanvasRef.current.add(newiText)
  }

  function handleLeaveModal() {
    if (isPickingSign) setIsPickingSign(false)
    if (checkSign) setCheckSign(false)
    if (checkDownload) setCheckDownload(false)
  }
  function handleToHomePage(e) {
    if (isDownload) return
    e.preventDefault()
    setCheckDownload(true)
  }
  // init render
  useEffect(() => {
    if (effectRan.current === false) {
      fabricCanvasRef.current = new fabric.Canvas('canvas')
      renderPdf(document, fabricCanvasRef.current)
      pdfRef.current = new jsPDF()
    }
    return () => (effectRan.current = true)
  }, [])

  return (
    <section className="section__signInsert">
      <Logo onClick={handleToHomePage} />
      <div className="section__wrapper">
        <FilePaginator />
        <Scaler percentage={100} />
        {isEdit ? (
          <Button text={'完成簽署'} onClick={handleClickSave} />
        ) : (
          <div className="button button__homePage" onClick={handleToHomePage}>
            回首頁
          </div>
        )}
        <div className="file-content__wrapper">
          <canvas className="file" id="canvas" ref={canvasRef}></canvas>
        </div>
        {isEdit ? (
          <Toolkit onClick={handleToolkitClick} />
        ) : (
          <Button text={'儲存'} onClick={handleClickDownload} />
        )}
      </div>
      {/* modals*/}
      <Modal className={'signInsert__modal'} isShow={isPickingSign}>
        <Signatures onPick={handlePickSign} onClose={handleLeaveModal} />
      </Modal>
      <Modal className={'signInsert__modal--isInsert'} isShow={checkSign}>
        <CheckContent onClose={handleLeaveModal} />
      </Modal>
      <Modal className={'signInsert__modal--isDownload'} isShow={checkDownload}>
        <CheckDownload onClose={handleLeaveModal} />
      </Modal>
      {isDownload && (
        <Process
          text={downloadMessageRef.current.text}
          animationData={downloadMessageRef.current.animationData}
          loop={0}
        >
          <a className="button button__homepage" href="/">
            回首頁
          </a>
        </Process>
      )}
    </section>
  )
}

export default SignInsert

// components
function FilePaginator() {
  return (
    <div className="file-paginator">
      <div className="file-paginator__button file-paginato__button--prev">
        <img src={backIcon} alt="back" />
      </div>
      <div className="file-paginator__page">
        <span className="page page--now">1</span>
        <span className="page page--slash">/</span>
        <span className="page page--total">2</span>
      </div>
      <div className="file-paginator__button file-paginato__button--next">
        <img src={nextIcon} alt="back" />
      </div>
    </div>
  )
}

function Button({ onClick, text }) {
  return (
    <div className="button button__complete" onClick={onClick}>
      {text}
    </div>
  )
}

function Toolkit({ onClick }) {
  return (
    <div className="toolkit">
      <div className="toolkit__item">
        <img id="toolkit-sign" src={signIcon} alt="sign" onClick={onClick} />
        <span className="toolkit__label toolkit__label--sign">簽名</span>
      </div>
      <div className="toolkit__item">
        <img className="" src={checkIcon} alt="check" />
        <span className="toolkit__label toolkit__label--check">勾選</span>
      </div>
      <div className="toolkit__item">
        <img id="toolkit-date" src={dateIcon} alt="date" onClick={onClick} />
        <span className="toolkit__label toolkit__label--date">日期</span>
      </div>
      <div className="toolkit__item">
        <img id="toolkit-word" src={wordIcon} alt="word" onClick={onClick} />
        <span className="toolkit__label toolkit__label--word">插入文字</span>
      </div>
    </div>
  )
}

function Scaler({ percentage }) {
  return (
    <div className="scaler">
      <img src={zoominIcon} alt="zoomin" />
      <span className="scaler__scale">{percentage}%</span>
      <img src={zoomoutIcon} alt="zoomout" />
    </div>
  )
}

// render pdf via canvas
async function renderPdf(document, canvas) {
  // 此處 canvas 套用 fabric.js
  canvas.requestRenderAll()
  const pdf = await printPdf(document)
  const pdfImage = await pdfToImage(pdf)
  // 透過比例設定 canvas 尺寸
  canvas.setWidth(pdfImage.width / window.devicePixelRatio)
  canvas.setHeight(pdfImage.height / window.devicePixelRatio)
  // 將 PDF 畫面設定為背景
  canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
}

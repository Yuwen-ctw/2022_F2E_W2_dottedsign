/* global fabric */
// icons
import icons from '../../../images'
import okAnimate from '../../../images/ok.json'
import wrongAnimate from '../../../images/wrong.json'
// hooks
import { useEffect, useState, useRef } from 'react'
// utilitues
import printPdf from '../../utilities/printPdf.js'
import pdfToImage from '../../utilities/pdfToImage'
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

function SignInsert({ documentPdf }) {
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
  const [isPickingSign, setIsPickingSign] = useState(false)
  const [isDownload, setIsDownload] = useState(false)
  const [isWording, setIsWording] = useState(false)
  const [checkSign, setCheckSign] = useState(false)
  const [checkDownload, setCheckDownload] = useState(false)
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
    const image = fabricCanvasRef.current.toDataURL('image/png')
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
        setIsWording(true)
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
    })
    fabricCanvasRef.current.add(today)
  }

  function handleTextTool(text) {
    setIsWording(false)
    if (text.trim().length === 0) return
    const newiText = new fabric.IText(text, {
      top: 100,
      fontSize: 16,
    })
    fabricCanvasRef.current.add(newiText)
  }

  function handleLeaveModal() {
    if (isPickingSign) setIsPickingSign(false)
    if (checkSign) setCheckSign(false)
    if (checkDownload) setCheckDownload(false)
    if (isWording) setIsWording(false)
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
      renderPdf(documentPdf, fabricCanvasRef.current)
      pdfRef.current = new jsPDF()
      customFabricDeleteIcon()
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
      <Modal className={'signInsert__modal--isWording'} isShow={isWording}>
        <WordingContent onClose={handleLeaveModal} onUseWord={handleTextTool} />
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
        <img src={icons.backIcon} alt="back" />
      </div>
      <div className="file-paginator__page">
        <span className="page page--now">1</span>
        <span className="page page--slash">/</span>
        <span className="page page--total">2</span>
      </div>
      <div className="file-paginator__button file-paginato__button--next">
        <img src={icons.nextIcon} alt="back" />
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
        <div className="toolkit-img" id="toolkit-sign" onClick={onClick}></div>
        <span className="toolkit__label toolkit__label--sign">簽名</span>
      </div>
      <div className="toolkit__item">
        <div className="toolkit-img" id="toolkit-check"></div>
        <span className="toolkit__label toolkit__label--check">勾選</span>
      </div>
      <div className="toolkit__item">
        <div className="toolkit-img" id="toolkit-date" onClick={onClick}></div>
        <span className="toolkit__label toolkit__label--date">日期</span>
      </div>
      <div className="toolkit__item">
        <div className="toolkit-img" id="toolkit-word" onClick={onClick}></div>
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

// render pdf via canvas
async function renderPdf(documentPdf, canvas) {
  // 此處 canvas 套用 fabric.js
  canvas.requestRenderAll()
  const pdf = await printPdf(documentPdf)
  const pdfImage = await pdfToImage(pdf)
  // 透過比例設定 canvas 尺寸
  canvas.setWidth(pdfImage.width / window.devicePixelRatio)
  canvas.setHeight(pdfImage.height / window.devicePixelRatio)
  // 將 PDF 畫面設定為背景
  canvas.setBackgroundImage(pdfImage, canvas.renderAll.bind(canvas))
}

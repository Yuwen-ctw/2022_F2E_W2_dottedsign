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
// hooks
import { useEffect, useState, useRef } from 'react'
// utilitues
import printPdf from '../../utilities/printPdf.js'
import pdfToImage from '../../utilities/pdfToImage'
// components
import Modal from '../../elements/Modal'
import Signatures from './components/Signatures'

function SignInsert({ onClick, document }) {
  const effectRan = useRef(false)
  const fabricCanvasRef = useRef(null)
  const signRef = useRef(null)
  const [isEdit, setIsEdit] = useState(true)
  const [isPickingSign, setIsPickingSign] = useState(false)
  function handleClickInsert() {
    setIsEdit(false)
  }
  function handleClickDownload() {
    setIsEdit(false)
    onClick()
  }

  useEffect(() => {
    if (effectRan.current === false) {
      fabricCanvasRef.current = new fabric.Canvas('canvas')
      renderPdf(document, fabricCanvasRef.current)
    }
    return () => (effectRan.current = true)
  }, [])

  function handlePickSign(src) {
    // get src and insert to canvas
    signRef.current = src
    fabric.Image.fromURL(src, image => {
      image.top = 400
      image.scaleX = 0.5
      image.scaleY = 0.5
      fabricCanvasRef.current.add(image)
    })
    // delete the previous sign if exist
    const currentSign = fabricCanvasRef.current.getObjects()[0]
    currentSign && fabricCanvasRef.current.remove(currentSign)
    setIsPickingSign(false)
  }

  function onToolkitClick() {
    setIsPickingSign(true)
  }
  function onLeaveModal() {
    setIsPickingSign(false)
  }
  return (
    <section className="section__signInsert">
      <Logo />
      <div className="section__wrapper">
        <FilePaginator />
        <Scaler percentage={100} />
        {isEdit ? (
          <Button text={'完成簽署'} onClick={handleClickInsert} />
        ) : (
          <Button text={'儲存'} onClick={handleClickDownload} />
        )}
        <div className="file-content__wrapper">
          <canvas className="file" id="canvas"></canvas>
        </div>
        {isEdit && <Toolkit onClick={onToolkitClick} />}
      </div>
      {/* modal*/}
      <Modal className={'signInsert__modal'} isShow={isPickingSign}>
        <Signatures onPick={handlePickSign} onClose={onLeaveModal} />
      </Modal>
    </section>
  )
}

export default SignInsert

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
        <img className="" src={signIcon} alt="sign" onClick={onClick} />
        <span className="toolkit__label toolkit__label--sign">簽名</span>
      </div>
      <div className="toolkit__item">
        <img className="" src={checkIcon} alt="check" />
        <span className="toolkit__label toolkit__label--check">勾選</span>
      </div>
      <div className="toolkit__item">
        <img className="" src={dateIcon} alt="date" />
        <span className="toolkit__label toolkit__label--date">日期</span>
      </div>
      <div className="toolkit__item">
        <img className="" src={wordIcon} alt="word" />
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

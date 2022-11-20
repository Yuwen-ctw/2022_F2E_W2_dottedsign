// hooks
import { Fragment, useState, useRef, useEffect } from 'react'
// components and utilities
import Logo from '../../elements/Logo'
import Process from '../Process'
import handleDraw from '../../utilities/handleDraw'
// animate
import loadingAnimate from '../../../images/GNsign_loading.json'

function SignBuild() {
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const [signPicker, setSignPicker] = useState({
    text: '在此書寫你的簽名',
    isPen: true,
  })
  const [isBuild, setIsBuild] = useState(false)

  // handlers
  function handleSignPickerClick(e) {
    setSignPicker({ text: e.target.dataset.text, isPen: !signPicker.isPen })
  }

  function handleCleanClick() {
    canvasRef.current.getContext('2d').clearRect(0, 0, 589, 300)
  }

  function handleBuildClick() {
    // 尚缺檢查input file功能
    // get signs from local storage
    const signatures = JSON.parse(localStorage.getItem('signatures')) || []
    // get new sign, and add to signs
    const newSign = signPicker.isPen
      ? canvasRef.current.toDataURL('images/png')
      : imageRef.current.src
    // store signs
    const id = Math.floor(Math.random() * 100000)
    signatures.push({ id, sign: newSign })
    localStorage.setItem('signatures', JSON.stringify(signatures))
    // close modal
    setIsBuild(true)
  }

  function handleInputChange(e) {
    // 尚缺格式驗證
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function () {
      imageRef.current.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  function handleChangeColor(e) {
    const textColor = e.target.dataset.value
    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = textColor
  }

  useEffect(() => {
    // disable handleDraw when user importing sign
    if (!canvasRef.current) return
    handleDraw()
  }, [signPicker])

  return (
    <section className="section__signBuild">
      <Logo />
      <div className="signBuild__wrapper">
        <SignPicker onChange={handleSignPickerClick} />
        <ColorPicker onChange={handleChangeColor}>
          {signPicker.isPen && (
            <Fragment>
              <ColorRadioInput color={'black'} defaultChecked />
              <ColorRadioInput color={'blue'} />
              <ColorRadioInput color={'red'} />
            </Fragment>
          )}
        </ColorPicker>
        <div className="signBuild__drawBlock">
          {signPicker.isPen ? (
            <canvas
              ref={canvasRef}
              className="drawBlock__area"
              id="draw-sign"
              width="343px"
              height="200px"
            ></canvas>
          ) : (
            <>
              <input
                className="drawBlock__sign-input"
                type="file"
                accept=".jpg,.jpeg,.png"
                id="input-sign"
                onChange={handleInputChange}
              />
              <label htmlFor="input-sign" className="drawBlock__label">
                <img src="" alt="請選擇檔案" ref={imageRef} />
              </label>
            </>
          )}
          {/* <p className="drawBlock__placeholder">{signPicker.text}</p> */}
        </div>
        <div className="signBuild__control">
          <div className="button button__clean" onClick={handleCleanClick}>
            清除
          </div>
          <div className="button button__accept" onClick={handleBuildClick}>
            建立簽名
          </div>
        </div>
      </div>
      {/* modal */}
      {isBuild && (
        <Process
          text={'簽名優化中...'}
          animationData={loadingAnimate}
          duration={2000}
        ></Process>
      )}
    </section>
  )
}
export default SignBuild

function SignPicker({ onChange }) {
  return (
    <div className="signBuild__signPicker" onChange={onChange}>
      <input
        type="radio"
        name="signPicker"
        id="input-handMade"
        value="0"
        data-text="在此書寫你的簽名"
        defaultChecked
      />
      <label
        className="signPicker__item signPicker__item--handMade"
        htmlFor="input-handMade"
      >
        手寫簽名
      </label>
      <input
        type="radio"
        name="signPicker"
        id="input-import"
        value="1"
        data-text="請選擇檔案"
      />
      <label
        className="signPicker__item signPicker__item--import"
        htmlFor="input-import"
      >
        匯入簽名檔
      </label>
    </div>
  )
}

function ColorPicker({ children, onChange }) {
  return (
    <div className="signBuild__colorPicker" onChange={onChange}>
      {children}
    </div>
  )
}

function ColorRadioInput({ color, defaultChecked }) {
  let rgb
  switch (color) {
    case 'blue':
      rgb = '#0014C7'
      break
    case 'red':
      rgb = '#CA0000'
      break
    default:
      rgb = '#000000'
  }
  return (
    <>
      <input
        type="radio"
        name="color"
        id={`color-${color}`}
        value={color}
        data-value={rgb}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={`color-${color}`}
        className={`colorPicker__item colorPicker__item--${color}`}
      ></label>
    </>
  )
}

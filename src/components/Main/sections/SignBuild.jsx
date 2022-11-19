// hooks
import { Fragment, useState, useRef } from 'react'
// components and utilities
import handleDraw from '../../utilities/handleDraw'
import Process from '../Process'
// icons
import loadingAnimate from '../../../images/GNsign_loading.json'
import Logo from '../../elements/Logo'

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
    canvasRef.current.getContext('2d').clearRect(0, 0, 343, 200)
  }

  // store signatures at local storage
  function handleBuildClick() {
    // get signs from local storage
    const signatures = JSON.parse(localStorage.getItem('signatures')) || []
    // get new sign, add to signs then store it
    const newSign = signPicker.isPen
      ? canvasRef.current.toDataURL('images/png')
      : imageRef.current.src

    const size = Math.floor(Math.random() * 100000)
    signatures.push({ id: size, sign: newSign })
    localStorage.setItem('signatures', JSON.stringify(signatures))
    setIsBuild(true)
  }

  function handleInputChange(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = function () {
      imageRef.current.src = reader.result
    }
    reader.readAsDataURL(file)
  }
  return (
    <section className="section__signBuild">
      <Logo />
      <div className="signBuild__wrapper">
        <div className="signBuild__signPicker" onChange={handleSignPickerClick}>
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
        <div className="signBuild__colorPicker">
          {signPicker.isPen && (
            <Fragment>
              <ColorRadioInput color={'black'} defaultChecked />
              <ColorRadioInput color={'blue'} />
              <ColorRadioInput color={'red'} />
            </Fragment>
          )}
        </div>
        <div className="signBuild__drawBlock">
          {signPicker.isPen ? (
            <canvas
              ref={canvasRef}
              className="drawBlock__area"
              id="draw-sign"
              onClick={handleDraw}
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

function ColorRadioInput({ color, defaultChecked }) {
  return (
    <>
      <input
        type="radio"
        name="color"
        id={`color-${color}`}
        value={color}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={`color-${color}`}
        className={`colorPicker__item colorPicker__item--${color}`}
      ></label>
    </>
  )
}

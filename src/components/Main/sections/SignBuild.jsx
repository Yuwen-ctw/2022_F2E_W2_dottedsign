import { Fragment, useState, useRef } from 'react'
import Logo from '../../elements/Logo'
import handleDraw from '../../utilities/handleDraw'
function SignBuild({ onClick }) {
  const canvasRef = useRef(null)
  // const imgRef = useRef(null)
  const [signPicker, setSignPicker] = useState({
    text: '在此書寫你的簽名',
    isPen: true,
  })
  function handleSignPickerClick(e) {
    setSignPicker({ text: e.target.dataset.text, isPen: !signPicker.isPen })
  }

  function handleCleanClick() {
    canvasRef.current.getContext('2d').clearRect(0, 0, 343, 200)
  }
  // store signatures at local storage
  function handleBuildClick() {
    const newSign = canvasRef.current.toDataURL('images/png')
    const signatures = JSON.parse(localStorage.getItem('signatures')) || []
    // imgRef.current.src = newSign
    const size = Math.floor(Math.random() * 100000)
    signatures.push({ id: size, sign: newSign })
    localStorage.setItem('signatures', JSON.stringify(signatures))
    onClick()
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
          <canvas
            ref={canvasRef}
            className="drawBlock__area"
            id="draw-sign"
            onClick={handleDraw}
            width="343px"
            height="200px"
          ></canvas>
          {/* <img ref={imgRef} className="drawBlock__show"></img> */}
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

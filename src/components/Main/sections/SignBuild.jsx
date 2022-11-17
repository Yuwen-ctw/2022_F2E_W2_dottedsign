import { Fragment, useState } from 'react'
import Logo from '../../elements/Logo'
function SignBuild({ onClick }) {
  const [signPicker, setSignPicker] = useState({
    text: '在此書寫你的簽名',
    isPen: true,
  })
  function handleSignPickerClick(e) {
    setSignPicker({ text: e.target.dataset.text, isPen: !signPicker.isPen })
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
          <canvas className="drawBlock__area"></canvas>
          <p className="drawBlock__placeholder">{signPicker.text}</p>
        </div>
        <div className="signBuild__control">
          <div className="button button__clean">清除</div>
          <div className="button button__accept" onClick={onClick}>
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

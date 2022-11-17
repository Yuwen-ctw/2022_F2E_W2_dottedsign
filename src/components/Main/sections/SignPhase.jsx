import { useState } from 'react'
import Logo from '../../elements/Logo'
function SignPhase() {
  const [signPicker, setSignPicker] = useState('在此書寫你的簽名')

  function handleSignPickerClick(e) {
    setSignPicker(e.target.dataset.text)
  }
  return (
    <section className="section__signPhase">
      <Logo />
      <div className="signPhase__wrapper">
        <div className="signPhase__signPicker" onChange={handleSignPickerClick}>
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
        <div className="signPhase__colorPicker">
          <ColorRadioInput color={'black'} defaultChecked />
          <ColorRadioInput color={'blue'} />
          <ColorRadioInput color={'red'} />
        </div>
        <div className="signPhase__drawBlock">
          <canvas className="drawBlock__area"></canvas>
          <p className="drawBlock__placeholder">{signPicker}</p>
        </div>
        <div className="signPhase__control">
          <div className="button button__clean">清除</div>
          <div className="button button__accept">建立簽名</div>
        </div>
      </div>
    </section>
  )
}
export default SignPhase

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

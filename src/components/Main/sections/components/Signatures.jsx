import dleIcon from '../../../../images/Dle.png'
import { useState } from 'react'
function Signatures({ onPick, onClose }) {
  const [signs, setSigns] = useState(
    JSON.parse(localStorage.getItem('signatures')) || []
  )
  function handleDelete(id) {
    const nextSigns = signs.filter(sign => sign.id !== id)
    localStorage.setItem('signatures', JSON.stringify(nextSigns))
    setSigns(nextSigns)
  }

  const signItems = signs.map(sign => (
    <SignItem
      key={sign.id}
      sign={sign}
      onDelete={handleDelete}
      onPick={onPick}
    />
  ))

  return (
    <>
      <span className="modal__close" onClick={onClose}>
        X
      </span>
      <p className="modal__title">請選擇簽名</p>
      <div className="modal__item-wrapper">{signItems}</div>
      <p className="modal__button">+ 新增簽名</p>
    </>
  )
}

export default Signatures

function SignItem({ sign, onDelete, onPick }) {
  return (
    <div className="modal__item">
      <img
        className="item__sign"
        src={sign.sign}
        alt="sign"
        onClick={e => onPick(e.target.src)}
      />
      <img
        className="item__remove"
        src={dleIcon}
        alt="delete"
        onClick={() => onDelete(sign.id)}
      />
    </div>
  )
}

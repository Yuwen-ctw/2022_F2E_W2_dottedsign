import { useRef } from 'react'
function WordingContent({ onClose, onUseWord }) {
  const textareaRef = useRef(null)
  return (
    <>
      <textarea
        ref={textareaRef}
        className="modal__textarea"
        rows="7"
        cols="36"
        placeholder="輸入文字"
      ></textarea>
      <div className="modal__buttons">
        <div className="button button__cancle" role="button" onClick={onClose}>
          {'取消'}
        </div>
        <div
          className="button button__accept"
          role="button"
          onClick={() => {
            onUseWord(textareaRef.current.value)
            textareaRef.current.value = ''
          }}
        >
          {'使用'}
        </div>
      </div>
    </>
  )
}

export default WordingContent

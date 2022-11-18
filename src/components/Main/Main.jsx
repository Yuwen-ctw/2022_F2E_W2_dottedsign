import { useContext, useState } from 'react'
import { StepContext } from '../contexts/StepContext'
import LoadFile from './sections/LoadFile'
import SignBuild from './sections/SignBuild'
import Process from './Process'
import SignInsert from './sections/SignInsert'
import loadingAnimate from '../../images/GNsign_loading.json'
import okAnimate from '../../images/ok.json'
// import wrongAnimate from '../../images/wrong.json'

function Main() {
  const { step, setStep } = useContext(StepContext)
  const [document, setDocument] = useState('')
  function onUpLoad(blob) {
    setDocument(blob)
  }
  function handleNextStep() {
    setStep(step + 1)
  }
  return (
    <main>
      {step === 0 && <p className="section__version">免費試用版</p>}
      {step === 0 && <Aside />}
      {step === 0 && <LoadFile onUpLoad={onUpLoad} />}
      {step === 1 && (
        <Process text={'上傳中...'} animationData={loadingAnimate} />
      )}
      {step === 2 && <SignBuild onClick={handleNextStep} />}
      {step === 3 && (
        <Process text={'簽名優化中...'} animationData={loadingAnimate} />
      )}
      {step === 4 && (
        <SignInsert onClick={handleNextStep} document={document} />
      )}
      {step === 5 && (
        <Process text={'下載成功'} animationData={okAnimate}>
          <a className="button button__homepage" href="/">
            回首頁
          </a>
        </Process>
      )}
    </main>
  )
}

export default Main

function Aside() {
  return (
    <aside>
      <h1 className="aside__title">小綠簽</h1>
      <p className="aside__detail">
        護樹、永續、減碳的綠色生活
        <br />
        響應環保無紙化電子簽署，
        <br />
        省時便利又環保
      </p>
    </aside>
  )
}

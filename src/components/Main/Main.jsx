import { useContext, useState } from 'react'
import { StepContext } from '../contexts/StepContext'
import LoadFile from './sections/LoadFile'
import SignBuild from './sections/SignBuild'
import SignInsert from './sections/SignInsert'
import Process from './Process'
import loadingAnimate from '../../images/GNsign_loading.json'

function Main() {
  const { step, setStep } = useContext(StepContext)
  const [documentPdf, setDocumentPdf] = useState('')
  function onUpLoad(blob) {
    setDocumentPdf(blob)
  }
  function switchPhase() {
    setStep(1)
  }
  return (
    <main>
      {/* home page */}
      {step === 0 && <p className="section__version">免費試用版</p>}
      {step === 0 && <Aside />}
      {step === 0 && <LoadFile onUpLoad={onUpLoad} switchPhase={switchPhase} />}
      {step === 1 && (
        <Process
          text={'簽名優化中...'}
          animationData={loadingAnimate}
          duration={2000}
        ></Process>
      )}

      {/* sign building page */}
      {step === 2 && <SignBuild />}
      {/* sign inserting page */}
      {step === 3 && <SignInsert documentPdf={documentPdf} />}
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

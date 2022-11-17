import { useContext } from 'react'
import { StepContext } from '../contexts/StepContext'
import LoadFile from './sections/LoadFile'
import SignBuild from './sections/SignBuild'
import Process from './Process'
import SignInsert from './sections/SignInsert'
function Main() {
  const { step, setStep } = useContext(StepContext)
  function handleBuildSignClick() {
    setStep(step + 1)
  }
  return (
    <main>
      {step === 0 && <p className="section__version">免費試用版</p>}
      {step === 0 && <Aside />}
      {step === 0 && <LoadFile />}
      {step === 1 && <Process text={'上傳中...'} />}
      {step === 2 && <SignBuild onClick={handleBuildSignClick} />}
      {step === 3 && <Process text={'簽名優化中...'} />}
      {step === 4 && <SignInsert />}
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

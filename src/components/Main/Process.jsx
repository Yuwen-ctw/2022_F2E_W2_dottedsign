import Lottie from 'lottie-react'
import loadingAnimate from '../../images/GNsign_loading.json'
import { useContext } from 'react'
import { StepContext } from '../contexts/StepContext'

function Process({ text }) {
  const { setStep } = useContext(StepContext)
  setTimeout(() => setStep(2), 1000)

  return (
    <div className="process">
      <div className="process__animate">
        <Lottie animationData={loadingAnimate} loop={true} />
      </div>
      <p className="process__text">{text}</p>
    </div>
  )
}

export default Process

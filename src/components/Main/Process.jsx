import Lottie from 'lottie-react'
import { useContext } from 'react'
import { StepContext } from '../contexts/StepContext'

function Process({ text, children, animationData }) {
  const { step, setStep } = useContext(StepContext)
  setTimeout(() => setStep(step + 1), 2000)

  return (
    <div className="process">
      <div className="process__animate">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <p className="process__text">{text}</p>
      {children}
    </div>
  )
}

export default Process

import Lottie from 'lottie-react'
import { useContext } from 'react'
import { StepContext } from '../contexts/StepContext'

function Process({
  text,
  children,
  animationData,
  duration = '',
  loop = true,
}) {
  const { step, setStep } = useContext(StepContext)
  if (duration) setTimeout(() => setStep(step + 1), duration)

  return (
    <div className="process">
      <div className="process__animate">
        <Lottie animationData={animationData} loop={loop} />
      </div>
      <p className="process__text">{text}</p>
      {children}
    </div>
  )
}

export default Process

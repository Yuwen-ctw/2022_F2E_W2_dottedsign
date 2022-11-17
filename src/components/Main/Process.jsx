import Lottie from 'lottie-react'
import loadingAnimate from '../../images/GNsign_loading.json'
function Process({ text }) {
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

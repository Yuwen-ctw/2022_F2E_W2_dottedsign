import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import homePageImage from './images/homepage'
import { useContext, useState } from 'react'
import { StepContext } from './components/contexts/StepContext'

function App() {
  const stepContext = useContext(StepContext)
  const [step, setStep] = useState(stepContext)

  // 待優化
  function handleHomePage() {
    setStep(0)
  }

  function handleFirstProcessing() {
    setStep(1)
  }

  function handleBuildPage() {
    setStep(2)
  }

  function handleInsertPage() {
    setStep(3)
  }

  function handleHistoryPage() {
    setStep(4)
  }

  return (
    <div className="app__container">
      <StepContext.Provider
        value={{
          step,
          setStep,
          handleHomePage,
          handleFirstProcessing,
          handleBuildPage,
          handleInsertPage,
          handleHistoryPage,
        }}
      >
        {step <= 1 && <Header />}
        <Main />
        {step === 0 && <Footer />}
        {step <= 1 && <BgImageWrapper />}
      </StepContext.Provider>
    </div>
  )
}

export default App

function BgImageWrapper() {
  return (
    <div className="bg-image-wrapper">
      <img
        className="bg-image bg-image--topWater"
        src={homePageImage.topWater}
        alt="background-image"
      ></img>
      <img
        className="bg-image bg-image--topLeaf"
        src={homePageImage.topLeaf}
        alt="background-image"
      ></img>
      <img
        className="bg-image bg-image--bottomLeaf"
        src={homePageImage.bottomLeaf}
        alt="background-image"
      ></img>
    </div>
  )
}

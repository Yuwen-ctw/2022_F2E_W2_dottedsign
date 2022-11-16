import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import homePageImage from './images/homepage'

function App() {
  return (
    <div className="app__container">
      <Header />
      <Main />
      <Footer />
      <BgImageWrapper />
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

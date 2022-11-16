import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import logo from './images/Logo.png'

function App() {
  return (
    <>
      <Logo />
      <Header />
      <Main />
      <Footer />
    </>
  )
}

export default App

function Logo() {
  return (
    <div className="logo">
      <a className="logo__link" href="/">
        <img className="logo__img" src={logo} alt="Favicon" />
      </a>
    </div>
  )
}

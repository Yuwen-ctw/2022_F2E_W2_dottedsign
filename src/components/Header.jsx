import logo from '../images/Logo.png'

function Header() {
  return (
    <header>
      <Logo />
      <HistoryLink />
    </header>
  )
}

export default Header

function HistoryLink() {
  return (
    <div className="button button__history" role="button">
      歷史紀錄
    </div>
  )
}

function Logo() {
  return (
    <div className="logo">
      <a className="logo__link" href="/">
        <img className="logo__img" src={logo} alt="Favicon" />
      </a>
    </div>
  )
}

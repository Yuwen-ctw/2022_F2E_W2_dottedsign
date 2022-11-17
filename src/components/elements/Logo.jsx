import logo from '../../images/Logo.png'

function Logo() {
  return (
    <div className="logo">
      <a className="logo__link" href="/">
        <img className="logo__img" src={logo} alt="Favicon" />
      </a>
    </div>
  )
}

export default Logo

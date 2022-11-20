import logo from '../../images/Logo.png'

function Logo() {
  return (
    <div className="logo">
      <a
        className="logo__link"
        href="https://yuwen-ctw.github.io/2022_F2E_W2_dottedsign/"
      >
        <img className="logo__img" src={logo} alt="Favicon" />
      </a>
    </div>
  )
}

export default Logo

import Logo from './elements/Logo'

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

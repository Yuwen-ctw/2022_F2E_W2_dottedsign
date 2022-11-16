function Header() {
  return (
    <header>
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

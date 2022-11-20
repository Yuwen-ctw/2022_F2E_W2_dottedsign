import Logo from './elements/Logo'
import { useContext } from 'react'
import { StepContext } from './contexts/StepContext'

function Header() {
  const { handleHistoryPage } = useContext(StepContext)
  return (
    <header>
      <Logo />
      <HistoryLink onClick={handleHistoryPage} />
    </header>
  )
}

export default Header

function HistoryLink({ onClick }) {
  return (
    <div className="button button__history" role="button" onClick={onClick}>
      歷史紀錄
    </div>
  )
}

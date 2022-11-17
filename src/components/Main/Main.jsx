import LoadFile from './sections/LoadFile'
import Process from './Process'
function Main() {
  return (
    <main>
      <p className="section__version">免費試用版</p>
      <Aside />
      <LoadFile />
      <Process text={'上傳中...'} />
    </main>
  )
}

export default Main

function Aside() {
  return (
    <aside>
      <h1 className="aside__title">小綠簽</h1>
      <p className="aside__detail">
        護樹、永續、減碳的綠色生活
        <br />
        響應環保無紙化電子簽署，
        <br />
        省時便利又環保
      </p>
    </aside>
  )
}

import Modal from '../elements/Modal'
function Main() {
  return (
    <>
      <Aside />
      <Section />
    </>
  )
}

export default Main

function Section() {
  return (
    <section className="section__load-file">
      <div className="load-file__image">
        <img className="load-file__image-Link" src="" alt=""></img>
      </div>
      <div className="load-file__input-container">
        <label className="load-file__input-label" htmlFor="input-file">
          <input className="load-file__input" type="file" name="input-file" />
        </label>
      </div>
      <Modal
        className={'load-file__modal'}
        text={'檔案超過10 MB，請重新選擇'}
      />
    </section>
  )
}

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

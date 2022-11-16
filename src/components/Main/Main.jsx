import Modal from '../elements/Modal'
import fileImage from '../../images/File.png'
function Main() {
  return (
    <main>
      <p className="section__version">免費試用版</p>
      <Aside />
      <Section />
    </main>
  )
}

export default Main

function Section() {
  return (
    <section className="section__load-file">
      <div className="load-file__image">
        <label className="load-file__image-label" htmlFor="input-file">
          <img
            className="load-file__image-link"
            src={fileImage}
            alt="file"
          ></img>
        </label>
      </div>
      <div className="load-file__input-container">
        <label className="load-file__input-label" htmlFor="input-file">
          選擇檔案
          <input
            title="  "
            accept="image/*,.pdf,.PDF"
            className="load-file__input"
            type="file"
            name="input-file"
            id="input-file"
          />
        </label>
        <p className="load-file__description load-file__description--method">
          (或拖移檔案到此處)
        </p>
        <p className="load-file__description load-file__description--limit">
          (限10MB 內的PDF或JPG檔)
        </p>
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

import icons from '../../../images'
function SignHistory() {
  return (
    <section className="section__signHistory">
      <div className="signHistory__header">
        <a href="/" className="header__homePage">
          <img src={icons.homeIcon} alt="home" />
        </a>
        <div className="header__search">
          <input
            className="search__input"
            type="text"
            id="search__input"
            placeholder="輸入關鍵字..."
          />
          <label className="search__label" htmlFor="search__input">
            <img src={icons.searchIcon} alt="search" />
          </label>
        </div>
      </div>
      <div className="signHistory__body">
        <ul className="signHistory__list">
          <p className="list__title">2022</p>
          <li className="list__item">
            <span className="item__date">11/20</span>
            <span className="item__name">蝦皮通路合案</span>
            <img className="item__icon" src={icons.detailIcon} />
          </li>
          <li className="list__item">
            <span className="item__date">11/20</span>
            <span className="item__name">蝦皮通路合案</span>
            <img className="item__icon" src={icons.detailIcon} />
          </li>
          <li className="list__item">
            <span className="item__date">11/20</span>
            <span className="item__name">蝦皮通路合案</span>
            <img className="item__icon" src={icons.detailIcon} />
          </li>
        </ul>
        <ul className="signHistory__list">
          <p className="list__title">2021</p>
          <li className="list__item">
            <span className="item__date">11/20</span>
            <span className="item__name">蝦皮通路合案</span>
            <img className="item__icon" src={icons.detailIcon} />
          </li>
        </ul>
      </div>
    </section>
  )
}
export default SignHistory

import icons from '../../../images'

function SignHistory() {
  const fileList = JSON.parse(localStorage.getItem('signHistory')) || []
  fileList.sort((cur, next) => {
    return next.year - cur.year
  })

  const lists = fileList.map(item => {
    return <ListItem key={item.dataURL} item={item} icon={icons.detailIcon} />
  })

  return (
    <section className="section__signHistory">
      <HistoryHeader icons={icons} />
      <div className="signHistory__body">
        <HistoryList year={''}>{lists}</HistoryList>
      </div>
    </section>
  )
}
export default SignHistory

function HistoryList({ children, year }) {
  return (
    <ul className="signHistory__list">
      <p className="list__title">{year}</p>
      {children}
    </ul>
  )
}

function ListItem({ item, icon }) {
  return (
    <li className="list__item">
      <span className="item__date">
        {item.year}
        {item.month}/{item.date}
      </span>
      <span className="item__name">{item.fileName}</span>
      <img className="item__icon" src={icon} />
    </li>
  )
}

function HistoryHeader({ icons }) {
  return (
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
  )
}

import icons from '../../../images'

function SignHistory() {
  const fileList = JSON.parse(localStorage.getItem('signHistory')) || []
  // 依日期排序
  fileList.sort((cur, next) => {
    const curArr = cur.timeStamp.split('/')
    const nextArr = next.timeStamp.split('/')
    const curDate = new Date(curArr[0], curArr[1], curArr[2])
    const nextDate = new Date(nextArr[0], nextArr[1], nextArr[2])
    return nextDate - curDate
  })
  // row: 年份  subRow: 同年份的資料
  const row = []
  const subRow = []
  // 判斷更換年份的標記
  let stamp = 0
  // 先取得第一筆年份
  let lastLoopYear = fileList[0].timeStamp.split('/')[0]

  fileList.forEach((file, index) => {
    const year = file.timeStamp.split('/')[0]
    // 例外情形：最後一筆資料 - 先判斷年份是否變更，若 true 則push row
    if (index === fileList.length - 1) {
      if (year !== lastLoopYear) {
        row.push(
          <HistoryList key={lastLoopYear} year={lastLoopYear}>
            {subRow.slice(stamp)}
          </HistoryList>
        )
        stamp = subRow.length
      }
      // 若否則 push 最後一個 subRow 後，立即 push Row
      subRow.push(
        <ListItem key={file.timeStamp} item={file} icon={icons.detailIcon} />
      )
      row.push(
        <HistoryList key={year} year={year}>
          {subRow.slice(stamp)}
        </HistoryList>
      )
    } else {
      // 常態情形： 若資料年份與上一輪年份不同，則先push row
      if (year !== lastLoopYear) {
        row.push(
          <HistoryList key={lastLoopYear} year={lastLoopYear}>
            {subRow.slice(stamp)}
          </HistoryList>
        )
        // 再進行變更標記，並push subRow
        stamp = subRow.length
        subRow.push(
          <ListItem key={file.timeStamp} item={file} icon={icons.detailIcon} />
        )
      } else {
        // 若資料年份一樣，則繼續 push subRow
        subRow.push(
          <ListItem key={file.timeStamp} item={file} icon={icons.detailIcon} />
        )
      }
    }
    lastLoopYear = year
  })

  return (
    <section className="section__signHistory">
      <HistoryHeader icons={icons} />
      <div className="signHistory__body">{row}</div>
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
  const dateArr = item.timeStamp.split('/')
  const date = dateArr[1].concat('/', dateArr[2])
  return (
    <li className="list__item">
      <span className="item__date">{date}</span>
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

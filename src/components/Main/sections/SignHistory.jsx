import icons from '../../../images'
import Logo from '../../elements/Logo'
import { useRef, useState } from 'react'
import runSeeder from '../../../models/seeder'
function SignHistory() {
  const fileList = JSON.parse(localStorage.getItem('signHistory')) || []
  const [data, setData] = useState(sortByTime(fileList))
  const inputRef = useRef(null)

  function runSeed() {
    runSeeder()
    const seed = JSON.parse(localStorage.getItem('signHistory'))
    setData(sortByTime(seed))
  }
  function delSeed() {
    localStorage.removeItem('signHistory')
    localStorage.removeItem('signatures')
    setData([])
  }
  function sortByTime(data) {
    // 依日期排序
    data.sort((cur, next) => {
      const curArr = cur.timeStamp.split('/')
      const nextArr = next.timeStamp.split('/')
      const curDate = new Date(curArr[0], curArr[1], curArr[2])
      const nextDate = new Date(nextArr[0], nextArr[1], nextArr[2])
      return nextDate - curDate
    })
    return data
  }

  function handleSearchIconClick() {
    inputRef.current.style.display = 'block'
  }

  function handleInputChange(e) {
    const keyword = e.target.value.trim()
    if (keyword.length === 0) setData(() => sortByTime(fileList))
    else {
      const regExp = new RegExp(keyword, 'gi')
      const nextData = data.filter(
        file => file.fileName.match(regExp) || file.timeStamp.match(regExp)
      )
      setData(() => nextData)
    }
  }
  const list = getList(data)
  return (
    <section className="section__signHistory">
      {fileList.length ? (
        <>
          <Logo />
          <HistoryHeader
            icons={icons}
            inputRef={inputRef}
            onClick={handleSearchIconClick}
            onChange={handleInputChange}
          />
          <div className="signHistory__body">{list}</div>
          <div
            className="signHistory__buildFake signHistory__buildFake--del"
            onClick={delSeed}
          >
            <span>刪除</span>
            {'所有歷史資料(含簽名) 於Local Storage'}
          </div>
        </>
      ) : (
        <>
          <HistoryHeader
            isHide={true}
            icons={icons}
            onClick={handleSearchIconClick}
            inputRef={inputRef}
            onChange={handleInputChange}
          />
          <Logo />
          <img
            className="signHistory__bg"
            src={icons.noHistoryIcon}
            alt="noFile"
          />
          <div className="signHistory__buildFake" onClick={runSeed}>
            <span>建立</span>測試歷史資料於Local Storage
          </div>
        </>
      )}
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
      <img className="item__icon" src={icon} alt="detail" />
    </li>
  )
}

function HistoryHeader({ icons, onClick, isHide, inputRef, onChange }) {
  const styleModifier = isHide ? 'header--noData' : ''
  return (
    <div className={`signHistory__header ${styleModifier}`}>
      <a
        href="https://yuwen-ctw.github.io/2022_F2E_W2_dottedsign/"
        className="header__homePage"
      >
        <img src={icons.homeIcon} alt="home" />
      </a>
      <div className="header__search">
        <label
          className="search__label"
          htmlFor="search__input"
          onClick={onClick}
        >
          <img src={icons.searchIcon} alt="search" onClick={onClick} />
        </label>
        <input
          className="search__input"
          type="text"
          id="search__input"
          placeholder="輸入關鍵字..."
          ref={inputRef}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

function getList(data) {
  // row: 年份  subRow: 同年份的資料
  const row = []
  const subRow = []
  // 判斷更換年份的標記
  let stamp = 0
  if (data.length) {
    // 先取得第一筆年份
    let lastLoopYear = data[0].timeStamp.split('/')[0]
    data.forEach((file, index) => {
      const year = file.timeStamp.split('/')[0]
      // 例外情形：最後一筆資料 - 先判斷年份是否變更，若 true 則push row
      if (index === data.length - 1) {
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
            <ListItem
              key={file.timeStamp}
              item={file}
              icon={icons.detailIcon}
            />
          )
        } else {
          // 若資料年份一樣，則繼續 push subRow
          subRow.push(
            <ListItem
              key={file.timeStamp}
              item={file}
              icon={icons.detailIcon}
            />
          )
        }
      }
      lastLoopYear = year
    })
  }
  return row
}

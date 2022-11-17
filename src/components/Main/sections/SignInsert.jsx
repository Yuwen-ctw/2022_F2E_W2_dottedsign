import Logo from '../../elements/Logo'
import backIcon from '../../../images/Back.png'
import nextIcon from '../../../images/Details.png'
import signIcon from '../../../images/sign.png'
import checkIcon from '../../../images/check.png'
import dateIcon from '../../../images/date.png'
import wordIcon from '../../../images/word.png'
import zoominIcon from '../../../images/zoom-in.png'
import zoomoutIcon from '../../../images/zoom-out.png'

function SignInsert() {
  return (
    <section className="section__signInsert">
      <Logo />
      <FilePaginator />
      <Scaler percentage={100} />
      <Button />
      <div className="file-content"></div>
      <Toolkit />
    </section>
  )
}

export default SignInsert

function FilePaginator() {
  return (
    <div className="file-paginator">
      <div className="file-paginato__button file-paginato__button--prev">
        <img src={backIcon} alt="back" />
      </div>
      <div className="file-paginator__page">
        <span className="page page--now">1</span>
        <span className="page page--slash">/</span>
        <span className="page page--total">2</span>
      </div>
      <div className="file-paginato__button file-paginato__button--next">
        <img src={nextIcon} alt="back" />
      </div>
    </div>
  )
}

function Button() {
  return <div className="button button__complete">完成簽署</div>
}

function Toolkit() {
  return (
    <div className="toolkit">
      <img src={signIcon} alt="sign" />
      <img src={checkIcon} alt="check" />
      <img src={dateIcon} alt="date" />
      <img src={wordIcon} alt="word" />
      <span className="toolkit__label toolkit__label--sign">簽名</span>
      <span className="toolkit__label toolkit__label--check">勾選</span>
      <span className="toolkit__label toolkit__label--date">日期</span>
      <span className="toolkit__label toolkit__label--word">插入文字</span>
    </div>
  )
}

function Scaler({ percentage }) {
  return (
    <div className="scaler">
      <img src={zoominIcon} alt="zoomin" />
      <span className="scaler__scale">{percentage}%</span>
      <img src={zoomoutIcon} alt="zoomout" />
    </div>
  )
}

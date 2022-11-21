import homePageImage from '../images/homepage'

function Footer() {
  return (
    <footer>
      <FooterImage />
      <p className="footer__copyright">
        小綠簽 &copy; Design: KT / Code: Yuwen
      </p>
    </footer>
  )
}

export default Footer

function FooterImage() {
  return (
    <div className="footer__bg-image-wrapper">
      <img
        className="bg-image bg-image--bottomWater"
        src={homePageImage.bottomWater}
        alt="background"
      ></img>
      <img
        className="bg-image bg-image--redLady"
        src={homePageImage.redLady}
        alt="background"
      ></img>
      <img
        className="bg-image bg-image--yellowLady"
        src={homePageImage.yellowLady}
        alt="background"
      ></img>
      <img
        className="bg-image bg-image--plant"
        src={homePageImage.plant}
        alt="background"
      ></img>
      <img
        className="bg-image bg-image--pack"
        src={homePageImage.pack}
        alt="background"
      ></img>
      <img
        className="bg-image bg-image--greenLady"
        src={homePageImage.greenLady}
        alt="background"
      ></img>
    </div>
  )
}

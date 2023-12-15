import logo from "../../img/logo.png";

import {
  FaSquareFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLocationDot,
  FaPhoneFlip,
  FaRegEnvelope,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa6";

import Style from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={Style.mainContainer}>
        <div className={Style.borderContainer}>
          <div className={Style.labelContainer}>
            <h3>Iratkozz fel hírlevelünkre!</h3>
            <h4>
              Mindig értesülj akcióinkról, újdonságainkról, és tartsd napra készre a horgász tudásod.
            </h4>
          </div>
          <div className={Style.formContainer}>
            <form action="">
              <div className={Style.inputCont}>
                <div>
                  <input type="text" placeholder="Neved" />
                </div>
                <div>
                  <input type="text" placeholder="E-mail címed." />
                </div>
                <div>
                  <button>Feliratkozás!</button>
                </div>
              </div>

              <div className={Style.afszCont}>
                <input id="newsletterFormAfsz" type="checkbox" />
                <label htmlFor="newsletterFormAfsz">
                  A gombra kattintva elfogadom a személyes adatok felhasznál hatóságát,
                  a rendelés feldolgozásához, a weboldalon történő vásárlási élmény
                  fenntartásához és más célokra., melyeket az Adatkezelési tájékoztató tartalmaz.</label>
              </div>
            </form>
          </div>
          <div className={Style.logoContainer}>
            <img src={logo} alt="logo" />
            <p>
              Albi horgász bolt, kis és nagykerek, horgászegyesület.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur alias tempora molestias atque porro quos omnis
              debitis, sed dolore dolor accusamus dicta.
            </p>
          </div>
          <div className={Style.textContainer}>
            <div className={Style.infoText}>
              <h4>Általános</h4>
              <ul>
                <li>Klubb kártya</li>
                <li>Rólunk</li>
                <li>Garanciális javitás</li>
              </ul>
            </div>
            <div className={Style.infoText}>
              <h4>Információ</h4>
              <ul>
                <li>Vásárlási feltételek</li>
                <li>Adatvédelmi nyilatkozat</li>
                <li>Viszonteladóknak</li>
              </ul>
            </div>
            <div className={Style.contact}>
              <h4>Kapcsolat</h4>
              <ul>
                <li>
                  <FaLocationDot className={Style.icon} /> Debrecen
                </li>
                <li>
                  <FaPhoneFlip className={Style.icon} /> +36 55 555 5555
                </li>
                <li>
                  <FaRegEnvelope className={Style.icon} /> horgaszbolt@gmail.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className={Style.mediaTitle}>Media</h4>
              <div className={Style.mediaCont}>
                <div>
                  <FaSquareFacebook className={Style.icon} />
                </div>
                <div>
                  <FaInstagram className={Style.icon} />
                </div>
                <div>
                  <FaYoutube className={Style.icon} />
                </div>
                <div>
                  <FaTiktok className={Style.icon} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.footerEnd}>
          <div className={Style.footerEndContainer}>
            <div>
              <FaCcVisa className={Style.icon} />
              <FaCcMastercard className={Style.icon} />
            </div>
            <p>© Varga Albert</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
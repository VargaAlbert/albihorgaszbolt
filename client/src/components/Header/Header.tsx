import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";
import { FaCartShopping, FaHeart, FaUser, FaList, FaRightToBracket } from "react-icons/fa6";

import MenuList from "../MenuList/MenuList";
import CategoryOffcanvas from "../Header/CategoryOffcanvas/CategoryOffcanvas";
import ShopCardOffcanvas from "./ShopCardOffcanvas/ShopCartOffcanvas";
import logo from "../../img/logo.png";
import LoginModal from "./Login/LoginModal";

import Style from "./Header.module.scss";

const Header: React.FC = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    token,
    handleLogout,
    userName,
    toggleDropdownLogin,
    handleShowMenu,
    handleShow,
    cartQuantity
  } = useShopContext();

  const cartItemsIconSumContentTSX = cartQuantity === 0 ? (
    <span className={Style.noneDis}> {cartQuantity}</span >
  ) : (
    <span className={Style.sum}>{cartQuantity}</span>
  )

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleProfile = () => {
    if (token) {
      toggleDropdown()
    } else {
      toggleDropdownLogin()
    }
  }

  const navigate = useNavigate();
  const handleLogoutAndNav = () => {
    handleLogout();
    toggleDropdown()
    navigate('/');
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className={Style.navBackground}>
      <CategoryOffcanvas />
      <nav className={Style.navContainer}>


        <div className={Style.navMenuBtnContainer}>
          <span className={Style.iconContainer}>
            <FaList className={Style.icon} onClick={handleShowMenu} />
            MENÜ
          </span>
        </div>

        <div className={Style.logoContainer}>
          <Link className={Style.logoLink} to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className={Style.navMenuContainer}>
          <MenuList />
        </div>

        <div className={Style.navIconContainer}>

          <span className={`${Style.iconContainer} ${Style.loginIcon}`}>
            <FaUser className={Style.icon} onClick={handleProfile} />
            BEJELENTKEZÉS
          </span>
          {isOpen && (
            <div className={Style.dropdownContent} ref={dropdownRef}>
              <div>
                <div>Üdvözöljük:</div>
                <div>{userName}</div>
              </div>
              <div className={Style.dropdownCategory}>Rendeléseim</div>
              <div className={Style.dropdownCategory}>Adatmodositás</div>
              <div className={Style.dropdownCategory}>Vevöi kedvezmény</div>
              <div onClick={handleLogoutAndNav} className={Style.dropdownCategory}>
                <FaRightToBracket />
                <span className={Style.exit}>Kijelentkezés</span>
              </div>
            </div>
          )}

          <span className={Style.iconContainer}>
            <FaHeart className={Style.icon} />
            KEDVENCEIM
          </span>
          <span className={Style.iconContainer}>
            <FaCartShopping className={Style.icon} onClick={handleShow} />
            {cartItemsIconSumContentTSX}
            KOSÁR
          </span>
        </div>

      </nav>
      <LoginModal />
      <ShopCardOffcanvas />
    </section>
  );
};
export default Header;
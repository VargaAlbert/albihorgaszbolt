import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useShopContext } from "../../../context/ShopContext";
import { useLocation, useNavigate } from 'react-router-dom';
import LoginInfoModal from './LoginInfoModal/LoginInfoModal';
import Modal from 'react-bootstrap/Modal';

import Style from "./LoginModal.module.scss";
import "../../../scss/ancestor-class.scss"

const LoginModal: React.FC = () => {

    const {
        handleSubmit,
        getEmail,
        getPassword,
        email,
        password,
        isOpenLoginDropdown,
        toggleDropdownLogin,
        handleCheckboxChange,
        isChecked,
        token
    } = useShopContext();

    const currentLocation = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (currentLocation.pathname === '/registration') {
            navigate('/');
        }
    }, [token]);

    return (
        <div className={Style.mainContainer}>
            <Modal
                show={isOpenLoginDropdown}
                onHide={toggleDropdownLogin}
                backdrop="static"
                keyboard={false}
                data-bs-theme="dark"
                className={Style.position}
            >
                <Modal.Header data-bs-theme="dark" className={Style.background} closeButton>
                    <Modal.Title><h3>BEJELENTHEZÉS</h3></Modal.Title>
                </Modal.Header>

                <Modal.Body className={Style.background}>

                    <form className={Style.login} onSubmit={handleSubmit}>

                        <input
                            type="email"
                            value={email}
                            placeholder="E-mail címed:"
                            onChange={getEmail}
                        />

                        <input
                            type="password"
                            value={password}
                            placeholder="Jelszavad:"
                            onChange={getPassword}

                        />

                        <div className={Style.loginAssed}>

                            <label>Megjegyzés!
                                <input
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    type="checkbox"
                                />
                            </label>

                            <a>Elfelejtett jelszó</a>
                        </div>

                        <button type="submit">BEJELENTKEZEM</button>

                    </form>

                </Modal.Body>

                <Modal.Footer className={Style.background}>

                    <Link
                        className={Style.link}
                        to="/registration"
                    >
                        <button
                            className={Style.reg}
                            onClick={toggleDropdownLogin}
                        >
                            REGISZTRÁCIÓ
                        </button>
                    </Link>
                </Modal.Footer>
            </Modal>
            <LoginInfoModal />
        </div>
    );

}

export default LoginModal;
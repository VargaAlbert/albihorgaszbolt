import { FaCartShopping } from "react-icons/fa6";
import { useShopContext } from "../../../context/ShopContext";
import { Link } from "react-router-dom";

import Offcanvas from 'react-bootstrap/Offcanvas';
import ShopCartItems from "./ShopCartItems/ShopCartItems";

import Style from "./ShopCartOffcanvas.module.scss"

const ShopCartOffcanvas: React.FC = () => {

    const {
        cartItems,
        show,
        handleClose,
        cardSum,
    } = useShopContext();

    const cartItemsContentTSX =
        cartItems.length === 0 ? (
            <div className={Style.carZero}>Még nincsenek termékek a kosaradban!</div>
        ) : (
            cartItems.map((item) => <ShopCartItems key={item.id} {...item} />).reverse()
        );

    return (
        <div>
            <Offcanvas className={Style.backgroung} show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <div className={Style.offcanvasIconContainer}>
                        <FaCartShopping className={Style.icon} />
                        <Offcanvas.Title>KOSARAM</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body className="position-relative p-0">
                    {cartItemsContentTSX}
                    <div className={Style.carSumCont}>
                        <div>
                            <p className={Style.carSumText}>ÖSSZESEN:</p>
                            <p className={Style.carSumPrice}>
                                {cardSum(false)} Ft
                            </p>
                        </div>
                        <Link className={Style.cartIink} to="/check-cart">
                            <button>TOVÁBB A PÉNZTÁRHOZ</button>
                        </Link>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default ShopCartOffcanvas;
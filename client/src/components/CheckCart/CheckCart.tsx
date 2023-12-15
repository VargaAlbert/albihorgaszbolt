import { Link } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";

import CheckShopCartItems from "./CheckShopCartItems/CheckShopCartItems";

import Style from "./CheckCart.module.scss"

const CheckCart = () => {

    const {
        cartItems,
        cardSum,
        SHIPPING_FREE,
        formatPrice,
    } = useShopContext();

    console.log("ez a lényegf", cartItems);

    const cartItemsContentTSX =
        cartItems.length === 0 ? (
            <div className={Style.carZero}>Még nincsenek termékek a kosaradban!</div>
        ) : (

            cartItems.map((item) => <CheckShopCartItems key={item.id} {...item} />).reverse()
        );

    return (
        <div className={Style.mainContainer}>
            <div className={Style.cartContainer}>
                <h2 className={Style.cartTitle}>KOSARAM</h2>
                {cartItemsContentTSX}
            </div>
            <div className={Style.sumContainer} >
                <div className={Style.checkSum}>
                    <h3>Összegzés:</h3>
                    <div className={Style.sumContent}>
                        <div className={Style.text}>
                            <div className={Style.formatFont}>Kosár részösszeg:</div><div className="format-font">{cardSum(false)} Ft</div>
                        </div>
                        <div className={Style.text}>
                            <div className={Style.formatFont}>Szállítási díj:</div><div className="format-font">{formatPrice(SHIPPING_FREE)} Ft</div>
                        </div>
                        <div className={Style.text}>
                            <div className={Style.formatFont}>Kedvezmény:</div><div className="format-font">0 Ft</div>
                        </div>
                        <div className={Style.text}>
                            <div className={Style.formatFont}>Összesen:</div><div className="format-font">{cardSum(true)} Ft</div>
                        </div>
                    </div>
                    <button>TOVÁBB A KASSZÁHOZ</button>
                    <Link className={Style.link} to="/" >
                        Tovább vásárolok
                    </Link>
                </div>
            </div>
        </div >
    )
}

export default CheckCart;
import React from "react";
import { useShopContext } from "../../../context/ShopContext";
import { FaTrash } from "react-icons/fa6";
import styles from "./CheckShopCartItems.module.scss";

type CheckShopCartItemsProps = {
    id: number
    quantity: string
}

const CheckShopCartItems: React.FC<CheckShopCartItemsProps> = ({ id, quantity }) => {

    const {
        productsNoFilter,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        roundToNearestMultiple,
        formatPrice,
        handleKeyPress,
        handleBlur,
        setNumberValue,
        setValue,
    } = useShopContext();

    const item = productsNoFilter.find((item) => item.ID_PRODUC === id);

    if (item == null) {
        return null;
    }

    return (
        <section className={styles.mainContainer}>

            <div className={styles.imgContainer}>
                <img src={`${item.IMGURL_NO_WATER}`} alt={`${item.ID_PRODUC}`} />
            </div>

            <div className={styles.descriptionContainer}>

                <h3>{item.PRODUCT} {item.ROZMER}</h3>

                <div className={styles.deleteIconCont}>
                    <FaTrash
                        className={styles.icon}
                        onClick={() => removeFromCart(item.ID_PRODUC)}
                    />
                </div>
            </div>

            <div className={styles.priceContainer}>
                <div className={styles.btnCont}>
                    <div className={styles.price}>
                        {`${formatPrice(roundToNearestMultiple(item.CENA_S_DPH_EU_HUF))} `} Ft/db
                    </div>

                    <div className={styles.IncDecBtnContainer}>

                        <button onClick={() => decreaseCartQuantity(item.ID_PRODUC)}>
                            -
                        </button>
                        <input
                            type="number"
                            onKeyDown={handleKeyPress}
                            onChange={(e) => setNumberValue(e, id)}
                            value={setValue(id)}
                            onBlur={(e) => handleBlur(e, id)}
                        />
                        <button onClick={() => increaseCartQuantity(item.ID_PRODUC)}>
                            +
                        </button>
                    </div>
                </div>

                <p className={styles.checkPrice}>
                    {`${formatPrice((Number(quantity) * roundToNearestMultiple(item.CENA_S_DPH_EU_HUF)))} `}
                    Ft
                </p>
            </div>
        </section>
    );
}

export default CheckShopCartItems;
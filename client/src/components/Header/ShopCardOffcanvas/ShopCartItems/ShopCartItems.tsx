import { useShopContext } from "../../../../context/ShopContext";
import { FaTrash } from "react-icons/fa6";

import Style from "./ShopCartItems.module.scss";

type ShopCartItemsProps = {
    id: number
    quantity: string
}

const ShopCartItems: React.FC<ShopCartItemsProps> = ({ id, quantity }) => {

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
        <section className={Style.mainContainer}>
            <div className={Style.contentContainer}>
                <div className={Style.imgContainer}>
                    <img src={`${item.IMGURL_NO_WATER}`} alt={`${item.ID_PRODUC}`} />
                </div>

                <div>
                    <h3>{item.PRODUCT}</h3>
                    <h4>{item.ROZMER}</h4>
                </div>

                <div className={Style.deleteIconCon}>
                    <FaTrash
                        className={Style.icon}
                        onClick={() => removeFromCart(item.ID_PRODUC)}
                    />
                </div>
            </div>

            <div className={Style.priceContainer}>
                <div className={Style.IncDecBtnContainer}>
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
                <p className={Style.price}>
                    {`${formatPrice((Number(quantity) * roundToNearestMultiple(item.CENA_S_DPH_EU_HUF)))} `}
                    Ft
                </p>
            </div>
        </section>
    );
}

export default ShopCartItems;
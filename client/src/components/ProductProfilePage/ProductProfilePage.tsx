import { ChangeEvent, useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import { FaCartShopping, FaHeart } from "react-icons/fa6";

import Style from "./ProductProfilPage.module.scss"

type ProductProfilePageProps = {
    productId: number
}

const ProductProfilePage: React.FC<ProductProfilePageProps> = ({ productId }) => {

    const {
        roundToNearestMultiple,
        searchValue,
        formatPrice,
        limitValue,
        handleKeyPress,
        productsNoFilter,
    } = useShopContext();

    const [value, setValue] = useState<string>("1");

    const setNumberValue = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.value === "" ?
            (setValue(""))
            : (setValue(String(Math.floor(Math.abs(limitValue(Number(e.target.value)))))));
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) < 1) {
            setValue("1");
        } else {
            setValue(e.target.value);
        }
    }

    const valueIncrease = () => {
        if (Number(value) < 999) {
            setValue(String(Number(value) + 1))
        }
    }

    const valueDecrease = () => {
        if (Number(value) === 1) {
            setValue("1");
        } else {
            setValue(String(Number(value) - 1));
        }
    };

    const givesValue = () => {
        searchValue(value, productId, true);
        setValue("1");
    }

    const product = productsNoFilter.find((product) => product.ID_PRODUC === productId);
    if (!product) {
        return (
            <div>
                <h2>Nincs ilyen termék!</h2>
            </div>
        );
    }

    return (
        <>
            <section className={Style.mainContainer}>
                <div className={Style.container}>
                    <div>
                        <img
                            className={Style.img}
                            src={`${product.IMGURL_NO_WATER}`}
                            alt={`${product.ID_PRODUC}`}
                        />
                    </div>
                    <div className={Style.textContainer}>
                        <h2>{product.PRODUCT}</h2>
                        <h3>{product.ROZMER}</h3>
                        <div className={Style.priceContainer}>
                            <p>{`${formatPrice(roundToNearestMultiple(product.CENA_S_DPH_EU_HUF))} `} Ft</p>
                        </div>
                        <div className={Style.descriptContainer}></div>
                        <div className={Style.btnContainer}>
                            <div className={Style.IncDecBtnContainer}>
                                <button onClick={valueDecrease}> - </button>
                                <input
                                    type="number"
                                    required
                                    pattern="[0-9\.]+"
                                    onKeyDown={handleKeyPress}
                                    value={value}
                                    onChange={setNumberValue}
                                    onBlur={handleBlur}
                                />
                                <button onClick={valueIncrease} > + </button>
                            </div>
                            <button
                                className={Style.byBtn}
                                onClick={givesValue}
                            >
                                <FaCartShopping className={Style.btnByIcon} />
                                KOSÁRBA
                            </button>
                            <div className={Style.btnIoveIconContainer}>
                                <FaHeart className={Style.btnIoveIcon} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Style.productDescriptionContainer}>
                    <div className={Style.productDescriptionHead}>
                        <h4>Leirás</h4>
                    </div>
                    <div className={Style.productDescriptionBody}>
                        <p>{product.DESCRIPTION}</p>
                    </div>
                </div>
            </section >
        </>
    );
}

export default ProductProfilePage;
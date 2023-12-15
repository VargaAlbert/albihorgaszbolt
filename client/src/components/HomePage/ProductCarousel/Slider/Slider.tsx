import { Link } from "react-router-dom";
import { useShopContext } from '../../../../context/ShopContext'
import { ProductDataType } from "../../../../data/dataType"
import { FaCartShopping, FaHeart } from "react-icons/fa6";

import Style from "./Slider.module.scss"

type SliderProps = {
    product: ProductDataType;
}

const Slider: React.FC<SliderProps> = ({ product }) => {

    const {
        searchValue,
        roundToNearestMultiple
    } = useShopContext();

    return (
        <div className={Style.mainContainer}>
            <div className={Style.sliderProductContainer} key={product.ID_PRODUC + product.EAN}>
                <Link className={Style.sliderIink}
                    to={`/${product.SORTIMENT}/${product.ID_PRODUC}`}>
                    <img
                        src={`${product.IMGURL_NO_WATER}`}
                        alt={`${product.ID_PRODUC}`}
                    />
                    <h3>{product.PRODUCT}</h3>
                    <h4>{product.ROZMER}</h4>
                </Link>

                <div>
                    <p className={Style.sliderProductId}>cikszám: {product.ID_PRODUC}</p>
                </div>
                <div>
                    <p className={Style.sliderPrice}>
                        {`${roundToNearestMultiple(product.CENA_S_DPH_EU_HUF)}`} Ft
                    </p>
                </div>
                <div className={Style.sliderProductItemByContainer}>
                    <FaHeart className={Style.sliderBtnHeartIicon} />
                    <button className={Style.sliderByBtn}

                        onClick={() => { searchValue("1", product.ID_PRODUC, true) }}>
                        <FaCartShopping className={Style.sliderBtnByIcon} />
                        KOSÁRBA
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Slider;
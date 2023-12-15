import { Link } from "react-router-dom";
import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { useShopContext } from "../../context/ShopContext";

import Pagination from './Pagination/Pagination';
import ProductsHead from "./ProductsHead/ProductsHead";

import Style from "./ProductsPage.module.scss"

const ProductsPage: React.FC = () => {

    const {
        roundToNearestMultiple,
        searchValue,
        formatPrice,
        products,
        category
    } = useShopContext();

    return (
        <>
            {/* FilterBar */}
            <div className={Style.mainContainer}>
                <ProductsHead />
                <Pagination />
                <div className={Style.productItemContainer}>

                    {products.map((product) => {

                        return (
                            <div className={Style.productContainer} key={product.ID_PRODUC + product.EAN}>
                                <Link className={Style.link} to={`/${category}/${product.ID_PRODUC}`}>
                                    <img
                                        className={Style.imgCont}
                                        src={`${product.IMGURL_NO_WATER}`}
                                        alt={`${product.ID_PRODUC}`}
                                    />
                                    <h3>{product.PRODUCT}</h3>
                                    <h4>{product.ROZMER}</h4>
                                </Link>
                                <div>
                                    <p className={Style.productId}>cikszám: {product.ID_PRODUC}</p>
                                </div>
                                <div>
                                    <p className={Style.price}>
                                        {`${formatPrice(roundToNearestMultiple(product.CENA_S_DPH_EU_HUF))} `}
                                        Ft
                                    </p>
                                </div>
                                <div className={Style.itemByContainer}>
                                    <FaHeart className={Style.btnHeartIcon} />
                                    <button
                                        className={Style.byBtn}
                                        onClick={() => { searchValue("1", product.ID_PRODUC, true) }}
                                    >
                                        <FaCartShopping className={Style.btnByIcon} />
                                        KOSÁRBA
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                </div>
                <Pagination />

            </div>
        </ >
    )
}
export default ProductsPage;
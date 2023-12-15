import { useShopContext } from "../../../context/ShopContext";
import { ProductDataType } from "../../../data/dataType"

import Slider from "./Slider/Slider";

import Style from "./ProductCarousel.module.scss"

const ProductCarousel: React.FC = () => {

    const { productsNoFilter } = useShopContext();

    const saleProduct: ProductDataType[] = productsNoFilter.slice(15, 25);
    const newProduct: ProductDataType[] = productsNoFilter.slice(50, 60);

    return (
        <div>

            <div className={Style.sliderProductLabel}>
                <h3>Akciós termékeink</h3>
                <h4>Válogass az akciós kínálatunkból.</h4>
            </div>

            <div className={Style.slider}>
                <div className={Style.slideTrack}>
                    {saleProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}
                    {saleProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}
                </div>
            </div>

            <div className={Style.sliderProductLabel}>
                <h3>Újonnan a kínálatban.</h3>
                <h4>Válogass az újdonságaink közül.</h4>
            </div>

            <div className={Style.slider}>
                <div className={Style.slideTrack}>
                    {newProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}
                    {newProduct.map((newProduct) => {
                        return <Slider key={newProduct.ID_PRODUC} product={newProduct} />;
                    })}

                </div>
            </div>

        </div>
    )
}
export default ProductCarousel;
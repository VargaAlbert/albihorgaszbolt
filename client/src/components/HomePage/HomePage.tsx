import React from 'react'
import ProductCarousel from './ProductCarousel/ProductCarousel';
import HomeCarousel from './HomeCarousel/HomeCarousel';

import Style from "./HomePage.module.scss"

const HomePage: React.FC = () => {
    return (
        <div className={Style.mainContainer}>
            <HomeCarousel />
            <ProductCarousel />
        </div>
    )
}
export default HomePage;
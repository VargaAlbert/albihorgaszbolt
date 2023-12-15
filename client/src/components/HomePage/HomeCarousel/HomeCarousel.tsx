import React from 'react'
import { Link } from 'react-router-dom';

import Carousel from "react-bootstrap/Carousel";
import carousel00 from "../../../img/carousel00.png";
import carousel01 from "../../../img/carousel01.png";
import carousel02 from "../../../img/carousel02.png";

import Style from "./HomeCarousel.module.scss"

const HomeCarousel: React.FC = () => {
    return (
        <div className={Style.container}>
            <Carousel fade>
                <Carousel.Item>
                    <div className={Style.carItemCont}>
                        <img className={Style.carImgCont} src={carousel00} alt="carousel00" />
                        <div className={Style.carItemText}>
                            <p>Akciós kinálat</p>
                            <h2>DELPHIN NYELETŐFÉKES ORSÓK </h2>
                            <h4>
                                Válogs több 100 akciós Delphin nyeletőfékes orsóink közül.
                            </h4>
                            <Link to="/Orsók/101001219">
                                <button className={Style.homeCarBtn}>MEGNÉZEM</button>
                            </Link>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={Style.carItemCont}>
                        <img className={Style.carImgCont} src={carousel01} alt="carousel00" />
                        <div className={Style.carItemText}>
                            <p>Újonnan a kínálatba</p>
                            <h2>CARP ZOOM Satellite 301 3+1</h2>
                            <h4>
                                Megérkezett az új CARP ZOOM Satellite 301 3+1 kapásjelző szett,
                                mely akár bővíthető 4+1-ig.
                            </h4>
                            <Link to="/Kiegészítők/101001363">
                                <button className={Style.homeCarBtn}>MEGNÉZEM</button>
                            </Link>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={Style.carItemCont}>
                        <img className={Style.carImgCont} src={carousel02} alt="carousel00" />
                        <div className={Style.carItemText}>
                            <p>Akciós kinálat</p>
                            <h2>DELPHIN THORN HOOK</h2>
                            <h4>
                                Akciós az egyik legjobb pontyozó horog. Több méretben
                                rendelhető.
                            </h4>
                            <Link to="/kiegészítők/101001456">
                                <button className={Style.homeCarBtn}>MEGNÉZEM</button>
                            </Link>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}
export default HomeCarousel;
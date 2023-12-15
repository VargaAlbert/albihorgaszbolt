import React from "react";
import { FaFilter } from "react-icons/fa6";
import {
    useShopContext,
    productInPageType,
    productInPage,
    filterMainType,
    filterMain
} from "../../../context/ShopContext";

import Select from 'react-select'

import Style from "./ProductsHead.module.scss"

const ProductsHead: React.FC = () => {

    const {
        setPostsPerPage,
        filteredProductsLength,
        setMainSort,
        setCurrentPage,
        selectedIndexProductInPage,
        selectedIndexFilterMain
    } = useShopContext();

    return (
        <div className={Style.mainContainer}>
            <div className={Style.filtIconCont}>
                <FaFilter className={Style.icon} />
                <span>SZŰRŐ</span>
            </div>
            <div className={Style.dbCont}>
                <span className={Style.title}>Találatokszáma:</span>
                <span className={Style.db}>{filteredProductsLength} db termék</span>
            </div>
            <div className={Style.pageSelectCont}>
                <div className={Style.label}>Termékek száma:</div>

                <Select
                    options={productInPage}
                    defaultValue={productInPage[selectedIndexProductInPage]}
                    onChange={(option: productInPageType | null) => {
                        if (option?.value) { setPostsPerPage(option.value) }
                        setCurrentPage(1);
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary50: "#454b57",
                            primary25: '#f0003c',
                            primary: '#8f9ab3',
                        },
                    })}
                />
            </div>
            <div className={Style.filterCont}>
                <div className={Style.label}>
                    Termékek rendezése:
                </div>

                <Select
                    placeholder="Rendezés..."
                    options={filterMain}
                    defaultValue={filterMain[selectedIndexFilterMain]}
                    onChange={(option: filterMainType | null) => {
                        if (option?.value) { setMainSort(option.value) }
                    }}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                            ...theme.colors,
                            primary50: "#454b57",
                            primary25: '#f0003c',
                            primary: '#8f9ab3',
                        },
                    })}
                />

            </div>
        </div>
    );
}

export default ProductsHead;
import { useShopContext } from "../../../context/ShopContext";

import Style from "./Pagination.module.scss"

const Pagination: React.FC = () => {

    const {
        pages,
        currentPage,
        setCurrentPage
    } = useShopContext();

    return (
        <div className={Style.container}>
            <div className={Style.pagenation}>
                {pages.map((page, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? `${Style.active}` : ""}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default Pagination;


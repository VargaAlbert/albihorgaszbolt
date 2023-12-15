import { Link } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";

import Style from "./MenuList.module.scss"

const MenuList: React.FC = () => {
    const {
        setCurrentPage,
        setCategory,
        menuList
    } = useShopContext();

    return (
        <>
            {menuList.map((category) => {
                return (
                    <Link
                        className={Style.link}
                        key={category}
                        to={`/${category}`}
                        onClick={() => {
                            setCategory(`${category}`);
                            setCurrentPage(1);
                        }}
                    >
                        <span>{category}</span>
                    </Link>
                );
            })}
        </>
    );
}

export default MenuList;
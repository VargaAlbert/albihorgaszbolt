import { useShopContext } from "../../../context/ShopContext";
import { FaList } from "react-icons/fa6";

import Offcanvas from 'react-bootstrap/Offcanvas';
import MenuList from "../../MenuList/MenuList";

import Style from "../ShopCardOffcanvas/ShopCartOffcanvas.module.scss"

const CategoryOffcanvas: React.FC = () => {

    const { showMenu, handleCloseMenu } = useShopContext();
    return (
        <div>
            <Offcanvas className={`${Style.backgroung} d-xl-none`} show={showMenu} onHide={handleCloseMenu} >
                <Offcanvas.Header closeButton>
                    <div className={Style.offcanvasIconContainer}>
                        <FaList className={Style.icon} />
                        <Offcanvas.Title>KATEGORIÁK</Offcanvas.Title>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <MenuList />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default CategoryOffcanvas;
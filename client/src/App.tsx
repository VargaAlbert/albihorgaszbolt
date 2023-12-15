import { useShopContext } from "./context/ShopContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import ProductsPage from "./components/ProductPage/ProductsPage";
import ProductProfilePage from "./components/ProductProfilePage/ProductProfilePage"
import Footer from "./components/Footer/Footer";
import CheckCart from "./components/CheckCart/CheckCart";
import Registration from "./components/Registration/Registration";

import Style from "./scss/App.module.scss";

const App = () => {

  const {
    menuList,
    productsNoFilter
  } = useShopContext();

  return (
    <Router>
      <div className={Style.mainBackground}>
        <Header />
        <div className={Style.mainContainer}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {menuList.length > 0 &&

              menuList.map((category) => {
                return (
                  <Route
                    path={`/${category}`}
                    key={category}
                    element={<ProductsPage />}
                  />
                );
              })}

            {productsNoFilter.length > 0 &&
              productsNoFilter.map((product) => {
                return (
                  <Route
                    path={`/${product.SORTIMENT}/${product.ID_PRODUC}`}
                    key={product.ID_PRODUC}
                    element={<ProductProfilePage productId={product.ID_PRODUC} />}
                  />
                );
              })}

            <Route path="/check-cart" element={<CheckCart />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

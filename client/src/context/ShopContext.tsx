import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    ChangeEvent,
} from "react";

import axios from 'axios';

import { ProductDataType } from "../data/dataType";
import URL from "../data/Url";
import { useLocalStorage } from "../hooks/useLocalStorage"

interface ShopProviderProps {
    children: ReactNode;
};

type CartItem = {
    id: number
    quantity: string
}

export type productInPageType = {
    readonly value: number;
    readonly label: string;
};

export const productInPage: readonly productInPageType[] = [
    { value: 12, label: '12/oldal' },
    { value: 24, label: '24/oldal' },
    { value: 48, label: '48/oldal' },
    { value: 92, label: '92/oldal' },
];

const findProductInPageIndex = (selectedValue: number): number => {
    return productInPage.findIndex((item) => item.value === selectedValue);
};

export type filterMainType = {
    readonly value: string;
    readonly label: string;
};

export const filterMain: readonly filterMainType[] = [
    { value: 'cheap', label: 'Ár szerint növekvő' },
    { value: 'expensive', label: 'Ár szerint csökkenő' },
    { value: 'A-Z', label: 'ABC szerint csökkenő' },
    { value: 'Z-A', label: 'ABC szerint növekvő' },
]

const findFilterMainIndex = (selectedValue: string): number => {
    return filterMain.findIndex((item) => item.value === selectedValue);
};

type ShopContextProps = {

    products: ProductDataType[];
    productsNoFilter: ProductDataType[];
    cartItems: CartItem[];

    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setPostsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    setMainSort: React.Dispatch<React.SetStateAction<string>>;

    setValue: (id: number) => string;
    cardSum: (SHIPPING_FREEBool: boolean) => string;
    limitValue: (quantity: number) => number;
    roundToNearestMultiple: (number: number) => number;
    getItemQuantity: (id: number) => string;
    formatPrice: (price: number) => string;

    setNumberValue: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    handleBlur: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    getEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;

    searchValue: (quantity: string, id: number, isSelfIncrease: boolean) => void;
    setLoginRegModalInfo: (code: string, value?: string) => void;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;

    handleClose: () => void;
    handleShow: () => void;
    handleCloseMenu: () => void;
    handleShowMenu: () => void;
    toggleInfoModal: () => void;
    handleLogout: () => void;
    toggleDropdownLogin: () => void;

    pages: number[];
    menuList: string[];
    loginMessage: string[];

    selectedIndexFilterMain: number;
    selectedIndexProductInPage: number;
    postsPerPage: number;
    filteredProductsLength: number;
    currentPage: number;
    SHIPPING_FREE: number;
    cartQuantity: number;

    category: string;
    userName: string;
    email: string;
    password: string;
    token: string;

    showMenu: boolean;
    isChecked: boolean;
    show: boolean;
    modalInfo: boolean;
    isOpenLoginDropdown: boolean;

};

const ShopContext = createContext({} as ShopContextProps)

export const useShopContext = () => {
    return useContext(ShopContext);
};

const MAX_LIMIT = 999;

export const ShopProvider: React.FC<ShopProviderProps> = ({
    children
}) => {

    /* ----state---- */
    const [productsNoFilter, setProductsNoFilter] = useState<ProductDataType[]>([]);
    const [products, setProducts] = useState<ProductDataType[]>(productsNoFilter);
    const [currentPage, setCurrentPage] = useState(1);

    //menu kategoriák beálitása
    const [category, setCategory] = useLocalStorage<string>('category', "");

    //offcanvas beálitása
    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    //pagnatinon beálitása
    const [pages, setPages] = useState<number[]>([]);

    //product head filter
    const [postsPerPage, setPostsPerPage] = useLocalStorage<number>('pageProduct', 12);
    const [mainSort, setMainSort] = useLocalStorage<string>('mainSort', "");
    const [filteredProductsLength, setFilteredProductsLength] = useState(0);

    //kosár tartalma
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        [])
    const [show, setShow] = useState(false);

    //bejelentkezés
    const [email, setEmail] = useLocalStorage<string>("email", "");
    const [password, setPassword] = useState<string>("");

    const [isChecked, setIsChecked] = useLocalStorage<boolean>("isChecked", false);
    const [token, setToken] = useLocalStorage<string>("token", "")

    const [loginMessage, setLoginMessage] = useState<string[]>(["", ""]);
    const [userName, setUserName] = useLocalStorage<string>("userName", "");

    const [modalInfo, setModalInfo] = useState(false);
    const [isOpenLoginDropdown, setisOpenLoginDropdown] = useState<boolean>(false);

    const toggleDropdownLogin = () => setisOpenLoginDropdown(!isOpenLoginDropdown);

    const toggleInfoModal = () => setModalInfo(!modalInfo);
    // Megkeressük a kiválasztott értékhez tartozó elemet a filterMain tömbben
    const selectedIndexFilterMain = findFilterMainIndex(mainSort);

    // Megkeressük a kiválasztott értékhez tartozó elemet a productInPage tömbben
    const selectedIndexProductInPage = findProductInPageIndex(postsPerPage);

    /* ----pagenation var----- */
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const SHIPPING_FREE = 1_290;

    const menuList = Array.from(new Set(productsNoFilter.map((item) => item.SORTIMENT))).sort();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(`${URL}/products`);
                setProductsNoFilter(response.data);
            } catch (error) {
                console.error('Hiba a fetchelés során:', error);
            }
        }
        fetchProducts();
    }, []);


    useEffect(() => {
        const calculatedPages = Math.ceil(filteredProductsLength / postsPerPage);
        setPages(Array.from({ length: calculatedPages }, (_, index) => index + 1));
    }, [filteredProductsLength, postsPerPage]);

    useEffect(() => {
        const filteredDataLength = productsNoFilter.filter((data) => data.SORTIMENT === category).length;
        setFilteredProductsLength(filteredDataLength);

        const filteredAndSortedProducts = [...productsNoFilter]
            .filter((item) => item.SORTIMENT === category)
            .sort((a, b) => {
                switch (mainSort) {
                    case "cheap":
                        return a.CENA_S_DPH_EU_HUF - b.CENA_S_DPH_EU_HUF;
                    case "expensive":
                        return b.CENA_S_DPH_EU_HUF - a.CENA_S_DPH_EU_HUF;
                    case "A-Z":
                        return b.PRODUCT.localeCompare(a.PRODUCT);
                    case "Z-A":
                        return a.PRODUCT.localeCompare(b.PRODUCT);
                    default:
                        return 0;
                }
            });

        setFilteredProductsLength(filteredAndSortedProducts.length)

        //Lapozo oldall beálitása
        setProducts(filteredAndSortedProducts.slice(firstPostIndex, lastPostIndex));

        setPages(Array.from(
            { length: Math.ceil(filteredProductsLength / postsPerPage) },
            (_, index) => index + 1
        ))

    }, [category, mainSort, firstPostIndex, lastPostIndex, filteredProductsLength, postsPerPage, productsNoFilter]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getItemQuantity = (id: number) => {
        return cartItems.find((item) => item.id === id)?.quantity || "0";
    };

    const increaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: "1" }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id && Number(item.quantity) < MAX_LIMIT) {
                        return { ...item, quantity: String(Number(item.quantity) + 1) };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const decreaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === "1") {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: String(Number(item.quantity) - 1) };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((currItems) => {
            return currItems.filter((item) => item.id !== id);
        });
    };

    const cartQuantity = cartItems.reduce(
        (quantity, item) => Number(item.quantity) + Number(quantity),
        0
    );

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const INPUT_REGEXP = /[0-9/]+/;
        if (INPUT_REGEXP.test(e.key) ||
            e.key === "Backspace" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowLeft") {
            return;
        } else {
            e.preventDefault();
        }
    };

    //max korlát 
    const limitValue = (quantity: number): number => {
        return quantity > MAX_LIMIT ? MAX_LIMIT : quantity;
    };

    const searchValue = (quantity: string, id: number, isSelfIncrease: boolean) => {

        const value = limitValue(Number(quantity));

        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: String(value) }];
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {

                        const quantityValue = isSelfIncrease
                            ? String(Math.floor(Number(item.quantity)) + value)
                            : String(value);

                        // Korlátozás a max ra
                        const limitedQuantityValue = parseInt(quantityValue) > MAX_LIMIT ? String(MAX_LIMIT) : quantityValue;

                        return {
                            ...item,
                            quantity: value === 0 ? '' : limitedQuantityValue,
                        };
                    }
                    return item;
                });
            }
        });
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        if (Number(e.target.value) < 1) {
            searchValue("1", id, false);
        } else {
            searchValue(String(Math.abs(Number(e.target.value))), id, false);
        }
    }

    const setNumberValue = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        e.target.value === "" ?
            (searchValue(" ", id, false))
            : (searchValue(String(Math.floor(Math.abs(Number(e.target.value)))), id, false));
    }

    const setValue = (id: number) => {
        if (cartItems) {
            const foundItem = cartItems.find((item) => item.id === id);
            if (foundItem) {
                return foundItem.quantity
            }
        }
        return "0";
    }

    //Árak kerekitése.
    const roundToNearestMultiple = (number: number) => {
        if (number >= 1000) {
            return (Math.ceil(number / 100) * 100 - 10);
        } else if (number >= 100) {
            return Math.ceil(number / 10) * 10;
        } else {
            return number;
        }
    };

    //Árak formázása
    const formatPrice = (price: number) => {
        return price.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const cardSum = (shoppingFreebool: Boolean) => {
        const value = cartItems
            .reduce((total, cartItem) => {
                const item = productsNoFilter.find(
                    (i) => i.ID_PRODUC === cartItem.id
                );
                return (
                    total +
                    roundToNearestMultiple(item?.CENA_S_DPH_EU_HUF || 0) *
                    Number(cartItem.quantity)
                );
            }, 0)

        if (shoppingFreebool) {
            return formatPrice(value + SHIPPING_FREE);
        } else {
            return formatPrice(value);
        }
    }

    useEffect(() => {

        if (token) {
            // A kosár frissítése az adatbázisban
            const updateCart = async (token: string, cartItems: CartItem[]) => {
                try {
                    // API-hívás az adatok frissítéséhez
                    await axios.post(`${URL}/update-cart`, { token, cartItems });
                    //console.log('A kosár sikeresen frissült az adatbázisban.');
                } catch (error) {
                    console.error('Hiba történt a kosár frissítése közben:', error);
                }
            };

            // A változás kezelése, és a kosár frissítése
            if (token !== null) {
                updateCart(token, cartItems);
            } else {
                updateCart("", cartItems);
            }
        }
    }, [cartItems, token]);

    // bejelentkezés
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (email !== "" && password !== "") {
            e.preventDefault();

            try {
                const response = await axios.post(`${URL}/auth/login`, { email, password });
                const token = response.data.token;

                setUserName(response.data.user.firstName + " " + response.data.user.lastName)

                setToken(token);

                setLoginRegModalInfo("successful")
                toggleDropdownLogin();

                if (!isChecked) {
                    localStorage.removeItem('email');
                }

                const loginShopCard = response.data.shopCard
                if (Array.isArray(loginShopCard) && loginShopCard.length > 0) {
                    setCartItems(loginShopCard)
                }

            } catch (error) {
                //console.error('Hiba történt a bejelentkezés közben:', error);
                setLoginRegModalInfo("error")
            }
        } else {
            setLoginRegModalInfo("incomplete")
        }
    };

    const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const getPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    //kijelentkezés
    const handleLogout = () => {
        setToken("")
        localStorage.removeItem('token');
        //window.location.reload();
        setCartItems([])
    };

    const setLoginRegModalInfo = (code: string, value?: string) => {
        const vale = value ?? "";
        setLoginMessage([code, vale]);
        toggleInfoModal();
    };

    const contextValue: ShopContextProps = {

        products,
        currentPage,
        setCurrentPage,
        postsPerPage,
        setPostsPerPage,
        category,
        setCategory,
        menuList,
        filteredProductsLength,
        pages,
        showMenu,
        handleCloseMenu,
        handleShowMenu,
        setMainSort,
        selectedIndexProductInPage,
        selectedIndexFilterMain,
        productsNoFilter,
        cartItems,
        show,
        handleClose,
        handleShow,
        getItemQuantity,
        decreaseCartQuantity,
        increaseCartQuantity,
        cartQuantity,
        searchValue,
        removeFromCart,
        roundToNearestMultiple,
        formatPrice,
        limitValue,
        handleKeyPress,
        cardSum,
        handleBlur,
        setNumberValue,
        setValue,
        SHIPPING_FREE,
        handleSubmit,
        getEmail,
        getPassword,
        email,
        password,
        token,
        handleLogout,
        loginMessage,
        toggleInfoModal,
        modalInfo,
        userName,
        isOpenLoginDropdown,
        toggleDropdownLogin,
        handleCheckboxChange,
        isChecked,
        setLoginRegModalInfo

    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContext;
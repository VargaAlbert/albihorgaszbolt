import { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import URL from "../../data/Url";
import axios from 'axios';

import Style from "./Registration.module.scss"

type regType = {
    firstName: string,
    lastName: string,
    password: string,
    passwordTwo: string,
    email: string,
    phone: string
}

const Registration: React.FC = () => {

    const [form, setForm] = useState<regType>({
        firstName: "",
        lastName: "",
        password: "",
        passwordTwo: "",
        email: "",
        phone: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const {
        setLoginRegModalInfo,
    } = useShopContext();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {
            firstName,
            lastName,
            email,
            password,
            passwordTwo,
            phone
        } = form;

        if (firstName === "" || lastName === "" || email === "" || password === "" || passwordTwo === "") {
            setLoginRegModalInfo("reg-incomplete")
        } else if (password !== passwordTwo) {
            setLoginRegModalInfo("reg-error-password");
        } else {
            try {
                const response = await axios.post(`${URL}/auth/register`, { firstName, lastName, password, email, phone });
                //console.log('Sikeres regisztráció:', response.data);
                setLoginRegModalInfo("reg-successful");
            } catch (error: any) {
                if (error.response && error.response.data && error.response.data.email) {
                    const existingEmail: string = error.response.data.email;
                    //console.error('Hiba történt a regisztráció közben:', existingEmail, "már foglalt");
                    setLoginRegModalInfo("reg-error-existingEmail", existingEmail);
                } else {
                    //console.error('Hiba történt a regisztráció közben:', error);
                    setLoginRegModalInfo("reg-error");
                }
            }
        }
    };

    return (
        <section className={Style.mainContainer}>
            <div className={Style.container}>
                <h2>Regisztráció</h2>
                <p>Regisztrálj az AlbiHorgászbolt Webáruházba, és légy a törzsvásárlónk ahol egyedi kedvezményeket érhetsz el, és mindig friss akciók várnak rád.</p>
                <form className={Style.registration} onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Vezetékneved*"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Keresztneved*"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Jelszó*"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Jelszó újra*"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail címed*"
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefonszámod"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">REGISZTRÁCIÓ</button>
                </form>
            </div>
        </section>
    );
}

export default Registration;
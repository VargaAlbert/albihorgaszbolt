import { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import URL from "../../data/Url";
import axios from 'axios';

import Style from "./Registration.module.scss"

const Registration: React.FC = () => {

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setlastName] = useState<string>('');
    const [passwords, setPasswords] = useState<string[]>(['', '']);
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    const {
        setLoginRegModalInfo,
        toggleDropdownLogin,
    } = useShopContext();

    const handlePasswordChange = (index: number, value: string) => {
        const updatedPasswords = [...passwords];
        updatedPasswords[index] = value;
        setPasswords(updatedPasswords);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (firstName === "" || lastName === "" || email === "" || passwords[0] === "" || passwords[1] === "") {
            setLoginRegModalInfo("reg-incomplete")
        } else if (passwords[0] !== passwords[1]) {
            setLoginRegModalInfo("reg-error-password");
        } else {
            const password = passwords[0];
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
                            placeholder="Vezetékneved*"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Keresztneved*"
                            value={lastName}
                            onChange={(e) => setlastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Jelszó*"
                            value={passwords[0]}
                            onChange={(e) => handlePasswordChange(0, e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Jelszó újra*"
                            value={passwords[1]}
                            onChange={(e) => handlePasswordChange(1, e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="E-mail címed*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="tel"
                            placeholder="Telefonszámod"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button type="submit">REGISZTRÁCIÓ</button>
                </form>
            </div>
        </section>
    );
}

export default Registration;
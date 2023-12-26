import logo from "../../images/logo.svg";
import logo1 from "../../images/logo1.svg";
import logo2 from "../../images/logo2.svg";
import login from "../../images/login.svg";
import cart from "../../images/cart.svg";
import register from "../../images/register.svg";
import "./Navigation.css";

import React from "react";
import { Link } from "react-router-dom";


const Navigation = () => {

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link className="logo" to="/">
                        <img src={logo} />
                    </Link>
                    <nav className="menu">
                        <ul className="menu__list">
                            <li className="menu__item">
                                <Link to="#" className="menu__link">Шаурма</Link>
                            </li>
                            <li className="menu__item">
                                <Link to="#" className="menu__link">Піца</Link>
                            </li>
                            <li className="menu__item">
                                <Link to="#" className="menu__link">Картопля фрі</Link>
                            </li>
                            <li className="menu__item">
                                <Link to="#" className="menu__link">Напої</Link>
                            </li>
                        </ul>
                    </nav>
                    <ul className="user__actions">
                        <li className="user-action__item">
                            <Link className="user-action__link" to="#">
                                <img src={register} />
                            </Link>
                        </li>
                        <li className="user-action__item">
                            <Link className="user-action__link" to="/login">
                                <img src={login} />
                            </Link>
                        </li>
                        <li className="user-action__item">
                            <Link className="user-action__link" to="#">
                                <img src={cart} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Navigation;
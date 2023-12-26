import React from "react";

import './AdminDashboard.css';
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
        <div className="position__blocks">
            <div className="container__dashboard-nav">
                <div className="wrapper__main-nav-text">
                    <Link className="main__nav-text" to={"/admin/dashboard"}>Адмін панель</Link>
                </div>
                <nav className="menu__dashboard">
                    <ul className="menu__list-dashboard">
                        <li className="menu__item-dashboard">
                            <Link to={"/admin/dashboard/measurement"} className="menu__link">Міри виміру</Link>
                        </li>
                        <li className="menu__item-dashboard">
                            <Link to={"/admin/dashboard/product"} className="menu__link">Продукти</Link>
                        </li>
                        <li className="menu__item-dashboard">
                            <Link to={"/admin/dashboard/role"} className="menu__link">Ролі</Link>
                        </li>
                        <li className="menu__item-dashboard">
                            <Link to={"/admin/dashboard/type-product"} className="menu__link">Типи продуктів</Link>
                        </li>
                        <li className="menu__item-dashboard">
                            <Link to={"/admin/dashboard/user"} className="menu__link">Користувачі</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminDashboard;


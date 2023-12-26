import React, { useState } from "react";
import { sendLoginData } from "../../services/login.service";

import "./Login.css";

const Login = () => {
    const [logInUserModel, setLoginUserModel] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setLoginUserModel({
            ...logInUserModel,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        sendLoginData(logInUserModel)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="login__container">
                <div className="header__text">
                    <h1>
                        Login
                    </h1>
                </div>
                <div className="login__form">
                    <div className="form">
                        <form>
                            <label htmlFor="email" className="lable">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={logInUserModel.email}
                                onChange={onChange}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={logInUserModel.password}
                                onChange={onChange}
                            />
                        </form>
                    </div>
                    <div className="login__button">
                        <input type="button" className="button" value="Login" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
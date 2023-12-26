import "./Home.css";
import { getStr } from "../../services/home.service";
import Navigation from "../navigation/Navigation";

import React, { useEffect, useState } from "react";

const Home = () => {

    const [str, setStr] = useState("");

    // useEffect(() => {
    //     getStr()
    //         .then((response) => {
    //             setStr(response.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, []);

    return (
        <>
            <Navigation />
            <div className="aaa">
                <p>Home component!</p>
                <b>It's working now!</b>
                <h4>{str}</h4>
            </div>
        </>

    );
}

export default Home;
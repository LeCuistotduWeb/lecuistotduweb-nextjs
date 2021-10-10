import React from "react";
import Header from "../components/header/Header";

const DefaultLayout = (props) => {
    return (
        <div className="wrapper">
            <Header/>
            {props.children}
        </div>
    )
}

export default DefaultLayout
import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DefaultLayout = (props) => {
    return (
        <div className="default-layout">
            <Header/>
            {props.children}
            <Footer/>
        </div>
    )
}

export default DefaultLayout
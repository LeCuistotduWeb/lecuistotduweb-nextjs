import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const DefaultLayout = (props) => {
    return (
        <div className="wrapper">
            <Header/>
            {props.children}
            {/*<Footer/>*/}
        </div>
    )
}

export default DefaultLayout
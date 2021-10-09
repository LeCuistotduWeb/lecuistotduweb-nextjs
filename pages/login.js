import React, {useState} from 'react';
import DefaultLayout from "../layouts/DefaultLayout";
import useAuth from "../context/authContext";
// import styles from "../styles/modules/loginForm.module.scss"

const LoginPage = (props) => {
    const {} = props
    const {login, isAuthenticated} = useAuth()
    const [values, setValues] = useState(
        {
            username: "",
            password: "",
        }
    )

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();
        login(values.username,values.password)
    }

    return (
        <DefaultLayout>
            {/*<div className={"container"}>*/}
            {/*    <h1 className="sectionTitle">Connection</h1>*/}
            {/*</div>*/}
            {/*<div className="container">*/}
            {/*    <form onSubmit={handleSubmit} className={styles.form}>*/}
            {/*        <div>*/}
            {/*            <input*/}
            {/*                value={values.username}*/}
            {/*                onChange={handleChange('username')}*/}
            {/*                type="text"*/}
            {/*                placeholder="username"*/}
            {/*                className={styles.input}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <input*/}
            {/*                value={values.password}*/}
            {/*                onChange={handleChange('password')}*/}
            {/*                type="password"*/}
            {/*                placeholder="password"*/}
            {/*                className={styles.input}*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <button type="submit">Se connecter</button>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </DefaultLayout>
    );
}

export default LoginPage
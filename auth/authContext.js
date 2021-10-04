import React, {useState, useContext, createContext, useEffect} from "react";
import Router from 'next/router'

const AuthContext = createContext({
    username: null,
    isLogged: false,
})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = async (username, password) => {
        if(sessionStorage.getItem('user')){
            setUser(JSON.parse(sessionStorage.getItem('user')))
        }
        else if((process.env.NEXT_PUBLIC_USER_PASSWORD === password) && (process.env.NEXT_PUBLIC_USER_USERNAME === username)){
            const userData = {username}
            setUser(userData)
            sessionStorage.setItem('user', JSON.stringify(userData))
            await Router.push('/admin')
        }
        else {
            setUser(null)
        }
    }

    useEffect(() => {
        login()
    }, []);

    const logout = async () => {
        sessionStorage.removeItem('user')
        setUser(null)
        Router.push('/login')
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: !!user,
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth(){
    return useContext(AuthContext)
}
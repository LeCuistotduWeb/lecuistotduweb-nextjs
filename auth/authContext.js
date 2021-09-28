import React, {useState, useContext, createContext} from "react";
import Router from 'next/router'

const AuthContext = createContext({
    username: null,
    isLogged: false,
})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = async (username, password) => {
        console.log({username}, {password}, process.env.USER_PASSWORD, process.env.USER_USERNAME, (process.env.USER_PASSWORD === password), (process.env.USER_USERNAME === username))
        if(sessionStorage.getItem('user')){
            setUser(JSON.parse(sessionStorage.getItem('user')))
        }
        else if((process.env.NEXT_PUBLIC_USER_PASSWORD === password) && (process.env.NEXT_PUBLIC_USER_USERNAME === username)){
            const userData = {
                username,
                isLogged: true,
            }
            setUser({username})
            sessionStorage.setItem('user', JSON.stringify(userData))
            // await Router.push('/')
        } else {
            setUser(null)
        }
    }

    const logout = async () => {
        sessionStorage.removeItem('user')
        setUser(null)
        Router.push('/')
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
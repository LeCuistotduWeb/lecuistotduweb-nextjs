import {useState, useEffect} from 'react'

const useCustomHook = () => {
    const [isConnect, setIsConnect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const login = () => {
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
            setIsConnect(true)
        },2000)
    }

    const logout = () => {
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
            setIsConnect(false)
        },2000)
    }

    useEffect(()=>{

    },[])

    return {
        isConnect,
        login,
        logout,
        isLoading,
    }
}

export default useCustomHook;
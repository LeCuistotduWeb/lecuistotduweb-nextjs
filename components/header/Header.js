import React from 'react';
import SettingsControls from "./SettingsControls";
import { useRouter } from 'next/router'

const Header = (props) => {
    const {} = props
    const router = useRouter()

    const ChevronLeftIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--color)"
             className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
    )

    return (
        <header className="header">
            {router.pathname !== "/" && (
                <button onClick={() => router.back()} className="btn-back btn btn-rounded">
                    <ChevronLeftIcon/>
                </button>
            )}
            <SettingsControls/>
        </header>
    )
}

export default Header
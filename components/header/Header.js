import React from 'react';
import SettingsControls from "./SettingsControls";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

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
                <div style={{display: 'flex'}}>
                    <div>
                        <Link href="/" passHref>
                            <a title="Retour accueil" aria-label="Accueil">
                                <Image alt="profile LeCuistotduWeb" width={50} height={50} src="/images/profile/perso.svg"/>
                            </a>
                        </Link>
                    </div>
                    <button onClick={() => router.back()} className="btn-back btn btn-rounded shadow">
                        <ChevronLeftIcon/>
                    </button>
                </div>
            )}
            <SettingsControls/>
        </header>
    )
}

export default Header
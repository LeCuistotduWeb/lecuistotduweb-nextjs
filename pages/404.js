import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../layouts/DefaultLayout";

export default function Custom404() {
    return (
        <DefaultLayout>
            <div className="container-md text-center page-404">
                <div className="404-content">
                    <Image height={300} width={300} src="/images/profile/perso.svg" className="responsive-img" alt="favicon illustration avatar le cuistot du web"/>
                    <div className="text-404">404 Not Found</div>
                    <h1>Hey tu t'es perdu ?</h1>
                    <p>
                        La page que tu as demandé n'a pas pu être localisée. Vérifie l'url ou <Link href="/">retourne sur
                        la page d'accueil</Link>.
                    </p>
                </div>
            </div>
        </DefaultLayout>
    )
}
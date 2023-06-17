import React, {useState, useEffect} from 'react'

const quotes = [{
    "quote": "Avant de vouloir qu’un logiciel soit réutilisable, il faudrait d’abord qu’il ait été utilisable.",
    "author": " Ralph Johnson"
}, {
    "quote": "Il y aura deux sortes de personnes dans le monde, celles qui disent aux ordinateurs ce qu’elles doivent faire et celles qui sont informées par les ordinateurs.",
    "author": "Marc Andreesen"
}, {
    "quote": "On considère que les neuf dixièmes du code correspondent à environ 90% du temps de développement. Les 10% restant correspondent également à 90% du temps de développement .",
    "author": " Tom Cargill"
}, {
    "quote": "On considère que les neuf dixièmes du code correspondent à environ 90% du temps de développement. Les 10% restant correspondent également à 90% du temps de développement .",
    "author": "Tom Cargill"
}, {
    "quote": "Aujourd’hui, la programmation est devenue une course entre le développeur, qui s’efforce de produire de meilleures applications à l’épreuve des imbéciles et l’univers, qui s’efforce de produire de meilleurs imbéciles. Pour l’instant, l’univers a une bonne longueur d’avance .",
    "author": "Rich Cook"
}, {
    "quote": "Si debugger, c’est supprimer des bugs, alors programmer ne peut être que les ajouter",
    "author": "Edsger Dijkstra"
}, {
    "quote": "Un geek ne crie pas, il url.",
    "author": ""
}, {
    "quote": "Tu ne feras pas de mise en prod le vendredi.",
    "author": ""
}, {
    "quote": "Tout est possible en trois lignes de css.",
    "author": "M"
}]

const RandomQuote = (props) => {
    const {} = props
    const [quote, setQuote] = useState(quotes[0])
    const TIMER = 3000

    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(getQuote())
        }, TIMER);
        return () => clearInterval(interval);
    }, []);

    const getQuote = () => {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    return (
        <div className="random-quote">
            <span className="quote-icon icon-quote-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            </span>
            <div className="quote-title">Citation aléatoire :</div>
            <blockquote>
                {quote && (
                    <>
                        <span className="quote-content">{quote.quote}</span>
                        {quote.author && (<div>
                            <span className="quote-author"><em>{quote.author}</em></span>
                        </div>)}
                    </>
                )}
            </blockquote>
            <span className="quote-icon icon-quote-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"/></svg>
            </span>
        </div>
    )
}

export default RandomQuote
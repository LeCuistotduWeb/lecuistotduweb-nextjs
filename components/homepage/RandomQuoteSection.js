import React from 'react';
import RandomQuote from "../footer/RandomQuote";

const RandomQuoteSection = (props) => {

    const {} = props

    return (
        <div className="random-quote-section section container">
            <div className="card rainbow">
                <RandomQuote/>
            </div>
        </div>
    );
}

export default RandomQuoteSection
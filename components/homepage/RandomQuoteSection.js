import React from 'react';
import RandomQuote from "../footer/RandomQuote";

const RandomQuoteSection = ({}) => {
    return (
        <div className="section-random-quotes section container">
            <div className="card rainbow">
                <RandomQuote/>
            </div>
        </div>
    );
}

export default RandomQuoteSection
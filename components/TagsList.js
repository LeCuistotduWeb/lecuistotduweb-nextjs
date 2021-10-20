import React from 'react';

const TagsList = (props) => {

    const {tags} = props

    if(tags && tags.length <= 0)  null

    return (
        <div className="tags">
            <div>Tags:</div>
            {tags.map((tag, index) => (
                <span className="tag" key={index}>{tag}</span>
            ))}
        </div>
    );
}

export default TagsList
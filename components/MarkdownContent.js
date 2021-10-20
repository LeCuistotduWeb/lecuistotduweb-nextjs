import React from 'react';

const MarkdownContent = ({content}) => {

    if(!content) return null
    return (
        <div dangerouslySetInnerHTML={{__html: content}}/>
    );
}

export default MarkdownContent
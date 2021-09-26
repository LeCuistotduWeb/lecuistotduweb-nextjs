import React from 'react';
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

const MarkdownContent = (props) => {

    const {content} = props

    return (
        <ReactMarkdown rehypePlugins={[rehypeRaw]} children={content} />
    );
}

export default MarkdownContent
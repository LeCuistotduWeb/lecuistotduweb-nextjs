import React from 'react';
import propTypes from 'prop-types';
import LinkedinSvg from '../../public/images/svg/linkedin.svg'
import GithubSvg from '../../public/images/svg/github.svg'
import CodepenSvg from '../../public/images/svg/codepen.svg'

const Svg = (props) => {
    const {name, width=30, height=30} = props
    const renderSvg = (name) => {
        switch (name) {
            case 'codepen':
                return <CodepenSvg/>
            case 'github':
                return <GithubSvg/>
            case 'linkedin':
                return <LinkedinSvg/>
            default:
                return null
        }
    }

    if(!name) return null

    return (
        <span className={`svg svg-${name}`}>
            {renderSvg}
            {name === 'codepen' && (
                <CodepenSvg/>
            )}
        </span>
    );
}

Svg.propTypes = {
    name: propTypes.oneOf(['codepen', 'linkedin', 'github']),
    width: propTypes.string,
    height: propTypes.string,
}

export default Svg
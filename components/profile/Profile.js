import propTypes from 'prop-types';
import {useState} from "react";

const defaultType = [
    {label: 'Default', value: 'default'},
    {label: 'Hulk', value: 'hulk'},
    {label: 'Terminator', value: 'terminator'}
]

export default function ProfileSvg(props){
    const {size=250, type="default"} = props
    const [useType, setUseType] = useState(type);
    const [toggleSettings, setToggleSettings] = useState(false);
    // const [mousePosition, setMousePosition] = useState({x:0, y:0})

    const handleChangeType = e => {
        if(e.target.value !== useType) {
            setUseType(e.target.value)
            setToggleSettings(false)
        }
    }

    // useEffect(() => {
    //     document.addEventListener('mousemove', (e)=>{
    //         setMousePosition({x: e.clientX, y:e.clientY })
    //     })
    //     return () => {
    //         document.removeEventListener('mousemove');
    //     };
    // }, []);



    const handleToggleSettings = t => {
        setToggleSettings(!toggleSettings)
    }

    return (
        <div className="profile-svg-container">
            {toggleSettings && (
                <div className="profile-svg-settings">
                    <div>
                        <form onChange={handleChangeType} className="profile-svg-form">
                            {defaultType.map((el, i) => (
                                <div className="profile-svg-form-items" key={i}>
                                    <label className="profile-svg-form-label" htmlFor={el.value} >{el.label}</label>
                                    <input className="profile-svg-form-input" type="radio" name="type" id={el.value} value={el.value}/>
                                </div>
                            ))}
                        </form>
                    </div>
                    <button className="profile-svg-settings-close btn btn-secondary" onClick={handleToggleSettings}>Fermer</button>
                </div>
            )}

            <div className="svg-container">
                <span className="profile-svg-text" onClick={handleToggleSettings}>Click me</span>
                <svg onClick={handleToggleSettings} className={`profileSvg ${useType}`} width={size} height={size} id="Calque_6" data-name="Calque 6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
                    <path data-name="oreille gauche" className="oreille-gauche" d="M206.72,149.2s-6.82,21.1-24,17.53,10.39-49.35,10.39-49.35S212.24,121,206.72,149.2Z"/>
                    <path data-name="oreille gauche" className="oreille-droite" d="M43.28,149.2s6.82,21.1,24,17.53-10.39-49.35-10.39-49.35S37.76,121,43.28,149.2Z"/>
                    <path data-name="visage" className="visage" d="M106.06,241.42s-8.45-6.5-9.42-8.12-12.34-11-14.94-11.69-13-14.29-15.91-27.93c-.31-1.44-.74-3.57-1.27-6.25C60,164.68,48.76,102.13,50.21,83c1.62-21.43,151-11.37,151-11.37s-.82,10.39-.82,11.86-.81,27.11-2.43,37.34-9.9,63.48-10.23,65.75-8.44,26.46-15.42,32-20.13,14.13-21,16.73S137.88,252.13,106.06,241.42Z"/>
                    <polygon className="nez" points="124.09 129.49 118.67 164.92 127.38 169.87 120.53 164.23 124.09 129.49"/>
                    <path className="barbe" d="M192.29,164a.88.88,0,0,0-1.22-.63c-8.13,2.4-12.58,29.35-19.44,34.85-9.09,7.29-17.42-10-37-14.46-4-.9-23.71-2.38-35.21,9.53-18,18.69-35.25-29.93-38.9-25.94-.38.41,3,16.08,4,21.42.53,2.68,1,5.1,1.34,6.54a59,59,0,0,0,8.83,19.81,48.28,48.28,0,0,0,5.43,6.36c1.9,1.95,4.28,2.95,6.51,4.51,4.65,3.26,8.35,7.31,12.49,11.13a30.89,30.89,0,0,0,10.7,6.23c11.27,4,26.06,5.23,36.78-1.06a20.24,20.24,0,0,0,3.87-2.65,31.46,31.46,0,0,0,3-3.92c2.55-3.36,6.2-5.58,9.59-8,3.62-2.56,7.21-5.26,10.69-8,7-5.52,15.1-29.71,15.43-32,.13-.92,1.55-10.1,3.3-21.41A5.52,5.52,0,0,0,192.29,164Z"/>
                    <g className="bouche">
                        <path className="bouche-interieur" d="M146,200.19l-4.74.91c-4.55-1.54-31.82.57-31.82.57a15.23,15.23,0,0,1-3.47-1.11c-2.21.89-3.48,1.93-3.48,3,0,2.16,4.83,4.05,12,5.06-1.71-.58-2.4-1.3-1.37-2.08s6.94-.09,9.06-.06c4.27,0,3.47.64,5,.86s1.54-1.09,5.15-.7,8.06-.83,8.06-.1-.73,1.56-2,2.09c7.22-1,12.1-2.9,12.1-5.07C150.49,202.32,148.8,201.15,146,200.19Z"/>
                        <path className="bouche-interieur" d="M142,201.67c1.17,0,3.93-1.48,3.93-1.48-4.36-1.48-11.46-2.44-19.49-2.44a71.91,71.91,0,0,0-18.08,2c-.91.25-1.73.53-2.46.81a17.37,17.37,0,0,0,3.47,1.11S136.79,201.75,142,201.67Z"/>
                        <path className="langue" d="M132.69,205.16c-3.62-.39-4.47,1-6,.78a31.3,31.3,0,0,0-6.89-.76c-2.12,0-5.87.73-6.75,1.4s-.34,1.5,1.37,2.08a91.73,91.73,0,0,0,23.95,0c1.22-.53,2-1.22,2-2.09S136.3,205.55,132.69,205.16Z"/>
                    </g>
                    <path data-name="sourcil-droite" className="sourcil-droite" d="M105.23,99.88c8.34.88,9.52-3.11,9.52-3.11S87.09,92.17,75.17,95s-17.61,9.84-14,8.29C71,99.07,86.38,97.89,105.23,99.88Z"/>
                    <path data-name="sourcil-gauche" className="sourcil-gauche" d="M147.78,101c-8.34.88-9.51-3.11-9.51-3.11s27.65-4.61,39.58-1.79,17.61,9.84,14,8.28C182,100.21,166.64,99,147.78,101Z"/>
                    <path data-name="lunette" className="lunette" d="M193.84,103.67c-2.52-1.06-15.18-6.82-29.71-5.93s-22.42,2.84-24.76,3.65c-16.3,5.67-17.51,2.4-23.7.65-6.84-1.93-19.65-5.22-28.09-4.39S66.47,99.77,63.23,102s-6.34,3-11.37,3.36l1.52,13.2s6.06-.86,6.92,7.58,2.17,22.73,14.07,22.73c0,0,17.54,1.73,24.68,0s13-3,15.16-7.79,4.32-8.76,4.76-13.58,2.6-13.92,7.36-14.57,6.92,9.75,6.92,9.75S136.07,137,137.37,139s1.84,6,7.2,7.47,4,3.32,28.49,3.26c0,0,6.65-.64,8.85-1.45s5.92-1.46,8.44-10.23a94.57,94.57,0,0,0,3.16-15.66s.57-3.66,6.09-3.58c0,0,1.55-10.55,1.46-13.71A30,30,0,0,1,193.84,103.67Zm-81.58,33.12c-1.14,1.78-2.76,5.19-8.12,6.65s-18.67,2.76-25,1.63-11.53-2.28-12.83-7.8a189.34,189.34,0,0,1-2.92-23.7s-1.62-6.82,6.66-8.44,13.15-2.93,19.48-2.44,15.26,1.46,18.18,2.6,8.61,2.76,8.44,8.28S113.39,135,112.26,136.79Zm74.52,0c-1.14,1.78-1.63,5.78-7.8,7.73-5.29,1.67-19,1.68-25.32.55s-10.52-2.62-12.83-7.8-4.09-20.07-4.06-23c0,0-.48-7.57,7.8-9.19s13.15-2.93,19.48-2.44,15.26,1.46,18.18,2.6,8.61,2.76,8.44,8.28S187.91,135,186.78,136.79Z"/>
                    <ellipse className="oeil-droit-fond" cx="89.89" cy="125.05" rx="13.41" ry="17.88"/>
                    <ellipse className="oeil-droit-color" cx="89.89" cy="127.75" rx="7.04" ry="8.05"/>
                    <ellipse className="oeil-droit-inter" cx="89.89" cy="127.75" rx="5.29" ry="6.04"/>
                    <ellipse className="oeil-gauche-fond" cx="165.59" cy="125.05" rx="13.41" ry="17.88"/>
                    <ellipse className="oeil-gauche-color" cx="165.59" cy="127.75" rx="7.04" ry="8.05"/>
                    <ellipse className="oeil-gauche-inter" cx="165.59" cy="127.75" rx="5.29" ry="6.04"/>
                    <path className="cheveux" d="M50.32,84.85s9.09-3.73,11.85-6.49a45.71,45.71,0,0,1,4.06-3.74s-.49,6.5-2.6,7.31S70.29,80,74,72a52.4,52.4,0,0,0-.21,6.62c.21,1.82,3.62,11.07,3.62,11.07S76,82.9,81,75.11c0,0,19.16,16.72,43.19,13.64,0,0-9.9-2.6-8.93-3.41,0,0,35.56,2.44,43.67-2.92,0,0-13-3.25-11.2-10.39,0,0,27.28,15.58,38.48,10.55,0,0-3.41-3.41-3.57-4.38S193,81.61,195.3,84.37a4.77,4.77,0,0,0,5.52,1.29s1.46-19.64,1-23.54.33-14-1.78-17.69a61,61,0,0,0-.65,7c.16,1.13-6.17-9.91-8.12-12.5S178.42,27.38,177,22.83,174,9.36,174.52,7.25c0,0-7.14,8.12-4.55,14.77,0,0-8.11-12-6.17-18.67,0,0-26.46,5.36-30.19,9.91a20,20,0,0,1,4.54-6.82s-25.61-2.38-30.59,12.12c0,0-5.84-1.73-3.66-5.3C105.27,11,87.34,16.83,86,21.54c0,0-2.29-1.57,0-6.34,2.11-4.4-14.61,7.63-14.29,13.32,0,0-.16-10.23.32-10.72S59.25,34.69,57.79,40a29.84,29.84,0,0,0-6.5,14C50.16,62,48.21,81.28,50.32,84.85Z"/>
                </svg>
            </div>
            <span className={`overlay ${toggleSettings ? 'is-show' : ''}`} onClick={e =>setToggleSettings(false)}/>
        </div>
    )
}

ProfileSvg.propTypes = {
    type: propTypes.oneOf(['default', 'hulk', 'superman']),
    size: propTypes.number
}
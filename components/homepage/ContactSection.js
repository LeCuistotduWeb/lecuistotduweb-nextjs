import React, {useState} from 'react';
import RandomQuote from "../footer/RandomQuote";

const ContactSection = (props) => {
    
    // const {} = props
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [message, setMessage] = useState('')
    // const [submitted, setSubmitted] = useState(false)

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('Sending')
    //     let data = {
    //         name,
    //         email,
    //         message
    //     }
    //     fetch('/api/contact', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     }).then((res) => {
    //         console.log('Response received')
    //         if (res.status === 200) {
    //             console.log('Response succeeded!')
    //             setSubmitted(true)
    //             setName('')
    //             setEmail('')
    //             setBody('')
    //         }
    //     })
    // };

    return (
        <div className="section container-md section-contact">
            <div className="text-center">
                <h2 className="section-title">Contactez-moi</h2>
                <p>Vous avez un projet ou opportunité ? Vous voulez me recruter ? Envoyez-moi un email à l'adrresse <a href="mailto:contact@lecuistotduweb.fr">contact@lecuistotduweb.fr</a></p>
            </div>
            {/*<form action="">*/}
            {/*    <input value={name} placeholder="Name" onChange={(e)=>{setName(e.target.value)}} type="text" name="name"/>*/}
            {/*    <input value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} type="text" name="email"/>*/}
            {/*    <textarea value={message} onChange={(e)=>{setMessage(e.target.value)}} name="message" placeholder="message..."/>*/}
            {/*    <input type='submit' onClick={(e)=>{handleSubmit(e)}}/>*/}
            {/*</form>*/}
        </div>
    );
}

export default ContactSection
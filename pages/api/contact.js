require('dotenv').config()

export default function (req, res) {

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.EMAIL_GOOGLE,
            pass: process.env.EMAIL_PASSWORD,
        },
        secure: true,
    })

    const mailData = {
        from: req.body.email,
        to: process.env.EMAIL_TO,
        subject: `[LCDW_CONTACT_FORM] Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
    }

    transporter.sendMail(mailData)
        .then(response => {
            res.status(200)
            console.log({response})
        })
        .catch(err => {
            res.status(404)
            console.error({err})
        });
}
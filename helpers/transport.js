const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: `dijevic.developer@gmail.com`, // generated ethereal user
        pass: `dhntyozulyhpayyf`, // generated ethereal password
    },
});


// transporter.verify().then(() => {
//     console.log('ready for sending emails')
// })

module.exports = transporter
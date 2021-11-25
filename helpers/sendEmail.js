const transporter = require('./transport')





const sendRecoverEmail = async (email, link) => {
    await transporter.sendMail({
        from: '"Calendar app " <dijevic.developer@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "recover password", // Subject line
        text: "here you have the link to recover your password", // plain text body
        html: `
        <b>click the following link or paste it on you browser</b>
        <a href="${link}">recover password</a>`
    });
}
const sendRegistrationEmail = async (email, link) => {



    await transporter.sendMail({
        from: '"Calendar app " <dijevic.developer@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "confirm your email", // Subject line
        text: "Confirm you email !", // plain text body
        html: `<p>Hi ! here you have your link to finish the registration process</p>
        <a href="${link}">Finish the registration</a>
        <b>click the following link or paste it on you browser</b>`
    })




}

module.exports = {
    sendRecoverEmail,
    sendRegistrationEmail
}
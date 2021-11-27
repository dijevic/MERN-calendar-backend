const transporter = require('./transport')





const sendRecoverEmail = async (email, link) => {
    await transporter.sendMail({
        from: '"Calendar app " <dijevic.developer@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "recover password", // Subject line
        text: "here you have the link to recover your password", // plain text body
        html: `
        <b>Recover your account with the following link</b><br>
        <a href="${link}">recovering link</a><br>
        <b>if the link does not work, please copy and paste the following link ${link} </b>`
    });
}
const sendRegistrationEmail = async (email, link) => {



    await transporter.sendMail({
        from: '"Calendar app " <dijevic.developer@gmail.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "confirm your email", // Subject line
        text: "Confirm you email !", // plain text body
        html: `<p>Hi ! here you have your link to finish the registration process</p>
        <a href="${link}">  <b>Finish the registration</b>  </a><br>
        <b>if the link does not work, please copy and paste the following link ${link} </b>`
    })




}

module.exports = {
    sendRecoverEmail,
    sendRegistrationEmail
}
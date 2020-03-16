const nodemailer = require("nodemailer");

const transporter = () => {
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASSWORD
        }
    })
}

const getPasswordResetURL = (user, token) =>
    `http://localhost:3000/password/reset/${user.id}/${token}`


const resetPasswordTemplate = (user, url) => {
    const from = process.env.EMAIL_LOGIN
    const to = user.email
    const subject = "🌻 Farm Manager Password Reset 🌻"
    const View = `
        <Text>Hey ${user.displayName || user.email},</Text>
        <Text>We heard that you lost your Farm Manager password. Sorry about that!</Text>
        <Text>But don’t worry! You can use the following link to reset your password:</Text>
        ${url}${url}
        <Text>If you don’t use this link within 1 hour, it will expire.</Text>`

    return { from, to, subject, View }
}

const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Boolean(process.env.SMTP_IS_SECURE),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
}

export default smtpConfig;
import nodemailer from "nodemailer"

import { env } from "../env"

type Props = {
  from: string
  to: string
  otp: string
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "oauth2",
    user: env.MAIL_USER,
    refreshToken: env.MAIL_OAUTH_REFRESH_TOKEN,
    clientSecret: env.MAIL_OAUTH_CLIENT_SECRET,
    clientId: env.MAIL_OAUTH_CLIENT_ID,
  },
})

export const recoverPasswordMail = async ({ from, to, otp }: Props) => {
  const mailOptions = {
    from: `"${from}" <mealy@group.com>`,
    to,
    subject: `${from} Account Recovery`,
    html: `<h3>Hello ${to}</h3>
      <p>Please use this OTP code: ${otp} to complete your password reset</p>
      <p>If you are not trying to reset your password, please ignore this mail</P>`,
  }

  await transporter.sendMail(mailOptions)
}

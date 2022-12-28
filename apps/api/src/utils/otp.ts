export const generateOTP = () => {
  const digits = "0123456789"

  let OTP = ""
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }
  return OTP
}

export const otpExpires = () => {
  const oldDateObj = new Date()

  const newDateObj = oldDateObj

  newDateObj.setTime(oldDateObj.getTime() + 15 * 60 * 1000)

  return newDateObj
}

export const hasOtpExpired = (expireTime: Date) => {
  const time = new Date()

  return time > expireTime
}

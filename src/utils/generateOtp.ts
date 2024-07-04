 
 export const generateOtp = () => {
    let number = Math.random()*1000000
    let otp = number.toString()
    return otp.slice(0,6)
}


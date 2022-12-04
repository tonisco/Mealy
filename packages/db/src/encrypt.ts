import bcrypt from 'bcrypt'

export const encryptPassword = async (password: string) => {
    let saltRounds = 10
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch (error) {
        throw new Error('Failed to hash password')
    }
}

export const comparePasswords = async (password: string, hashedPassword: string) => {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
        throw new Error('Failed to compare password')
    }
}
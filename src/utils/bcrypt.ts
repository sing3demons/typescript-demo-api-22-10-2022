import bcrypt from 'bcrypt'

async function EncryptPassword(password: string): Promise<string> {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

export { EncryptPassword }

import { config } from 'dotenv'
config()

const PORT = process.env.PORT
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || ''
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || ''
const FACEBOOK_APP_URL = process.env.FACEBOOK_APP_URL || ''
const SECRET_KEY = process.env.SECRET_KEY || ''

export {
  PORT,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_APP_URL,
  SECRET_KEY,
}

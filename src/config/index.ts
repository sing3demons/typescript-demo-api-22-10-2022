import { config } from 'dotenv'
config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI || ''
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || ''
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || ''
const FACEBOOK_APP_URL = process.env.FACEBOOK_APP_URL || ''
const SECRET_KEY = process.env.SECRET_KEY || ''

const GOOGLE_APP_ID = process.env.GOOGLE_APP_ID || ''
const GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET || ''
const GOOGLE_APP_URL = process.env.GOOGLE_APP_URL || ''

const GMAIL = process.env.GMAIL || ''
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD || ''

export {
  PORT,
  MONGO_URI,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_APP_URL,
  SECRET_KEY,
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  GOOGLE_APP_URL,
  GMAIL,
  GMAIL_PASSWORD,
}

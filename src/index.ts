import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { initMongo } from './db/mongo'
import authRoute from './routes/auth'
import userRoute from './routes/user'
import fs from 'fs'
import path from 'path'
import passport from 'passport'
import { PORT } from './config/index'

import PassportFacebook from './middleware/passport-facebook'
import PassportJWT from './middleware/passportJWT'

const app = express()
const dir = path.join('public', 'images')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

initMongo() //start mongodb
PassportJWT()
PassportFacebook() //init passport.use
app.use('/images', express.static(path.join(__dirname, '../', dir)))
app.use(morgan('dev'))
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj: any, done) {
  done(null, obj)
})

app.use(passport.initialize())
// app.use(function (req, res, next) {
//   res.locals.user = req.user || null
//   next()
// })
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello')
})

app.get('/profile', (req, res) => {
  console.log(req.user)
  res.json(req.user)
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`))

import { Request, Response, Router } from 'express'
import UserRequest from '../dto/User'
import User from '../model/User'
import { EncryptPassword } from '../utils/bcrypt'
import bcrypt from 'bcrypt'

import { authenJWT } from '../middleware/index'

import passport from 'passport'
import signToken from '../utils/jwt'

const router = Router()

router.get('/profile', authenJWT, (req: Request, res: Response) => {
  const user = req.user

  res.status(200).json({
    user,
  })
})

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password }: UserRequest = req.body

  const exists = await User.findOne({ email: email })
  if (exists) {
    return res.status(400).json('email duplicate')
  }

  const user = new User()
  user.name = name
  user.email = email
  user.password = await EncryptPassword(password)
  await user.save()

  res.status(201).json(user)
})

router.post('/login', async (req: Request, res: Response) => {
  const { email, password }: UserRequest = req.body

  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).json('username or password invalid')
  if (user.password === undefined)
    return res.status(400).json('username or password invalid')

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(400).json('username or password invalid')

  const token = signToken(user._id)

  res.status(200).json({
    access_token: token,
  })
})

router.get(
  '/login/facebook',
  passport.authenticate('facebook', {
    // scope: ['email'],
    session: false,
    failureRedirect: '/',
  }),
  (req, res) => {
    const { _id }: any = req.user
    const token = signToken(_id)

    res.status(200).json({
      access_token: token,
    })
  }
)

router.get(
  '/login/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    failureRedirect: '/',
  }),
  (req, res) => {
    const { sub }: any = req.user
    const token = signToken(sub)

    res.status(200).json({
      access_token: token,
    })
  }
)

export default router

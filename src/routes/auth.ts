import { Request, Response, Router } from 'express'
import UserRequest from '../dto/User'
import User from '../model/User'
import { EncryptPassword } from '../utils/bcrypt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { passportJWT } from '../middleware/passportJWT'
import { passportFacebook } from '../middleware/passport-facebook'
import { SECRET_KEY } from '../config/index'

const router = Router()

router.get('/profile', passportJWT, (req: Request, res: Response) => {
  const user = req.user

  res.status(200).json({
    user,
  })
})

router.get('/profile/facebook', (req: Request, res: Response) => {
  const user = req.user
  console.log(user)

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

  const token = jwt.sign({ sub: user._id }, SECRET_KEY, {
    expiresIn: '1h',
  })

  res.status(200).json({
    access_token: token,
  })
})

router.get('/login/facebook', passportFacebook, (req, res) => {
  const profile = req.user
  res.status(200).json({
    profile,
  })
})

export default router

import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import UserRequest from '../dto/User'
import User from '../model/User'
import { EncryptPassword } from '../utils/bcrypt'
import { upload } from '../utils/upload'

import { authenJWT, checkAdmin } from '../middleware/index'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const users = await User.find({})
  res.status(200).json({
    users,
  })
})

router.post(
  '/',
  [authenJWT, checkAdmin],
  upload.single('avatar'),
  async (req: Request, res: Response) => {
    const { name, email, password }: UserRequest = req.body

    const avatar = 'images/' + req.file?.filename

    const exists = await User.findOne({ email: email })
    if (exists) {
      return res.status(400).json('email duplicate')
    }

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    const user = new User()
    user.name = name
    user.email = email
    user.password = await EncryptPassword(password)
    user.avatar = avatar
    await user.save()

    res.status(201).json(user)
  }
)

router.put('/', (req: Request, res: Response) => {
  res.status(200).send('update')
})

router.delete('/', (req: Request, res: Response) => {
  res.status(200).send('delete')
})

export default router

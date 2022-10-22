import { Request, Response, Router } from 'express'
import bcrypt from 'bcrypt'
import UserRequest from '../dto/User'
import User from '../model/User'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const users = await User.find({})
  res.status(200).json({
    users,
  })
})

router.post('/', async (req: Request, res: Response) => {
  const { name, email, password }: UserRequest = req.body
  // bcrypt.genSalt(saltRounds, function (err, salt) {
  //   bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
  //   })
  // })
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(password, salt)

  const user = new User()
  user.name = name
  user.email = email
  user.password = hash
  await user.save()

  res.status(201).json(user)
})

router.put('/', (req: Request, res: Response) => {
  res.status(200).send('update')
})

router.delete('/', (req: Request, res: Response) => {
  res.status(200).send('delete')
})

export default router

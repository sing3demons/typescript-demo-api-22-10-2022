import { Request, Response, Router } from 'express'
import UserRequest from '../dto/User'
import User from '../model/User'

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({})
  res.status(200).json({
    users,
  })
}
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password }: UserRequest = req.body

  const avatar = 'images/' + req.file?.filename

  const exists = await User.findOne({ email: email })
  if (exists) {
    return res.status(400).json('email duplicate')
  }

  const user = new User()
  user.name = name
  user.email = email
  user.password = await user.EncryptPassword(password)
  user.avatar = avatar
  await user.save()

  res.status(201).json(user)
}

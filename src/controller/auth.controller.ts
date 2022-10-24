import { Request, Response } from 'express'

import { randomBytes } from 'crypto'
import nodemailer from 'nodemailer'
import UserRequest from '../dto/User'
import User from '../model/User'
import signToken from '../utils/jwt'
import { GMAIL, GMAIL_PASSWORD } from '../config'
import IUser from '../dto/IUser'

export const getProfile = (req: Request, res: Response) => {
  const user = req.user

  res.status(200).json({
    user,
  })
}

export const register = async (req: Request, res: Response) => {
  const { name, email, password }: UserRequest = req.body

  const exists = await User.findOne({ email: email })
  if (exists) {
    return res.status(400).json('email duplicate')
  }

  const user = new User()
  user.name = name
  user.email = email
  user.password = await user.EncryptPassword(password)
  await user.save()

  res.status(201).json(user)
}

export const login = async (req: Request, res: Response) => {
  const { email, password }: UserRequest = req.body

  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).json('username or password invalid')
  if (user.password === undefined) {
    return res.status(400).json('username or password invalid')
  }

  const isValid = await user.ComparePassword(password)
  if (!isValid) return res.status(400).json('username or password invalid')

  const token = signToken(user._id)

  res.status(200).json({
    access_token: token,
  })
}

export const loginFacebook = (req: Request, res: Response) => {
  const { _id }: any = req.user
  const token = signToken(_id)

  res.status(200).json({
    access_token: token,
  })
}

export const loginGoogle = (req: Request, res: Response) => {
  const { sub }: any = req.user
  const token = signToken(sub)

  res.status(200).json({
    access_token: token,
  })
}
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const resetPasswordToken = randomBytes(20).toString('hex')
    const resetPasswordExpires = Date.now() + 1000 * 60 * 30

    const user = await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken,
        resetPasswordExpires,
      }
    )

    if (!user) {
      return res.status(400).json({
        message: 'not user',
      })
    }

    const smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: GMAIL,
        pass: GMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      to: email,
      from: GMAIL,
      subject: 'Node.js Password Reset',
      text:
        'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' +
        req.headers.host +
        '/api/auth/reset-password/' +
        resetPasswordToken +
        '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    }

    smtpTransport.sendMail(mailOptions)

    res.status(200).json({
      message: 'send mail',
    })
  } catch (error) {}
}

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: {
      $gt: Date.now(),
    },
  })

  if (!user) {
    return res.status(400).json({
      message: 'invalid',
    })
  }

  res.status(200).json({
    token: user.resetPasswordToken,
  })
}

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.query
    const { password, confirmPassword } = req.body

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: 'รหัสผ่านไม่ตรงกัน',
      })
    }

    if (!token) {
      //   const { password, confirmPassword } = req.body
    }
    const user = await User.findOne({
      resetPasswordToken: token,
    })
    if (!user)
      return res.status(400).json({
        error: 'not user',
      })

    user.password = await user.EncryptPassword(password)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    // await user.updateOne({
    //   password: await user.EncryptPassword(password),
    //   resetPasswordToken: undefined,
    //   resetPasswordExpires: undefined,
    // })
    res.status(200).json({
      message: 'success',
    })
  } catch (error) {
    res.status(200).json({
      error: error,
    })
  }
}

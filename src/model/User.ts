import { Model, model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from '../dto/IUser'

interface IUserMethods {
  EncryptPassword(password: string): Promise<string>
  ComparePassword(password: string): Promise<boolean>
}

export type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
    oauth: {
      facebook: String,
      google: String,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    collection: 'users',
    timestamps: true,
  }
)

userSchema.methods.EncryptPassword = async function (
  password: string
): Promise<string> {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt)
}

userSchema.methods.ComparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

const User = model<IUser, UserModel>('User', userSchema)
export default User

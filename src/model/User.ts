import { model, Schema } from 'mongoose'

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
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
  },
  {
    collection: 'users',
    timestamps: true,
  }
)

const User = model('User', userSchema)
export default User

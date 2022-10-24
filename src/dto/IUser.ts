export default interface IUser {
  name: string
  email: string
  password: string
  avatar?: string
  resetPasswordToken?: string
  resetPasswordExpires?: string
}

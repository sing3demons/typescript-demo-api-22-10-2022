import { SECRET_KEY } from '../config/index'
import jwt from 'jsonwebtoken'

const signToken = (id: any): string => {
  return jwt.sign({ sub: id }, SECRET_KEY, {
    expiresIn: '1h',
  })
}
export default signToken

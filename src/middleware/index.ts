import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

const authenJWT = passport.authenticate('jwt', { session: false })

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role }: any = req.user
  if (role !== 'admin') {
    return res.status(403).json({
      error: 'forbidden',
    })
  }

  next()
}
export { authenJWT, checkAdmin }

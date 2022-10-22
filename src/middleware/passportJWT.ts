import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import UserResponse from '../dto/UserResponse'
import User from '../model/User'

let opts: any = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secretOrPrivateKey'

passport.use(
  new JwtStrategy(opts, async ({ sub }, done) => {
    try {
      const user = await User.findById(sub)
      if (!user) {
        const err = new Error('unauthorized')
        return done(err, false)
      }

      return done(null, user)
    } catch (error) {
      console.log(error)
    }
  })
)
// interface
const authen = passport.authenticate('jwt', { session: false })
const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role }: any = req.user
  if (role !== 'admin') {
    return res.status(403).json({
      error: 'forbidden',
    })
  }

  next()
}
export { authen, checkAdmin }

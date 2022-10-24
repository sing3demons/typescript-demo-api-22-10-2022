import { SECRET_KEY } from '../config/index'
import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt'
import User from '../model/User'

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
}

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
const passportJWT = passport.authenticate('jwt', { session: false })

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role }: any = req.user
  if (role !== 'admin') {
    return res.status(403).json({
      error: 'forbidden',
    })
  }

  next()
}
export { passportJWT, checkAdmin }

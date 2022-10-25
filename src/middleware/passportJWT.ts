import { SECRET_KEY } from '../config/index'
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

const PassportJWT = () =>
  passport.use(
    new JwtStrategy(opts, async ({ sub }, done) => {
      try {
        console.log(sub)
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

export default PassportJWT

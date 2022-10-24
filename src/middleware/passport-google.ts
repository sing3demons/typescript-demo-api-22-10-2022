import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from 'passport-google-oauth20'
import passport from 'passport'
import { GOOGLE_APP_ID, GOOGLE_APP_SECRET, GOOGLE_APP_URL } from '../config'
import User from '../model/User'

const opts: StrategyOptions = {
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: GOOGLE_APP_URL,
}

const PassportGoogle = () =>
  passport.use(
    new GoogleStrategy(opts, async (accessToken, refreshToken, profile, cb) => {
      try {
        const data = profile
        const { sub, picture, email, name } = data._json
        const exitsUser = await User.findOne({ 'oauth.google': sub })
        if (exitsUser) {
          return cb(null, exitsUser)
        }

        const user = await User.create({
          email: email,
          avatar: picture,
          name,
          oauth: { google: sub },
        })
        cb(null, user)
      } catch (error) {
        console.log(error)
      }
    })
  )

export default PassportGoogle

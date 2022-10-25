import {
  Strategy as GoogleStrategy,
  StrategyOptions,
  Profile,
} from 'passport-google-oauth20'
import passport from 'passport'
import { GOOGLE_APP_ID, GOOGLE_APP_SECRET, GOOGLE_APP_URL } from '../config'
import User from '../model/User'
import IUser from '../dto/IUser'

const opts: StrategyOptions = {
  clientID: GOOGLE_APP_ID,
  clientSecret: GOOGLE_APP_SECRET,
  callbackURL: GOOGLE_APP_URL,
}

const PassportGoogle = () =>
  passport.use(
    new GoogleStrategy(
      opts,
      async (accessToken, refreshToken, profile: Profile, cb) => {
        try {
          const data = profile
          const { sub, picture, email, name } = data._json

          if (email) {
            const user = await User.findOneAndUpdate(
              {
                email: email,
              },
              { email: email, avatar: picture, name, oauth: { google: sub } }
            )as Profile

            return cb(null, user)
          }

          const exitsUser = await User.findOne({ 'oauth.google': sub })
          if (exitsUser) {
            return cb(null, exitsUser)
          }

          const user = new User({
            email: email,
            avatar: picture,
            name,
            oauth: { google: sub },
          })

          await user.save()

          cb(null, user)
        } catch (error) {
          console.log(error)
        }
      }
    )
  )

export default PassportGoogle

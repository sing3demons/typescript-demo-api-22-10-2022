import passport from 'passport'
import { Strategy as FacebookStrategy, StrategyOption } from 'passport-facebook'
import User from '../model/User'
import { uploadFromFB } from '../utils/upload'

import {
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_APP_URL,
} from '../config/index'

let opts: StrategyOption = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: FACEBOOK_APP_URL,
  profileFields: ['id', 'displayName', 'picture.type(large)', 'email'],
}

const PassportFacebook = () =>
  passport.use(
    new FacebookStrategy(
      opts,
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const data = profile
          const { id, picture, email, name } = data._json
          const exitsUser = await User.findOne({ 'oauth.facebook': id })
          if (exitsUser) {
            return cb(null, exitsUser)
          }

          const avatar = await uploadFromFB(id, picture?.data?.url)

          if (!avatar) return cb('error', false, 'error')
          const user = await User.create({
            email: email,
            avatar,
            name,
            oauth: { facebook: id },
          })
          cb(null, user)
        } catch (error) {
          console.log(error)
        }
      }
    )
  )

export default PassportFacebook

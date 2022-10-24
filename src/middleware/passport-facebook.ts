import { Request, Response, NextFunction } from 'express'
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

passport.use(
  new FacebookStrategy(opts, async (accessToken, refreshToken, profile, cb) => {
    const { id, picture, email, name } = profile._json
    const avatar = await uploadFromFB(id, picture?.data?.url)
    // console.log(profile)

    if (!avatar) return cb('error', false, 'error')
    const user = await User.create({
      email: email,
      avatar,
      name,
      oauth: { facebook: id },
    })
    cb(null, user)
  })
)

const passportFacebook = passport.authenticate('facebook', {
  // successRedirect: '/api/auth/profile/facebook',
  scope: ['email'],
})
export { passportFacebook }

//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user)

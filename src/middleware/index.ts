import passport from 'passport'

export const authenJWT = passport.authenticate('jwt', { session: false })

export const facebookPassport = passport.authenticate('facebook', {
  // scope: ['email'],
  session: false,
  failureRedirect: '/',
})
export const googlePassport = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
  failureRedirect: '/',
})

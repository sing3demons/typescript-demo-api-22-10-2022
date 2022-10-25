import { Router } from 'express'

import authController from '../controller/auth.controller'

import {
  authenJWT,
  facebookPassport,
  googlePassport,
} from '../middleware/index'

const router = Router()

router.get('/profile', authenJWT, authController.getProfile)

router.post('/register', authController.register)

router.post('/login', authController.login)

// router.post('/update-password', authController.updatePassword)

router.get('/login/facebook', facebookPassport, authController.loginFacebook)

router.get('/login/google', googlePassport, authController.loginGoogle)

//reset-password

router.post('/forgot-password', authController.forgotPassword)
router.get('/reset-password/:token', authController.resetPassword)
router.post('/reset-password', authController.changePassword)
router.patch('/update-password', authenJWT, authController.updatePassword)
//update-password

export default router

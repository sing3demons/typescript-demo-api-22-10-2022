import { Request, Response, Router } from 'express'

import { upload } from '../utils/upload'

import { authenJWT } from '../middleware/index'
import { isAdmin } from '../utils/admin'
import { createUser, getUsers } from '../controller/user.controller'

const router = Router()

router.get('/', getUsers)

router.post('/', [authenJWT, isAdmin], upload.single('avatar'), createUser)

router.put('/', (req: Request, res: Response) => {
  res.status(200).send('update')
})

router.delete('/', (req: Request, res: Response) => {
  res.status(200).send('delete')
})

export default router

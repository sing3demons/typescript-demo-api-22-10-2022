import { Request, Response, NextFunction } from 'express'

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { role }: any = req.user
  if (role !== 'admin') {
    return res.status(403).json({
      error: 'forbidden',
    })
  }

  next()
}

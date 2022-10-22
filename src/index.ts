import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { initMongo } from './db/mongo'
import authRoute from './routes/auth'
import userRoute from './routes/user'
import fs from 'fs'
import path from 'path'

const app = express()
const port = 3000
const dir = path.join('public', 'images')

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

initMongo() //start mongodb
app.use('/images', express.static(path.join(__dirname, '../', dir)))

app.use(morgan('dev'))
app.use(express.json({}))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)

app.listen(port, () => console.log(`Server running at port ${port}`))

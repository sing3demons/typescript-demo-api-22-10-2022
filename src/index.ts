import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { initMongo } from './db/mongo'
import userRoute from './routes/user'

const app = express()
const port = 3000

initMongo() //start mongodb

app.use(morgan('dev'))
app.use(express.json({}))

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello')
})

app.use('/api/users', userRoute)

app.listen(port, () => console.log(`Server running at port ${port}`))

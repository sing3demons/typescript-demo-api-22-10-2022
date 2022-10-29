import { connect } from 'mongoose'
import { MONGO_URI } from '../config'

const initMongo = async () => {
  try {
    await connect(MONGO_URI)
    console.log('Connect to mongoDB')
  } catch (error) {
    console.log(`mongo error: ${error}`)
  }
}

export { initMongo }

import { connect } from 'mongoose'

const initMongo = async () => {
  try {
    await connect('mongodb://localhost:27017/test-api')
    console.log('Connect to mongoDB')
  } catch (error) {
    console.log(`mongo error: ${error}`)
  }
}

export { initMongo }

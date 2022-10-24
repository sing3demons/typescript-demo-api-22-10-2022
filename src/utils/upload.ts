import multer from 'multer'
import path from 'path'
const dir = path.join('public', 'images')

//
import https from 'https'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.png'
    cb(null, fileName)
  },
})
const upload = multer({ storage: storage })

//
const uploadFromFB = (id: any, uri: string) => {
  return new Promise((resolve, reject) => {
    const fileName = path.join('images', `fb_${id}.png`)
    const filePath = path.join('public', fileName)
    const file = fs.createWriteStream(filePath)
    https.get(uri, (response) => {
      response.pipe(file)
      response.on('error', reject)
      file.on('error', reject)
      file.on('finish', () => resolve(fileName))
    })
  })
}

export { upload, uploadFromFB }

import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public', 'images'))
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.png'
    cb(null, fileName)
  },
})

const upload = multer({ storage: storage })

export { upload }

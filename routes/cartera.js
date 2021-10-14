const express = require('express')
const router = express.Router()
const cartera_controller = require('../src/cartera/cartera_controller')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post(
    '/',
    upload.single('file'),
    cartera_controller.uploadExcel
  )

module.exports = router

// require multer and multer-sftp module
const multer = require('multer')
const sftpStorage = require('multer-sftp')
const fs = require('fs')

/**
 * uploadFile function
 */
const uploadFile = ({ fieldName, storageConfig, options }) => {
  // try code to error handling
  try {
    // desctructuring storageConfig
    const { sftp, destination, filename } = storageConfig

    // set destination
    const dest = (req, file, cb) => {
      cb(null, destination)
    }

    // set filename
    const fileName = (req, { originalname }, cb) => {
      const arr = originalname.split('.')
      const ext = arr[arr.length - 1]
      cb(null, `${filename()}.${ext}`)
    }

    // set storage
    let storage
    if (sftp) {
      const { privateKey } = sftp
      sftp.privateKey = privateKey instanceof Buffer
        ? privateKey
        : fs.readFileSync(sftp.privateKey)
      storage = sftpStorage({ sftp, destination: dest, filename: fileName })
    } else {
      storage = multer.diskStorage({ destination: dest, filename: fileName })
    }

    // destructuring fileFilter from options
    const { fileFilter } = options
    // check if
    if (fileFilter) {
      // set filter by mimetype
      const { params, message } = fileFilter.mimetype
      // set fileFilter option
      options.fileFilter = (req, { mimetype }, cb) => {
        params.includes(mimetype) ? cb(null, true) : cb(new Error(message))
      }
    }

    // set multer options
    const upload = multer({
      storage,
      ...options
    })

    // return multer single
    return upload.single(fieldName)
  } catch (e) {
    // throw new error if catch an error
    throw new Error(e)
  }
}

// export module
module.exports = uploadFile

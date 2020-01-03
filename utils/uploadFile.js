// require multer and multer-sftp module
const multer = require('multer')
const sftpStorage = require('multer-sftp')

/**
 * uploadFile function
 */
const uploadFile = ({ fieldName, storageConfig, options }) => {
  // try code to error handling
  try {
    // desctructuring storageConfig
    const { sftp, dirName, fileName } = storageConfig

    // set destination
    const destination = (req, file, cb) => {
      cb(null, dirName)
    }

    // set filename
    const filename = (req, { originalname }, cb) => {
      const arr = originalname.split('.')
      const ext = arr[arr.length - 1]
      cb(null, `${fileName}.${ext}`)
    }

    // set storage
    const storage = sftp
      ? sftpStorage({ sftp, destination, filename })
      : multer.diskStorage({ destination, filename })

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

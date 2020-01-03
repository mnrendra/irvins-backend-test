// require fs to read privatekey file
const fs = require('fs')
// require ObjectId from mongoose to rename image file
const { ObjectId } = require('mongoose').Types
// require uploadFile from utils module
const { uploadFile } = require('../../../utils')
// require UPLOAD_IMAGE config
const { SFTP, DIRNAME } = require('../../../config').UPLOAD_IMAGE
const { HOST, PORT, USERNAME, PRIVATEKEY } = SFTP

/**
 * uploadImage
 */
const uploadImage = () => {
  return uploadFile({
    // set fieldname based on form-data
    fieldName: 'image',
    // set storage configuration
    storageConfig: {
      // use sftp instead local storages. if want to save on local storage, delete this option.
      sftp: {
        host: HOST,
        port: PORT,
        username: USERNAME,
        // use privatekey instead password
        privateKey: fs.readFileSync(PRIVATEKEY)
      },
      // set destination directory
      dirName: DIRNAME,
      // set filename
      fileName: ObjectId()
    },
    // set option configuration
    options: {
      // set limits option
      limits: {
        // limit by file size
        fileSize: 1024 * 1024
      },
      // set file filter
      fileFilter: {
        // filter by mimetype
        mimetype: {
          // mimetype filter parameters
          params: ['image/jpeg', 'image/png'],
          // error if not match parameters
          message: 'MulterError: File mimetype should be jpeg or png.'
        }
      }
    }
  })
}

// export module
module.exports = uploadImage

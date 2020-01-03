// require ObjectId from mongoose to rename image file
const { ObjectId } = require('mongoose').Types
// require uploadFile from utils module
const { uploadFile } = require('../../../utils')
// require storage config
const { STORAGE } = require('../../../config').UPLOAD_IMAGE

/**
 * uploadImage function
 */
const uploadImage = () => {
  // set fileName by Mongoose.ObjectId
  STORAGE.filename = ObjectId

  // return uploadFile
  return uploadFile({
    // set fieldname based on form-data
    fieldName: 'image',
    // set storage configuration
    storageConfig: STORAGE,
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

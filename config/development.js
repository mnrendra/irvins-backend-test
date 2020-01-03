module.exports = {
  PORT: 3000,
  DB_URL: 'mongodb://localhost:27017/irvins',
  UPLOAD_IMAGE: {
    STORAGE: {
      // uncomment this config bellow if you want to store upload file on another server, instead of local.
      // sftp: {
      //   host: 'host',
      //   port: 'port',
      //   username: 'username',
      //   privateKey: 'privateKey'
      // },
      // TODO: change this "destination" value based on your preferred and make sure to get write permission.
      // TODO: set on your local web server ( nginx or else ) config to access this path from local url.
      destination: '/opt/images'
    },
    // TODO: change this "URL" value based on your preferred and make sure can access to "destination" path above.
    // TODO: set on your local web server ( nginx or else ) config to access this path from local url.
    URL: 'http://localhost/images/'
  }
}

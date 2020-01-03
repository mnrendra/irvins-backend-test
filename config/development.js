module.exports = {
  PORT: 3000,
  DB_URL: 'mongodb://localhost:27017/irvins',
  UPLOAD_IMAGE: {
    SFTP: {
      HOST: '54.179.143.127',
      PORT: 22,
      USERNAME: 'ubuntu',
      PRIVATEKEY: '/home/dev/.ssh/id_rsa_aws.pem'
    },
    DIRNAME: '/opt/images',
    URL: 'http://ec2-54-179-143-127.ap-southeast-1.compute.amazonaws.com/images/'
  }
}

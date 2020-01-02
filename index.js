// require app
const app = require('./app')
// require configuration
const { PORT } = require('./config')

app.listen(PORT, function () {
  console.log(`${new Date()} : listen on port ${this.address().port}`)
})

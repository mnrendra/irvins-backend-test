module.exports = {
  DB_OPT: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  MODEL_SCHEMA: {
    PRODUCT: {
      NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 32
      },
      PRICE: {
        MIN: 0,
        MAX: 1000000
      },
      IMAGE: {
        MATCH: /^(http|https):\/\/([^:/\s]+)([/|.|\w|-])*\.(jpg|jpeg|gif|png)((\?.*)$|$)/mg
      }
    }
  }
}

module.exports = {
  DB_OPT: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  SCHEMA: {
    PRODUCT: {
      NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 32,
        MATCH: /^[a-zA-Z0-9 ]*$/m
      },
      PRICE: {
        MIN: 0,
        MAX: 1000000
      },
      IMAGE: {
        MATCH: /^(http|https):\/\/([^:/\s]+)([/|.|\w|-])*\.(jpg|jpeg|png)((\?.*)$|$)/m
      }
    }
  },
  QUERY: {
    MIN_PRICE: 0,
    MAX_PRICE: 1000000,
    PAGE: 0,
    LIMIT: 3
  }
}

const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_CONNECTION_STRING || '';

// mongoose.set('debug', true);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to Database'))
  .catch(console.log);

module.exports = mongoose.connection;

const mongoose = require('mongoose');

// Mongoose will print information about each executed query to the console, 
// including the collection, query conditions, and other details.
mongoose.set('debug', false); // for production environment debug is `false`

const mongoDBConfig = {
  url: 'mongodb://localhost:27017/fs17_backend_db', // Replace with your MongoDB connection string
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

// mongoose.connect(mongoDBConfig.url, mongoDBConfig.options);
mongoose.connect(mongoDBConfig.url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Successfully.');
});

module.exports = mongoose;

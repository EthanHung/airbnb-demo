const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', function () {
    console.log("Connected to the MongoDB database.");
}).on('error', function (error) {
    console.log('Connection error:', error);
});

export {mongoose};

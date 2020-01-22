const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://testing:12344321@cluster0-zwpfy.mongodb.net/roomroom?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
);

module.exports = mongoose.connection;

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://dekinng:123@cluster0-nck4q.mongodb.net/roomroom?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
);

module.exports = mongoose.connection;

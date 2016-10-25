var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_JADE_URI || 'mongodb://localhost/nodewebappdb');
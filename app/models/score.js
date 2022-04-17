const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    score: {type:Number,required: true},
    timeTaken: {type:Number,required: true},
    createdAt: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Score', scoreSchema);
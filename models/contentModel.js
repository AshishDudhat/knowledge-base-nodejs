const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let contents = new Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    content: {
        type: String
    },
    file: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
   collection: 'contents'
})

module.exports = mongoose.model('contents', contents)
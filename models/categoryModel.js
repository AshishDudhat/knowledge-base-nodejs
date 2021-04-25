const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let categories = new Schema({
    category_name: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, {
   collection: 'categories'
})

module.exports = mongoose.model('categories', categories)
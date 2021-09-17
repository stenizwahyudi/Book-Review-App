const Schema = require('mongoose').Schema;

const BookSchema = new Schema({
    // recall that _id is provided for us, though we can add other indices
    title: { type: String, required: true },
    authors: [{ type: String }],
    id: { type: String, required: true, unique: true }
// set the collection (i.e., 'table') name below
}, { collection : 'books' });

module.exports = BookSchema;
// We are using the Schema Class here
// This allows us to declare specifically what is IN the
// document and what is not
const Schema = require('mongoose').Schema;


const ReviewSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    title: String,
    authors: [{type: String}],
    id: String,
    review: String,
    rating: {type: Number, required: true},
    expert: Boolean,
    name: {type: String, required: true},
    userId: String
// this explicitly declares what collection we're using
}, { collection : 'reviews' });

module.exports = ReviewSchema;
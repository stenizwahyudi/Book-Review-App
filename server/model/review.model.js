const mongoose = require("mongoose")
// Recall how exports work in Node.js?
const ReviewSchema = require('./review.schema');

// Here we are mapping our PokemonSchema to the model Pokemon.
// If we are interested in referencing the Pokemon model elsewhere,
// we can simply do mongoose.model("Pokemon") elsewhere
const ReviewModel = mongoose.model("Review", ReviewSchema);

function insertReview(review) {
    return ReviewModel.create(review);
}

function getAllReviews() {
    return ReviewModel.find().exec();
}
// Note the difference between the find above and below.
// Above, this is finding pretty ALL documents
// Below is finding all the documents that match this
// constraint
function findReviewByUserIdAndBookId(data) {
    return ReviewModel.findOne({userId: data.userId, id: data.id}).exec();
}

function findReviewByUserId(userId) {
    return ReviewModel.find({userId: userId}).exec();
}

function findReviewById(id) {
    return ReviewModel.find({id: id}).exec();
}

function deleteReview(objectId) {
	return ReviewModel.findOneAndDelete({_id: objectId}).exec();
}

function updateReview(data) {
    return ReviewModel.findOneAndUpdate({id: data.id, userId: data.userId}, {$set: {rating: data.rating, review: data.review}}).exec();
}

// Mongo provides a findById to query for the _id field (and you don't have
// to use the ObjectId class here!
// function findPokemonById(id) {
//     return PokemonModel.findById(id).exec();
// }

// Make sure to export a function after you create it!
module.exports = {
    insertReview,
    findReviewByUserId,
    getAllReviews,
    findReviewById,
    deleteReview,
    updateReview,
    findReviewByUserIdAndBookId,
};
const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const UserSchema = require('./user.schema');

const UserModel = mongoose.model("User", UserSchema);

function addUser(user) {
    return UserModel.create(user);
}

function getUserByUserName(username) {
    return UserModel.findOne({username: username}).exec();
}

function getAllUsers() {
    return UserModel.find().exec();
}

function updateUserEntry(data) {
    return UserModel.findOneAndUpdate({username: data.username}, {$set: {expert: data.expert}}).exec();
}

function updateUsername(data) {
    return UserModel.findOneAndUpdate({username: data.currentUsername}, {$set: {username: data.newUsername}}).exec();
}

function deleteUserEntry(name) {
    return UserModel.findOneAndDelete({username: name}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    addUser,
    getUserByUserName,
    getAllUsers,
    updateUserEntry,
    deleteUserEntry,
    updateUsername,
};
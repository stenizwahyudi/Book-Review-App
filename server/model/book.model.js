const mongoose = require("mongoose")
const BookSchema = require('./book.schema');

const BookModel = mongoose.model("Book", BookSchema);

function insertBookEntry(bookEntry) {
    return BookModel.create(bookEntry);
}

function getAllBookEntries() {
    return BookModel.find().exec();
}

function findBookEntryByTitle(title) {
    return BookModel.find({title: title}).exec();
}

function findBookEntryById(id) {
    return BookModel.find({id: id}).exec();
}

module.exports = {
    insertBookEntry,
    getAllBookEntries,
    findBookEntryByTitle,
    findBookEntryById
};

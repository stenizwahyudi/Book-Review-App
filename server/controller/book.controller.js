const express = require('express');
const router = express.Router();

const BookAccessor = require('../model/book.model');

router.get('/', (req, res) => {
    return BookAccessor.getAllBookEntries()
        .then((entries) => res.send(entries))
});

router.get('/title/:title', function(req, res) {
    return BookAccessor.findBookEntryByTitle(req.params.title)
        .then((response) => {
            if (response.length !== 0) {
                res.status(200).send(response)
            } else {
                res.status(500).send('Error finding book by title:$(error)')
            }
        })
        .catch((error) => res.status(500).send('Error finding book by title:$(error)'));
});

router.get('/id/:id', function(req, res) {
    return BookAccessor.findBookEntryById(req.params.id)
        .then((response) => {
            if (response.length !== 0) {
                res.status(200).send(response)
            } else {
                res.status(500).send('Error finding book by id:$(error)')
            }
        })
        .catch((error) => res.status(500).send('Error finding book by id:$(error)'));
});

router.post('/', (req, res) => {
    return BookAccessor.findBookEntryById(req.body.id)
        .then((entry) => {
            if (entry[0]) {
                res.status(403).send('Entry with that ID already exists!')
            } else {
                return BookAccessor.insertBookEntry(req.body)
                    .then((entry) => {
                        res.status(200).send(entry)
                    })
            }
        })
        .catch((error) => res.status(500).send(`Error inserting Book Entry:${error}`))
});


module.exports = router
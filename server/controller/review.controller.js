const express = require('express');
const router = express.Router();

const ReviewAccessor = require('../model/review.model');

const authParser = require('../middleware/middleware_auth.middleware');


router.get('/user/:userId', authParser, function(req, res) {
    ReviewAccessor.findReviewByUserId(req.params.userId)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Review:${error}`));
});

router.post('/', authParser, async (req, res) => {
    req.body.username = req.username;
    return ReviewAccessor.findReviewByUserIdAndBookId(req.body)
        .then((entry) => {
            if (entry) {
                return res.status(403).send('You have reviewed this book')
            } else {
                return ReviewAccessor.insertReview(req.body)
                    .then((entry) => {
                        res.status(200).send(entry)
                    })
            }
        })
        .catch((error) => res.status(500).send(`Error inserting Review Entry:${error}`))
});

router.get('/id/:id', function(req, res) {
	return ReviewAccessor.findReviewById(req.params.id)
		.then((response) => res.status(200).send(response),
			(error) => res.status(404).send('Error finding Reviews:${error}'));
});

router.get('/edit', (req, res) => {
    req.body.username = req.username;
    return ReviewAccessor.findReviewByUserIdAndBookId(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(500).send(error));
});

router.delete('/:objectId', authParser, (req, res) => {
    return ReviewAccessor.deleteReview(req.params.objectId)
        .then((response) => res.status(200).send(response),
            (error) => res.status(500).send(error));
});

router.put('/', authParser, (req, res) => {
    if (!req.body) {
        return res.status(404).send({message: "Error, please check input!"});
    }
    return ReviewAccessor.updateReview(req.body)
        .then((entry) => res.send(entry),
            (error) => res.status(500).send(error));
});

module.exports = router;
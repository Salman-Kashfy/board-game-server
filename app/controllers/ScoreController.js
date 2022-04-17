const Score = require("../models/score");
const mongoose = require("mongoose");

exports.index = (req, res) => {
    Score.find()

        .exec()
        .then(docs => {
            return res.status(200).json({
                count: docs.length,
                scores: docs
            });
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            });
        });
}

exports.store = (req, res) => {
    const score = new Score({
        _id: new mongoose.Types.ObjectId(),
        score: req.body.score,
        timeTaken: req.body.timeTaken,
    });
    score.save()
        .then(result => {
            res.status(201).json({
                status:true,
                message: "Score recorded successfully!",
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
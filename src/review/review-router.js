const { json } = require('express')
const express = require('express')
const reviewServices = require('./review-service')
const { serializeReview } = require('./review-service')

const reviewRouter = express.Router()
const jsonBodyParser = express.json()

reviewRouter
    .route('/review')
    .get((req, res, next) => {
        reviewRouter.getAllReviews(req.app.get('db'))
            .then(review => res.json(review))
            console.log(res)
    })

reviewRouter
.route('/review/:id')
    .get((req,res)=> {
        reviewServices.getById(req.app.get('db'),req.params.id
     
        )
        .then(review => res.json(review))
    })

reviewRouter
    .route('/review')

    .post(jsonBodyParser, (req, res, next) => {
        const { review } = req.body
        const newReview = {
            review
        }

        for (const [key, value] of Object.entries(newReview))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })
        reviewServices.insertReviews(
            req.app.get('db'),
            newReview
        )
            .then(review => {
                res
                    .status(201)
                    .location('${http://localhost:8000/api/review/${id}')
                    .json(reviewServices.serializeReview(review))
            })
    })

    // reviewRouter
    //     .route('/review')

    //     .post(jsonBodyParser, (req,res,next) => {
    //         const { review } = req.body
    //         const newReview ={
    //             review
    //         }

    //         for (const [key, value] of Object.entries(newRev))
    //         if (value == null)
    //             return res.status(400).json({
    //                 error: `Missing '${key} in request body`
    //             })
    //         reviewServices.insertReview(
    //             req.app.get('db'),
    //             newReview
    //         )
    //             .then(request => {
    //                 res
    //                     .status(201)
    //                     .location(``)
    //                     .json(reviewServices.serializeReview(review))
    //             })
    //     })

        module.exports = reviewRouter
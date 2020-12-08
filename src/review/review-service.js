const xss = require('xss')

const reviewServices = {
    getAllReviews(knex) {
        return knex
        .select('*')
        .from('review')
    },

    getById(knex,id){
        return reviewServices.getAllReviews(knex)
        .where('id', id)
        .first()
    },

    insertReviews(knex, newReview){
        return knex
        .insert(newReview)
        .into('review')
        .returning('*')
        .then(item =>
            item[0])
    },

    serializeReview(review){
        return {
            review: xss(review.review)
        }
    }
}

module.exports = reviewServices;

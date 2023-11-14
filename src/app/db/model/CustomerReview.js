import {mongoose} from '../db';

const customerReviewSchema = mongoose.Schema({
    customer_comment_title: String,
    customer_comment_details: String,
    score: Number,
    rating: [Number],
    reviews_count: Number,
});

module.exports = mongoose.models.CustomerReview || mongoose.model('CustomerReview', customerReviewSchema)

const ExpressError = require('./utils/ExpressError');
const { campgroundSchema,reviewSchema } = require('./schemas.js');
const Campground = require('./models/campground');
const Review = require('./models/review');



const isLoggedIn = (req,res,next)=>{
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','Please log in!');
        return res.redirect('/login');
    }
    next();
}
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.isLoggedIn = isLoggedIn;

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
module.exports.isAuthor =  async (req,res,next)=>{
    const { id } = req.params;
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)){
        req.flash('error','You are not allowed to edit this!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.isReviewAuthor =  async (req,res,next)=>{
    const {id, reviewId } = req.params;
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)){
        req.flash('error','You are not allowed to edit this!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
module.exports.validateReview = (req,res,next)=>{
    const result = reviewSchema.validate(req.body);
    if (result.error){
        const message = result.error.details.map(el=>el.message).join(',');
        throw new ExpressError(message,400);
    }else{
        next();
    }
}
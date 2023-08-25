const asyncHandler = require("express-async-handler")
const Dish = require("../models/dishModel")
const User = require("../models/userModel")

//@desc Get all dishes
//@route GET/dishes
const getDishes = asyncHandler(async(req,res) => {
    const {offset , limit} = req.query
    const Dishes = await Dish.find(
        {}, 
        {
            name: 1, _id: 1
        })
    .skip(offset)
    .limit(limit)

    res.status(200).json({Dishes});
});

//@desc Get all dishes
//@route POST/dishes
const createDish = asyncHandler(async(req,res) => {
    const {name, description, image, price} = req.body;

    if(!name || !description){
        res.status(400);
        throw new Error ("Name and Description are mandatory fields !!");
    }

    const dish = await Dish.create({
        user: req.user.id,
        name,
        description,
        image,
        price
    })

    res.status(201).json(dish);
})

//@desc Get all dishes
//@route GET/dishes/:id
const getDish = asyncHandler(async(req,res) => {
    const dish = await Dish.findById(req.params.id).populate("rating").populate("rating.user")

    if(!dish){
        res.status(404)
        throw new Error("The dish in not found.")
    }

    res.status(200).json(dish);
})

//@desc Get all dishes
//@route PUT/dishes/:id
const updateDish = asyncHandler(async(req,res) => {
    const dish = await Dish.findById(req.params.id)
    
    if(!dish){
        res.status(404)
        throw new Error("The dish is not found.")
    }

    if(dish.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("This user does have the authorization to update this dish")
    }

    const updatedDish = await Dish.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(updatedDish);
})

//@desc Get all dishes
//@route DELETE/dishes/:id
const deleteDish = asyncHandler(async(req,res) => {
    
    const dish = await Dish.findById(req.params.id)

    if(!dish){
        res.status(404)
        throw new Error("The dish is not found.")
    }

    if(dish.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("This user does have the authorization to delete this dish")
    }

    await Dish.deleteOne({_id: req.params.id})

    res.status(200).json(dish);
})

//@desc Add rating
//@route Post/dishes/rating
const rateDish = asyncHandler(async(req,res) => {
    
    const rating = req.body.rating
    if( rating > 5 || rating < 1){
        res.status(404)
        throw new Error("Dishes can only be rated between 1 to 5")
    }

    const userId = req.user.id
    const user = await User.findOne({_id: userId})

    const dish = await Dish.findOne(
        {
            _id: req.body.id
        ,
    
            rating:{ 
                $not:{ 
                    $elemMatch: { user: userId } 
                }
            }
        }
    );

    if(!dish || user.user_name == "Sméagol"){
        res.status(404)
        throw new Error(`The dish is either not found or is already rated by the current user. 
        [Note: If current user name is 'Sméagol' you are not allowed to rate]`)
    }

    const ratingObject = {
        user: userId,
        userRating: Math.round(rating)
    }
    await Dish.updateOne(
        {
            _id: req.body.id
        },
        {
            $push: {rating: ratingObject}
        }
    )
    res.status(200).json(dish);
})

module.exports = { 
    getDishes,
    getDish,
    createDish, 
    updateDish, 
    deleteDish,
    rateDish 
}
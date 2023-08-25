# theDancingPony

## How to run
- Clone the repo attach the provided .env file 
- npm i
- npm run start

# The api's in this code are divided in two parts

## 1. '/user' (public)

- These are Public api's
- These api do not require JWt auththentication the post call was not not mentioned but I made it for efficacy feel free to create new authorized user.

### 'http:localhost:5001/user/'  

- POST call
-**Description:** Create new user
-**ExamplePaylod:**
{
  "user_name": "Diego",
  "password": "Maradona",
  "nick_name": "El Pibe"
  "phone": 982731928
  "email": "handOfGod@worldcup.com"
}

### 'http:localhost:5001/login'  

- POST call
-**Description:** It will provide the JWT token for the created user. Use this token with "Bearer" in auth tab of preffered aapi client 
-**ExamplePaylod:**
{
  "user_name": "Diego",
  "password": "Maradona"
}

# 2. '/dishes' 

- All these api's are Private
- All the apis in this section requires JWT token which expires every 15 minutes (*Note: can be changed from line 17 in dishRoute.js inside of Routes folder* ). 
- They also have a rate limit of 100 hits per hour (*Note: can be changed from controller > userController.js > line 54*).

### 'http:localhost:5001/dishes'  

**Description:** Will fetch the list of all the dishes with their ids. It also contains two query params *offset* and *skip* for pagination(for expamle set offset 2 and skip 2 you will get second and thrid documents).

### 'http:localhost:5001/dish/:id'  

**Description:** Will fetch the dish and all its properties like "its rating given by all or any users" with its "_id" from the list generated above.

## POST
### 'http:localhost:5001/dishes/'  

-**Description:** Create new dish
-**ExamplePaylod:**{
{
  "name": "Cheese", //mandatory and unique
  "description": "Middle earth fire bourn", //mandatory and unique
  "image": "https://images.app.goo.gl/Ac9k9sJ2cyQ1BTtV8](https://images.app.goo.gl/EoSTAFzZ8dACYgZf6",
  "price": {
    "value": 15,
    "unit": "$"
  }
}
}

>NOTE: I added a extra validation here that all authorized users can see all the dishes but only the creator can update or delete it. Can remove this if not nessesary

## PUT
### 'http:localhost:5001/dish/:id'  

-**Description:** Update already existing dish using "_id" from the dish list
-**ExamplePaylod:**{
{
  "name": "**Fire**Cheese", //mandatory and unique
  "description": "Middle earth fire bourn", //mandatory and unique
  "image": "https://images.app.goo.gl/Ac9k9sJ2cyQ1BTtV8](https://images.app.goo.gl/EoSTAFzZ8dACYgZf6",
  "price": {
    "value": 15,
    "unit": "$"
  }
}
}

## DELETE
### 'http:localhost:5001/dish/:id'  

-**Description:** Delete existing dish using "_id" from the dish list

## Post
### 'http://localhost:5001/dishes/rating'

-**Description:** Add rating to any dish if you are authorized user 
-**Conditions:** 
    * Each dish can only be rated once by one user.
    * If current user name is 'Sméagol' you are not allowed to rate.
    * Dishes can only be rated between 1-5 in whole numbers otherwise it will be rounded to the nearest whole number.
> Can check all the ratings from the "/dish/:id" api's result in "rating" property which is an array of ratings given by different user




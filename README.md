# Request App server!

This app was made with Node.js 
tests: Supertest and express
DataBase: psql
Deployed server:https://mighty-temple-37477.herokuapp.com/
## Set up

Complete the following steps to start 

1. Clone this repository to your local machine `git clone https://github.com/Mchicksr/Request-app-server.git
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies with `npm install`
5. Move the example Environment file to `.env` 
6. Edit the contents of the `package.json` 

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## info
Routes
1.  './songs' songs route holds the body to create the single request for a song as well as the rote to Get all songs.

2.  './review' the review route allows you to post a review to be sent to the database to be viewed.

## POST /api/songs

//req.body
{
Name:String,
Artist:String,
Title:String,
Comment:String
}

## POST/api/review

//req.body

{
Review:String
}

## GET /api/songs
// res.body
{
Id:int
Name:String,
Artist:String,
Title:String,
Comment:String

} 

## GET /api/songs/:id
//res.params
{
Id:ID
}
// res.body
{
Id:int
Name:String,
Artist:String,
Title:String,
Comment:String

} 

## GET /api/review/:id
//res.params
{
Id:ID
}
//res.body
{
Review:String
}

### Built with
* Node - Run-time environment
* Express - Web application framework
* PSQL - Database
* Mocha - Testing
* Chai - Testing

Authors
Michael Hicks Richardson - Full-Stack

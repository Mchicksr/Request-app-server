const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const songsRouter = require('./request-server/request-router')
const reviewRouter = require('./review/review-router')
const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
//
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

 app.use('/api',songsRouter)
 app.use('/api',reviewRouter)

 app.post('/songs', (req,res) => {
  res.status(201).send('all the songs')
 })
// app.get('/api/review',(req, res) => {
// res.send('done');
// })

 app.post('/review', (req,res)=>{
   res.status(201).send('all the reviews')
 })
// localhost8080/api/songs

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error'} };
  } else {
    console.error(error);
    response = { message: error.message, error};
  }
  res.status(500).json(response);
});

module.exports = app;
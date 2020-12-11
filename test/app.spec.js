// const { expect } = require('chai');
// const supertest = require('supertest');
const supertest = require('supertest');
const app = require('../src/app');
const knex = require('knex')

describe('App', () => {


  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('songs').truncate())

  afterEach('cleanup',() => db('songs').truncate())

  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });


describe(`POST /songs`, () => {
  it(`creates a Song, responding with 201 and the new song`, function() {
    return supertest(app)
    .post('/songs')
    .send({
      name: 'mike',
      title: 'airplane',
      artist: 'memes'
    })
    .expect(201)
  })
})

describe(`GET /songs`, () => {
  it('GET / responds with 201 containing "all the songs"', () => {
    return supertest(app)
    .get('/api/songs')
    .expect(200, [])
  })
})

describe(`POST /review`, () => {
  it(`creates a review, responding with 201 and the new review`, function() {
    return supertest(app)
    .post('/songs')
    .send({
      review: 'well done',
    
    })
    .expect(201)
  })
})



});

const { expect } = require('chai');

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

  context('Given there are Songs in the database', () => {
    const testSongs = [

    {
      id:1,
      name:'Joe',
      title:'lemonade',
      comment:'',
      artist:'Don Toliver'    
  },
  {
      id:2, 
      name:'chad',
      title:'Why iii love the moon',
      comment:'',
      artist:'Phony Ppl'
  },
  {
      id:3,
      name:'sarah',
      title:'Airplane',
      comment:'',
      artist:'Limbo'
  },
];

beforeEach('insert songs', () => {
         return db
           .into('songs')
           .insert(testSongs)
       })
  

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
    .expect(200)
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

describe(`GET /songs/:id`, () => {
  it('GET / responds with 200 containing ":id"', () => {
    const songId = 2
    const expectedSong = testSongs[songId - 1]
    return supertest(app)
    .get(`/api/songs/${songId}`)
    .expect(200, expectedSong)
  })
})



})

context('Given there are Reviews in the database', () => {

  const testReview = [
    {
      id:1,
      review:"great job"
    },
    {
      id:2,
      review:"Noice"
    },
  ];
  beforeEach('insert review', () => {
    return db
      .into('review')
      .insert(testReview)
  })
  describe(`GET /review`, ()  => {
    it('GET / responds with 201 containing "all the reviews"', () => {
      return supertest(app)
      .get('/api/review')
      .expect(200)
    })
  })

  describe(`GET /review/:id`, () => {
    it('GET / responds with 200 containing ":id"', () => {
      const reviewId = 2
      const expectedReview = testReview[reviewId - 1]
      return supertest(app)
      .get(`/api/review/${reviewId}`)
      .expect(200, expectedReview)
    })
  })
})
});

// const { expect } = require('chai');
// const supertest = require('supertest');
const supertest = require('supertest');
const app = require('../src/app');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });
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
  it(`GET, responding with 201 and the n`, function() {
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

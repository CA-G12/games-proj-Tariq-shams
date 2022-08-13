/* eslint-disable linebreak-style */
/* eslint-disable arrow-parens */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */

const supertest = require('supertest');
const { expect } = require('expect');
const router = require('./router');

test('home route should returns a status code of 200', done => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.statusCode).toBe(200);
      done();
    });
});

test('home route should returns a status code of 200', done => {
  supertest(router)
    .get('/js/dom.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.statusCode).toBe(200);
      done();
    });
});

test('Requested a page is not found, should returns a status code of 404', done => {
  supertest(router)
    .get('/animals')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.text).toBe('This page Not Found!!');
      done();
    });
});

test('router should returns a status code of 200', done => {
  supertest(router)
    .get('/js/fetch.js')
    .expect(200)
    .expect('Content-Type', /javascript/)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      expect(res.statusCode).toBe(200);
      done();
    });
});

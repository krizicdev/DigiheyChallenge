const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('encode API endpoint', () => {
  it('should return the encoded string for valid input', (done) => {
    const inputString = 'aabbbbcc';
    const expectedOutput = 'a2b4c2';

    chai.request(app)
      .post('/encode')
      .set('Authorization', 'xyz0987654321')
      .send({ stringToEncode: inputString })
      .end((err, res) => {
        if (err) {
          console.log('error in ==== should return 404 error for missing input ===>', err);
          done();
        }
        expect(res).to.have.status(200);
        expect(res.body.encodedString).to.equal(expectedOutput);
        done();
      });
  });

  it('should return 404 error for missing input', (done) => {
    chai.request(app)
      .post('/encode')
      .set('Authorization', 'xyz0987654321')
      .end((err, res) => {
        if (err) {
          console.log('error in ==== should return 404 error for missing input ===>', err);
          done();
        }
        expect(res).to.have.status(404);
        expect(res.text).to.equal('String is required.');
        done();
      });
  });

  it('should return 401 error for missing authorization token', (done) => {
    const inputString = 'aabbbbcc';
    chai.request(app)
      .post('/encode')
      .send({ stringToEncode: inputString })
      .end((err, res) => {
        if (err) {
          console.log('error in ==== should return 401 error for missing authorization token ===>', err);
          done();
        }
        expect(res).to.have.status(401);
        expect(res.text).to.equal('Unauthorized');
        done();
      });
  });
});

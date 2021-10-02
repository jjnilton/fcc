const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  // using project with name 'test' with two objects

  test('POST /api/issues/{project} with every field', (done) => {
    chai
      .request(server)
      .post('/api/issues/project')
      .send({ issue_title: "Title", issue_text: "Text", created_by: "Author", assigned_to: "Self", status_text: "Status" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.include(res.body, { issue_title: "Title", issue_text: "Text", created_by: "Author", assigned_to: "Self", status_text: "Status" })
        done();
      })
  })

  test('POST /api/issues/{project} with required fields', (done) => {
    chai
      .request(server)
      .post('/api/issues/project')
      .send({ issue_title: "Title", issue_text: "Text", created_by: "Author" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.include(res.body, { issue_title: "Title", issue_text: "Text", created_by: "Author", assigned_to: "", status_text: "" })
        done();
      })
  })

  test('POST /api/issues/{project} missing one required field', (done) => {
    chai
      .request(server)
      .post('/api/issues/project')
      .send({ issue_title: "Title", issue_text: "Text" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.error, 'required field(s) missing')
        done();
      })
  })

  test('GET /api/issues/{project} all issues in project', (done) => {
    chai
      .request(server)
      .get('/api/issues/test')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 2)
        done();
      })
  })

  test('GET /api/issues/{project} with one filter', (done) => {
    chai
      .request(server)
      .get('/api/issues/test?open=false')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.include(res.body.map(item => item.open), false);
        assert.notInclude(res.body.map(item => item.open), true);
        done();
      })
  })

  test('GET /api/issues/{project} with multiple filters', (done) => {
    chai
      .request(server)
      .get('/api/issues/test?open=true&status=wontfix')
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      })
  })

  test('PUT /api/issues/{project} update one field', (done) => {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({ _id: "61586f194dc97a36db2344bf", issue_title: "Updated Title" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { result: 'successfully updated', _id: '61586f194dc97a36db2344bf' })
        done();
      })
  })

  test('PUT /api/issues/{project} update multiple fields', (done) => {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({ _id: "61586f194dc97a36db2344bf", issue_title: "Updated Title", issue_text: "Updated Text" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { result: 'successfully updated', _id: '61586f194dc97a36db2344bf' })
        done();
      })
  })

  test('PUT /api/issues/{project} missing _id', (done) => {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({ issue_title: "Updated Title", issue_text: "Updated Text" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'missing _id' })
        done();
      })
  })

  test('PUT /api/issues/{project} without fields', (done) => {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({ _id: "61586f194dc97a36db2344bf" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'no update field(s) sent', _id: "61586f194dc97a36db2344bf" })
        done();
      })
  })

  test('PUT /api/issues/{project} with invalid _id', (done) => {
    chai
      .request(server)
      .put('/api/issues/test')
      .send({ _id: "invalid_id", issue_title: "Updated Title", issue_text: "Updated Text" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'could not update', _id: "invalid_id" })
        done();
      })
  })

  test('DELETE /api/issues/{project} with valid _id', (done) => {
    chai
      .request(server)
      .get('/api/issues/project')
      .end((err, res) => {
        const issueId = res.body[0]._id;
        chai
          .request(server)
          .delete('/api/issues/project')
          .send({ _id: issueId })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.deepEqual(res.body, { result: 'successfully deleted', '_id': issueId })
            done();
          })
      })
  })

  test('DELETE /api/issues/{project} with invalid _id', (done) => {
    chai
      .request(server)
      .delete('/api/issues/project')
      .send({ _id: "invalid_id" })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'could not delete', '_id': "invalid_id" })
        done();
      })

  })

  test('DELETE /api/issues/{project} with invalid _id', (done) => {
    chai
      .request(server)
      .delete('/api/issues/project')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'missing _id' })
        done();
      })
  })



});

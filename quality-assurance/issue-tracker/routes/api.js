'use strict';
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = function(app) {

  app.route('/api/issues/:project')

    .get(function(req, res) {
      let project = req.params.project.trim();
      let query = req.query;

      if (Object.keys(query).includes("_id")) {
        query._id = ObjectId(query._id);
      }

      if (query.open) {
        if (query.open === 'false') {
          query.open = false;
        } else {
          query.open = true;
        }
      }

      client.connect(err => {
        const collection = client.db("myDb").collection(project);
        let result = collection.find(query).toArray().then(items => {
          const issueList = items.map(item => ({ ...item, _id: item._id.toString() }))
          res.json(issueList)
        }).then(() => { client.close() });
      })

    })

    .post(function(req, res) {
      let project = req.params.project.trim();
      const updatedIssue = {};

      const issueTitle = req.body.issue_title ? req.body.issue_title.trim() : "";
      const issueText = req.body.issue_text ? req.body.issue_text.trim() : "";
      const issueCreatedBy = req.body.created_by ? req.body.created_by.trim() : "";
      const issueAssignedTo = req.body.assigned_to || "";
      const issueStatusText = req.body.status_text || "";
      const issueCreatedOn = new Date().toISOString();
      const issueUpdatedOn = new Date().toISOString();

      if (issueTitle.length > 0 && issueText.length > 0 && issueCreatedBy.length > 0) {

        const issue = { _id: ObjectId(), issue_title: issueTitle, issue_text: issueText, created_on: issueCreatedOn, updated_on: issueUpdatedOn, created_by: issueCreatedBy, assigned_to: issueAssignedTo, open: true, status_text: issueStatusText }

        client.connect(err => {
          const collection = client.db("myDb").collection(project);
          collection.insertOne(issue).then(() => {
            res.json(issue);
            client.close()
          });
        })
      } else {
        res.json({ error: 'required field(s) missing' })
      }

    })

    .put(function(req, res) {
      let project = req.params.project;

      const issueId = req.body._id;

      const updatedIssue = {};

      const issueTitle = req.body.issue_title;
      const issueText = req.body.issue_text;
      const issueCreatedBy = req.body.created_by;
      const issueAssignedTo = req.body.assigned_to;
      const issueStatusText = req.body.status_text;
      const issueOpen = req.body.open;

      if (issueTitle) updatedIssue.issue_title = issueTitle;
      if (issueText) updatedIssue.issue_text = issueText;
      if (issueCreatedBy) updatedIssue.created_by = issueCreatedBy;
      if (issueAssignedTo) updatedIssue.assigned_to = issueAssignedTo;
      if (issueStatusText) updatedIssue.status_text = issueStatusText;
      if (issueOpen) updatedIssue.open = false;

      let hasUpdatedFields = false;
      if (Object.keys(updatedIssue).length > 0) {
        hasUpdatedFields = true;
        updatedIssue.updated_on = new Date().toISOString();
      }


      let validIdFormat;
      try {
        ObjectId(issueId)
        validIdFormat = true;
      } catch (err) {
        // console.log(err)
        validIdFormat = false;
      }


      if ((issueId && issueId.length) > 0 && validIdFormat && hasUpdatedFields) {
        client.connect(err => {
          const collection = client.db("myDb").collection(project);
          const result = collection.updateOne({ _id: ObjectId(issueId) }, { $set: updatedIssue }).then((result) => {
            if (result.modifiedCount === 1) {
              res.json({ result: 'successfully updated', '_id': issueId })
            } else {
              throw new Error('invalid stuff')
            }
            client.close()
          }).catch(error => { res.json({ error: 'could not update', '_id': issueId }) });

        })
      } else if (!issueId || issueId.length <= 0) {
        res.json({ error: 'missing _id' })
      } else if (issueId && !hasUpdatedFields) {
        res.json({ error: 'no update field(s) sent', '_id': issueId })
      } else {
        res.json({ error: 'could not update', '_id': issueId })
      }


    })

    .delete(function(req, res) {
      let project = req.params.project;

      const issueId = req.body._id;

      let validIdFormat;
      try {
        ObjectId(issueId)
        validIdFormat = true;
      } catch (err) {
        // console.log(err)
        validIdFormat = false;
      }
      if (!validIdFormat) {
        res.json({ error: 'could not delete', '_id': issueId })
      } else if (issueId && issueId.length > 0) {
        client.connect(err => {
          const collection = client.db("myDb").collection(project);
          const result = collection.deleteOne({ _id: ObjectId(issueId) }).then((result) => {
            if (result.deletedCount === 1) {
              res.json({ result: 'successfully deleted', '_id': issueId })
            } else {
              res.json({ error: 'could not delete', '_id': issueId })
            }
            client.close();
          })
        })
      } else {
        res.json({ error: 'missing _id' })
      }


    });

};

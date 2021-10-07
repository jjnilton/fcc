/*
*
*
*       Complete the API routing below
*       
*       
*/

require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const uri = process.env.DB;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

'use strict';

module.exports = function(app) {

  app.route('/api/books')
    .get(function(req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      client.connect(err => {
        const collection = client.db("myDb").collection("books");
        // perform actions on the collection object
        const result = collection.find().toArray().then(items => {
          res.json(items.map(item => ({ ...item, _id: item._id.toString() })));
        })
      })

    })

    .post(function(req, res) {
      let title = req.body.title;
      if (title && title.length > 0) {
        //response will contain new book object including atleast _id and title
        client.connect(err => {
          const collection = client.db("myDb").collection("books");
          const result = collection.insertOne({ _id: ObjectId(), title, commentcount: 0, comments: [] }).then(result => {
            res.json({ _id: result.insertedId.toString(), title, commentcount: 0 })
          })
        })
      } else {
        res.send("missing required field title")
      }


    })

    .delete(function(req, res) {
      //if successful response will be 'complete delete successful'
      client.connect(err => {
        const collection = client.db("myDb").collection("books");
        const result = collection.deleteMany().then(result => {
          res.send('complete delete successful')
        })
      })
    });



  app.route('/api/books/:id')
    .get(function(req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      try {
        ObjectId(bookid)
      } catch {
        res.send("no book exists")
      }

      client.connect(err => {
        const books = client.db("myDb").collection("books");
        const result = books.findOne({ _id: ObjectId(bookid) }, { projection: { commentcount: 0 } }).then(result => {
          if (result) {
            res.json(result)
          } else {
            throw new Error('id does not exist in db')
          }
        }).catch(err => {
          res.send("no book exists")
        })
      })
    })

    .post(function(req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      console.log(req.body)
      console.log(Object.keys(req.body))

      if (!Object.keys(req.body).includes('comment')) {
        res.send("missing required field comment")
      }

      try {
        ObjectId(bookid)
      } catch {
        res.send("no book exists")
      }

      if (comment.length > 0) {
        client.connect(err => {
          const books = client.db("myDb").collection("books");
          const result = books.findOneAndUpdate({ _id: ObjectId(bookid) }, { $push: { comments: comment }, $inc: { commentcount: 1 } }, { returnDocument: 'after' }, { projection: { commentcount: 0 } }).then(result => {
            // res.json({ ...result.value, comments: [...result.value.comments, comment] })
            console.log(result)
            if (result.lastErrorObject.updatedExisting) {
              res.json(result.value)
            } else {
              throw new Error('id does not exist in db')
            }
          }).catch(err => {
            res.send("no book exists")
          })
        })
      } else {
        res.send("missing required field comment")
      }


    })

    .delete(function(req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'

      try {
        ObjectId(bookid)
      } catch {
        res.send('no book exists')
      }

      client.connect(err => {
        const books = client.db("myDb").collection("books");
        const result = books.deleteOne({ _id: ObjectId(bookid) }).then(result => {
          if (result.deletedCount > 0) {
            res.send('delete successful')
          } else {
            throw new Error('id does not exist')
          }
        }).catch(err => {
          res.send('no book exists')
        })
      })
    });

};

const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.use(bodyParser.urlencoded({ extended: false }));

const users = [];
const exercises = [];

const isValidDateFormat = (dateString) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-([0-9]$|[0-2][0-9]|3[0-1])/g;

  if (dateString && dateString.match(regex) && !isNaN(new Date(dateString))) {
    return true
  }
  return false;

};

app.use((req, res, next) => {
  console.log(req.url, req.method, req.method === 'POST' ? req.headers['content-type'] : '', JSON.parse(JSON.stringify(req.body)));
  next();
})

app.post('/api/users', (req, res) => {
  const userName = req.body.username;
  const userId = users.length;
  const user = {
    _id: userId.toString(),
    username: userName
  };
  users.push(user);
  res.json(user);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users/:_id/exercises', (req, res) => {

  const id = req.params._id;
  const description = req.body.description;
  const duration = +req.body.duration;

  let date = req.body.date;
  if (isValidDateFormat(date)) {
    date = new Date(date);
  } else {
    date = new Date();
  }

  date = date.toDateString();

  const exercise = {
    description: description,
    duration: duration,
    date: date
  }

  const userIndex = users.findIndex(user => {
    return user._id == id;
  })

  exercises.push({...exercise, _uid: userIndex})
  res.json({...users[userIndex], ...exercise});

});

app.get('/api/users/:_id/logs', (req, res) => {

  const id = req.params._id;

  const minDate = req.query.from;
  const maxDate = req.query.to;
  let logLimit = +req.query.limit;

  const userIndex = users.findIndex(user => {
    return user._id == id;
  });

  const filteredExercises = exercises.filter(exercise => {
    return exercise._uid == userIndex;
  });

  let withoutUid = filteredExercises.map(({_uid, ...element}) => element);

  if (!logLimit) {
    logLimit = withoutUid.length;
  };

  if (isValidDateFormat(minDate)) {
    withoutUid = withoutUid.filter(exercise => {
      return new Date(exercise.date) > new Date(minDate);
    });
  };

  if (isValidDateFormat(maxDate)) {
    withoutUid = withoutUid.filter(exercise => {
      return new Date(exercise.date) < new Date(maxDate);
    });
  };

  const response = {...users[userIndex], log: withoutUid.slice(0, logLimit), count: logLimit};
  userIndex >= 0 ? res.json(response) : res.json({error: 'Not found.'}); 

});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
});

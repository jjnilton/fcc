# Exercise Tracker Microservice

## Description

API endpoints to register user, exercises, and get the exercises of a user.

Example Usage:

```POST /api/users/:_id/exercises```

Output:
```
{
  username: "fcc_test"
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
}
```

```POST /api/users```

Output:

```
{
  username: "fcc_test",
  _id: "5fb5853f734231456ccb3b05"
}
```


```GET /api/users/:_id/logs```

Log:

```
{
  username: "fcc_test",
  count: 1,
  _id: "5fb5853f734231456ccb3b05",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
}
```





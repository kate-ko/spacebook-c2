var express = require('express');
var bodyParser = require('body-parser');
const path = require('path')

const SERVER_PORT = 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})
var { Post, Comment } = require('./models/postModel');

var app = express();
app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(express.static('models'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/posts', (req, res) => {
  Post.find().exec(function (err, posts) {
    res.send(posts)
  })
})

// adds new post to DB and sends back added post with id from DB
app.post('/add-new-post', (req, res) => {
  Post.find().exec(function (err, rst) {
    let newPost = new Post(req.body)
    newPost.save()
    res.send(newPost)
  })
})

// removes post from DB
app.delete('/remove-post/:id', (req, res) => {
  let id = req.params.id
  Post.findByIdAndRemove(id).exec(function (err, res) { })
})

// adds comment to DB
app.post('/posts/:postId/add-comment', (req, res) => {
  let id = req.params.postId

  Post.findById(id).exec(function (err, currPost) {
    currPost.comments.push(new Comment(req.body))

    Post.findByIdAndUpdate(id, currPost).exec(function (err, updatedPost) {
      let len = currPost.comments.length
      res.send(currPost.comments[len - 1]) // sending added comment back
    })
  })
})

// removes comment from DB
app.delete('/posts/:postId/remove-comment/:commentId', (req, res) => {
  let postId = req.params.postId
  let commentId = req.params.commentId

  Post.findById(postId).exec(function (err, currPost) {
    currPost.comments.id(commentId).remove();
    Post.findByIdAndUpdate(postId, currPost).exec(function (err, updatedPost) {
    })
  })
})

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
})




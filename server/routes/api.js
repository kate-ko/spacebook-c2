var express = require('express');
var bodyParser = require('body-parser');
const path = require('path')

var { Post, Comment } = require('../../models/postModel');

const router = express.Router()

router.get('/posts', (req, res) => {
  Post.find().exec(function (err, posts) {
    res.send(posts)
  })
})

// adds new post to DB and sends back added post with id from DB
router.post('/add-new-post', (req, res) => {
  let newPost = new Post(req.body)
  newPost.save()
  res.send(newPost)
})

// removes post from DB
router.delete('/remove-post/:id', (req, res) => {
  let id = req.params.id
  Post.findByIdAndRemove(id).exec(function (err, res) { })
})

// adds comment to DB
router.post('/posts/:postId/add-comment', (req, res) => {
  let id = req.params.postId
  Post.findByIdAndUpdate(id, { $push: { comments: req.body } },
    { new: true }, (err, post) => {
      if (err) throw err;
      else {
        let len = post.comments.length
        res.send(post.comments[len - 1])
      }
    })
})

// removes comment from DB
router.delete('/posts/:postId/remove-comment/:commentId', (req, res) => {
  let postId = req.params.postId
  let commentId = req.params.commentId

  Post.findById(postId).exec(function (err, currPost) {
    currPost.comments.id(commentId).remove();
    Post.findByIdAndUpdate(postId, currPost).exec(function (err, updatedPost) {
    })
  })
})

module.exports = router

/*Post.findById(id).exec(function (err, currPost) {
    currPost.comments.push(new Comment(req.body))

    Post.findByIdAndUpdate(id, currPost).exec(function (err, updatedPost) {
      let len = currPost.comments.length
      res.send(currPost.comments[len - 1]) // sending added comment back
    })
})*/

/*
Post.findByIdAndUpdate(req.body.postId, 
    {$pull: 
      {comments: {
        _id: req.body.commentId}
      }
    }, {new: true}, (err, post) => {
      if (err) throw err;
      else res.send(post)
    })
  })
*/
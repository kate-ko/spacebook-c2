var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//design the two schema below and use sub docs 
//to define the relationship between posts and comments

var commentSchema = new mongoose.Schema({
    user: String,
    text: String,
  })
  
  var postSchema = new mongoose.Schema({
    user: String,
    text: String,
    statusOpen: Boolean,
    comments: [commentSchema]
  })
  
let Post = mongoose.model('Post', postSchema)

let Comment = mongoose.model('Comment', commentSchema)

module.exports = { Post: Post, Comment: Comment };

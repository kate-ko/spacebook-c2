/*const express = require('express')
var bodyParser = require('body-parser')
//const path = require('path')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/spacebookDB', function () {
  console.log("DB connection established!!!");
})

var Post = require('./models/postModel.js')
var Comment = require('./models/postModel.js')

//const request = require('request')
const router = express.Router()

//returns all the posts (and their comments)
router.get('/posts', (req, res) => {
  Post.findOne().exec(function(err, res){
    console.log(res)
    res.json(res)
  }); 
})
*/
// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
// 2) to handle adding a post
// 3) to handle deleting a post
// 4) to handle adding a comment to a post
// 5) to handle deleting a comment from a post
/*
router.get('/hosts', (req, res) => {
  fs.readFile(HOSTS_FILE, 'utf8', function (err, data) {
    if (err) throw err
    res.json(data)
  });
})

router.post('/write-to-hosts', (req, res) => {
  var newHost = { name: req.body.name, text: req.body.text }
  var hosts = []

  fs.readFile(HOSTS_FILE, 'utf8', function (err, data) {
    if (err) throw err

    if (data !== "") {
      hosts = JSON.parse(data)
    }

    hosts.push(newHost)

    fs.writeFile(HOSTS_FILE, JSON.stringify(hosts), function (err) {
      if (err) throw err
      else console.log('Data saved to hosts file!')
    });

  });
})

// Receive secret of someone else
router.post('/secret', (req, res) => {
  var newSecret = { name: req.body.name, secret: req.body.secret }
  classmatesSecrets.push(newSecret)
  response = { secretResponse: "Thank you for sharing your secret with me." }
  res.json(response)
})

// Send secret to someone else
router.post('/send-secret', (req, res) => {
  let server = req.body.server
  let url = "https://" + server + ".serveo.net/secret"
  let data = {
      name: 'kate',
      secret: 'i like the beach'
    }

  const options = {
      method: 'POST',
      uri: url,
      body: data,
      json: true 
        // JSON stringifies the body automatically
  }

  request.post(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.json(body)
  })
})
*/
//module.exports = router


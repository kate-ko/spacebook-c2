var SpacebookApp = function () {
  return {
    /* Structure of posts array
    posts: [
      {
        text: "Hello world", id: 1, comments: [
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" },
          { text: "Man, this is a comment!" }
        ]
      }
    ],*/

    STORAGE_ID : 'spacebook',

    saveToLocalStorage: function () {
      localStorage.setItem(this.STORAGE_ID, JSON.stringify(this.posts));
    },

    getFromLocalStorage: function () {
      this.posts = JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
    },

    // the current id to assign to a post
    currentId: 4,
    $posts: $('.posts'),

    _findPostById: function (id) {
      for (var i = 0; i < this.posts.length; i += 1) {
        if (this.posts[i].id === id) {
          return this.posts[i];
        }
      }
    },

    createPost: function (text) {
      var post = {
        text: text,
        id: this.currentId,
        comments:[]
      }

      this.currentId += 1;
      this.posts.push(post);
      this.saveToLocalStorage();
    },

    renderPosts: function () {
      this.$posts.empty();
      this.getFromLocalStorage();

      for (var i = 0; i < this.posts.length; i += 1) {
        var post = this.posts[i];

        var commentsContainer = `<div class="comments-container">
                                  <input type="text" class="comment-name">
                                  <button class="btn btn-primary add-comment">Post Comment</button> 
                                  ${this.getCommentsHTML(post)}
                                </div>`;

        this.$posts.append('<div class="post" data-id=' + post.id + '>'
          + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
          commentsContainer + '</div>');
      }
    },

    removePost: function (postID) {
      var post = this._findPostById(postID);
      this.posts.splice(this.posts.indexOf(post), 1);
      this.saveToLocalStorage();
    },

    toggleComments: function (currentPost) {
      var $clickedPost = $(currentPost).closest('.post');
      $clickedPost.find('.comments-container').toggleClass('show');
    },

    createComment: function (text, postID) {

      var comment = { text: text };
  
      // pushing the comment into the correct posts array
      this._findPostById(postID).comments.push(comment);
      this.saveToLocalStorage();
    },

    removeComment: function (commentIndex, postID) {
      // remove the comment from the comments array on the correct post object
      this._findPostById(postID).comments.splice(commentIndex, 1); 
      this.saveToLocalStorage();
    },

    getCommentsHTML: function (post) {
      let str = "<ul>";
      console.log(post.comments);
      for (let comment of post.comments){
        str+='<li class="comment">' + comment.text +
          '<button class="btn btn-danger btn-sm remove-comment">Remove Comment</button>' +
          '</li>'
      }
      str+="</ul>";
      return str;
    }
  };
}



var app = SpacebookApp();



// immediately invoke the render method
app.renderPosts();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.removePost(postID);
  app.renderPosts();
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});
  
$('.posts').on('click', '.add-comment', function () {
  var text = $(this).siblings('.comment-name').val();
  // finding the index of the post in the page... will use it in #createComment
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.createComment(text, postID);
  app.renderPosts();
});

$('.posts').on('click', '.remove-comment', function () {
  // the comment element that we're wanting to remove
  var $clickedComment = $(this).closest('.comment');
  // index of the comment element on the page
  var commentIndex = $clickedComment.index();
  //get the post id   
  var $clickedPost = $(this).closest('.post');
  var postID = $clickedPost.data().id;

  app.removeComment(commentIndex, postID);
  app.renderPosts();
}); 
///////----------------------------------------------
 

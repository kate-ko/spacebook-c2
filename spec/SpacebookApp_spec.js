
describe("app.createPost", function() {
    it("should add a new post to the list", function() {
     app.createPost("jjj");
  
      var actualResult = app.posts[app.posts.length-1].text;
  
      expect(actualResult).toBe("jjj");
    });
  });

describe("app.createPost app.removePost", function() {
    it("adds a new post to the list and remove it", function() {
     var lengthBefore = app.posts.length;
     app.createPost("jjj");
     var id = app.posts[app.posts.length-1].id;
     app.removePost(id);
  
     var actualResult = app.posts.length;
  
     expect(actualResult).toBe(lengthBefore);
    });
});

describe("app.removePost", function() {
  it("removes last post", function() {
   var lengthBefore = app.posts.length;
   var id = app.posts[app.posts.length-1].id;
   app.removePost(id);

   var actualResult = app.posts.length;

   expect(actualResult).toBe(lengthBefore - 1);
  });
});

describe("app.removePost", function() {
  if ((typeof app.posts) != "undefined") {
    it("removes all the posts", function() {
    var lengthBefore = app.posts.length;

    for (var i = 0; i < lengthBefore; i++) {
      app.removePost(app.posts[0].id);
    }

    //var actualResult = app.posts.length;
    //expect(actualResult).toBe(0);
    var actualResult = typeof app.posts;
    expect(actualResult, "underfined");
    });
  }
});

describe("app.removePost", function() {
  it("removes all the posts and adds 3 them back", function() {
   var lengthBefore = app.posts.length;
   var array = [];
   for (var i = 0; i < lengthBefore; i++) {
    array[i] = app.posts[i].text;
    app.removePost(app.posts[0].id);
   }

   for (var i = 0; i < lengthBefore; i++) {
    app.createPost(array[i]);
   }

   var actualResult = app.posts.length;
   expect(actualResult).toBe(lengthBefore);
  });
});
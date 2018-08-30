/* Posts creation */

var aPost = new Post({ user: "Brandon", text: "Post 1" , statusOpen: false });

aPost.comments.push( new Comment({ user: "Nick", text: "Comment A to Post 1" }),
                    new Comment({ user: "Omer", text: "Comment B to Post 1" }), 
                    new Comment({ user: "Dylan", text: "Comment C to Post 1" }))
aPost.save()

aPost = new Post({ user: "Paul", text: "Post 2" , statusOpen: false });

aPost.comments.push( new Comment({ user: "Jim", text: "Comment A to Post 2" }),
                    new Comment({ user: "Jack", text: "Comment B to Post 2" }), 
                    new Comment({ user: "Justin", text: "Comment C to Post 2" }))
aPost.save()

aPost = new Post({ user: "Smith", text: "Post 3" , statusOpen: false });

aPost.comments.push( new Comment({ user: "Drew", text: "Comment A to Post 3" }),
                    new Comment({ user: "Stiven", text: "Comment B to Post 3" }), 
                    new Comment({ user: "Melanie", text: "Comment C to Post 3" }))
aPost.save()



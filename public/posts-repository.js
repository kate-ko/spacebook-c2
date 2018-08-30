/**
 * @class Responsible for storing and manipulating Spacebook posts, in-memory
 */
class PostsRepository {
    constructor() {
       this.posts = []
    }

    addPost(newPost) {
        this.posts.push(newPost)
    }

    removePost(index) {
        this.posts.splice(index, 1);
    }

    addComment(newComment, postIndex) {
        this.posts[postIndex].comments.push(newComment);
    };

    deleteComment(postIndex, commentIndex) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
    };

    // Universal ajax function
    funcAjax(method, url, data) {
        if (method === "POST") {
            return $.ajax({
                method: method,
                url: url,
                data: data,
                dataType: "json"
            })
        }

        return $.ajax({
            method: method,
            url: url,
            dataType: "json"
        })
    }
}

export default PostsRepository


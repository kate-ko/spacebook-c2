class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
        
        // Getting posts from DB for the first time 
        this.postsRepository.funcAjax('GET','\posts').then((data)=>{
            this.postsRepository.posts = data;
            this.postsRenderer.renderPosts( postsRepository.posts )
        });
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");

            if ($input.val() === "") {
                alert("Please enter text!");
            } else {
                this.postsRepository.funcAjax("POST", "/add-new-post", { text: $input.val() }).then((data) => {
                    this.postsRepository.addPost(data);
                    this.postsRenderer.renderPosts(this.postsRepository.posts);
                })
                $input.val("");
            }
        });
    }

    registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();
            let id = $(event.currentTarget).closest('.post').data().id;

            this.postsRepository.removePost(index);
            this.postsRenderer.renderPosts(this.postsRepository.posts);

            let url = '/remove-post/' + id
            this.postsRepository.funcAjax('DELETE', url)
        });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
        });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');

            if ($comment.val() === "" || $user.val() === "") {
                alert("Please enter your name and a comment!");
                return;
            }

            let postIndex = $(event.currentTarget).closest('.post').index();
            let postId = $(event.currentTarget).closest('.post').data().id;

            let newComment = { text: $comment.val(), user: $user.val() };
            let url = '/posts/' + postId + '/add-comment';

            this.postsRepository.funcAjax("POST", url, newComment).then((data) => {
                this.postsRepository.addComment(data, postIndex);
                this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
            })

            $comment.val("");
            $user.val("");
        });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');

            let postIndex = $(event.currentTarget).closest('.post').index();
            let postId = $(event.currentTarget).closest('.post').data().id;
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            let commentId = $(event.currentTarget).closest('.comment').data().id;

            this.postsRepository.deleteComment(postIndex, commentIndex);
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);

            let url = '/posts/' + postId + '/remove-comment/' + commentId
            this.postsRepository.funcAjax('DELETE', url)
        });
    }
}

export default EventsHandler
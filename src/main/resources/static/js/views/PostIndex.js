import CreateView from "../createView.js"

let posts, body, newPost;

export default function PostIndex(props) {
    posts = props.posts
    return `
        <html>
            <header>
                <h1>Posts Page</h1>
            </header>
            <main>
                <h2>Posts</h2>
                    <div id="post-body">postBody</div>
                <h2>Add Post</h2>
                    <form>
                        <label for="title">Title</label>
                        <br>
                        <input id="title" name="title"/>
                        <br>
                        <label for="content">Content</label>
                        <br>
                        <textarea id="content" name="content"></textarea>
                        <input id="add-btn" type="submit" value="Publish"/>
                    </form>
            </main>
        </html>
    `;
}
export function postSetup() {
    addPostHandler();
    editPostHandler();
    deletePostHandler();
}
function postBody(posts) {
    body = '';

}

function addPostHandler() {
    const addBtn = document.querySelector('#add-btn');
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    newPost = {
        title: title.value,
        content: content.value
    }
    console.log(newPost);
    addBtn.addEventListener('click', function(e) {
        let request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPost)
        }
        fetch('http://localhost:8080/api/posts', request)
            .then(response => {
                console.log(newPost);
                console.log(response.status);
                CreateView('/posts')
            })
    })
}
function editPostHandler() {

}
function deletePostHandler() {

}

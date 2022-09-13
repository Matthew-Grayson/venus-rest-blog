import CreateView from "../createView.js"
import createView from "../createView.js";

let posts, body, newPost;

export default function PostIndex(props) {
    posts = props.posts
    const body = postBody(props.posts)
    return `
        <html>
            <header>
                <h1>Posts Page</h1>
            </header>
            <main>
                <div id="post-body">${body}</div>
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
    handleAddPost();
    handleEditPost();
    handleDeletePost();
}
function postBody(posts) {
    body = `
        <table class="table">
        <thead>
        <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
            <th scope="col">Author</th>
            <th scope="col">Categories</th>
        </tr>
        </thead>
        <tbody>
    `;
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        body += `<tr>
            <td>${post.title}</td>
            <td>${post.content}</td>
            <td>${post.author.username}</td>
            <td>${categories}</td>
            <td><i data-id=${post.id} class="bi bi-pencil-fill edit-post"></i></td>
            <td><i data-id=${post.id} class="bi bi-trash3-fill delete-post" style="color: red"></i></td>
            </tr>`;
    }
    body += `</tbody></table>`;
    return body;
}

function handleAddPost() {
    const addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener('click', function(e) {
        const title = document.querySelector('#title').value;
        const content = document.querySelector('#content').value;
        newPost = {
            title,
            content
        }
        console.log(newPost);
        let request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPost)
        }
        fetch(`${HOME}/api/posts`, request)
            .then(function(response) {
                console.log(newPost);
                console.log(response.status);
            })
        CreateView('/posts')
    })
}
function handleEditPost(posts) {
    const editBtns = document.querySelectorAll('.edit-post');
    editBtns.forEach(function(btn)  {
        btn.addEventListener('click', function(e) {
            let postId = this.getAttribute('data-id');
            editPost(postId);
        })
    })
}
function editPost(postId) {
    let post = getPostById(postId),
        submitBtn = document.querySelector('#add-btn')
    document.querySelector('#title').value = post.title;
    document.querySelector('#content').value = post.content;
    submitBtn.value = 'Save Changes';
    submitBtn.addEventListener('click', function(e) {
        let title = document.querySelector('#title').value,
            content = document.querySelector('#content').value,
            update = {title, content},
            request = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(update)
        }
        fetch(`${HOME}/api/${postId}`, request)
            .then(function(response) {
                console.log(update);
                console.log(response.status);
            })
        CreateView('/posts');
    })
}
function handleDeletePost(posts) {
    const deleteBtns = document.querySelectorAll('.delete-post');
    deleteBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            deletePost(this.getAttribute('data-id'))
        })
    })
}
function deletePost(postId) {
    let request = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
    fetch(`${HOME}/api/${postId}`, request)
        .then(function(response) {
            if(response.status !== 200) {
                console.log(`fetch returned status code: ${response.status}`);
                console.log(response.statusText);
                return;
            }
            createView('/posts')
        })
}

function getPostById(postId) {
    posts.forEach(function(post) {
        if(post.id === postId) return post;
    })
    return false;
}

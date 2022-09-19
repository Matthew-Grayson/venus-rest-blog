import CreateView from "../createView.js"

let posts, body, newPost;
export default function PostIndex(props) {
    posts = props.posts;
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
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input id="title" name="title" type="text" class="form-control" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label for="content">Content</label>
                            <textarea id="content" name="content" class="form-control"  placeholder="Content"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="category-select">Category</label>
                            <select class="form-select" multiple id="category-select" >
                                ${populateCategorySelect(props.categories)}
                            </select>
                        </div>
                        <button id="add-btn" type="submit" class="btn btn-primary m-1">Publish</button>
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
            <td>${post.categories.map(el => el.name)}</td>
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
        let categories = [];
        Array.from(document.querySelector('#category-select').selectedOptions).map(el => {
                categories.push({'id': el.getAttribute('data-id'), 'name': el.value})
        });
        newPost = {
            title,
            content,
            categories
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
            editPost(parseInt(postId));
        })
    })
}
function populateCategorySelect(catProps) {
    let html = '';
    return catProps.reduce((html, el) => {
        return html += `<option data-id=${el.id} value=${el.name}>${el.name}</option>`
    }, '')
}
//TODO separate getpostbyId function
function editPost(postId) {
    let post;
    posts.forEach(function(el) {
        if(el.id === postId) {
            post = el;
        }
    })
    let submitBtn = document.querySelector('#add-btn');
    document.querySelector('#title').value = post.title;
    document.querySelector('#content').value = post.content;
    submitBtn.addEventListener('click', function(e) {
        const title = document.querySelector('#title').value,
            content = document.querySelector('#content').value,
            update = {title, content},
            request = {
            method: 'PUSH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(update)
        }
        fetch(`${HOME}/api/posts/${postId}`, request)
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
    fetch(`${HOME}/api/posts/${postId}`, request)
        .then(function(response) {
            if(response.status !== 200) {
                console.log(`fetch returned status code: ${response.status}`);
                console.log(response.statusText);
                return;
            }
            CreateView('/posts')
        })
}

// function getPostById(postId) {
//     posts.forEach(function(post) {
//         if(post.id == postId) {
//             console.log("post =");
//             console.log(post);
//             return post;
//         }
//     })
//     return false;
// }

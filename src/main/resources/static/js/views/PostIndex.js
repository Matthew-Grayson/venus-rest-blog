import CreateView from "../createView.js"
import {getHeaders} from "../auth.js";

let me, posts, body, newPost, postId;
export default function PostIndex(props) {
    posts = props.posts;
    me = props.me;
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
        const author = post.author.username;
        if(me.username === author || me.role === "ADMIN") {
            body += `<tr>
                <td>${post.title}</td>
                <td>${post.content}</td>
                <td>${author}</td>
                <td>${post.categories.map(el => el.name).join(', ')}</td>
                <td><i data-id=${post.id} class="bi bi-pencil-fill edit-post"></i></td>
                <td><i data-id=${post.id} class="bi bi-trash3-fill delete-post" style="color: red"></i></td>
                </tr>`;
        } else {
            body += `<tr>
                <td>${post.title}</td>
                <td>${post.content}</td>
                <td>${author}</td>
                <td>${post.categories.map(el => el.name).join(', ')}</td>
                </tr>`;
        }

    }
    body += `</tbody></table>`;
    return body;
}

function handleAddPost() {
    const addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener('click', addPost)
}
function addPost() {
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
        headers: getHeaders(),
        body: JSON.stringify(newPost)
    }
    fetch(`${HOME}/api/posts`, request)
        .then(function(response) {
            console.log(newPost);
            console.log(response.status);
        })
    CreateView('/posts')
}

function handleEditPost(posts) {
    const editBtns = document.querySelectorAll('.edit-post');
    editBtns.forEach(function(btn)  {
        btn.addEventListener('click', function(e) {
            postId = this.getAttribute('data-id');
            populateEditPost(parseInt(postId));
        })
    })
}
function populateCategorySelect(catProps) {
    let html = '';
    return catProps.reduce((html, el) => {
        return html += `<option data-id=${el.id} value=${el.name}>${el.name}</option>`
    }, '')
}
function populateEditPost(id) {
    let post;
    postId = id;
    posts.forEach(function(el) {
        if(el.id === id) {
            post = el;
        }
    })
    let submitBtn = document.querySelector('#add-btn');
    document.querySelector('#title').value = post.title;
    document.querySelector('#content').value = post.content;
    //TODO: populate categories menu
    for(let el of document.querySelector('#category-select').children) {
        el.removeAttribute('selected')
    }
    console.log(post.categories.map(el => el.id));
    post.categories.forEach(el => {
        document.querySelector('#category-select')[el.id-1].setAttribute('selected', '');
    })
    submitBtn.innerHTML = 'Save Changes';
    submitBtn.removeEventListener('click', addPost)
    submitBtn.addEventListener('click', editPost)
}
function editPost() {
    const title = document.querySelector('#title').value,
        content = document.querySelector('#content').value,
        categories = [];
        Array.from(document.querySelector('#category-select').selectedOptions).map(el => {
            categories.push({'id': el.getAttribute('data-id'), 'name': el.value})
        });
        console.log(postId)
        let update = {title, content, categories},
        request = {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(update)
        }
    fetch(`${HOME}/api/posts/${postId}`, request)
        .then(function(response) {
            console.log(update);
            console.log(response.status);
        })
    CreateView('/posts');
}

function handleDeletePost(posts) {
    const deleteBtns = document.querySelectorAll('.delete-post');
    deleteBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            deletePost(this.getAttribute('data-id'))
        })
    })
}
function deletePost(id) {
    let request = {
        method: 'DELETE',
        headers: getHeaders()
    }
    fetch(`${HOME}/api/posts/${id}`, request)
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

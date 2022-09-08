import CreateView from "../createView.js"

export default function PostIndex(props) {
    return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            <h2>Posts</h2>
                <div>${props.posts.map(post => `<h3>${post.title}</h3>`).join('')}</div>
            <h2>Add Post</h2>
                <form id="add-form">
                    <label for="title-field">Title</label>
                    <input id="title-field" name="title-field" type="Enter Title"/>
                    <label for="content-field">Content</label>
                    <input id="content-field" name="content-field" type="textarea"/>
                    <input id="add-btn" type="submit" value="Publish"/>
                </form>
        </main>
    `;
}
export function postSetup() {
    addPostHandler();
    editPostHandler();
    deletePostHandler();
}

function addPostHandler() {
    const addBtn = document.querySelector('#add-btn')
    const title = document.querySelector('#title-field').value
    const content = document.querySelector('#content-field').value
    addBtn.addEventListener('click', function(e) {
        let newPost = {
            title,
            content
        }
        let request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPost)
        }
        fetch('http://localhost:8080/api/posts', request)
            .then(response => {
                console.log(response.status);
                CreateView('/posts')
            })
    })
}
function editPostHandler() {

}
function deletePostHandler() {

}

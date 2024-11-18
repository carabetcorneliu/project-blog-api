import '../css/style.css';

async function getPosts() {
    try {
        const response = await fetch('http://localhost:3000/post/list');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Fetch error: ', err);
    }
};

function renderPosts(posts) {
    const postContainer = document.getElementById('postContainer');
    const postContainerHeader = document.createElement('h1');

    postContainerHeader.textContent = 'Posts:'
    postContainer.appendChild(postContainerHeader);

    posts.forEach(post => {
        const newPost = document.createDocumentFragment();
        const title = document.createElement('h2');
        const text = document.createElement('p');
        const createdAt = document.createElement('p');
        const updatedAt = document.createElement('p');
        const messageBox = document.createElement('div');

        title.textContent = 'Title: ' + post.title;
        text.textContent = 'Text: ' + post.text;
        createdAt.textContent = 'created at: ' + post.createdAt;
        updatedAt.textContent = 'updated at: ' + post.updatedAt;

        if (post.messages.count > 0) {
            messages.forEach(message => {
                const newMessage = document.createElement('p');
                newMessage.textContent = 'message: ' + message;

                messageBox.appendChild(newMessage);
            })
        }

        newPost
        .appendChild(title)
        .appendChild(text)
        .appendChild(updatedAt)
        .appendChild(createdAt)
        .appendChild(messageBox);
        postContainer.appendChild(newPost);
    });
}

(async function populatePosts() {
    const posts = await getPosts();
    if (!posts) {
        return;
    }
    renderPosts(posts);
})();
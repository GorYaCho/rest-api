let id = null;


async function getPosts() {
    let res = await fetch('http://rest-api-own/posts');
    let posts = await res.json();


    posts.forEach((post) => {
        document.querySelector('.post-list').innerHTML += `<div class="card" style="width: 18rem;">
            <div class="card-body">
               <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
                <a href="#" class="card-link">More...</a>
                <a href="#" class="card-link" onclick="removePost(${post.id})">Удалить</a>
                <a href="#" class="card-link" onclick="selectPost('${post.id}', '${post.title}', '${post.body}')">Редактировать</a>

            </div>
        </div>`;
    });
}

async function addPost(){
    const title = document.getElementById('title').value,
        body = document.getElementById('title').value,

     formData = new FormData();
        formData.append('title', title);
    formData.append('body', body);

    const res = await fetch('http://rest-api-own/posts', {
        method: "POST",
        body: formData
    })

    const data = await res.json()

    if (data.status === true){
       await getPosts();
    }
}

async function removePost(id){
    const res = await fetch(`http://rest-api-own/posts/${id}`, {
        method: "DELETE"
    });

    const data = await res.json()

    if (data.status === true){
        await getPosts();
    }
}

function selectPost(id, title, body){
    id=id;
    document.getElementById('title-edit').value = title;
    document.getElementById('body-edit').value = body;
}

function updatePost(id){
    const title = document.getElementById('title-edit').value,
        body = document.getElementById('title-edit').value;

    const data = {
        title: title,
        body: body
    }

    const res = await fetch(`http://rest-api-own/posts/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    });

    let resData = res.json();

    if (resData.status === true){
        await getPosts();
    }
}

getPosts();



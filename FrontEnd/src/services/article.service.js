const getAll = () => {
    return fetch("http://localhost:3333/articles")
    .then((response) =>{
        if(response.status === 200){
            return response.json();
        }else{
            throw "something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

const getOne = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id)
    .then((response) =>{
        if(response.status === 200){
            return response.json();
        }else{
            throw "something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })
}

const deleteArticle = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id ,
    {
        method: "DELETE",
        headers: {
            "X-Authorization": localStorage.getItem("session_token")
        }
    })
    .then((response) => {
        if (response.status === 200) {
            return response.json();

        }else if(response.status === 401){
            throw "Not logged in"
        } else {
            throw "Something went wrong"
        }
    })
    .then((resJson) => {
        return resJson
    })
    .catch((error) => {
        console.log("Err", error)
        return Promise.reject(error)
    })

}

const addArticle = (article_id, title, author, article_text) => {
    return fetch("http://localhost:3333/articles/" ,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                "title": title,
                "author": author,
                "article_text": article_text
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();

            }else if(response.status === 401){
                throw "Not logged in"
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}

const updateArticle = async (article_id, title, author, article_text) => {

    return fetch("http://localhost:3333/articles/" + article_id ,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                "title": title,
                "author": author,
                "article_text": article_text
            })
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();

            }else if(response.status === 401){
                throw "Not logged in"
            } else {
                throw "Something went wrong"
            }
        })
        .then((resJson) => {
            return resJson;
        })
        
        .catch((error) => {
            console.log("Err", error)
            return Promise.reject(error)
        })
}






export const articleService = {
    getAll,
    getOne,
    deleteArticle,
    addArticle,
    updateArticle
}
const getArticleComments = (article_id) => {
    return fetch("http://localhost:3333/articles/" + article_id + "/comments")
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

/* 4) found this in slides dont have it but what does doe const data mean  */
const addArticleComment = (article_id, comment_text) => {
    return fetch("http://localhost:3333/articles/" + article_id + "/comments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "comment_text": comment_text
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
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

const deleteArticleComment = (comment_id, comment_text) => {
    return fetch("http://localhost:3333/comments/" + comment_id ,
        {
            method: "DELETE",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            }
            
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
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




export const commentService = {
    getArticleComments,
    addArticleComment,
    deleteArticleComment 
}



 
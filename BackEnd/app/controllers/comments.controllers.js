//require in the model file so we can acess the functions
const comments = require("../models/comments.models");
const articles = require("../models/articles.models");
const Joi = require("joi");

//Calling the getArticleComments
const getComments = (req,res ) => {
    let article_id = parseInt(req.params.article_id);
    comments.getArticleComments(article_id,(err, results)=> {
        if (err){
            console.log(err);
            return res.sendStatus(err);
        }
        return res.status(200).send(results);

    })


    
}

//calling the addNewArticles fucntion (model)
const createComments = (req,res ) => {
     let article_id = parseInt(req.params.article_id)

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        let article_id = parseInt(req.params.article_id)

    const schema = Joi.object({
        "comment_text":Joi.string().required()
    })

    const {error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // return 400 bad request if data doesnt validate

    let comment = Object.assign({}, req.body);

    comments.addArticleComments(comment, article_id, (err,id )=> {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }

        return res.status(201).send({comment_id: id})
    })
        
        
    })
    
    
    
}

//calling the delete comments function in models
const deleteArticleComments = (req,res ) => {
    let comment_id = parseInt(req.params.comment_id);

    comments.getSingleComments(comment_id, (err,result) => {
        console.log(comment_id, err)
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);


        comments.deleteArticleComments(comment_id, (err) => {
            if (err){
                return res.sendStatus(500)
            }
       
        return res.sendStatus(200);
        })
        
    })
   
}


module.exports = {
    createComments: createComments,
    getComments: getComments,
    deleteArticleComments: deleteArticleComments


}

//require in the model file so we can acess the functions
const articles = require("../models/articles.models");
const Joi = require("joi");

//Calling the getAllArticles function (model)
//If there is nothing wrong return the array 'results []' to the client
const getAll = (req,res ) => {
    console.log("Hello")
    articles.getAllArticles((err, num_rows, results) => {
        if (err) return res.sendStatus(500);

        return res.status(200).send(results);
    })
    
}



//calling the addNewArticles fucntion (model)
const create = (req,res ) => {

    const schema = Joi.object({ //using joi to validate incoming data before calling 'addNewArticle' function
        "title": Joi.string().required(),
        "author": Joi.string().required(),
        "article_text": Joi.string().required(),
    })

    const {error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // return 400 bad request if data doesnt validate

    let article = Object.assign({}, req.body);

    articles.addNewArticle(article, (err,id )=> {
        if (err) {
            console.log(err)
            return res.sendStatus(500);
        }

        return res.status(201).send({article_id: id})
    })
    
}
/* Test successful creation of articles when logged in.
Should return 201, and JSON with article_id of new article:

AssertionError: expected { Object (_events, _eventsCount, ...) } to have status code 201 but got 401
+ expected - actual

-401
+201 */

//calling the getSingleArticle function
const getOne = (req,res ) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)

        return res.status(200).send(result);
    })
}

const updateArticle = (req,res ) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        const schema = Joi.object({
            "title": Joi.string(),
            "author": Joi.string(),
            "article_text": Joi.string()
        })

        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if (req.body.hasOwnProperty("title")){
            result.title = req.body.title
        }

        if (req.body.hasOwnProperty("author")){
            result.author = req.body.author
        }

        if (req.body.hasOwnProperty("article_text")){
            result.article_text = req.body.article_text
        }

        articles.updateArticle(article_id , result, (err,id) => {
            if (err){  return res.sendStatus(500)
            }

            return res.sendStatus(200);
        })
    })
}

//calling the updateArticle function in
/* const updateArticle = (req,res ) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);


        const schema = Joi.object({ //using joi to validate incoming data before calling 'addNewArticle' function
            "title": Joi.string(),
            "author": Joi.string(),
            "article_text": Joi.string()
        })

        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if (req.body.hasOwnProperty("title")){
            result.title = req.body.title
        }

        if (req.body.hasOwnProperty("author")){
            result.author = req.body.author
        }

        if (req.body.hasOwnProperty("article_text")){
            result.article_text = req.body.article_text
        }

        articles.updateArticle(article_id , result, (err,id) => {
            if (err){  return res.sendStatus(500)
            }

            return res.sendStatus(200);
        })

   })
    
} */


//calling the delete article function in models
const deleteArticle = (req,res ) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);


        articles.deleteArticle(article_id, result, (err, id) => {
            if (err){
                console.log(err)
                return res.sendStatus(500)
            }
       
        return res.status(200).send(result);
        })
        
    })
   
}



//require in the model file so we can acess the functions


module.exports = {
    getAll : getAll,
    create : create,
    getOne : getOne,
    updateArticle : updateArticle,
    deleteArticle : deleteArticle,
    
   // deleteArticleComment: deleteArticleComment

};
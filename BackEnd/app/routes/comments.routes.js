const comments = require("../controllers/comments.controllers");

const isAuthenticated = require("../lib/middleware");
const auth = require("../lib/middleware");

module.exports = function(app){

    app.route("/articles/:article_id/comments")
      .get(comments.getComments)
      .post(comments.createComments);

    app.route("/comments/:comment_id")
       .delete(auth.isAuthenticated,comments.deleteArticleComments); 

    


}
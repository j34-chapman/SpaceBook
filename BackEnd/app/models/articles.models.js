const db = require ("../../database");

const getAllArticles = (done) => {
    
    const results = [];

    db.each(
        'SELECT * FROM articles',
        [],
        (err,row) => {
            if (err) console.log("Something went wrong" + err);

            results.push({
                article_id : row.article_id,
                title : row.title,
                author : row.author,
                date_published : new Date(row.date_published).toLocaleDateString(),
                date_edited : new Date(row.date_edited).toLocaleDateString(),
                article_text: row.article_text


            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}




const addNewArticle = (article,done) => {

    let date = Date.now();
    const sql = 'INSERT INTO articles (title, author , date_published , date_edited, article_text, created_by) VALUES (?,?,?,?,?,?)'
    let values = [article.title, article.author , date , date , article.article_text, 1 ];

    db.run( 
        sql,
        values,
        function(err){
            if (err) return done (err, null);

            return done (null, this.lastID);
        }
    )
}



const getSingleArticle = (id, done) => {
    const sql = 'SELECT * FROM articles WHERE article_id=?'

    db.get(sql, [id], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404)

    return done(null, {
        article_id: row.article_id,
        title: row.title,
        author: row.author,
        date_published: new Date(row.date_published).toLocaleDateString(),
        date_edited: new Date(row.date_edited).toLocaleDateString(),
        article_text: row.article_text

    })
    })
}


const updateArticle = (id, article, done) => {
    const sql = 'UPDATE articles SET title = ?, author = ?, article_text = ? WHERE article_id = ?'
    let values = [article.title, article.author, article.article_text, id];

    db.run(sql, values, (err) => {
        return done(err)
    })
}

const deleteArticle =  (id, article, done) => {
    const sql = 'DELETE FROM articles WHERE article_id=?'
    let values =[id];

    db.run(sql, values, (err) => {
        return done(err)
       

    })

}

    //exporting the function so that it can be seen by other files(the controller)
module.exports = {
    deleteArticle: deleteArticle,
    updateArticle : updateArticle,
    getSingleArticle : getSingleArticle,
    addNewArticle : addNewArticle,
    getAllArticles: getAllArticles,
    
}
//hello


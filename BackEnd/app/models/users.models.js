const db = require ("../../database");
const crypto = require('crypto');


//Create an account: POST /USER
const addNewUser = (user, done) => {
    const salt = crypto.randomBytes(64);
    const hash = getHash(user.password, salt);

    const sql = 'INSERT INTO users (first_name , last_name, email , password, salt) VALUES (?,?,?,?,?)'
    values = [user.first_name, user.last_name, user.email, hash, salt.toString('hex')];

    db.run(sql, values, function(err){
        if (err) return done (err)
        return done(null, this.lastID)

    })

};

const getHash = function(password, salt ){
    return crypto.pbkdf2Sync(password, salt , 100000, 256, 'sha256').toString('hex');
};

//Get all users : GET /USER
const getAllUsers = (done) => {
    
    const results = [];

    db.each(
        'SELECT * FROM users',
        [],
        (err,row) => {
            if (err) console.log("Something went wrong" + err);
            
            results.push({
                user_id : row.user_id,
                first_name : row.first_name,
                last_name : row.last_name,
                email: row.email


            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

//Logging in: POST /login
const authenticateUser = (email, password, done) => {
    const sql = 'SELECT user_id, password, salt, salt FROM users WHERE email=?'

    db.get(sql, [email], (err, row) => {
        if (err) return done(err)
        if (!row) return done(404) // wrong email

        if (row.salt === null) row.salt = ''

        let salt = Buffer.from(row.salt, 'hex')

        if (row.password === getHash(password, salt)){
            return done (false, row.user_id)
        }else{
            return done(404) //wrong password
        }

    })

}


/* 
//Grabbing the created token for the user
 const getToken = function(id, done){
    db.get(
        'SELECT session_token FROM users WHERE user_id=?',
        [id],
        function(err, row){
          if (row && row.session_token){
            return done(null, row.session_token);
          }else{
            return done(null, null);
          } 
        }
    );
};
 */

const getToken = (id , done) =>{
    const sql = 'SELECT session_token FROM users WHERE user_id=?'
    db.get(sql, [id], (err,row)=> {
        if (err) return done(err)
        if (!row) return done(404)

        return done(false,row.session_token)
    })
}

//Create and set token for a user
const setToken = (id, done) => {
    let token = crypto.randomBytes(16).toString('hex');

    const sql = 'UPDATE users SET session_token=? WHERE user_id=?'

    db.run(sql,[token , id], (err) => {
        return done(err, token)
    })
}


//Remove the token for user ID (POST/ logout)
const removeToken = (token , done) => {
    const sql = 'UPDATE users SET session_token=null WHERE session_token=?'

    db.run(sql, [token], (err) => {
        return done(err)
    })
}

const getIdFromToken = function(token, done){
    if (token === undefined || token === null)
        return done(true, null);
    else {
        db.get(
            'SELECT user_id FROM users WHERE session_token=?',
            [token],
            function(err, row){
                if (row)
                    return done(null, row.user_id);
                return done(err, null);
            }
        )
    }
};





//exporting the function so that it can be seen by other files(the controller)
module.exports = {
    getAllUsers: getAllUsers,
    addNewUser: addNewUser,
    getHash: getHash,
    authenticateUser: authenticateUser,
    setToken: setToken,
    removeToken: removeToken,
    getToken: getToken,
    getIdFromToken: getIdFromToken
}
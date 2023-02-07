//require in the model file so we can acess the functions
const users = require("../models/users.models");
const Joi = require("joi");

//calling the "addNewUser" fucntion (POST/users)
const create = (req,res ) => {


    const schema = Joi.object({ //using joi to validate incoming data before calling 'addNewArticle' function
        "first_name": Joi.string().required(),
        "last_name": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()
        
    })

    //.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/).required()

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // return 400 bad request if data doesnt validate

    let user = Object.assign({}, req.body);

    users.addNewUser(user, (err, id ) => {
        if (err) return res.sendStatus(400);
        return res.status(201).send({user_id: id})
    })
    
}

//calling the "getAllUsers" function(GET/ users)
const getAll = (req,res ) => {
    users.getAllUsers((err, num_rows, results) => {
        if (err) return res.sendStatus(500);
        console.log("does it work")
        return res.status(200).send(results);
    })
    
}

//Calling the "authenticateUser' function (POST /login)
const login = (req, res) => {

    const schema = Joi.object({ 
        "email": Joi.string().required(),
        "password": Joi.string().required()
    })

    const {error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    users.authenticateUser(req.body.email, req.body.password, (err, id) => {
        if (err === 404) return res.status(400).send("Invalid email/password supplied")
        if (err) {
            console.log(1, err)
            return res.sendStatus(500)
        }
    
        users.getToken(id, (err, token) => {
            if (err) {
                console.log(2, err)
                return res.sendStatus(500)
            }
    
            if (token){
                return res.status(200).send({user_id: id , session_token: token})
            }else{
                users.setToken(id, (err, token) => {
                    if (err) {
                        console.log(3, err)
                        return res.sendStatus(500)
                    }
                    return res.status(200).send({user_id: id, session_token: token})
                })
            }
        })
    })
    }
  

//Calling the "removeToken' function (POST /logout)
const logout = (req, res) => {
    let token = req.get('X-Authorization');
      users.removeToken(token, (err) => {
          if (err) return res.sendStatus(500);
          
              return res.sendStatus(200)
          
      });
    //   return null;
  }  
  
module.exports = {
     create : create,
     getAll : getAll,
     login: login,
     logout: logout
    

};
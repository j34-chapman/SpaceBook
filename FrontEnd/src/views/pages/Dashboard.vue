<template>


  <div class="container col-11 col-lg-11" style="margin-bottom: 50px">
    <div class="row; mx-auto text-center" style="margin-bottom: 50px; font-family: 'Bungee Shade', sans-serif; color: #87CEEB;">
      <h1>Welcome to the Dashboard !</h1>
    </div>
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="card">
          <div class="card-header" style="font-family: 'Josefin Sans', sans-serif; font-weight: 400; font-size: 2rem;">
            List of Users
          </div>
          <div class="card-body">
            <em v-if="loading">Loading users...</em>
            <div class="overflow-auto" style="height: 250px; ">
              <ul v-if="users.length" class="list-group">
                <li v-for="user in users" :key="user.user_id" class="list-group-item d-flex justify-content-between align-items-center " style="font-family: 'Josefin Sans', sans-serif; font-weight: 500">
                  {{ user.first_name }} {{ user.last_name }}
                  <span class="badge badge-primary badge-pill" style="font-weight: 500">{{ user.email }}</span>
                  <span class="badge badge-primary badge-pill" style="font-weight: 500">User-ID:{{ user.user_id }}</span> 
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="container col-11 col-lg-11 mt-3" style="height:5px">
  <div class="row">
    <div class="col-12 col-lg-12">
      <h3 class="bg-primary text-white rounded p-2" style="font-family: 'Josefin Sans', sans-serif; font-weight: 500">Add User</h3>
      <form @submit.prevent="handleAddUser" class="p-3 rounded bg-light">
        <div class="form-group">
          <label for="fname" style="font-family: 'Josefin Sans', sans-serif; font-weight: 100">First name:</label>
          <input type="text" id="fname" name="fname" v-model="first_name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="lname" style="font-family: 'Josefin Sans', sans-serif; font-weight: 100">Last name:</label>
          <input type="text" id="fname" name="fname" v-model="last_name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="email" style="font-family: 'Josefin Sans', sans-serif; font-weight: 100">Email:</label>
          <input type="text" id="email" name="email" v-model="email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="password" style="font-family: 'Josefin Sans', sans-serif; font-weight: 100">Password:</label>
          <input type="text" id="password" name="password" v-model="password" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Add User</button>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </form>
    </div>
  </div>
</div>


   
    
</template>

<script>

import * as EmailValidator from 'email-validator';
import { userService } from "../../services/user.service"
import User from "../pages/User.vue";

export default {

  components:{
    User
  },
    data(){
        return{
            users: {},
            num_users: null,
            error: "",
            loading: false,  
            submitted: false,
            loggedIn: true

        }
    },
   
    created(){ /* created is fo information that should always be displayed */
    
    this.users.loading = true;


    userService.getAllUsers(this.$route.params.id)
            .then((users) => {
                this.users = users
                this.num_users = users.length
                this.loading = false
                this.checkLoginStatus();
                
                

            })
            .catch(error => this.error = error)
            

    
    },

 
    methods: {
      checkLoginStatus() {
        const sessionToken = localStorage.getItem('session_token')
        if (sessionToken) {
            this.loggedIn = true
        }else{
            this.loggedIn = false
        }
      },
        handleLogout(e){
            userService.logOut() 
                  .then(result => {
                     console.log("Auth - go to home ")
                     this.$router.push("/")
                  })
                  .catch(error => {
                     this.error = error;
                     this.loading = false;
                  })
        },
        handleAddUser(e){
          this.submitted = true
          this.error = ""

           
               const {email, password} = this

               if (!(email && password)){
                  return;
               }

               if(!(EmailValidator.validate(email))){
                  this.error = "Email must be valid "
                  return;
               }

               const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
               if(!(password_pattern.test(password))){
                  this.error = "Password not strong enough."
                  return;
               }

          userService.addNewUser(this.$route.params.id, this.first_name, this.last_name, this.email, this.password)
          .then(() => {
            //clear the text area after submission
            this.first_name=""
            this.last_name= ""
            this.email= ""
            this.password=""
            alert("Thanks for the making our community bigger!")

            userService.getAllUsers(this.$route.params.id)
            .then((users) => {
                this.users = users
                this.num_users = users.length
                this.loading = false
                this.submitted= false

            })
            .catch(error => this.error = error)

          })
        }

    }
    
}





</script>


<style scoped>



@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100&display=swap'); 


</style>

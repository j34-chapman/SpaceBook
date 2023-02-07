
<template>
  <div>
    <div class="container-sm" style="border: 1px solid lightgrey; border-radius: 20px; padding: 20px; background-color: lightblue">
      <div class="row">
        <div class="col-md-4 mx-auto">
          <h1 class="text-center" style="font-family: 'Josefin Sans', sans-serif; color: white; ">Login</h1>
          <form class="form-horizontal" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="email" class="col-sm-2 control-label">Email</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" name="email" v-model="email" />
                <div v-show="submitted && !email" class="text-danger">Email is required</div>
              </div>
            </div>
            <div class="form-group">
              <label for="password" class="col-sm-2 control-label">Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" name="password" v-model="password" />
                <div v-show="submitted && !password" class="text-danger">Password is required</div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-10 ">
                <button type="submit" class="btn btn-primary btn-block" style="margin-top: 10px">Login</button>
              </div>
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import * as EmailValidator from 'email-validator';//Importing the email validator so it can verify
import { userService } from "../../services/user.service"

   export default {
         data() {
            return{
                  email: "admin@admin.com", /* Dont forget to make this empty */
                  password: "Admin123!", /* This is only used for debugging makes life easier */
                  submitted: false,
                  error: "",
                  loggedIn: false
            }
         
         },
         //Creating the check login status here becuase after userService.login
         // the status will be logged in
         created() {
          this.checkLoginStatus()
         },
         methods: {
           checkLoginStatus() {
            const sessionToken = localStorage.getItem('session_token')
            if (sessionToken) {
              this.loggedIn = true
            }
           },
            handleSubmit(e){
               this.submitted = true
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

               /* Dont need seperate methods first its just first 
               check email validation then connect to the backend
               using .login */

               userService.login(this.email, this.password) 
                  .then(result => {
                     console.log("Auth - got to dash ")
                     this.loggedIn = true
                     this.$router.push("/dashboard")
                  })
                  .catch(error => {
                     this.error = error;
                     this.loading = false;
                  })

               //alert("Button Clicked")
            }
         }  
      
   }
</script>



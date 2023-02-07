<template>
  <nav class="navbar  sticky-top navbar-expand-lg navbar-light" style=" background-color: #87CEEB; color: white; margin-bottom: 50px">
    <div class="navbar-nav mr-auto">
      <a class="navbar-brand" style=" padding-left: 20px; font-family: 'Bungee Shade', sans-serif; color: white;" href="#">SpaceBook</a>
    </div>
    <div class="navbar-nav ml-auto">
      <template v-if="loggedIn">
        <router-link class="nav-link" to="/dashboard" style="font-family: 'Josefin Sans', sans-serif; color: white;">Dashboard</router-link>
      </template>

      <router-link class="nav-link" to="/" style="font-family: 'Josefin Sans', sans-serif; color: white;">Home</router-link>
      <router-link class="nav-link" to="/login" v-if="!loggedIn" style="font-family: 'Josefin Sans', sans-serif; color: white;">Login</router-link>
      <router-link class="nav-link" to="/" v-if="loggedIn" style="font-family: 'Josefin Sans', sans-serif; color: white;" @click="handleLogout(e)">Logout</router-link>
    </div>
  </nav>
  <router-view />
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100&display=swap'); 
</style>

<style scoped>
  .navbar {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>

<script>
import { userService } from "../services/user.service";

export default {
  data() {
    return {
      loggedIn: false
    }
  },
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
    handleLogout() {
        userService.logOut()
        .then(() => {
          this.loggedIn = false
          this.$router.push("/")
        })
        .catch((error) => {
          console.log(error);
        })
        
    }
  }
}

</script>



            
            
    







    


 
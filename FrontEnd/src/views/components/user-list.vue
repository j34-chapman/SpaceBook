<template>
        <!-- Display Comments -->
       <div class="conatiner">
            <div class="row">
                <h3>List Of Users</h3>
            </div>
                <div class ="row">
                  <div class="div.col-12.col-lg-6">
                    <ul v-if="users.length" class="list-group">
                      <User v-for="user in users" 
                      :key="user.user_id" 
                      :first_name="user.first_name"
                      :last_name="user.last_name"
                      :email="user.email"
                  />
                </ul>
              </div>
            </div>
         </div>

        
         <!--  <form class="flex-grow-1">
                <input type="text" class="form-control" />
            </form>    
                <button class = "btn btn-outline-primary">Edit</button>
                <button @click="$emit('on-delete')" class = "btn btn-outline-danger">Delete</button> -->
         <!--      <form @submit.prevent="handleSubmit">
         <label for ="Comment"></label>
        <input type = "Comment" name="Comment" v-model="Comment"/>
        <button v-on:click="Add">Add Comment</button> -->
     <!-- <div>
        <form @submit.prevent="addComments">
          <label for="comment">Comment</label>
          <input type="comment" name="comment" v-model="comment"/>
          <div v-show="submitted && !comment">Comment is required</div>
          <button for="button">Add Comment</button>

        </form>  
      </div>  -->
      
   
   
</template>

<script>

 
import { userService } from "../../services/user.service"
import User from "../pages/User.vue";

export default {

  components:{
    User
  },
    data(){
        return{
            users: [],
            num_users: null,
            
            error: "",
            loading: false,  
            submitted: false
        }
    },
   
    created(){ /* created is fo information that should always be displayed */
    userService.getAllUsers(this.$route.params.id)
            .then((users) => {
                this.users = users
                this.users = users.length
                this.loading = false

            })
            .catch(error => this.error = error)
            /* })
            .catch(error => this.error = error) */

      
    },
/* method for displaying all comment info */
    /* methods: */ /* 1) ive only found this online is this always the same  */
  /*  addComments(e){
     this.submitted = true
     this.error = ""
     commentService.addArticleComment(this.$route.params.id, this.comment)
     .then(() => {

       commentService.getArticleComments(this.$route.params.id)
       .then((comments) => { 
           this.comments = comments
           this.num_comments = comments.length
            this.submitted = false
           console.log(this.article);
       })
       .catch(error => this.error = error)
     })
   }
 }, */

}

  // this.article.loading = true;
        // this.comments.loading = true;

        // articleService.getOne(this.$route.params.id)
        // .then((article) => {
        //     this.article = article;
        //     commentService.getArticleComments(this.$route.params.id)
        //     .then((comments) => {
        //         this.comments = comments
        //         this.num_comments = comments.length
        //         this.loading = false
        //     })
        //     .catch(error => this.error = error)
        // })
        // .catch(error => this.error = error);

 /* methods: {
            handleSubmit(e){
               this.submitted = true
               const {comments} = this
        this.addArticleComment(this.$route.params.id)
            .then((comments) => {
                this.comments = comments
                this.num_comments = comments.length
                this.loading = false

            })
            .catch(error => this.error = error)


      }
    }, */

 

</script>

<style  scoped>



</style>
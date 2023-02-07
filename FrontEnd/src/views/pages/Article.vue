<template>
  <div class="container col-11 col-lg-11 my-5">
    <div v-if="loading" class="text-center">Loading article...</div>

    <div v-else>
      <div class="card">
        <div class="card-header" style="font-family: 'Josefin Sans', sans-serif; font-weight: 400; font-size: 2rem;">
         {{ article.title }}
        </div>
        <div class="card-body">
          <h5 class="card-title" style="font-family: 'Josefin Sans', sans-serif; font-weight: 320; font-size: 1.5rem;">{{article.author + " " + article.date_published }}</h5>
          <p class="card-text " style="font-family: 'Josefin Sans', sans-serif; font-weight: 300;">{{article.article_text}}</p>
          <div class="d-flex justify-content-between">
            <form @submit.prevent="deleteArticle">
              <button class="btn btn-danger">Delete Article</button>
            </form>
            <button v-on:click="showForm = !showForm" class="btn btn-primary">Edit Article</button>
          </div>
        </div>
      </div>
      
      <!-- Template for editing a artice (displayed once button is clicked line 17) -->
      <div v-if="showForm" class="my-3">
        <form @submit.prevent="submitEdit">
          <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" id="title" name="title" v-model="title">
          </div>
          <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" class="form-control" id="author" name="author" v-model="author">
          </div>
          <div class="form-group">
            <label for="article_text">Article Text:</label>
            <textarea class="form-control" id="article_text" name="article_text" rows="10" v-model="article_text"></textarea>
          </div>
          <!-- <div v-if="error" class="alert alert-danger">{{ error }}</div> -->
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
  <!-- importing commentList as a customeElement - can reproduce anywhere --> 
        <div>
            <CommentList />
        </div>

</template>


<script>

import { articleService } from "../../services/article.service"
import { commentService } from "../../services/comments.service"
import CommentList from "/src/views/components/CommentList.vue"


//import { commentForm } from "../../services/comments.service"

export default {

     components : {
        CommentList
    },

    data(){
        return{
            loggedIn: false,
            article: [],
            comments: [],
            num_comments: null,
            num_articles: null,
            comment: "",
            error: "",
            loading: false,
            showForm: false,
            title: "",
            author: "",
            article_text: "",
            submitted: false
            
           
        }
    },

    created(){

        this.article.loading = true;
        this.comments.loading = true;

        articleService.getOne(this.$route.params.id)
        .then((article) => {
            this.article = article;
            commentService.getArticleComments(this.$route.params.id)
            .then((comments) => {
                this.comments = comments
                this.num_comments = comments.length
                this.loading = false
            })
            .catch(error => this.error = error)
        })
        .catch(error => this.error = error);

        this.checkLoginStatus();
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

        deleteArticle(e){
            this.submitted = true
            this.error = ""

            
            articleService.deleteArticle(this.$route.params.id)
            .then(() => {

                articleService.getAll(/* this.$route.params.id */)
                .then((articles) => {
                    this.articles = articles
                    //this.num_articles = articles.length
                    this.submitted = false
                    this.$router.push('/')
                })
                .catch(error => this.error = error)
            })
            .catch(error => this.error = error)
            
            if (!this.loggedIn) {
                alert('Need to be logged in to acesss these features, you can comment still!')
                return(response.status === 401);
            }

        },

       submitEdit() {
        this.submitted = true
        this.error = ""

        articleService.updateArticle(this.$route.params.id, this.title, this.author, this.article_text)
        .then((response) => { 
            console.log(response)
            this.article = ""
            // Use the getOne method to fetch the updated article data
            articleService.getOne(this.$route.params.id)
            .then((article) => {
                // update the component's data with the new data
                this.article = article
                this.title = article.title
                this.author = article.author
                this.article_text = article.article_text
                this.$router.go(0)
                this.showForm = false
                this.submitted = false
            })
            .catch(error => this.error = error)
        })
        .catch(error => this.error = error)
        
        if (!this.loggedIn) {
            alert('Need to be logged in to acesss these features!')
            return;
        }
    }




 
    }

   
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100&display=swap'); 
</style>

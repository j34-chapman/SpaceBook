<template>

<div class="container col-11 col-lg-11" style="margin-bottom: 50px">
  <div class="row; mx-auto text-center" style="margin-bottom: 50px; font-family: 'Bungee Shade', sans-serif;  font-weight: 500; color: #87CEEB;">
    <h1>Welcome to the HOME Page</h1>
  </div>
  <div class="row">
    <div class="col-12 col-lg-12">
      <div class="card">
        <div class="card-header" style="font-family: 'Josefin Sans', sans-serif; font-weight: 400; font-size: 2rem;">
          Recent Articles
        </div>
        <div class="card-body">
          <em v-if="loading">Loading articles...</em>
          <div class="overflow-auto" style="height: 250px; ">
            <ul v-if="articles.length" class="list-group">
              <li v-for="article in articles" :key="article.article_id" class="list-group-item d-flex justify-content-between align-items-center " style="font-family: 'Josefin Sans', sans-serif; font-weight: 500">
                <router-link :to="'/article/' + article.article_id"> 
                  {{ article.title + ' by ' + article.author}} 
                </router-link>  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



  <div class="container col-11 col-lg-11" style="margin-bottom: 20px">
  <h3 style="font-family: 'Josefin Sans', sans-serif; font-weight: 400; font-size: 2rem;">Add Article</h3>
  <form @submit.prevent="handleAddArticle">

    <div class="form-group row">
      <label for="title" class="col-sm-2 col-form-label" style="font-family: 'Josefin Sans', sans-serif; font-weight: 300;">Title:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="title" name="title" v-model="title">
      </div>
    </div>

    <div class="form-group row">
      <label for="author" class="col-sm-2 col-form-label" style="font-family: 'Josefin Sans', sans-serif; font-weight: 300;">Author:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="author" name="author" v-model="author">
      </div>
    </div>

    <div class="form-group row">
      <label for="article_text" class="col-sm-2 col-form-label" style="font-family: 'Josefin Sans', sans-serif; font-weight: 300;">Article Text:</label>
      <div class="col-sm-10">
        <textarea class="form-control" id="article_text" name="article_text" rows="10" v-model="article_text"></textarea>
      </div>
    </div>

    <div class="form-group row">
      <div class="col-sm-10">
        <input type="submit" class="btn btn-primary" value="Submit">
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </div>
    </div>
  </form>
</div>

   
    

   


</template>

<script>
import { articleService } from '../../services/article.service'

export default {
    data(){
        return{
            articles: [],
            error: "",
            num_articles: null,
            loading : true,
            submitted: false,
            loggedIn: false
        }
    },
    mounted(){
        articleService.getAll()
        .then(articles => {
            this.articles = articles
            this.loading = false
        })
        .catch(error => this.error = error);

        this.checkLoginStatus();
        
    },

    methods : {

      checkLoginStatus() {
        const sessionToken = localStorage.getItem('session_token')
        if (sessionToken) {
            this.loggedIn = true
        }else{
            this.loggedIn = false
        }
      },

        handleAddArticle(e){
            this.submitted = true
            this.error = ""

            articleService.addArticle(this.$route.params.id, this.title, this.author, this.article_text)
            .then(()=> {
              //clear the text area after submission
              this.title = ""
              this.author = ""
              this.article_text = ""
              alert("Thanks for the Input!")
                articleService.getAll()
                .then((articles) => {
                    this.articles = articles
                    this.num_articles = articles.length
                    this.loading = false
                    this.submitted = false

                })
                .catch(error => this.error = error)     

            })
            .catch(error => this.error = error)
            
            if (!this.loggedIn) {
                alert('Need to be logged in to acesss these features!')
                return(response.status === 401);
            }

        }

    }

}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Shade&display=swap');
</style>
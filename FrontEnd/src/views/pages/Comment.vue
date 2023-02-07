<template>

<div class="card">
  <div class="card-body">
    <ul class="list-group">
      <li class="list-group-item">
        {{ comment_text }}
        <div class="text-muted small">{{ date_published }}</div>
        <span class="badge badge-primary badge-pill">Comment-ID:{{ comment_id }}</span>
        <button @click="deleteComment" class = "btn btn-danger">Delete</button>
      </li>
    </ul>
  </div>
</div>



   
</template>

<script>

import { commentService } from "../../services/comments.service"
/* import CommentList from "/../src/pages/Comment.vue" */

export default {
    props: {
        comment_id: Number,
        comment_text: String,
        date_published : String,
    },
    data(){
        return {
            error: ""
        }
    },

    methods: { /* 1) ive only found this online is this always the same  */
     deleteComment(e){
     this.submitted = true
     this.error = ""
     commentService.deleteArticleComment(this.comment_id)
     .then(() => {

       if(response.status === 401) {
          alert('Need to be logged in to acesss these features, you can comment still!')
            } else {
         

       commentService.getArticleComments(this.$route.params.id)
       .then((comments) => { 
           this.comments = comments
           this.num_comments = comments.length

           console.log(this.article);
       })
       .catch(error => this.error = error)
        }
     })
     .catch(error => this.error = error)
   }
 }
   
    

}

</script>

<style scoped>


 .comment-container{
    background: #a79c9c;
    padding: 1.3rem;
    font-size: 1.5rem;
    border-bottom: 1px solid white;
}

.comment-body{
    text-align: left;
    font-family: 'Quicksand';font-size: 22px;



}

.comment-footer{
    font-family: 'Quicksand';font-size: 15px;
    

} 

</style>
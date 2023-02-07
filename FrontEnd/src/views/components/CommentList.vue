
<template>
<!-- /* Singular comment represtation/template */ -->
  <div class="container col-11 col-lg-11 my-5">
    <div v-if="loading" class="text-center">Loading comments...</div>
    <div v-else>
      <div class="card">
        <div class="card-header" style="font-family: 'Josefin Sans', sans-serif; font-weight: 400;">
          Article Comments
        </div>
        <div class="div.col-12.col-lg-6">
          <ul v-if="comments.length" :key="comment.comment_id" class="list-group">
            <Comment v-for="comment in comments" 
                      :key="comment.article_id" 
                      :comment_text="comment.comment_text"
                      :date_published="comment.date_published"
                      :comment_id="comment.comment_id"
            />
          </ul>
        </div>
      </div>
      <div class="card-footer my-3">
        <form @submit.prevent="addComments">
          <div class="form-group">
            <label for="comment" style="font-family: 'Josefin Sans', sans-serif; font-weight: 400;">Comment</label>
            <textarea class="form-control" name="comment" v-model="comment"></textarea>
            <div v-show="submitted && !comment" class="text-danger small">Comment is required</div>
          </div>
          <button class="btn btn-primary">Add Comment</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>

 
import { commentService } from "../../services/comments.service"
import Comment from "../pages/Comment.vue";

export default {

  components:{
    Comment
  },
    data(){
        return{
            comments: [],
            num_comments: null,
            comment: "",
            error: "",
            loading: false,  
            submitted: false
        }
    },
   
    created(){ /* created is fo information that should always be displayed */
    commentService.getArticleComments(this.$route.params.id)
            .then((comments) => {
                this.comments = comments
                this.num_comments = comments.length
                this.loading = false

            })
            .catch(error => this.error = error)
            /* })
            .catch(error => this.error = error) */

      
    },
/* method for displaying all comment info */
    methods: { /* 1) ive only found this online is this always the same  */
   addComments(e){
     this.submitted = true
     this.error = ""
     commentService.addArticleComment(this.$route.params.id, this.comment)
     .then(() => {
       //clear the text area after submission
       this.comment = ""
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
 },

}

 

</script>

<style  scoped>

.ul  {
  list-style-type: none;
}

</style>

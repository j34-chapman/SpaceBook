<template>

<div class="comment-container">
     <div class="comment-body">
         {{first_name}}  {{last_name}} 
     </div>
        <div class="comment-footer">
           {{email}} {{user_id}}
       
                
            
           
       </div>
</div>



   
</template>

<script>

import { userService } from "../../services/user.service"


export default {
    props: {
        user_id: Number,
        first_name: String,
        last_name : String,
        email: String,
        password: String
    },
    data(){
        return {
            error: ""
        }
    },

    
   
    

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
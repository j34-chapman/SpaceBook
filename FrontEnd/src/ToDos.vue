<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <label for="ToDos">"ToDos:" </label>
        <input type="Text" name="ToDos" v-model="list_item"/>
        <div v-show="submitted && !list_item">Must List an item</div>
        <button>Enter</button>

        <ul>
          <li v-for="(item, index) in item_list" :key="index">
            {{item}}
          </li>
        </ul>
        
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return{
      list_item: '',// this is the empty textbox when you type stuff in 
      item_list : [],
      submitted:false
    }   
  },
  methods: { // the method takes 'list_item' and pushes it into 'item_list' array
    handleSubmit(e) {
      this.submitted = true
      if(this.list_item.length > 1){
        this.item_list.push(this.list_item)
        this.list_item = ""
        this.submitted = false
      }

      
      
    
    }
  }

}
</script>

<style scoped>

</style>
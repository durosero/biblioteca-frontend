<template>
  <div class="hello">
    <h1>{{ msg }} - {{ developer}}</h1>

  

  </div>
</template>

<script>
import { mapState, mapMutations,mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
    return {
      developer : "Duvan Rosero"
    }
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

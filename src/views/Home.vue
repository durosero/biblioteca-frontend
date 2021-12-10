<template>
<div class="home">
    <img alt="Vue logo" class="rounded img-fluid mt-1" id="img" src="http://2.bp.blogspot.com/-xwNs6-zzjyc/VE-2PNfIaeI/AAAAAAAACaE/72YqvPao-2E/s1600/9.jpg" />
    <HelloWorld msg="SysBiblioteca" />
    <h4>API_URL:  {{ baseURL }}</h4>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import  { mapState } from 'vuex'

export default {
    name: "Home",
    components: {
        HelloWorld,
    },
    created(){
    this.baseURL =  this.axios.defaults.baseURL;
    },
    data() {
        return {
            baseURL : ""
        }
    },

};
</script>

<style scoped>
#img {
    height: 50%;
}
</style>

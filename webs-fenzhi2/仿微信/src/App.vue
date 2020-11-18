<template>
    <div id="app" class="app">

      

        <router-view class="router"/>
       
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed: {
      
    },
    methods: {
       
    },
    created() {
    },
    watch: {
        
    },
}
</script>
<style lang="scss">
.app{
    height: 100%;
    width: 100%;
}
html,
body {
    padding: 0px;
    margin: 0px;
    transform: none;
    width: 100%;
    height: 100%;
}


.fred {
    color: red;
}
.fac {
    color: #acacac;
}

ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
}

</style>

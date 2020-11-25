<template>
<div id="app">
    <!-- 推送测试 -->
    <!-- <navigation /> -->
    <router-view />
</div>
</template>

<script>
// import navigation from '@/components/navigation.vue'
export default {
    name: "",
    components: {
        // navigation
    },
    data() {
        return {
            
        }
    },
    mounted(){
        if(window.innerWidth>750){
            location.href = '/index/index.html'
        }
    },
}
</script>

<style lang="scss">
html{
    height: 100%;
}
body {
    margin: 0px;
    position: relative;
    min-height: 100%;
    padding-bottom: 50px;
}

ul {
    padding: 0px;
    margin: 0px;
}

li {
    list-style: none;
}
*{
    box-sizing: border-box;
}
a{
    color: inherit;
    text-decoration: inherit;
}

</style>

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    computed:{
        ...mapState({
            nav:"nav",
            navList:"navList",
            navList2:'navList2'
        })
    },
    methods:{
        ...mapActions({
            addNav:"addNav"
        })
    },
    mounted() {
        this.addNav()
        
        // var a = '123',b={},c=[]
        // console.log(a.constructor === String)
        // console.log(b.constructor === Object)
        // console.log(c.constructor === Array)
    },
}
</script>

<style lang="scss">
html,body{
    height: 100%;
    margin: 0px;
}
#app{
    height: 100%;
}
*{
    box-sizing: border-box;
}
.分页{
    text-align: right;
    margin: 10px 0px 0px;
    // padding-bottom:10px !important;
    // padding-top: 10px !important;
    // border-top: 1px solid #eee;
    position: sticky;
    bottom: 0px;
    background: rgba($color: #fff, $alpha: 0.9);
    z-index: 3;
}

ul,li{
    margin: 0px;
    padding: 0px;
    list-style: none;
}

:root {
    --color:#ec0909;
}

.bjTime{
    color: #0905ec;
}

.el-dialog__header{
    border-bottom: 1px solid #eee;
    padding: 10px 20px 10px !important;
}
.el-dialog__headerbtn{
    top: 15px !important;
}

// .fade-enter-active, .fade-leave-active {
//   transition: opacity 0.5s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }


</style>

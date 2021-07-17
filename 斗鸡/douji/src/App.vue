<template>
    <navigation />

    <div class="router">
        <router-view :Language = "Language" />
    </div>
    
    <contact />

    <foot />
</template>

<script>
import navigation from '@/components/navigation.vue'
import foot from '@/components/foot.vue'
import contact from '@/components/contact.vue'
import { getCurrentInstance, provide, ref } from "vue";
export default {
    components: {
        navigation,
        foot,
        contact
    },
    setup(props) {
        // const { proxy } = getCurrentInstance()
        const Language = ref('zh')
        
        provide("setLanguage", (str)=>{
            Language.value = str
        });

        return {
            Language
        }
    }
}
</script>

<style lang="scss">
html,body{
    height: 100%;
    margin: 0px;
}
body{
    // background: red;
    min-width: 1250px;
}
.w1200{
    width: 1200px;
    margin: 0px auto;
}
.router{
    min-height: calc(100vh - 50px - 43px - 100px) ;
    padding-bottom: 1px;
    background-image: url(~@/assets/bg1.jpg);
    background-size: cover;
}

ul,li{
    margin: 0px;
    padding: 0px;
    list-style: none;
}
:root{
    --color:#9f010c
}
*{
    box-sizing: border-box;
}

// 主题色
// #9f010c

</style>

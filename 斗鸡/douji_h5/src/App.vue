<template>
    <navigation class="navigation"/>

    <div  class="router">
        <router-view></router-view>
    </div>

    <div class="service-btn"><van-icon name="chat-o" size="35"/></div>

    <foot />
</template>

<script>
import navigation from '@/components/navigation.vue'
import foot from '@/components/foot.vue'
export default {
    components: { 
        navigation,
        foot
    },
    
}
</script>

<style lang="scss">
html,body{
    height: 100%;
}
body{
    background-image: url(~@/assets/bg1.jpg);
    background-size: 100% auto;
    background-position: center;
}
#app{
    height: 100%;
    overflow: auto;
}
:root{
    --color:#9f010c
}
*{
    box-sizing: border-box;
}
.router{
    
}


.service-btn{
    width: 60px ;
    height: 60px;
    background: #2895cf;
    border-radius: 100%;
    position: fixed;
    right: 20px;
    bottom: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: bold;
    box-shadow: 0px 0px 15px 0px rgba($color: #000000, $alpha: 0.5);
    z-index: 1;
}
</style>

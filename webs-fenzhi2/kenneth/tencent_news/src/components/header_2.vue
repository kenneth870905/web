<template>
    <ul class="u1">
        <li>
            <img src="static/image/logo-text-whitetext_v2.svg" alt="">
        </li>
        <li>
            <div class="头像" @click="g1()">
                <van-icon name="manager" />
            </div>
            <van-icon @click="$router.push('/pingdao')" class="icon1" name="wap-nav" />
        </li>
    </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            userinfo:x=>x.user.userinfo
        }),
    },
    methods: {
        g1(){
            if(this.userinfo.id){
                this.$router.push('/my')
            }else{
                this.$router.push('/login')
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.u1{
    background: #5187fe;
    display: flex;
    padding: 0px _vw(15) 0px;
    height: _vw(44);
    align-items: center;
    li:nth-child(1){
        flex:1;
    }
    li:nth-child(2){
        display: flex;
        align-items: center;
    }
    .头像{
        width: _vw(24);
        height: _vw(24);
        background: #cccccc;
        border-radius: 100%;
        text-align: center;
        line-height: _vw(24);
        color: #ffffff;
        font-size: _vw(18);
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .icon1{
        font-size: _vw(28);
        color: #ffffff;
        margin: 0px 0px 0px _vw(5);
    }
}
</style>

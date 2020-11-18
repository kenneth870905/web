<template>
    <ul class="box-1">
        <li :class="{active:item.id ==tid}" v-for="item in kittenType">
            <a @click="go(item)" href="javascript:;">
                <span><img :src="`${$api_url}/tmm/public/storage/${item.imgUrl}`"></span>
                <h1>{{item.name}}</h1>
            </a>
        </li>
    </ul>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name:"",
    props:{
        tid:{
            default:""
        }
    },
    data(){
        return {
               
        }
    },
    computed:{
        ...mapState({
            kittenType:"kittenType"
        })
    },
    methods:{
        ...mapActions({
            获取猫类型:"获取猫类型"
        }),
        go(item){
            this.$router.replace(`/Kitten/${item.id}`)
        }
    },
    mounted() {
        if(this.kittenType.length==0){
            this.获取猫类型()
        }
    },
}
</script>

<style lang="scss" scoped>
.box-1 {
    text-align: center;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
    li {
        width: 20%;
        margin: 10px 0;
        &.active{
            span{
                border-color: #e1a85b;
            }
        }
    }
    span {
        width: 60px;
        height: 60px;
        border: 5px solid #eee;
        border-radius: 50%;
        display: block;
        margin: 0px auto;
    }
    a {
        text-decoration: none;
    }
    img {
        border-radius: 100%;
        width: 100%;
        height: 100%;
    }
    h1 {
        font-size: 12px;
        margin: 10px 0px 0px;
        color: #6e6e6e;
        font-weight: 400;
    }
}
</style>

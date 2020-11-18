<template>
    <ul class="w1200 type_list">
        <li v-for="item in kittenType" :class="{active:tid==item.id}" @click="go(item)" >
            <div class="img" :title="item.name">
                <img :src="$img_url+item.imgUrl" alt="item.name" srcset="">
            </div>
            <div class="name" :title="item.name">{{item.name}}</div>
        </li>
    </ul>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name:"",
    props:{
        tid:{
            defaulte:""
        }
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            kittenType:"kittenType" 
        })
    },
    methods: {
        ...mapActions({
            getKittenType:"getKittenType"
        }),
        go(item){
            if(this.tid==item.id){
                this.$router.replace('/kitten')
            }else{
                this.$router.push('/kitten?t='+item.id)
            }
        }
    },
    mounted(){
        if(this.kittenType.length==0){
            this.getKittenType()
        }
    }
}
</script>

<style lang="scss" scoped>
.type_list{
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    justify-content: center;
    li{
        width: 10%;
        margin: 10px 0px 0px;
        &:hover{
            .img{
                border:5px solid #e1a85c;
            }
        }
    }
    li.active{
        .img{
             border:5px solid #e1a85c;
        }
    }
    .img{
        cursor: pointer;
        border-radius: 100%;
        width: 90px;
        height: 90px;
        margin: 0px auto;
        border:5px solid #eeeeee;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .name{
        padding: 0px 5px;
        cursor: pointer;
        font-size: 14px;
        color: #6e6e6e;
        margin-top: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
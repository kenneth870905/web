<template>
    <div>
        <!-- <img src="http://static.jb51.net/images/v1/loading-16-16.gif" alt="" srcset=""> -->
        <!-- <img src="http://10.10.27.150/dongman/public/getimg/index?url=https://manhua.qpic.cn/manhua_detail/0/02_09_48_c9df914fa3b431308502f3bb934fff87_4052.jpg/800" alt="" srcset=""> -->
        <!-- <img src="https://manhua.qpic.cn/manhua_detail/0/18_18_53_5fe63ac235cc1118f36eedab11c86ea0_24173.jpg/800" alt="" srcset=""> -->
        <!-- <img v-for="(item, index) in imglist" :key="index" :src="item.image" alt=""> -->
         <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="右边">
                    <div class="点赞">
                    </div> 
                    <div class="点赞">
                    </div> 
                    <div class="点赞">
                    </div> 
                </div>
                <video src="https://vdse.bdstatic.com//dd601c4dfc4cae0f387bdd0fde48e5d9?authorization=bce-auth-v1%2Ffb297a5cc0fb434c971b8fa103e8dd7b%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2F48c90e5e4d75daddf22d85770619b16d68fb92aebd540ad19433ec8589f25cb1" autoplay="autoplay" loop="loop" width="100%" height="100%">
                </video>
            </div>
            <div class="swiper-slide">
                <div class="右边">
                    <div class="点赞">
                    </div> 
                    <div class="点赞">
                    </div> 
                    <div class="点赞">
                    </div> 
                </div>
                <video src="https://vdse.bdstatic.com//dd601c4dfc4cae0f387bdd0fde48e5d9?authorization=bce-auth-v1%2Ffb297a5cc0fb434c971b8fa103e8dd7b%2F2017-05-11T09%3A02%3A31Z%2F-1%2F%2F48c90e5e4d75daddf22d85770619b16d68fb92aebd540ad19433ec8589f25cb1" autoplay="autoplay" loop="loop" width="100%" height="100%">
                </video>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name:'',
    data() {
        return {
            imglist:[],
            timer:null
        }
    },
    methods: {
        
    },
    mounted() {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                direction: 'vertical'
            });

        // 获取类型
        // this.$axios.post('http://10.10.27.150/dongman/public/index/leibie',{pageIndex:1,pageSize:10}).then(x=>{
        //     console.log(x)
        // }).catch(err=>{})

        //获取文章
        // this.$axios.post('http://10.10.27.150/dongman/public/Wenzhang/queryAll',{leiBieId:0,pageIndex:1,pageSize:10,name:"",leibieName:'',order:"creationTime"}).then(x=>{
        //     console.log(x)
        // }).catch(err=>{})
        
        // this.$axios.post('http://10.10.27.150/dongman/public/Wenzhang/queryByLeibie').then(x=>{
        //     console.log(x)
        // }).catch(err=>{})
        //获取话列表
        // this.$axios.post('http://10.10.27.150/dongman/public/hua/huaList',{wenZhangId:1}).then(x=>{
        //     console.log(x)
        // }).catch(err=>{})
        // //获取每个话的图片
        // this.$axios.post('http://10.10.27.150/dongman/public/hua/huaDetails',{huaId:2}).then(x=>{
        //     console.log(x)
        //     this.imglist = x.data
        // }).catch(err=>{})
        // //通过Id获取文章
        // this.$axios.post('http://10.10.27.150/dongman/public/wenzhang/queryById',{id:108}).then(x=>{
        //     console.log(x)
        // }).catch(err=>{})
        // 注册
        // this.$axios.post('http://10.10.27.150/dongman/public/user/register',{username:'test123',password:123456,}).then(x=>{
        //     console.log(x)
        // }).catch(err=>{})
        //登录
        this.$axios.post('http://10.10.27.150/dongman/public/user/login',{username:'test123',password:1234567}).then(x=>{
            console.log(x)
        }).catch(err=>{})


    },
}
</script>

<style lang="scss" scoped>
img{
    width: 100%;
}
</style>

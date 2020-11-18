<template>
    <div class="w1200">
        <kittenType :tid = "kitten.kittenTypeId"/>
        <div class="title">{{kitten.name}}</div>
        <div class="details">
            <span>性别：{{kitten.sex}}</span>
            <span>年龄：{{kitten.age}}</span>
            <span>毛色：{{kitten.color}}</span>
            <span>毛长：{{kitten.hair}}</span>
            <span>疫苗：{{kitten.vaccine}}</span>
            <span>芯片：{{kitten.chip}}</span>
        </div>
        <div class="fm">
            <img :src="$img_url+kitten.cover" alt="" srcset="">
        </div>

        <div class="title2">
            <span>猫咪详情</span>
        </div>
        <ul class="img_list">
            <li v-for="item in kitten.img_list">
                <img :src="$img_url+item.imgUrl" alt="" srcset="">
            </li>
        </ul>

    </div>
</template>

<script>
import kittenType from './components/幼猫类型.vue'
export default {
    name:"",
    components:{
        kittenType
    },
    data() {
        return {
            id:"",
            kitten:{
                img_list:[]
            }
        }
    },
    methods:{
        getKittenById(){
            this.$axios.post('/tmm/public/index.php/Kitten/getKittenById',{id:this.id})
            .then(res => {
                console.log(res)
                this.kitten = res.data.data
            })
            .catch(err => {
            })
        }
    },
    mounted() {
        this.id = this.$route.query.i
        this.getKittenById()
    },
}
</script>

<style lang="scss" scoped>
.title{
    font-size: 28px;
    color: #666;
    line-height: 50px;
    text-align: center;
    margin: 60px auto 0px;
}
.details{
    margin-top: 15px;
    padding: 10px;
    border-radius: 8px;
    color: #999;
    background: #f9f9f9;
    font-size: 14px;
    line-height: 25px;
    margin: 10px auto 0px;
    text-align: center;
    span{
        margin: 0px 5px;
    }
}
.fm{
    width: 750px;
    height: 750px;
    margin: 20px auto 0px;
    border: 10px solid #eeeeee;
    border-radius: 10px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.title2{
    border-bottom: 1px solid #eee;
    margin: 30px auto 0px;
    span{
        display: block;
        width: 132px;
        height: 40px;
        margin: 0 auto;
        background: #e1a85b;
        text-align: center;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
    }
}
.img_list{
    width: 800px;
    font-size: 0px;
    margin: 20px auto;
    img{
        width: 100%;
    }
}
</style>

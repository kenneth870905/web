<template>
    <div class="content">
        <van-nav-bar fixed title="评价" left-arrow @click-left="$back()"></van-nav-bar>
        <div class="sp">
            <div class="img-1">
                <img :src="$img_url+sp.cover" alt srcset />
            </div>
            <div class="t1">{{sp.title}}</div>
        </div>
        <div class="title">评分</div>
        <van-rate v-model="评价.number" />
        <div class="title">描述</div>
        <van-field v-model="评价.text" rows="3" autosize type="textarea" placeholder="描述" />
        <div class="title">图片</div>
       
        <van-uploader v-model="fileList" multiple image-fit="contain"/>

        <van-button class="btn-1" type="primary" block v-if="sp.id" @click="提交()">提交</van-button>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            评价: {
                userId: '',
                goodsId: '',
                orderId: "",
                number: 5,
                parentId: 0,
                text: '',
                image: [],
                //上传图片
                // fileList:[file],
            },
            fileList:[],
            sp:{}
            
        }
    },
    computed: {
        ...mapState({
            userInfo: "userInfo"
        })
    },
    methods: {
        查看大图(){
            this.大图.show=true
        },
        查询商品(){
            this.$toast.loading({ message: '正在获取商品信息', forbidClick: true,duration:0});
            this.$axios.post('/Goods/getGoodsById',{id:this.评价.goodsId}).then(res => {
                if(res.code==1 && res.data){
                    this.sp = res.data
                    this.$toast.clear();
                }else{
                    this.$toast('商品信息异常或已下架，无法评价')
                }
            }).catch(err => {
                this.$toast('商品信息异常或已下架，无法评价')
            })
        },
        提交(){
            var kong= /^\s*$/g;
            if(kong.test(this.评价.text) ){
                this.$toast('请输入内容')
                return
            }
            let f = new FormData();
            Object.keys(this.评价).forEach(key=>{
                f.append(key,this.评价[key])
            })
            this.fileList.forEach(item=>{
                f.append('fileList[]',item.file)
            })
            this.$toast.loading({ message: '', forbidClick: true,duration:0});
            this.$axios.post('/Translation/add',f).then(res => {
                if(res.code==1){
                    this.$toast('添加成功')
                    history.back()
                }else{
                    this.$toast('添加失败，请联系客服')
                }
            }).catch(err => {
                this.$toast('系统错误，请联系客服')
            })

        }
    },
    mounted() {
        this.评价.userId = this.userInfo.id
        this.评价.goodsId = this.$route.query.goodsId
        this.评价.orderId = this.$route.query.orderId

        this.查询商品()

    },
}
</script>

<style lang="scss" scoped>
.content {
    padding: 46px 10px 0px;
}
.sp{
    margin: 10px 0px 0px;
    padding: 5px 10px;
    display: flex;
    background: #fff;
    .img-1{
        width: 80px;
        height: 80px;
        flex-shrink: 0;
        margin: 0px 15px 0px 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .t1{
        word-break: break-all;
    }
}
.title{
    margin: 10px 0px 5px ;
}


/deep/ .van-uploader__preview{
    background: #f7f8fa;
}
.btn-1{
    margin: 30px 0px 0px;
}
</style>
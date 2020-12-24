<template>
    <div>
        <div ref="锚点">
            <el-page-header  @back="goBack" content="商品详情"></el-page-header>
        </div>

            <ul class="table" cellspacing='0'>
                    <li>
                        <div>商品分类</div>
                        <div>{{分类名称}}</div>
                    </li>
                    <li>
                        <div>商品名称</div>
                        <div>{{sp.name}}</div>
                    </li>
                    <li>
                        <div>购买级别</div>
                        <div>{{购买级别[sp.level]}}</div>
                    </li>
                    <li>
                        <div>一级价格</div>
                        <div>{{sp.levelTwoPrice}}元</div>
                    </li>
                    <li>
                        <div>二级价格</div>
                        <div>{{sp.levelTwoPrice}}元</div>
                    </li>
                    <li>
                        <div>积分价格</div>
                        <div>{{sp.creditPrice}}</div>
                    </li>
                    <li>
                        <div>限购数量</div>
                        <div>{{sp.maxPurchaseCount}}</div>
                    </li>
                    <li>
                        <div>是否返佣</div>
                        <div>{{sp.isKickback ? '是' : "否"}}</div>
                    </li>
                    <li v-if="sp.isKickback">
                        <div>返佣比例</div>
                        <div>{{sp.kickbackRate}}</div>
                    </li>
                    <li>
                        <div>封面图</div>
                        <div>
                            <ul class="imglist">
                                <li>
                                    <img v-if="sp.coverImg" :src="$api_url+'/'+sp.coverImg" alt="">
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div>轮播图</div>
                        <div>
                            <ul class="imglist">
                                <li v-for="(item,index) in sp.imgs">
                                    <img :src="$api_url +'/'+item" alt="" srcset="">
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div>图文介绍</div>
                        <div>
                            <div class="jianjie" v-html="sp.description"></div>
                        </div>
                    </li>
            </ul>

    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            购买级别:['所有用户','一级用户','二级用户'],
            sp: {
                id:"",
                name: "",   //名称
                level: 0,    //允许购买的用户级别，比如level为1那一级和二级用户都可以购买，level为2那只有二级用户才可以购买 那默认就是0，允许所有用户购买
                levelOnePrice: '', //一级价格
                levelTwoPrice: '', //二级价格
                creditPrice: '',    //积分价格
                isKickback: true,   //是否返佣
                kickbackRate: 0,  //返佣比例
                maxPurchaseCount:0,     //限购 0 不限购
                imgs: [],           //轮播图片
                coverImg: "",       //封面
                description: "",     //详情
                categoryId:'',
                isHomePage:false,   //否放置首页
                isRecommend:false,  //表示是否推荐
                brief:"",       //简介
            },
            分类:[]
        }
    },
    computed: {
        分类名称(){
            if(this.分类.find(x=>x.id==this.sp.categoryId)){
                return this.分类.find(x=>x.id==this.sp.categoryId).name
            }else{
                return ''
            }
        }
    },
    methods: {
        goBack(){
            history.back()
        },
        getproduct(){
            this.$axios.get(`/api/product/${this.sp.id}`)
            .then(res => {
                if(res.code==0)
                this.sp = res.data
            })
            .catch(err => {
            })
        },
        获取商品分类(){
            this.$axios.get(`/api/category`,{params:{page:1,size:1000}})
            .then(res => {
                if(res.code===0){
                    this.分类 = res.data
                }
            })
        }
    },
    mounted() {
        this.获取商品分类()
        this.sp.id = this.$route.query.id
        if(this.sp.id){
            this.getproduct()
        }
    }
}
</script>

<style lang="scss" scoped>
.title1 {
    border-bottom: 1px solid #eee;
    padding: 0px 0px 10px;
}

.table2{
    width: 400px;
    margin: 0px auto;
}
.table{
    width: 500px;
    margin: 10px auto;
    border-left: 1px solid #b9b9b9;
    border-bottom: 1px solid #b9b9b9;
    >li{
        display: flex;
        >div{
            border-top: 1px solid #b9b9b9;
            border-right: 1px solid #b9b9b9;
            padding: 5px 10px;
        }
        >div:nth-child(1){
            width: 90px;
            min-width: 90px;
        }
        >div:nth-child(2){
            flex: 1;
            width: 0;
        }
    }
    
}

.imglist{
    display: flex;
    flex-wrap: wrap;
    li{
        width: 80px;
        height: 80px;
        border:1px solid #eee;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
.jianjie{
    /deep/ img{
        max-width: 100%;
    }
}



</style>
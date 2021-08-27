<template>
    <div class="home">

        <div class="彩票">
        
            <!-- 右边边固定 -->
            <div class="右边边固定" @click="go('/NavClass')">
                <span class="iconfont icongengduo1"></span>
            </div>

              <!-- 左边固定 -->
            <div class="固定" @click="左边固定('/')">
                <div class="titleg"  :class="{ activedata: 显示全部 }">推荐</div>
            </div>
            <!--  右边标题栏 -->
            <van-tabs class="table" title-active-color="#499af6" v-model="type" @click="onClick" >
                <van-tab class="nav_n" v-for="(item, index) in 导航" :key="index" :title="item">
                </van-tab>
            </van-tabs>
            <div   class="content_t" >
            <router-view></router-view>
        </div> 
                
        </div>
    </div>
</template>
<script>
import { 低俗内容分类标题,低俗内容分类内容列表} from "@/api/低俗内容.js"
import { Dialog } from 'vant';
import { Toast } from 'vant';

export default {
    data() {
        return {
            type:6,
            显示全部:true,
            导航: [
                "精彩视频",
                "精品漫画",
                "全能小说",
                "有声小说",
                "电影种子",
                "低俗内容",
                  ""
            ]
        }
    },

    computed: {

    },
    created() {
    },
    methods: {
        低俗函数(){
           低俗内容分类标题().then(x=>{
             var title=x.data.data[0]
                     var obj = {
                        class: title,
                        page: 1,
                        row:10,
                          check_status:1,
                    }
                    低俗内容分类内容列表(obj).then(x => {
                        if (x.data.code == 1) {
                             if(x.data.data.usePoints!==0){
                                Toast(x.data.data.usePoints)
                                }
                             this.$router.push('/dslr')
                        } else {
                                if(x.data.code == -9){ //== -9 代表未登录
                                Dialog.confirm({
                                title: x.data.msg,
                                message:"是否跳转到登录页",
                                className: "tanchukuang",
                                }).then(() => {
                                    this.$router.push('/login?router='+ '/dslr');
                                }).catch(() => {

                                });
                            }else{
                                Toast(x.data.msg)
                            }
                        }
                        this.loading = false
                    }).catch(err => {
                        this.objdata.total = 0
                        this.loading = false
                        console.log(err)
                    })
           }).catch(err=>{
               console.log(err)
           })
        },
        左边固定(url){
            this.显示全部=true
               this.type=6
          this.$router.history.push(url); //点击跳转的对应地址
        },
        onClick(name, title,item) {
            this.显示全部=false
            console.log(title)
            console.log(name)

            // if(title=="精彩视频"){
            //     this.$router.push('/ship');
            // }else if(title=="精品漫画"){
            //     this.$router.push('/manhua')
            // }else if(title=="有声小说"){
            //     this.$router.push('/youshenXS')
            // }else if(title=="全能小说"){
            //     this.$router.push('/xiaoshuo')
            // }else if(title=="电影种子"){
            //     this.$router.push('/dyzz')
            // }else if(title=="低俗内容"){

            //     this.$router.push('/dslr')
            // }{
            //    this.$router.push('/')
            // }
            
          switch (title) {
             case "精彩视频":  this.$router.push('/ship');
                break;
              case "精品漫画":  this.$router.push('/manhua');
                break;
            case "有声小说":  this.$router.push('/youshenXS');
                break;
             case "全能小说":  this.$router.push('/xiaoshuo');
                break;
                   case "电影种子":  this.$router.push('/dyzz');
                break;
                   case "低俗内容": this.低俗函数();
                break;

                default: ""
            }
        },
       
        go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },
    },
    mounted() {
        console.log(this.$route)
         var path = this.$route.path
         switch(path){
            case "/ship" : this.type = 0 ;this.显示全部=false
              break;
            case "/manhua" : this.type = 1 ;this.显示全部=false
              break;
             case "/xiaoshuo" : this.type = 2 ;this.显示全部=false
               break;
             case "/youshenXS" : this.type = 3 ;this.显示全部=false
               break;
              case "/dyzz" : this.type = 4 ;this.显示全部=false
                break;
             case "/dslr" : this.type = 5 ;this.显示全部=false
               break;
              default: console.log("router里没找到文件地址333");
         }
       
    },
}


</script>

<style lang="scss" scoped>


/deep/.van-tabs--line{
    padding-top:_vw(0) !important;
}




.content_t {
    height: 100%;
}
/deep/.van-tab {
    color: #fff;
    font-size: _vw(14);
    line-height: _vw(43);
}
/deep/.van-tabs--line .van-tabs__wrap {
    height: _vw(43);
}
.titleActive {
    color: #ec304c;
}
.home {
    background: #ffffff;
    width: 100%;
    // ++++++++++++++++++table切花开始+++++++++++++++++++++++
    .彩票 {
        background: #ffffff;
        overflow: auto;
        position: absolute;
        width: 100%;
        left: 0px;
        top: 0px;
        height: 100%;
        box-sizing: border-box;
        .右边边固定 {
            position: fixed;
            right: 0px;
            top: 0px;
            z-index: 20;
            width: _vw(30);
            height: _vw(43);
            background: #d61f3a;
            // background: #ffffff;
            text-align: center;
            line-height: _vw(43);
            color: #fff;
            .icongengduo1 {
                font-size: _vw(20);
            }
        }
        .table {
            margin-left: _vw(65);
            position: fixed;
            left: 0;
            top: 0;
            z-index: 10;
            width: 100%;
            height: _vw(43);
            /deep/ .van-tabs__line {
                // display: none
                background-color: #fff;
                margin-bottom:_vw(3);
            }

            /deep/.van-tabs__nav {
                background: linear-gradient(135deg, #ec304c 0%, #cb1c36 100%);
            }
            /deep/ .van-tab--active {
                color: #fff;
            }
        }
        .table.active {
            /deep/ .van-tabs__line {
                display: block;
            }
        }

        /deep/.active {
            //右边热门激活样式
            color: #499af6 !important;

            font-weight: 400;
        }

        .固定 {
            position: fixed;
            top: 0px;
            // width: 100%;
            height: _vw(43);
            z-index: 20;
            background: linear-gradient(135deg, #ec304c 0%, #cb1c36 100%);
            .activedata{
                    color:#499af6 !important; //最左边激活样式

                }
            .titleg {
                width: _vw(66);
                height: _vw(43);
                line-height: _vw(43);
                text-align: center;
                box-shadow: 1px -4px 10px rgba(0, 0, 0, 0.45);
                color: #fff;
                font-size: _vw(18);
                font-weight: 800;
            }
        }
        /deep/.van-tabs__wrap {
            color: #fff;
        }
    }
}
</style>

<template>   
  <div class="漫画"> 
       <div class="轮播">
            <van-swipe :autoplay="3000" indicator-color="white" class="ii">
                <van-swipe-item v-for="(item, index) in banner" :key="index">
                    <div class="lb_box_img" @click="轮播(item)"><img :src="configData.api_url+item" alt></div>
                </van-swipe-item>
            </van-swipe>
        </div>
      <div class="热门">
             <div class="gaunz_top">
                <div class="gz_left fred"><i class="iconfont iconremen1"></i><span>热门</span></div>
                <div class="gz_right fac" @click="go('/cartoon')" >更多</div> 
             </div>
            
            <ul class="guanz_ul">
              
                <li @click="查看漫画(item)"  v-for="item in list[0].lb"> 
                    <div class="img_box" ><img   v-on:error.once="dosomething($event)" :src="configData.api_url+item.fengmian"  alt=""></div>
                    <div class="name_title">{{item.name}}</div>
                    <div class="text_bottom">
                        <div class="收藏 fac"><span></span>总篇<span>{{item.size}}</span></div>
                        <div class="titme fac">{{item.types}}</div>
                    </div>
                </li>
            </ul>
     </div>
  </div>
</template>

<script>
import {热门漫画,漫画轮播,漫画详情页} from "@/api/漫画.js"
import { Toast } from 'vant';
import { Dialog } from 'vant';
export default {
    name: "",
    data() {
        return {
            configData:config,
              mrimg:"/vdata/XiaoShuo/default.jpg",

            banner:[ ],
            list:[
                {
                    lb:[],
                }
            ],
           
        };
    },
    computed:{
     
    },
    mounted() {
        漫画轮播().then(x=>{
            if(x.data.code==1){
                this.banner=x.data.data
            }
        }).catch(err=>{
            console.log(err)
        })
       热门漫画().then(x=>{
             console.log(x.data.data)
            if(x.data.code==1){
              this.list=x.data.data.class
            }else{
                console.log("请求数据失败")
            }
        }).catch(err=>{
            console.log(err)
        })
    },
      methods:{
          轮播(){
              
          },
     dosomething: function (e) {
        e.currentTarget.src = this.configData.api_url+ this.mrimg
      },

          查看漫画(item){
            var obj={ id: item.id, check_status:1, }  
              漫画详情页(obj).then(x=>{
                        if(x.data.code==1){//应许查看内容
                            if(x.data.data.usePoints!==0){//== 0带表不不楼积分
                               Toast(x.data.data.usePoints)
                              }
                             this.$router.history.push("/cartoonDetails?mhid=" + item.id); //点击跳转的对应地址
                        }else{
                            if(x.data.code == -9){//== -9 代表未登录
                                Dialog.confirm({
                                title: x.data.msg,
                                message:"是否跳转到登录页",
                                className: "tanchukuang",
                                }).then(() => {
                                     this.$router.push('/login?router='+ '/manhua');
                                }).catch(() => {

                                });
                            }else{
                                Toast(x.data.msg)
                            }
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
          },
            go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        }
    }
};
</script> 

<style lang="scss" scoped>
.漫画{
    padding-bottom: _vw(46);
    padding-top: _vw(43);

      .轮播{
            width: 100%;
            .lb_box_img{
            width: 100%;
            height: _vw(200);
            img{
                width: 100%;
                height: 100%;
            }
            }
         }

    .热门{
           .gaunz_top{
                 display: flex;
                 justify-content:space-between;
                 height: _vw(30);
                 align-items: center;
                 height: _vw(50);
                 .gz_left{
                     margin-left: _vw(10);
                     display:flex;
                     align-items: center;
                     font-size: _vw(14);
                 .iconremen1{
                    font-size: _vw(20)
                    }
                 }
                 .gz_right{
                        display:flex;
                     align-items: center;
                     margin-right: _vw(10);
                     font-size: _vw(14);

                   .arrow{
                    font-size: _vw(14)                     
                   }
                 }
             }

    }
 
        .guanz_ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    margin-bottom: _vw(20);
                    width: 33.33%;
                    .img_box {
                        width: 92%;
                        margin: 0px auto;
                        height: _vw(140);
                        img {
                            border-radius: _vw(6) !important;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name_title {
                        width: 92%;
                        margin: 0px auto;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        font-size: _vw(14)
                    }
                    .text_bottom {
                        display: flex;
                        width: 92%;
                        margin: 0px auto;
                        justify-content: space-between;
                        .收藏 {
                            font-size: _vw(12);
                        }
                        .titme {
                            font-size: _vw(12);
                        }
                    }
                }
            }
}
</style>


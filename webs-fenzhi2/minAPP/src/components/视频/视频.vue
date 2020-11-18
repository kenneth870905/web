
<template>
  <div class="视频">
       <div class="轮播">
            <van-swipe :autoplay="3000" indicator-color="white" class="ii">
                <van-swipe-item v-for="(item, index) in listLB" :key="index">
                    <div class="lb_box_img" @click="go轮播(item.Id)"><img :src="configData.api_url+item" alt></div>
                </van-swipe-item>
            </van-swipe>
        </div>

    <div class="热门视频">
        <div class="title">
            <span><span class="iconfont iconre"></span>热门视频</span>
            <span  class="fred" @click="go('/Videl')">查看更多</span>
        </div>

         <ul class="ship_ul">
                <li  class="content_div"  v-for="(item,index) in list[0].lbimg"  @click="点击查看视频(item)"> 
                    <div class="img_box"><img :src="configData.api_url+item.imgurl" alt=""></div>
                    <div class="p_text">{{item.title}}</div>
                </li>
         </ul> 

    </div>


  </div>
</template>
<script>
import { Dialog } from 'vant';
import { 视频轮播图,视频热门,视频播放页} from "@/api/视频.js"
import { Toast } from "vant";

export default {
    name: "",
    data() {
        return {
           configData: config,
            list:[
                {
                    lbimg:[],
                }
            ],
                 listLB:[  ],  
        };
    },
    computed:{
     
    },
    created(){
        this.获取数据()
        this.获取热门视频()
    },
 
    methods:{
        点击查看视频(item){
            var obj = { id: item.id, check_status:1,  }
        视频播放页(obj).then(x => {
            if (x.data.code == 1) {
              this.$router.push("/videoContent?id=" + item.id );
            } else {
                if(x.data.code == -9){ //== -9 代表未登录
                    Dialog.confirm({
                    title: x.data.msg,
                    message:"是否跳转到登录页",
                    className: "tanchukuang",
                     }).then(() => {
                          this.$router.push('/login?router='+ '/ship');
                     }).catch(() => {

                     });
                }else{
                     Toast(x.data.msg)
                }
             
            }
        }).catch(err => {
            console.log(err)
        })


        },
        获取热门视频(){
          视频热门().then(x=>{
              this.list=x.data.data.class
              console.log(x)
            }).catch(err=>{
                console.log(err)
            })
        },
        获取数据(){
            视频轮播图().then(x=>{
                this.listLB=x.data.data
                }).catch(err=>{
                    console.log(err)
                })
        },
        
           go(url) {
            this.$router.history.push(url); //点击跳转的对应地址
        },
    }
};
</script> 

<style lang="scss" scoped>
  .视频{
      padding-bottom: _vw(44);
      padding-top: _vw(43);
      background:#FFFFFF;
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
      .热门视频{
          .title{
            font-size: _vw(14);
              background: rgb(247, 237, 237);
            padding:_vw(10) _vw(10) _vw(10) _vw(10);
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            .left_s{
                display:flex;
                justify-content: space-between;
            }
             .iconre{
              color:red;
              font-size: _vw(20);
          }
            .like{
                  color:red;
              font-size: _vw(20);
            }
          }
          
                   .ship_ul { //视频
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        padding-top:_vw(10);
                            .content_div {
                                margin-bottom: _vw(20);
                                width: 50%;
                                .img_box {
                                    width: 96%;
                                    margin: 0px auto;
                                    height: _vw(100);
                                        background: rgba(121, 90, 90, 0.2);
                                    img {
                                        width: 100%;
                                        height: 100%;
                                       object-fit:contain;
                                    }
                                }
                                .p_text {
                                    width: 88%;
                                    margin: 0px auto;
                                    color: #ff516b;
                                    padding: _vw(0) _vw(10);
                                    font-size: _vw(14);
                                    overflow:hidden; //超出的文本隐藏
                                    text-overflow:ellipsis; //溢出用省略号显示
                                    white-space:nowrap; 
                                }
                                p {
                                    margin: 0px;
                                    font-size: _vw(14);
                                }
                            }
                        }
   }

  }
</style>


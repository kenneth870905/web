<template>
    <div class="index">
        <div class="title" >
          <div class="bix_img"><img src="../../assets/img/login.png" alt=""></div>
          <div class="right">
              <div class="头像"></div>
              <div  class="nav_box" @click="搜索()"><span class="iconfont icondaohang"> </span>导航</div>
          </div>
        </div>

        <div v-if="show" class="nav"> 
          <div class="input_box">
              <div class="input"><van-search placeholder="请输入搜索关键词" v-model="value" /></div>
              <div class="btn">搜索</div>
          </div>

               <h5><span class="iconfont iconshipin"></span>视频区</h5>     
        <ul class="fenlei_ul">
            <li>亚洲</li>
            <li>日韩</li>
            <li>国产</li>
            <li>欧美</li>
            <li>中文</li>
            <li>学生</li>
            <li>御女</li>
            <li class="no_li"></li>
        </ul>

        <h5><span class="iconfont icontupian"></span>动漫</h5>
        <ul class="fenlei_ul">
            <li>性感</li>
            <li>清纯</li>
            <li>少女</li>
            <li>萝莉</li>
            <li>熟女</li>
            <li class="no_li"></li>
            <li class="no_li"></li>
            <li class="no_li"></li>
           
        </ul>


      <h5><span class="iconfont iconai-book"></span>小说</h5>
        <ul class="fenlei_ul">
            <li>言情小说</li>
            <li>YY小说</li>
            <li>同人小说</li>
            <li>轻小说</li>
          
        </ul>

        </div>
        
   

     

        


       
      

    </div>
</template>
<script>
// import {api_首页上证深证指数 } from "@/api/股票.js";

export default {
    data() {
        return {
            show:false,
            value:"",
          banner:[
                require('../../assets/img/banner1.jpg'),
                require('../../assets/img/banner2.jpg'),
                require('../../assets/img/banner3.jpg'),
            ],
          
        }
    },
    components: { // 注册组件

    },
    computed: {
        
    },
    created() {
     
    },
    methods: {
        搜索(){
         this.show=!this.show;
        },
 
    },
    mounted() {
        
    },
}


</script>

<style lang="scss" scoped>

.index{
position: fixed;
width:100%;
// height: 100%;
z-index: 1 !important;

  .title{
        padding:_vw(0) _vw(10) _vw(0) _vw(10);
        position: fixed;
        top:0px;
        left:0px;
        width: 100%;
        height: _vw(50);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
        box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
        // box-shadow: 2px 2px 10px #909090;
         
        .bix_img{
            width: _vw(83);
            height: _vw(26);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .right{
            width: _vw(120);
            display:flex;
                color:#ffffff;
                align-items: center;
            .头像{
                width: _vw(40);
                height: _vw(40);
                border-radius: 50%;
                background: #ffffff;
            }
            .nav_box{
                margin-left:_vw(10);
                line-height: _vw(50);
            }
        }
    }


  .nav{
        // position: absolute;
        top:0px;
        left:0px;
        width: 100%;
        padding-bottom: _vw(30);
    background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
         
        .input_box{
            width: 100%;
            display:flex;
            // background: #826cfd;
            // justify-content: space-between;
            height:_vw(40);
            padding-top:_vw(80);
            width: 88%;
            margin:0px auto;
            align-items: center;

            .input{
                width: 80%;
                height: 100%;
                .van-search{
                    padding: 0px;
                height: 100%;
                }
            }
            .btn{
                height: 100%;                
                width: 20%  ;

                background: linear-gradient(135deg, #f17040 0%,#ec204c 100%);
                color:#ffffff;
                text-align: center;
                line-height: _vw(40);
            }
        }
        h5{
          color: #ffade8;
          margin: _vw(10)  _vw(10)  _vw(10) _vw(10);
        }
       .fenlei_ul{
           display: flex;
           justify-content:space-between;
           flex-wrap:wrap;
           .no_li{
               border:none;
           }
           li{
             width: 20%;
             margin:_vw(4) _vw(6);
             height: _vw(30);
             line-height: _vw(30);
             color:#ffffff;
    // color: rgb(13, 53, 185) !important;

             border:1px solid rgb(233, 78, 78);
            //  border:1px solid rgb(59, 94, 207);
             text-align: center;
             
           }
       }

  }
// .nav_title{
//     .title{
//         padding:_vw(0) _vw(10) _vw(0) _vw(10);
//         position: fixed;
//         top:0px;
//         left:0px;
//         width: 100%;
//         height: _vw(50);
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         background: linear-gradient(135deg, #ff516b 0%,#826cfd 100%) !important;
//         box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
//         // box-shadow: 2px 2px 10px #909090;
         
//         .bix_img{
//             width: _vw(83);
//             height: _vw(26);
//             img{
//                 width: 100%;
//                 height: 100%;
//             }
//         }
//         .right{
//             width: _vw(120);
//             display:flex;
//                 color:#ffffff;
//                 align-items: center;
//             .头像{
//                 width: _vw(40);
//                 height: _vw(40);
//                 border-radius: 50%;
//                 background: #ffffff;
//             }
//             .nav_box{
//                 margin-left:_vw(10);
//                 line-height: _vw(50);
//             }
//         }
//     }
// }

}
</style>
<template>
<div class="top">
    <div class="title_nav">
        <div class="left" @click="返回()"><van-icon name="arrow-left" class="arrow" /></div>
        <div class="title_c">漫画</div>
        <div  class="right"></div>
    </div>
        <div class="head" >
            <div class="head-info" >
                <div class="head-img">
                    <img v-if="obj.fengmian" :src="configData.api_url+obj.fengmian">
                </div>         
                <div class="head-txt">
                    <ul>
                        <li >
                             <label>名字：</label>
                            <span>{{obj.name}}</span>
                        </li>
                        <li>
                            <label>作者：</label>
                            <span>{{obj.types}}</span>
                        </li>
                        <li>
                            <label>总篇：</label>
                            <span>{{obj.size}}页</span>
                        </li>
                        <!-- <li>
                            <label>状态：</label>
                            <span>{{obj.status}}</span>
                        </li> -->
                        
                        <!-- <li>
                            <label>最后新章节：</label>
                            <span style="color:yellow;">{{obj.last_update_chapter_name}}</span>
                        </li> -->
                         
                        <!-- <li class="收藏">  
                            <span v-if="!shouchang" @click="取消收藏()"> <span class="sc">收藏：</span><span class="iconfont iconshoucang huhu"></span> </span>
                            <span v-if="shouchang" @click="收藏()"> <span class="sc">收藏：</span><span class="iconfont iconshoucang"></span> </span>
                        </li> -->
                    </ul>
                </div>
            </div>

        </div>
        <div class="排行分类">
            <div @click="切换(1)" :class="{active:active == 1 }">详情</div>
            <div @click="切换(2)" :class="{active:active == 2 }">目录</div>
        </div>
        <div class="detail">
            <div class="ul_l" v-show="选择详情 == 1">
                <div class="detail-summary">
                    <p>{{obj.description}}</p>
                </div>
                <div class="mod-recommend3">
                    <span>骚年们都在看：</span>
                    <div class="推荐书单">
                        <div class="书单" v-for="(item,index) in 推荐" :key="index" @click="查看推荐漫画(item)">
                            <img :src="configData.api_url+item.fengmian" alt="">
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="ul_l" v-show="选择详情 == 2" style="width:100%">
                <div class="time">
                    <span>&nbsp;&nbsp;{{obj.add_time}}</span>  &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{obj.last_update_chapter_name}}</span>
                </div>
                <div class="chapter">
                    <ul >
                    <li v-show="index<10 || 展开 " v-for="(item,index) in obj.jpgs" @click="查看详情(item)" :key="index">{{item.tie}}</li>
                    </ul>
                    <div  v-if="obj.jpgs && obj.jpgs.length>10" class="加载更多" @click="展开=!展开">查看更多目录</div>
                </div>
            </div>
        </div>
</div>
</template>


<script>
import { Toast } from 'vant';
import {漫画详情页} from "@/api/漫画.js"
import {热门推荐三部} from "@/api/首页.js"

export default {
    data() {
        return {
            展开:false,
           configData:config,
            // mhid:"",
            obj:{},
            active: "2",
            选择详情: "2",
            mhidid:"",
            // shouchang:true,//收藏图标切换
            推荐:[],
        }
    },
    components: {
    },
    created(){
          this.mhidid= this.$route.query.mhid; 
      this.获取所有数据函数()
         this.漫画详情页推荐随机三部()
    },
    computed:{
       目录展示(){
     
       }
    },
    methods: {
        查看推荐漫画(item){
            this.mhidid=item.id
              var obj={
                        id: this.mhidid
                    }       
                   漫画详情页(obj).then(x=>{
                        if(x.data.code==1){
                            this.obj=x.data.data
                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })

                    this.漫画详情页推荐随机三部()
        },
        漫画详情页推荐随机三部(){
                var obj={
                    cid:this.mhidid,
                    class:"manhua"
                }       
               热门推荐三部(obj).then(x=>{
                        if(x.data.code==1){
                             this.推荐=x.data.data
                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
             },
        // ...mapMutations({
        //       保存当前数据:"保存"
        // }),
    获取所有数据函数(){
                var obj={
                    id: this.mhidid
                }       
              漫画详情页(obj).then(x=>{
                        // console.log(x)
                        if(x.data.code==1){
                            this.obj=x.data.data
                            // this.保存当前数据(x.data.data)
                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
          },
        切换(index) {
            this.选择详情 = index;
            this.active = index;
        },
        // 加载更多() {
        //   alert("加载更多")
        // },
        返回() {
            history.back()
        },
       查看详情(item){
           this.$router.history.push("/cartoonContent?xqmhid="+ this.obj.id+'&zjid='+item.id); //点击跳转的对应地址
       },
    //    收藏(){
    //      this.shouchang=false
    //      Toast('收藏成功');
    //    },
    //    取消收藏(){
    //      this.shouchang=true
    //        Toast('取消收藏');
    //    }
    }
}
</script>

<style lang="scss" scoped>
* {
    background: none;
}

.active {
    border-bottom: 2px solid #ff9a6a;
    width: 20%;
}

.top {
  
    width: 100%;
    background: white;
    .title_nav{
       position: fixed;
        top:0;
        left:0px;
        width: 100%;
     display:flex;
     justify-content: space-between;
     align-items: center;
     height: _vw(44);
     color:#fff;
     background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
     line-height: _vw(44);
     font-size: _vw(20);
    }
}

.head {
    margin-top:_vw(44);
    // display: flex;
    // justify-content: center;
    // background:green;
    background-image:url('~@/assets/img/manhua/minBanner.jpg');
    background-repeat:no-repeat;
    background-size: 100% 100% ;
    box-sizing: border-box;
    padding: _vw(20)_vw(16);
   
}

.head-info {
    display: flex;
    // align-items: center;
    padding:_vw(20) 0px;
  
}

.head-img {
    // width: _vw(130);
    height: _vw(160);
    width: 40%;
    img {
    width: 100%;
    height: 100%;
}
}


.head-txt ul li {
    color: white;
    font-size: _vw(12);
    // margin: _vw(10);
    margin-bottom: _vw(10);
    display: flex;
    label{
      width:20%;
    }
    span{
           width:80%;
    }
} 
.head-txt{
    margin-left: _vw(10);
    width: 60%;
    ul{
        li:first-child{
            span{
                 font-weight: 600; 
                 font-size: _vw(18);
            }
      
        }
        .收藏{
            >span{
                display: flex;
                align-items: center;
                .iconshoucang{
                    font-size:_vw(16);
                }
                .huhu{
                    color:red
                }
                .sc{
                    font-size:_vw(12);
                }
            }
        }
    }
}



.排行分类 {
    display: flex;
    width: 100%;
    justify-content: center;
    height: _vw(44);
    border-top: 1px solid #f8f8f8;
    line-height: _vw(44);
}

.排行分类 div {
    width: 50%;
    text-align: center;
    background: white;
    font-size: _vw(14);
    color: #969696;
}


.detail-icon {
    text-align: center;
    margin: 10px;
}

.detail-summary {
    width: 90%;
    margin: 0 auto;
}

.detail-summary p {
    font-size: _vw(13);
    color: #535252;
    line-height:_vw(24);

}

.推荐书单 {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.书单 {
    width: 28%;
    height: 100%;
    margin-bottom: 10px;
}

.书单 p {
    font-size: _vw(12);
    text-align: center;
    background: white;
    overflow-y: hidden;
    height: _vw(34);
line-height: _vw(34);
    width: 100%;
    margin:0px;
}

.书单 img {
    width: 100%;
    height: 85%;
    border-radius: 5px 5px 0 0;
}
.mod-recommend3 {
    padding-bottom: _vw(0);
    span {
        font-size: _vw(14);
        color: #969696;
        margin: 15px;
        display: inline-block;
    }
 }

.time span {
    font-size: _vw(14);
    line-height: _vw(30);
    color: #969696;
}

.chapter {
    width: 100%;
    height: 200px;
    ul{

        width: 100%;
        display:flex;
        flex-wrap: wrap;
            li {
            width:31%;
            height: 47px;
            border: 1px solid #C5C5C5;
            margin:_vw(3);
            text-align: center;
            line-height: 47px;
            color: #535252;
            font-size: _vw(14)
        } 
    }
}
.加载更多 {
    width: 95%;
    height: _vw(50);
    border: 1px solid #C5C5C5;
    margin: 0 auto;
    text-align: center;
    color: #535252;
    font-size: _vw(18);
    line-height: _vw(50);
}
</style>

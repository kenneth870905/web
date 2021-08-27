
<template>
  <div class="有声小说">
       <van-nav-bar  title="有生小说内容页"  class="title"  left-arrow  @click-left="onClickLeft" /> 

        <div id="player">
            <!--播放控件-->
            <div id="playerControl">
                <div class="playerImg">
                      <img  v-if="obj.fengmian"  :src="configData.api_url+obj.fengmian" alt="" width="150" height="150">
                    <audio id="audio"   >
                           <source  :src="srcdata">
                    </audio>
                </div>

                  <!--播放进度-->
            <!-- <div id="progrees">
                <div id="curProgrees">
                 </div>
            </div>
             <div id="playTime">
                <span id="presentTime">00 : 00</span>
                <span>/</span>
                <span id="totalTime">00 : 00</span>
            </div> -->
                <div id="pcontrol" class="">
                 
                       <div><span class="iconfont icondaohang"></span></div>
                         <div class="bottom_box">
                        <button class="prev" title="上一曲"  @click="上一曲()"><span class="iconfont iconshangyiqu"></span></button>
                        <button id="play" class="play1" title="播放" @click="播放暂停()"> 
                              <span class="iconfont iconbofang" v-if="播放切换"></span>
                                 <span class="iconfont iconzanting" v-if="!播放切换" ></span>
                            </button>
                        <button class="next" title="下一曲"  @click="下一曲()"><span class="iconfont iconziyuan"></span></button>
                        </div>
                          <button class="stop" title="停止" @click="停止()" > <span class="iconfont icontingzhi"></span></button>
                </div>
               
            </div>


            <div id="playerList">
                <ul>
                    <li class="active" v-for="(item,index) in obj.jpgs" @click="点击播放(index)">
                        <span >第{{item.tie}}章&nbsp;&nbsp;&nbsp;</span>
                        <span>邓紫棋邓紫棋邓紫棋G.E.M.</span>
                    </li>
                  
                  
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {有声小说内容页面} from "@/api/有声小说.js"
import $ from "jquery";
export default {
    name: "",
    data() {
        return {
         configData:config,
          flag:true,
          index:0,
          music : [],
        //   music : ["/assets/video/1.mp3","/assets/video/2.mp3","/assets/video/3.mp3"],

          timer:0,
          timer1:0,
          mhidid:"",
          zjid:"",
          播放切换:true,
          obj:{},
        //   tie:"",
        srcdata:require('@/assets/img/1.jpg')

     };
    },
    created(){
          this.mhidid= this.$route.query.xqmhid; //书唯一id
          this.mhidid=parseInt( this.mhidid)
          this.zjid=this.$route.query.zjid //章节唯一id
          this.获取所有数据函数()
        
    },
    computed:{
          
    },
    mounted() {
         
          
    },

    methods:{
            点击播放(indexs){
                alert(indexs)
             this.index=indexs
             console.log(indexs)
            },
            获取所有数据函数(){
                var obj={ 
                    id: this.mhidid
                }       
              有声小说内容页面(obj).then(x=>{
                        console.log(x)
                        if(x.data.code==1){
                              var objdata=x.data.data
                              this.obj=objdata
                              var dataArry=objdata.jpgs
                              var jpgsurl=objdata.jpgsurl
                              var list=[]
                            // dataArry.map(y=>{
                            //    list.push(y.data) 
                            // })
                            //   console.log(list)
                            //  for (var i=0;i<list.length;i++){
                            //  list[i]=this.configData.api_url+jpgsurl+list[i]
                            // }
                            //   this.music=list

                        }else{
                            console.log("请求数据失败")
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
          },



      onClickLeft() {//头部
            history.back()
         },
         
        //  进度条(){ //进度条
        //     let  audio  = document.querySelector("#audio");// 获取播放音频
        //     let curProgrees = document.querySelector("#curProgrees");// 获取歌曲列表
        //     //获取总时间
        //     let allTime = audio.duration;
        //     //设置进度条的总长度
        //     let allwidth = 550;

        //     //定义计时器
        //     this.timer = setInterval(function(){
        //         //获取当前时间\

        //         let curTime = audio.currentTime;
        //         //如果当前时间大于总时间
        //         if(curTime >= allTime){
        //             //赋值
        //             curProgrees.style.width = allwidth + "px";
        //             //下一曲
        //             下一曲();
        //         }
        //         //获取当前的进度width
        //         let curWidth = (curTime/allTime)*allwidth + "px";
        //         //赋值
        //         curProgrees.style.width = curWidth;
        //     },30);
        // },
         播放暂停(){
            // let  audio = document.querySelector("#audio");// 获取播放音频
            // let play = document.querySelector("#play");// 获取播放按钮
            if(this.flag){
                audio.play();//播放
                this.播放切换=false
               
                //  this.时间();
            }else{
                audio.pause();//暂停         
                  this.播放切换=true              
            }
            // this.flag = !this.flag;//取反
         },
        // 时间(){//时间
        //     //获取当前时间
        //     // 如果有了
        //     console.log('时间')
        //         clearInterval(this.timer1)
        //         //设置计时器
        //         this.timer1 = setInterval(function(){

        //             console.log('定时器')
        //             function  sigleTime(obj,time){
        //                 //获取总时间
        //                 let allTime = Math.floor(time);
        //                 let allMinute = Math.floor(allTime/60);//得到分钟
        //                 if(allMinute<10){
        //                     allMinute = "0" + allMinute;
        //                 }
        //                 let allSecond = Math.floor(allTime%60);//得到秒数
        //                 if(allSecond<10){
        //                     allSecond = "0" + allSecond;
        //                 }

        //                 //拼接时间
        //                 let allTimeStr = allMinute + " : " +allSecond;
        //                 obj.innerHTML = allTimeStr;
        //             }


        //             let totalTime = document.querySelector("#totalTime");// 获取歌曲列表
        //             let  audio  = document.querySelector("#audio");// 获取播放音频
        //                let presentTime = document.querySelector("#presentTime");// 获取歌曲列表
        //             //总时间
        //            sigleTime(totalTime,audio.duration);

        //             //获取当前时间
        //           sigleTime(presentTime,audio.currentTime);
        //         },1000)


        // },
        //   上一曲(){
        //       try {
        //         clearInterval(this.timer)
        //     } catch (error) {
                
        //     }
        //      this.index--;
        //      if(this.index <0){
        //         //  console.log(this.music.length)
        //         this.index = this.music.length - 1;
               
        //     }
        //    let  audio  = document.querySelector("#audio");// 获取播放音频
        //     audio.src = this.music[this.index];//切换下一曲
        //     //播放
        //     this.flag = true;
        //     this.播放暂停();

        //     //切换歌曲背景
        //    this.切换歌曲背景();



        //  }, 
        //   下一曲(){
        //       this.index++;
        //      if(this.index == this.music.length){
        //          console.log('已经是最后一章了')
        //         this.index = 0;
        //     }
        //        let audio  = document.querySelector("#audio");// 获取播放音频
        //      audio.src = this.music[this.index];//切换下一曲
        //     //播放
        //     this.flag = true;
        //    this.播放暂停();
        //     //切换歌曲背景
        //     this.切换歌曲背景();


        //  },
        //   停止(){
        //        let audio= document.querySelector("#audio");// 获取播放音频
        //        audio.currentTime = 0;
        //     //暂停播放
        //     this.flag = false;
        //     this.播放暂停();
        //  },
        //  切换歌曲背景(){ //切换歌曲背景
        //     //先干掉所有音乐列表的背景色
        //      let musicList = playerList.querySelectorAll("li");// 获取歌曲列表
        //     //  console.log(musicList)
        //     for(var i=0; i<musicList.length; i++){
        //         //   console.log( musicList[i])
        //         musicList[i].className = "";
        //     }
        //     //当前歌曲显示背景色
        //     musicList[this.index].className = "active";
        //         // if(this.index == this.music.length){
        //         //  console.log('已经是最后一章了 目录激活样式取消')
        //         //  this.index = ""
        //         // }else{
        //         //    musicList[this.index].className = "active";
        //         // }
            
        // },
      
    },

     destroyed(){
         clearInterval(this.timer)
         clearInterval(this.timer1)
     },
};
</script> 

<style lang="scss" scoped>
 
.title{
       background: #ec304c;
       position: fixed;
       top:_vw(0);
       left: 0PX;
       width: 100%;
       height:_vw(44);
      z-index: 2;

       
}
.van-icon{
    color:#ffffff;
}
.van-nav-bar__title{
    color:#ffffff;
}
  /deep/.van-nav-bar{       
            border-bottom:0px !important;
 }
         /deep/.van-hairline--bottom::after{
            border-bottom-width: 0px !important;
        }

    //   /deep/.van-nav-bar{       
    //         border-bottom:0px !important;
    //     }
    //      /deep/.van-hairline--bottom::after{
    //         border-bottom-width: 0px !important;
    //     }

 button{
             border-radius: 50%;
            //  margin-right:_vw(10);
             box-sizing: border-box;
             border:none;
             background: none;
             color:#353434;
             .iconzanting{
                 font-size: _vw(40)
             }
             .iconbofang{
                 font-size: _vw(40);
             }
             .icontingzhi{
                 font-size: _vw(20)
             }
         }


.有声小说{
.active{
    color:red;
    // color:#fff;
    // background: #56506d;
}
#player{
      
    //   background: #fff;
   position: absolute;
   left: 0px;
   top:0px;
   width: 100%;
   height: 100%; 
   padding-top:_vw(44);
   box-sizing: border-box;
   #playerControl{
   padding-top:_vw(10);
   position: fixed;
   top:_vw(44);
   left: _vw(0);
   width: 100%;
   z-index: 2;
   background-image:url('~@/assets/img/manhua/minBanner.jpg');
    background-repeat:no-repeat;
    background-size: 100% 100% ;
      .playerImg{
            width:50%;
        //   max-height: _vw(180);
           height: _vw(180);
            margin:0px auto;
            // padding:_vw(5);
          box-sizing: border-box;
           img{
               width: 100%;
               height: 100%;
                  object-fit:contain;
           }
      } 
       #progrees{width:80%; height:_vw(3); background:rgb(214, 213, 213); margin: _vw(25) auto _vw(10) auto;}
      #curProgrees{
          width:0px; height:100%; 
          background:#ffffff;
          position: relative;
        // .时间{
        // position: absolute;
        // top:_vw(-10);
        // right:_vw(-80);
        // width: _vw(90);
        // text-align: center;
        // font-size: _vw(11);
        // border-radius: _vw(15);
        // height: _vw(20);
        // line-height: _vw(20);
        // background: #fff;
        // border:1px solid #acacac;
        // z-index: 2;
        // }
      }
      #playTime{
          width: 80%;
          margin:0px auto;
          display: flex;
          justify-content: flex-end;
          font-size: _vw(12)
      }
      #pcontrol{
        width: 80%;
        // background: red;
         height: _vw(50);
         margin:0px auto;
         display: flex;
         justify-content: space-between;
         align-items: center;
        //  background: green;
         .bottom_box{
            width: 60%;
           display: flex;
          justify-content: space-between;
           align-items: center;
         }
      }
     
   }
   #playerList{
     padding-top: _vw(300);
    //  overflow-y:auto;
      background: #fff;
       ul{
        //    padding:_vw(10);
           li{
            //    border-bottom:1px solid #acacac;
               line-height: _vw(40);
                padding:0px _vw(10);
           }
       }
   }



}
// #player{width:600px; height:400px; background:#130519de;margin:0 auto;}
// #playerControl{position:relative;height:200px;}
// #playerControl .playerImg{padding:25px; box-sizing: border-box;}

// /*播放控制界面*/
// #pcontrol{position: absolute;left:300px; top:85px;}
// #pcontrol button{float:left;margin:0 10px;border:0;outline: none; width:28px; height:28px;background:url("~@/assets/img/player.png") no-repeat}

/*暂停*/
// #pcontrol .play1{background-position: -8px -8px}
// #pcontrol .play1:hover{background-position: -49px -8px}

// /*播放*/
// #pcontrol .play2{background-position: -8px -49px}
// #pcontrol .play2:hover{background-position: -49px -49px}

// /*上一曲*/
// #pcontrol .prev{background-position: 0 -112px}
// #pcontrol .prev:hover{background-position: -30px -112px}

// /*下一曲*/
// #pcontrol .next{background-position: 0 -141px}
// #pcontrol .next:hover{background-position: -30px -141px}
// /*停止播放*/
// #pcontrol .stop{background-position: 0 -84px}
// #pcontrol .stop:hover{background-position: -30px -84px}

// /*播放列表*/
// #playerList{padding:20px 0px}
// #playerList ul li{padding:10px 20px; }
// #playerList ul li.active,#playerList ul li:hover{background:rgba(0, 0, 0, .4);color:#665975;cursor: pointer}

/*播放进度*/

// /*播放时间*/
// #playTime{padding:10px 25px 0px; text-align: right;}
}
</style>




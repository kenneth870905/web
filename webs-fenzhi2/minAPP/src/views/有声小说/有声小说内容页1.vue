
<template>
  <div class="有声小说">
       <van-nav-bar  title="有生小说内容页"  class="title"  left-arrow  @click-left="onClickLeft" /> 

        <div id="player">
            <!--播放控件-->
            <div id="playerControl">
                <div class="playerImg">
                    <img src="@/assets/img/1.jpg" alt="" width="150" height="150">
                    <audio id="audio">
                        <source src="@/assets/video/1.mp3">
                    </audio>
                </div>
                <div id="pcontrol" class="clearfix">
                    <button class="prev" title="上一曲"></button>
                    <button id="play" class="play1" title="播放"></button>
                    <button class="next" title="下一曲"></button>
                    <button class="stop" title="停止"></button>
                </div>
            </div>
            <!--播放进度-->
            <div id="progrees">
                <div id="curProgrees"></div>
            </div>
            <!--播放时间-->
            <div id="playTime">addEvent 
                <span id="presentTime">00 : 00</span>
                <span>/</span>
                <span id="totalTime">00 : 00</span>
            </div>
            <!--音频列表-->
            <div id="playerList">
                <ul>
                    <li class="active">
                        <span class="mr10">1</span>
                        <span>Mascara</span>
                        <span>-</span>
                        <span>G.E.M. 邓紫棋</span>
                    </li>
                    <li>
                        <span class="mr10">2</span>
                        <span>西安人的歌</span>
                        <span>-</span>
                        <span>范炜与程渤智</span>
                    </li>
                    <li>
                        <span class="mr10">3</span>
                        <span>往后余生</span>
                        <span>-</span>
                        <span>李贰叁</span>
                    </li>
                </ul>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";
export default {
    name: "",
    data() {
        return {
          
        };
    },
    computed:{
     
    },
    mounted() {
       
    //获取元素
        let play = document.querySelector("#play");// 获取播放按钮
        let audio = document.querySelector("#audio");// 获取播放音频
        let next = document.querySelector(".next");// 获取下一曲
        let prev = document.querySelector(".prev");// 获取上一曲
        let stop = document.querySelector(".stop");// 获取上一曲
        let playerList = document.querySelector("#playerList");// 获取歌曲列表
        let musicList = playerList.querySelectorAll("li");// 获取歌曲列表
        let curProgrees = document.querySelector("#curProgrees");// 获取歌曲列表
        let totalTime = document.querySelector("#totalTime");// 获取歌曲列表
        let presentTime = document.querySelector("#presentTime");// 获取歌曲列表

    //定义数组保存歌曲信息
        let music = ["video/1.mp3","video/2.mp3","video/3.mp3"];


    // 点击播放按钮播放歌曲，再次点击就暂停播放
        addEvent(play,"click",player);
    //下一曲
        addEvent(next,"click",theNext);
    //上一曲
        addEvent(prev,"click",thePrev);
    //停止播放
        addEvent(stop,"click",theStop);

    //播放歌曲
        //定义标杆确定是否播放
        let flag = true;
        function player(){
            if(flag){
                audio.play();//播放
                play.className = "play2";//播放图标
                play.title = "暂停";
                //进度条
                progree();
                //设置时间
                setTime();
            }else{
                audio.pause();//暂停                       
                play.className = "play1";//暂停图标
                play.title = "播放";
            }
            flag = !flag;//取反
        }
    //下一曲
        //定义index保存歌曲的索引
        var index = 0;
        function theNext(){
            index++;
            if(index == music.length){
                index = 0;
            }
            audio.src = music[index];//切换下一曲
            //播放
            flag = true;
            player();
            //切换歌曲背景
            exchangBg();
        }
    //上一曲
        function thePrev(){
            index--;
            if(index <0){
                index =  music.length - 1;
            }
            audio.src = music[index];//切换下一曲
            //播放
            flag = true;
            player();

            //切换歌曲背景
            exchangBg();

        }

    //停止播放
        function theStop(){
            audio.currentTime = 0;
            //暂停播放
            flag = false;
            player();
        }

    //切换歌曲背景
        function exchangBg(){
            //先干掉所有音乐列表的背景色
            for(var i=0; i<musicList.length; i++){
                musicList[i].className = "";
            }
            //当前歌曲显示背景色
            musicList[index].className = "active";
        }

    //进度条
        function progree(){

            //获取总时间
            let allTime = audio.duration;
            //设置进度条的总长度
            let allwidth = 550;

            //定义计时器
            let timer = setInterval(function(){
                console.log("定时器")
                //获取当前时间
                let curTime = audio.currentTime;
                //如果当前时间大于总时间
                if(curTime >= allTime){
                    //赋值
                    curProgrees.style.width = allwidth + "px";
                    //下一曲
                    theNext();
                }
                //获取当前的进度width
                let curWidth = (curTime/allTime)*allwidth + "px";
                //赋值
                curProgrees.style.width = curWidth;
            },30);


        }
    //时间设置
        function setTime(){
            //获取当前时间
                //设置计时器
                let timer = setInterval(function(){
                console.log("定时器")

                    //总时间
                    sigleTime(totalTime,audio.duration);

                    //获取当前时间
                    sigleTime(presentTime,audio.currentTime);
                },1000)


        }

    //单个时间设置
        function sigleTime(obj,time){
            //获取总时间
            let allTime = Math.floor(time);
            let allMinute = Math.floor(allTime/60);//得到分钟
            if(allMinute<10){
                allMinute = "0" + allMinute;
            }
            let allSecond = Math.floor(allTime%60);//得到秒数
            if(allSecond<10){
                allSecond = "0" + allSecond;
            }

            //拼接时间
            let allTimeStr = allMinute + " : " +allSecond;
            obj.innerHTML = allTimeStr;
        }


    },

    methods:{
      
      onClickLeft() {//头部
            history.back()
         },
    }
};
</script> 

<style lang="scss" scoped>
.有声小说{
 *{margin:0; padding:0;}
.bd{border:1px solid red;}
.fl{float: left}
.fr{float:right}
.mr10{margin-right:10px;}
ul{list-style: none;}
.clearfix:after{content: ""; height:0; line-height: 0; visibility: hidden;display: block; clear:both;}
body{background:#262626; padding:50px 0; color:#fff; }

#player{width:600px; height:400px; background:#130519de;margin:0 auto;}
#playerControl{position:relative;height:200px;}
#playerControl .playerImg{padding:25px; box-sizing: border-box;}

/*播放控制界面*/
#pcontrol{position: absolute;left:300px; top:85px;}
#pcontrol button{float:left;margin:0 10px;border:0;outline: none; width:28px; height:28px;background:url("~@/assets/img/player.png") no-repeat}

/*暂停*/
#pcontrol .play1{background-position: -8px -8px}
#pcontrol .play1:hover{background-position: -49px -8px}

/*播放*/
#pcontrol .play2{background-position: -8px -49px}
#pcontrol .play2:hover{background-position: -49px -49px}

/*上一曲*/
#pcontrol .prev{background-position: 0 -112px}
#pcontrol .prev:hover{background-position: -30px -112px}

/*下一曲*/
#pcontrol .next{background-position: 0 -141px}
#pcontrol .next:hover{background-position: -30px -141px}
/*停止播放*/
#pcontrol .stop{background-position: 0 -84px}
#pcontrol .stop:hover{background-position: -30px -84px}

/*播放列表*/
#playerList{padding:20px 0px}
#playerList ul li{padding:10px 20px; }
#playerList ul li.active,#playerList ul li:hover{background:rgba(0, 0, 0, .4);color:#665975;cursor: pointer}

/*播放进度*/
#progrees{width:550px; height:5px; background:#ccc; margin:0 auto;}
#curProgrees{width:0px; height:100%; background:darkolivegreen;}

/*播放时间*/
#playTime{padding:10px 25px 0px; text-align: right;}
}
</style>




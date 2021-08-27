
<template>
    <div class="有声小说">
        <van-nav-bar :title="obj.name" class="title" left-arrow @click-left="onClickLeft" />

        <div id="player">
            <!--播放控件-->
            <div id="playerControl">
                <div class="playerImg">
                    <img v-if="obj.fengmian" :src="configData.api_url+obj.fengmian" alt="" width="150" height="150">
                    <audio id="audio">
                    </audio>
                </div>
               
                <!--播放进度-->
                <div id="progrees">
                    <div id="curProgrees">
                    </div>
                </div>
                <div id="playTime">
                    <span id="presentTime">00 : 00</span>
                    <span>/</span>
                    <span id="totalTime">00 : 00</span>
                </div>
                <div id="pcontrol" class="">
                    <div><span class="iconfont icondaohang"></span></div>
                    <div class="bottom_box">
                        <button class="prev" title="上一曲" @click="上一曲()"><span class="iconfont iconshangyiqu"></span></button>
                        <button id="play" class="play1" title="播放" @click="播放暂停()">
                            <span class="iconfont iconbofang" v-if="播放切换"></span>
                            <span class="iconfont iconzanting" v-if="!播放切换"></span>
                        </button>
                        <button class="next" title="下一曲" @click="下一曲()"><span class="iconfont iconziyuan"></span></button>
                    </div>
                    <button class="stop" title="停止" @click="停止()"> <span class="iconfont icontingzhi"></span></button>
                </div>
            </div>

            <div id="playerList">
                <ul>
                    <li :class="{active:index==index_1}" v-for="(item,index_1) in 目录" @click="点击播放(index_1)">
                        <span>第{{item}}章&nbsp;&nbsp;&nbsp;</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { 有声小说内容页面 } from "@/api/有声小说.js"
import $ from "jquery";
export default {
    name: "",
    data() {
        return {
            configData: config,
            flag: true,
            index: 0,
            music: [],
            目录:[],

            timer: 0,
            timer1: 0,
            mhidid: "",
            zjid: "",//章节索引
            播放切换: true,
            obj: {},
           
            
            当前音乐索引:0,
            当前音乐:"",
        };
    },
    created() {
        this.mhidid = this.$route.query.xqmhid; //书唯一id
        this.mhidid = parseInt(this.mhidid)
        var zjiddata = this.$route.query.index //章节唯一id 也就是index
        this.index = parseInt(zjiddata)
        this.zjid = zjiddata
        this.获取所有数据函数()
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        点击播放(indexs) {
            this.index = indexs
            let audio = document.querySelector("#audio");// 获取播放音频
            audio.src = this.music[this.index];//切换下一曲
            //播放
            this.flag = true;
            this.播放暂停();
            //切换歌曲背景
            this.切换歌曲背景();
        },
        获取所有数据函数() {
            var obj = {
                id: this.mhidid
            }
            有声小说内容页面(obj).then(x => {
                console.log(x)
                if (x.data.code == 1) {
                    var objdata = x.data.data
                    this.obj = objdata

                    var jpgsurl = objdata.jpgsurl
                    var dataArry = objdata.size
                    // console.log(dataArry)


                    var 准备目录=[]
                       for (i = 1; i < dataArry+1; i++) { 
                                准备目录.push(i)
                            }
                     this.目录=准备目录
                    var list = []
                     for (i = 1; i < dataArry+1; i++) { 
                                list.push(i)
                            }
                      console.log( this.目录)
                    for (var i = 0; i < list.length; i++) {
                        list[i] = this.configData.api_url + jpgsurl + list[i]+".mp3"
                    }
                 
                    this.music = list
                } else {
                    console.log("请求数据失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },
        onClickLeft() {//头部
            history.back()
        },
        进度条() { //进度条
            let audio = document.querySelector("#audio");// 获取播放音频
            let curProgrees = document.querySelector("#curProgrees");// 获取歌曲列表
            //获取总时间
            let allTime = audio.duration;
            //设置进度条的总长度
            let allwidth = 550;
            //定义计时器
            //   clearInterval(this.timer) 
            this.timer = setInterval(function () {
                console.log('定时器111')
                //获取当前时间\
                let curTime = audio.currentTime;
                //如果当前时间大于总时间
                if (curTime >= allTime) {
                    //赋值
                    curProgrees.style.width = allwidth + "px";
                    下一曲();
                }
                //获取当前的进度width
                let curWidth = (curTime / allTime) * allwidth + "px";
                //赋值
                curProgrees.style.width = curWidth;
            }, 30);
        },
        播放暂停() {
            let audio = document.querySelector("#audio");// 获取播放音频
            let play = document.querySelector("#play");// 获取播放按钮
            audio.src = this.music[this.index];//切换下一曲
            if (this.flag) {
                audio.play();//播放
                this.播放切换 = false
                clearInterval(this.timer1) 
                clearInterval(this.timer) 
                // this.进度条();
                // this.时间();
            } else {
                audio.pause();//暂停         
                this.播放切换 = true
                play.title = "播放";
            }
            this.flag = !this.flag;//取反
        },
        时间() {
            alert(1)
            clearInterval(this.timer1) 
            //设置计时器
            this.timer1 = setInterval(function () {
                console.log('定时器')
                function sigleTime(obj, time) {
                    //获取总时间
                    let allTime = Math.floor(time);
                    let allMinute = Math.floor(allTime / 60);//得到分钟
                    if (allMinute < 10) {
                        allMinute = "0" + allMinute;
                    }
                    let allSecond = Math.floor(allTime % 60);//得到秒数
                    if (allSecond < 10) {
                        allSecond = "0" + allSecond;
                    }

                    //拼接时间
                    let allTimeStr = allMinute + " : " + allSecond;
                    obj.innerHTML = allTimeStr;
                }


                let totalTime = document.querySelector("#totalTime");// 获取歌曲列表
                let audio = document.querySelector("#audio");// 获取播放音频
                let presentTime = document.querySelector("#presentTime");// 获取歌曲列表
                //总时间
                sigleTime(totalTime, audio.duration);

                //获取当前时间
                sigleTime(presentTime, audio.currentTime);
            }, 1000)


        },
        上一曲() {
            try {
                clearInterval(this.timer)
            } catch (error) {

            }
            this.index--;
            if (this.index < 0) {
                this.index = this.music.length - 1;

            }
            let audio = document.querySelector("#audio");// 获取播放音频
            audio.src = this.music[this.index];//切换下一曲
            //播放
            this.flag = true;
            this.播放暂停();

            //切换歌曲背景
            this.切换歌曲背景();



        },
        下一曲() {
            this.index++;
            if (this.index == this.music.length) {
                console.log('已经是最后一章了')
                this.index = 0;
            }
            let audio = document.querySelector("#audio");// 获取播放音频
            audio.src = this.music[this.index];//切换下一曲
            //播放
            this.flag = true;
            this.播放暂停();
            //切换歌曲背景
            this.切换歌曲背景();


        },
        停止() {
            let audio = document.querySelector("#audio");// 获取播放音频
            audio.currentTime = 0;
            //暂停播放
            this.flag = false;
            this.播放暂停();
        },
        切换歌曲背景() { //切换歌曲背景
            //先干掉所有音乐列表的背景色
            let musicList = playerList.querySelectorAll("li");// 获取歌曲列表
          

        },

    },

    beforeDestroy() {
    clearInterval(this.timer);  
          clearInterval(this.timer1)      
    this.timer = null;
    this.timer1 = null;
}
};
</script> 

<style lang="scss" scoped>
/deep/.van-nav-bar__title{
    font-size: _vw(14);
}
#audio{
    display: block !important;
}

.title {
    background: #ec304c;
    position: fixed;
    top: _vw(0);
    left: 0px;
    width: 100%;
    height: _vw(44);
    z-index: 2;
}
.van-icon {
    color: #ffffff;
}
.van-nav-bar__title {
    color: #ffffff;
    font-size: _vw(18);

}
/deep/.van-nav-bar {
    border-bottom: 0px !important;
}
/deep/.van-hairline--bottom::after {
    border-bottom-width: 0px !important;
}

//   /deep/.van-nav-bar{
//         border-bottom:0px !important;
//     }
//      /deep/.van-hairline--bottom::after{
//         border-bottom-width: 0px !important;
//     }

button {
    border-radius: 50%;
    //  margin-right:_vw(10);
    box-sizing: border-box;
    border: none;
    background: none;
    color: #353434;
    .iconzanting {
        font-size: _vw(40);
    }
    .iconbofang {
        font-size: _vw(40);
    }
    .icontingzhi {
        font-size: _vw(20);
    }
    .iconshangyiqu,.iconziyuan{
        font-size: _vw(14);
    }
}

.有声小说 {
      position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: #ffffff;
    .active {
        color: red;
        // color:#fff;
        // background: #56506d;
    }
    #player {
        //   background: #fff;
      
        padding-top: _vw(44);
        box-sizing: border-box;
        #playerControl {
            padding-top: _vw(10);
            position: fixed;
            top: _vw(44);
            left: _vw(0);
            width: 100%;
            z-index: 2;
            background-image: url("~@/assets/img/manhua/minBanner.jpg");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            .playerImg {
                width: 50%;
                //   max-height: _vw(180);
                height: _vw(180);
                margin: 0px auto;
                // padding:_vw(5);
                box-sizing: border-box;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
            #progrees {
                width: 80%;
                height: _vw(3);
                // background: rgb(214, 213, 213);
                background: rgb(212, 37, 37);
                margin: _vw(25) auto _vw(10) auto;
            }
            #curProgrees {
                width: 0px;
                height: 100%;
                background: #0a84d4;
                position: relative;
            }
            #playTime {
                width: 80%;
                margin: 0px auto;
                display: flex;
                justify-content: flex-end;
                font-size: _vw(12);
            }
            #pcontrol {
                width: 80%;
                // background: red;
                height: _vw(50);
                margin: 0px auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                //  background: green;
                .icondaohang{
                    font-size: _vw(14);
                }
                .bottom_box {
                    width: 60%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            }
        }
        #playerList {
            padding-top: _vw(300);
            background: #fff;
            ul {
                li {
                    line-height: _vw(40);
                    padding: 0px _vw(10);
                    font-size: _vw(14);
                }
            }
        }
    }

}
</style>




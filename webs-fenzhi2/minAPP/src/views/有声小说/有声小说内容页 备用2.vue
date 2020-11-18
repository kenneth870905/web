

    <template>
  <div class="main"   >
    <!-- 头部导航开始 -->
   <div class="title_nav">
        <div class="left" @click="返回()"><van-icon name="arrow-left" class="arrow" /></div>
        <div class="title_c">{{obj.name}}</div>
         <div class="menu-show" @click="menuCtrl"><span class="iconfont icondaohang "></span></div>
    </div>
    <!-- 头部导航结束 -->
   

    <div class="bg-blur" ></div>
     <!-- :style="`background-image:url(${currentSong.album_logo})`" -->
    <div class="disc">

        <div class="song-img" :style="`background-image:url(${configData.api_url+obj.fengmian})`"  ref="rotate"></div>
    </div>
    <!-- 控件和声音开始 -->
    <div class="ctrl-box">
        <div class="left_btn">
               <div class="last" @click="last"><span class="iconfont iconshangyiqu"></span></div>
                <div class="暂停播放" @click="play"><span class="iconfont " :class="[isPlaying ? 'iconzanting':'iconbofang']"></span></div>
                <div class="next" @click="next"><span class="iconfont iconziyuan"></span></div>
        </div>
      
        <div class=" righty_btn" >
            <div @click="voiceCtrl">
                <div class="声音调节" v-if="voice!=0"> <span class="iconfont iconshengyinyinliangmianxing-"></span></div>
                <div class="声音调节" v-if="voice==0"> <span class="iconfont iconjingyin"></span></div>
            </div>
            <input class="voice" ref="voiceRange" type="range" v-model="voice" :max="100" min="0">
        </div>
    </div>
    <!-- 控件和声音结束-->


   <!-- 进度条开始 -->
    <div class="progress-bar">
        <span class="timer">{{percent | date}}</span>
        <input type="range" ref="range" v-model="percent" :max="songDuration" min="0" @click="rangeChange"/>
        <span class="timer">{{songDuration | date}}</span>
     
    </div>
   <!-- 进度条结束 -->
   <!-- 播放列表开始 -->
        
         <div class="song-list">
                <a class="song-list-item" v-for="(item,index) in songList" :class="{'c-red': songIndex === index}"
                   @click="playExistSong(index)">
                    <span class="overflow-h">第{{index+1}}章</span>
                    <!-- <label class="overflow-h">-{{item.artist_name}}</label> -->
                </a>
            </div>

            
    <!-- <div class="right-part">
        <p class="title">{{currentSong.song_name}}</p>
        <p class="artist">{{currentSong.artist_name}}</p>
        <div class="lyrics" ref="lyrics">
            <p v-for="(item,index) in currentLyrics" :class="{'pink': showPink(item,index)}">{{item.text}}</p>
        </div>
    </div> -->
   <!-- 播放列表结束 -->
  
    <audio ref="audio" :src="currentSong.listen_file" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="ended"></audio>
     <!-- 添加喜欢列表弹窗 开始-->


    <van-popup v-model="showMenu"  position="right" :style="{ height: '100%',width:'80%' }" round class="弹框">
            <div class="目录">
                <div class="title_tc">目录</div>
                <ul class="ul_">
                    <li v-for="(item,index) in songList" @click="playExistSong(item)">
                       <!-- <span class="overflow-h">{{item.song_name}}</span> -->
                       <label class="overflow-h">第{{index+1}}章</label>

                    </li>
                </ul>
            </div>
        </van-popup>


    
    <!-- <transition name="songList">
        <div class="song-list-box" v-if="showMenu">
            <div class="song-list">
                <a class="song-list-item" v-for="(item,index) in songList" :class="{'c-red': songIndex === index}"
                   @click="playExistSong(index)">
                    <span class="overflow-h">{{item.song_name}}</span>
                    <label class="overflow-h">-{{item.artist_name}}</label>
                </a>
            </div>
            <button class="song-list-hidden" @click="menuCtrl">↓</button>
        </div>
    </transition> -->
     <!-- 添加列表弹窗结束 -->
  
</div>
</template>

<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<script>
import $ from "jquery";
import { 有声小说内容页面 } from "@/api/有声小说.js"

export default {
        data() {
            return {
               
                 configData: config,
                 obj:{},
                  mhidid:"",
                  index:"",


                isPlaying: false,
                currentSong: {},
                songIndex: 0,
                percent: 0,
                songDuration: 0,
                voice: 100,
                keyDowm: false,
                currentRowIndex: 0,
                showTip: false,
                showSearch: false,
                showMenu: false,

                tipText: 'o(>﹏<)o~无法获取歌曲信息',
                songList:[{}],
                // songList: [{
                    // song_name: 'aLIEz',
                    // artist_name: '第一章',
                    // album_logo: 'http://pic.xiami.net/images/album/img31/59831/7064167921410329023_1.jpg',
                    // listen_file: '',
                    // lyric: null
                // }],
                 
            }
        },
        methods: {
             返回() {
            history.back()
             },
            ready(event) {
                this.songDuration = event.target.duration || '0';
            },
            // showPink(item, index){
            //     let last = item.time, next = this.currentLyrics[index + 1] ? this.currentLyrics[index + 1].time : 999999;
            //     if (this.percent >= last && this.percent < next) {
            //         this.currentRowIndex = index;
            //         return true;
            //     }
            // },
            openSearch(){
                this.showSearch = !this.showSearch;
            },
            menuCtrl(){
                this.showMenu = !this.showMenu;
            },
            playExistSong(index){
                this.songIndex = index;
                this.currentSong = this.songList[index];
                this.isPlaying = false;
                this.percent = 0;
                this.$nextTick(() => {
                    this.play();
                })
            },
            // deleteSong(index){
            //     this.songList.splice(index, 1);
            // },
            alreadyExist(item){
                for (let i in this.songList) {
                    if (this.songList[i].song_id === item.song_id) {
                        return i;
                    }
                }
                return false;
            },
            playSong(item){
                let temp = this.alreadyExist(item);
                if (temp === false) {
                    this.songList.splice(this.songIndex + 1, 0, item);
                    console.log(this.songList);
                    this.next();
                } else {
                    this.playExistSong(temp);
                }
            },
            // pushNewSong(item){
            //     let temp = this.alreadyExist(item);
            //     if (temp === false) {
            //         this.songList.push(item);
            //     } else {
            //         this.openTip('此歌曲已存在~');
            //     }
            // },
            error() {
                this.openTip();
                this.$refs.rotate.style.animationPlayState = 'paused';
            },
            openTip(value){
                this.tipText = value || 'o(>﹏<)o~无法获取歌曲信息';
                this.showTip = true;
                setTimeout(() => {
                    this.showTip = false;
                }, 2000);
            },
            updateTime(event) {
                this.songDuration = event.target.duration;
                this.percent = event.target.currentTime;
            },
            ended() {
                this.isPlaying = false;
                this.songIndex++;
                if (this.songList.length === this.songIndex) this.songIndex = 0;
                this.currentSong = this.songList[this.songIndex];
                this.$nextTick(() => {
                    this.play();
                })
            },
            play() {
                const audio = this.$refs.audio;
                if (this.isPlaying) {
                    this.$refs.rotate.style.animationPlayState = 'paused';
                    audio.pause();
                    this.isPlaying = false;
                } else {
                    audio.play();
                    this.$refs.rotate.style.animationPlayState = 'running';
                    this.isPlaying = true;
                }
            },
            next() {
                if (this.songIndex === this.songList.length - 1) this.songIndex = -1;
                this.songIndex++;
                this.currentSong = this.songList[this.songIndex];
                this.isPlaying = false;
                this.percent = 0;
                this.$nextTick(() => {
                    this.play();
                })
            },
            last() {
                if (this.songIndex === 0) this.songIndex = this.songList.length;
                this.songIndex--;
                this.percent = 0;
                this.currentSong = this.songList[this.songIndex];
                this.isPlaying = false;
                this.$nextTick(() => {
                    this.play();
                })
            },
            rangeChange() {
                this.$refs.audio.currentTime = this.percent;
            },
            voiceCtrl(){
                this.voice == 0 ? this.voice = 100 : this.voice = 0;
            },
            // getLyric(url){
            //     let self = this;
            //     if (!url) {
            //         self.currentLyrics = [{time: 0, text: '此歌曲暂无歌词~'}];
            //         return;
            //     }
            //     ;
            //     $.ajax({
            //         type: 'GET',
            //         dataType: 'text',
            //         url: `http://localhost:3000/lyric?url=${url}`,
            //         success: function(data) {
            //             console.log(data);
            //             self.refactoringLyrics(data);
            //         },
            //         error: function() {
            //             self.currentLyrics = [{time: 0, text: '此歌曲暂无歌词~'}];
            //         }
            //     })
            // },
            // refactoringLyrics(lyric){
            //     let text = lyric.split('[offset:0]')[1];
            //     let textArr = text.split('\n');
            //     let lyricsArr = [], translate = [];
            //     textArr.forEach((item, index) => {
            //         let time = 0, text = '';
            //         if (item.indexOf('[x-trans]') > -1) {
            //             translate.push(item.split('[x-trans]')[1])
            //         } else if (item.trim() != '') {
            //             time = item.slice(1, 6).split(':');
            //             time = parseInt(time[0]) * 60 + parseInt(time[1]);
            //             text = item.slice(11);
            //             let arr = text.split('>');
            //             let str = arr.reduce((a, b) => {
            //                 return a.split('<')[0] + b.split('<')[0]
            //             });
            //             let obj = {
            //                 time: time,
            //                 text: str
            //             };
            //             lyricsArr.push(obj);
            //         }
            //     });
            //     for (let i in translate) {
            //         lyricsArr[i].text = lyricsArr[i].text + '\n' + translate[i];
            //     }
            //     this.currentLyrics = lyricsArr;
            // },
            // changeColor(){
            //     let self = this;
            //     let colorArr = [];
            //     this.$refs.songImg.onload = function() {
            //         // todo 根据背景图片改变按钮颜色
            //         colorArr = colorThief.getPalette(self.$refs.songImg) || [];
            //         self.countColor(colorArr);
            //     }
            // },
            // countColor(colorArr){
            //     let tampColorArr = [];
            //     colorArr.forEach((item) => {
            //         for (let i in item) {
            //             tampColorArr.push(255 - item[i])
            //         }
            //     });
            //     let finalColor = parseInt(tampColorArr.reduce((a, b) => {
            //             return a + b
            //         }) / colorArr.length / 3);

            //     let play = document.getElementsByClassName('play')[0];
            //     if (parseInt(255 / finalColor) > 2) {
                  
            //     }
            // },

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
                    var dataArry = objdata.size //值为4 就代表一共有4章  


                    var 准备目录=[]
                       for (let i = 1; i < dataArry+1; i++) { 
                                准备目录.push(i)
                            }
                     this.目录=准备目录
                    var list = []
                     for ( let i = 1; i < dataArry+1; i++) { 
                                list.push(i)
                            }
                      console.log( this.目录)
                    for (let i = 0; i < list.length; i++) {  
                        // list[i] = this.configData.api_url + jpgsurl + list[i]+".mp3"
                        list[i] = "http://67.229.173.202:9000"+ jpgsurl + list[i]+".mp3"

                        
                    }
                       console.log(list)
                         for (let k = 0; k < list.length; k++) {
                             console.log(list[k])
                            this.songList.push({
                                listen_file:list[k]
                            })
                        }
                       console.log( this.songList)

                         this.songList.shift()
                       console.log(this.songList)


                      
                 

                } else {
                    console.log("请求数据失败")
                }
            }).catch(err => {
                console.log(err)
            })
        },



        },
        created() {

         this.mhidid = this.$route.query.xqmhid; //书唯一id
         this.mhidid = parseInt(this.mhidid)
         var zjiddata = this.$route.query.index //章节唯一id 也就是index
         this.index = parseInt(zjiddata)
         this.获取所有数据函数()  

            // let tempArr = JSON.parse(localStorage.getItem('songList'));
            // console.log(tempArr);
            // if (tempArr && tempArr.length > 0) {
            //     this.songList = tempArr;
            // }
            this.currentSong = this.songList[this.songIndex];
        },
        mounted() {
            this.$refs.voiceRange.style.background = `linear-gradient(to right, #eb7470, #eb7470 ${this.voice}%, white ${this.voice}%, white)`;
            this.$refs.range.style.background = `linear-gradient(to right, #eb7470, #eb7470 ${(this.percent / this.songDuration) * 100}%, white ${(this.percent / this.songDuration) * 100}%, white)`;
            this.$nextTick(() => {
            })
        },
        filters: {
            date(value) {
                if (!value)return '00:00';
                let min, sed;
                parseInt(value / 60) > 9 ? min = parseInt(value / 60) : min = '0' + parseInt(value / 60);
                (value % 60).toFixed(0) > 9 ? sed = (value % 60).toFixed(0) : sed = '0' + (value % 60).toFixed(0);
                return `${min}:${sed}`;
            }
        },
        watch: {
            percent() {
                this.$refs.range.style.background = `linear-gradient(to right, #eb7470, #eb7470 ${(this.percent / this.songDuration) * 100}%, white ${(this.percent / this.songDuration) * 100}%, white)`;
            },
            currentRowIndex() {
                console.log(this.$refs.lyrics.scrollHeight);
                this.$refs.lyrics.scrollTop = this.currentRowIndex * (this.$refs.lyrics.scrollHeight / this.currentLyrics.length);
            },
            voice() {
                this.$refs.audio.volume = this.voice / 100;
                this.$refs.voiceRange.style.background = `linear-gradient(to right, #eb7470, #eb7470 ${this.voice}%, white ${this.voice}%, white)`;
            },
            currentSong: {
                handler() {
                    this.percent = 0;
                    // console.log(this.currentSong);
                    // this.getLyric(this.currentSong.lyric);

                    // document.title = `${this.currentSong.song_name}-${this.currentSong.artist_name}`;
                },
                deep: true
            },
            // songList: {
            //     // handler() {
            //     //     localStorage.setItem('songList', JSON.stringify(this.songList));
            //     // },
            //     deep: true
            // }
        }
        }
</script>

    <style lang="scss" scoped>


        input, button {
            outline: none;
        }

        .main {
            position:absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            overflow-x:auto;
            color: #fff;
            background-image:url('~@/assets/img/manhua/minBanner.jpg');
            background-repeat:no-repeat;
            background-size: 100% 100% ;
            // background-color: rgba(0, 0, 0, .8);

          //    导航样式
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
                // background: linear-gradient(135deg,#ec304c 0%, #cb1c36 100%) !important;
                line-height: _vw(44);
                font-size: _vw(20);
                z-index: 2;
                .menu-show {
                      padding-right: _vw(10);
                    .iconfont{
                       font-size: _vw(20);
                       color:#ffffff;
                    }
                }
                .arrow{
                    color:#ffffff !important;
                 }
                }
          //    导航样式

        }

        .bg-blur {
            position: absolute;
            top: 0px;
            left: 0px;
          
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            filter: blur(20px);
            z-index: -1;
        }

        .open-search {
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 18px;
            background-color: transparent;
            border: none;
            color: #fff;
            outline: none;
        }

        .disc {
            // position: relative;
            // margin-top: 10%;
            // margin-left: 10%;
            margin:0px auto;
            margin-top:_vw(60);
            width:_vw(200);
            height:_vw(200);
            border-radius:_vw(200);
            transform: rotate(45deg);
            background-image: radial-gradient(5em 30em ellipse, #fff, #000);
            border: 2px solid #131313;
            box-shadow: 0 0 0 10px #343935;
            opacity: 0.7;
        }

        .song-img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform-origin: center center;
            transform: translate(-50%, -50%) rotate(0deg);
            width: _vw(160);
            height: _vw(160);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            border: 2px solid #000;
            border-radius: _vw(160);
            animation: animations1 10s linear infinite forwards;
            animation-play-state: paused;
        }

        @keyframes animations1 {
            0% {
                transform: translate(-50%, -50%) rotate(0deg);
            }
            50% {
                transform: translate(-50%, -50%) rotate(180deg);
            }
            100% {
                transform: translate(-50%, -50%) rotate(360deg);
            }
        }

        // .right-part {
        //     width: 100%;
        //     overflow: hidden;
        // }

        // .title {
        //     margin: 50px 0 0 30px;
        //     font-size: 30px;
        // }

        // .artist {
        //     margin: 0 30px;
        //     font-size: 16px;
        //     line-height: 50px;
        //     border-bottom: 1px solid #fff;
        // }

        // .lyrics {
        //     margin-top: 20px;
        //     padding-right: 25px;
        //     width: 100%;
        //     height: 400px;
        //     line-height: 35px;
        //     overflow-y: scroll;
        //     color: #fff;
        //     white-space: pre-line;
        //     text-align: center;
        // }

        // .lyrics::-webkit-scrollbar {
        //     display: none;
        // }

        // .pink {
        //     color: #eb7470;
        // }

        .ctrl-box {
             margin-top:_vw(20);
            vertical-align: middle;
            background-color: rgba(0, 0, 0, .3);
            // background: #ff6e87;
            border-radius: 10px;
            width: 80%;
            padding:_vw(10) 0px;
            margin: _vw(20)  auto _vw(20)  auto;
            .left_btn{
               display: flex;
               justify-content:space-between;
               width: 60%;
               margin:0px auto;
               line-height: _vw(30);
               .暂停播放{
                   .iconfont{
                   font-size: _vw(30);
                     
                   }
               }
            }

         .righty_btn{
             margin-top:_vw(20);
             display:flex;
            //  justify-content:space-between;
             align-items: center;
               width: 60%;
               margin:0px auto;
            //    background:chartreuse;
               margin-top:_vw(10);
             
             
         }



        }

        .play {
            margin: 0 20px;
            position: relative;
            display: inline-block;
            height: 36px;
            width: 36px;
            border: 2px solid #fff;
            border-radius: 40px;
            -webkit-border-radius: 40px;
            -moz-border-radius: 40px;
            background-color: transparent;
        }

        .black-play {
            border-color: #000 !important;
        }

        .black-play:after, .black-play:before {
            border-left-color: #000 !important;
        }

        .play:before {
            content: '';
            height: 0;
            width: 0;
            display: block;
            border: 10px transparent solid;
            border-right-width: 0;
            border-left-color: #fff;
            position: absolute;
            top: 8px;
            left: 15px;
        }

        .pause {
            margin: 0 20px;
            position: relative;
            display: inline-block;
            height: 36px;
            width: 36px;
            border: 2px solid #fff;
            border-radius: 20px;
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
        }

        .black-pause {
            border-color: #000 !important;
        }

        .black-pause:after.black-pause:before {
            background: #000 !important;
        }

        .pause:before, .pause:after {
            content: '';
            height: 20px;
            width: 4px;
            display: block;
            background: #fff;
            position: absolute;
            top: 8px;
            left: 12px;
        }

        .pause:after {
            left: 20px;
        }

        .last {
            .iconfont{
                font-size: _vw(16);
            }
            // position: relative;
            // display: inline-block;
            // height: _vw(30);
            // width: _vw(30);
            // border: 2px solid #fff;
            // border-radius: _vw(18);
            // -webkit-border-radius:_vw(18);
            // -moz-border-radius:_vw(18);
        }

        .black-last {
            border-color: #000 !important;
        }

        .black-last:after {
            border-left-color: #000;
        }

        .black-last:before {
            background: #000;
        }

        // .last:before {
        //     content: '';
        //     height: 0;
        //     width: 0;
        //     display: block;
        //     border: 10px transparent solid;
        //     border-left-width: 0;
        //     border-right-color: #fff;
        //     position: absolute;
        //     top: 8px;
        //     left: 16px;
        // }

        // .last:after {
        //     content: '';
        //     height: 20px;
        //     width: 4px;
        //     display: block;
        //     background: #fff;
        //     position: absolute;
        //     top: 8px;
        //     left: 10px;
        // }

        .next {
            // position: relative;
            // display: inline-block;
            // height: 36px;
            // width: 36px;
            // border: 2px solid #fff;
            // border-radius: 20px;
            // -webkit-border-radius: 20px;
            // -moz-border-radius: 20px;
           .iconfont{
                font-size: _vw(16);
            }
        }

        .black-next {
            border-color: #000 !important;
        }

        .black-next:before {
            border-right-color: #000 !important;
        }

        .black-next:after {
            background: #000 !important;
        }

        // .next:before {
        //     content: '';
        //     height: 0;
        //     width: 0;
        //     display: block;
        //     border: 10px transparent solid;
        //     border-right-width: 0;
        //     border-left-color: #fff;
        //     position: absolute;
        //     top: 8px;
        //     left: 10px;
        // }

        // .next:after {
        //     content: '';
        //     height: 20px;
        //     width: 4px;
        //     display: block;
        //     background: #fff;
        //     position: absolute;
        //     top: 8px;
        //     left: 22px;
        // }
      

        // .voice-icon-oh {
        //     position: absolute;
        //     height: 10px;
        //     width: 10px;
        //     display: block;
        //     left: 0;
        //     top: 50%;
        //     transform: translateY(-50%);
        // }

        // .voice-icon-oh:before {
        //     content: '';
        //     height: 8px;
        //     width: 6px;
        //     display: block;
        //     background: #fff;
        // // }

        // .voice-icon-oh:after {
        //     content: '';
        //     height: 8px;
        //     width: 0;
        //     display: block;
        //     border: 5px transparent solid;
        //     border-left-width: 0;
        //     border-right-color: #fff;
        //     position: absolute;
        //     top: 50%;
        //     transform: translateY(-50%);
        //     left: 6px;
        // }

        .声音调节 {
            .iconfont{
             color:#ffffff;
              font-size: _vw(14);
            }
            // position: absolute;
            // top: 50%;
            // transform: translateY(-50%);
            // left: 2px;
        }
        //   .voice-icon-cv {
        //        .iconfont{
        //        color:#ffffff;
        //        font-size: _vw(30);
        //     }
            // position: absolute;
            // top: 50%;
            // left: -6px;
            // transform: translateY(-50%);
        // }
        // .voice-icon-ov:before {
        //     content: '';
        //     height: 19px;
        //     width: 15px;
        //     display: block;
        //     border: 2px solid transparent;
        //     border-right: 2px solid #FFF;
        //     border-radius: 20px;
        //     -webkit-border-radius: 20px;
        //     -moz-border-radius: 20px;
        // }

        // .voice-icon-ov:after {
        //     content: '';
        //     height: 15px;
        //     width: 15px;
        //     display: block;
        //     border: 2px solid transparent;
        //     border-right: 2px solid #FFF;
        //     border-radius: 15px;
        //     -webkit-border-radius: 15px;
        //     -moz-border-radius: 15px;
        //     position: absolute;
        //     top: 2px;
        //     left: -4px;
        // }

 

        // .voice-icon-cv:before {
        //     content: '';
        //     height: 22px;
        //     width: 22px;
        //     display: block;
        //     border: 2px solid #fff;
        //     border-radius: 22px;
        // }

        // .voice-icon-cv:after {
        //     content: '';
        //     height: 25px;
        //     width: 2px;
        //     display: block;
        //     background: #fff;
        //     position: absolute;
        //     top: 0;
        //     left: 12px;
        //     transform: rotate(45deg);
        // }

        .voice {
            // float: right;
            // margin: 16px 20px 0 0 ;
            width: 70% !important;
            margin-left: _vw(10);
        }

        .progress-bar {
            // position: fixed;
            // bottom: 20px;
            // left: 20px;
            width: 90%;
            margin:0px auto;
            display: flex;
            align-items: center;
        }

        .timer {
            vertical-align: sub;
            font-size: _vw(14);
        }

        input[type=range] {
            -webkit-appearance: none;
            width: 80%;
            height: _vw(8);
            border-radius: _vw(6);
            background-color: #fff;
        }

        /*input[type=range]::-moz-range-progress {*/
        /*height: 0;*/
        /*}*/
        // input[type=range]::-webkit-slider-thumb, input[type=range]::-moz-range-thumb {
        //     -webkit-appearance: none;
        // }

        // input[type=range]::-webkit-slider-runnable-track {
        //     height: 8px;
        //     border-radius: 20px;
        // }

        // input[type=range]::-moz-range-track {
        //     height: 8px;
        //     border-radius: 20px;
        //     background-color: transparent;
        // }

        // input[type=range]:focus {
        //     outline: none;
        // }

        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            margin-top: -3px;
            height: _vw(10);
            width:  _vw(10);;
            background: #eb7470;
            border-radius: 50%;
            border: solid _vw(3) #fff;
            box-shadow: 0 0 0 _vw(3) rgba(255, 255, 255, 0.5);
        }

        // input[type=range]::-moz-range-thumb {
        //     -webkit-appearance: none;
        //     margin-top: -3px;
        //     height: 10px;
        //     width: 10px;
        //     background: #eb7470;
        //     border-radius: 50%;
        //     border: solid 3px #fff;
        //     box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
        // }

   

        // .song-list-box {
        //     position: absolute;
        //     bottom: 0;
        //     right: 0;
        //     width: 40%;
        //     height: 70%;
        //     background-color: #000;
        //     overflow: hidden;
        //     /*opacity: .8;*/
        // }

        .song-list {
            // padding-right: 15px;
            // height: 90%;
            width: 96%;
            margin:0px auto;
            overflow-y: scroll;
            // border: 1px solid #fff;
            padding-top:_vw(10)
        }

        // .song-list::-webkit-scrollbar {
        //     display: none;
        // }
     
        .song-list-item {
            display: block;
            line-height: 35px;
            color: #fff;
           width: 100%;

        } 

        .c-red {
            color: #ec0b30 !important;
            font-size: 20;
            background: #7d89b4;
            border-radius: _vw(6);
        }

        .song-list-item > span {
            display: inline-flex;
            display: -webkit-inline-flex;
            display: -ms-inline-box;
            display: -moz-inline-box;
            align-items: center;
            padding-left: 10px;
            max-width: 50%;
            font-size: 18px;
        }

        .song-list-item > label {
            font-size: 12px;
            max-width: 30%;
        }

        .song-list-item > button {
            float: right;
            width: 35px;
            height: 35px;
            line-height: 35px;
            font-size: 20px;
            border: none;
            color: #DCDCDC;
            background-color: transparent;
        }

        .song-list-hidden {
            position: absolute;
            left: 0;
            bottom: 10px;
            width: 100%;
            border: none;
            background-color: transparent;
            color: #fff;
            font-size: 20px;
        }

        .songList-leave-active, .songList-enter-active {
            transition: all .5s ease;
        }

        .songList-enter, .songList-leave-to {
            transform: translateY(50%);
            opacity: 0;
        }

        /*tip style*/
        // .com-tip {
        //     position: fixed;
        //     top: 50%;
        //     left: 50%;
        //     padding: 0 30px;
        //     margin-top: 0;
        //     transform: translate(-50%, -50%);
        //     background: rgba(55, 55, 55, .3);
        //     border-radius: 5px;
        //     color: #fff;
        //     font-size: 15px;
        //     line-height: 25px;
        //     z-index: 99;
        // }

        .tip-enter-active {
            transition: all .3s ease;
        }

        .tip-leave-active {
            transition: all .8s ease;
        }

        .tip-enter, .tip-leave-to {
            margin-top: 30px;
            opacity: 0;
        }

        /*search-box style*/
        .search-main {
            position: fixed;
            top: 0;
            width: 50%;
            height: 100%;
            background-color: #000;
            opacity: .8;
            overflow: hidden;
        }

        .search-input {
            margin: 20px;
            padding-left: 10px;
            width: 70%;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            border: 1px solid #000;
            border-radius: 25px;
            outline: none;
        }

        .search-btn {
            margin: 20px 0;
            border: 1px solid #999;
            background-color: pink;
            line-height: 30px;
            font-size: 18px;
            color: #000;
            border-radius: 5px;
        }

        .result-list {
            margin: 10px auto;
            width: 90%;
            height: 550px;
            overflow-y: scroll;
            list-style: none;
            padding-right: 25px;
        }

        .result-list::-webkit-scrollbar {
            display: none;
        }

        .item {
            height: 35px;
            border-bottom: 1px solid #999;
            color: #fff;
        }

        .overflow-h {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .song-name {
            display: inline-block;
            width: 30%;
            word-spacing: inherit;
        }

        .singer {
            display: inline-block;
            width: 20%;
            word-spacing: inherit;
        }

        .album {
            display: inline-block;
            width: 20%;
            word-spacing: inherit;
        }

        .add-song, .play-song {
            padding: 0 10px;
            border: 1px solid #000;
            background-color: yellow;
            border-radius: 5px;
            line-height: 30px;
        }

        .search-close {
            position: absolute;
            bottom: 0;
            right: 10px;
            font-size: 25px;
            color: #fff;
            background-color: transparent;
            border: none;
        }

        .search-enter-active, .search-leave-active {
            transition: all .5s ease;
        }

        .search-enter, .search-leave-to {
            transform: translateX(-70%);
            opacity: 0;
        }
    </style>
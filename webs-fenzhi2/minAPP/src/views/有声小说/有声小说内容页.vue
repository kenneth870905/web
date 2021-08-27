

    <template>
    <div class="main">
     <div class="固定定位">
        <!-- 头部导航开始 -->
        <div class="title_nav">
            <div class="left" @click="返回()">
                <van-icon name="arrow-left" class="arrow" />
            </div>
            <div class="title_c">{{obj.name}}</div>
            <div class="menu-show" @click="menuCtrl"><span class="iconfont icondaohang "></span></div>
        </div>
        <!-- 头部导航结束 -->
  
        <div class="disc">
            <div class="song-img" :style="`background-image:url(${configData.api_url+obj.fengmian})`" ref="rotate"></div>
        </div>
        <!-- 控件和声音开始 -->
        <div class="ctrl-box">
            <div class="left_btn">
                <div class="last" @click="last"><span class="iconfont iconshangyiqu"></span></div>
                <div class="暂停播放" @click="play"><span class="iconfont " :class="[isPlaying ? 'iconzanting':'iconbofang']"></span></div>
                <div class="next" @click="next"><span class="iconfont iconziyuan"></span></div>
            </div>

            <div class=" righty_btn">
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
            <input type="range" ref="range" v-model="percent" :max="songDuration" min="0" @click="rangeChange" />
            <span class="timer">{{songDuration | date}}</span>
        </div>
        <!-- 进度条结束 -->
          </div>
             <!-- 播放列表开始 -->
        <div class="song-list">
            <a class="song-list-item" v-for="(item,index) in songList" :class="{'c-red': songIndex == index }" @click="playExistSong(index)">
                <span class="overflow-h">{{obj.name}} &nbsp;第{{index+1}}章</span>
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

        <audio ref="audio" :src="currentSong.listen_file" @play="ready" @error="error" @timeupdate="updateTime" @ended="ended"></audio>
        <!-- 添加喜欢列表弹窗 开始-->

        <van-popup v-model="showMenu" position="right" :style="{ height: '100%',width:'80%' }" round class="弹框">
            <div class="目录">
                <div class="title_tc">目录</div>
                <ul class="ul_">
                    <li v-for="(item,index) in songList"  :class="{'men_active': songIndex == index }"   @click="playExistSong(index)">
                        <label class="overflow-h">第{{index +1 }}章</label>
                    </li>
                </ul>
            </div>
        </van-popup>
        <!-- 添加列表弹窗结束 -->

    </div>
</template>

<script>
import $ from "jquery";
import { 有声小说内容页面 } from "@/api/有声小说.js"
export default {
    data() {
        return {

            configData: config,
            obj: {},
            mhidid: "",
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
            songList: [],
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
        showPink(item, index) {
            let last = item.time, next = this.currentLyrics[index + 1] ? this.currentLyrics[index + 1].time : 999999;
            if (this.percent >= last && this.percent < next) {
                this.currentRowIndex = index;
                return true;
            }
        },
        openSearch() {
            this.showSearch = !this.showSearch;
        },
        menuCtrl() {
            this.showMenu = !this.showMenu;
        },
        playExistSong(index) {
            this.songIndex = index;
            this.currentSong = this.songList[index];
            this.isPlaying = false;
            this.percent = 0;
            this.$nextTick(() => {
                this.play();
            })
        },
     
        alreadyExist(item) {
            for (let i in this.songList) {
                if (this.songList[i].song_id === item.song_id) {
                    return i;
                }
            }
            return false;
        },
        playSong(item) {
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
        openTip(value) {
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
            console.log(audio)
            if (this.isPlaying) {
                 console.log("真")
                this.$refs.rotate.style.animationPlayState = 'paused';
                audio.pause();
                this.isPlaying = false;
            } else {
                 console.log("假")

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
        voiceCtrl() {
            this.voice == 0 ? this.voice = 100 : this.voice = 0;
        },
        changeColor() {
            let self = this;
            let colorArr = [];
            this.$refs.songImg.onload = function () {
                // todo 根据背景图片改变按钮颜色
                colorArr = colorThief.getPalette(self.$refs.songImg) || [];
                self.countColor(colorArr);
            }
        },
        countColor(colorArr) {
            let tampColorArr = [];
            colorArr.forEach((item) => {
                for (let i in item) {
                    tampColorArr.push(255 - item[i])
                }
            });
            let finalColor = parseInt(tampColorArr.reduce((a, b) => {
                return a + b
            }) / colorArr.length / 3);

            let play = document.getElementsByClassName('play')[0];
            if (parseInt(255 / finalColor) > 2) {

            }
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
                    var dataArry = objdata.size //值为4 就代表一共有4章  


                    var 准备目录 = []
                    for (let i = 1; i < dataArry + 1; i++) {
                        准备目录.push(i)
                    }
                    this.目录 = 准备目录
                    var list = []
                    for (let i = 1; i < dataArry + 1; i++) {
                        list.push(i)
                    }
                    console.log(this.目录)
                    for (let i = 0; i < list.length; i++) {
                        list[i] = 'http://67.229.173.202:9000' + jpgsurl + list[i]+".mp3"
                        // list[i] = this.configData.api_url + jpgsurl + list[i]+".mp3"

                    }
                    console.log(list)
                    console.log(this.songList)
                    for (let k = 0; k < list.length; k++) {
                        console.log(list[k])
                        this.songList.push({
                            listen_file: list[k]
                        })
                    }
                    this.currentSong=this.songList[this.songIndex]

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
        this.songIndex = parseInt(zjiddata)
        this.获取所有数据函数()

    },
    mounted() {

        this.$refs.voiceRange.style.background = `linear-gradient(to right, #eb7470, #eb7470 ${this.voice}%, white ${this.voice}%, white)`;
        this.$refs.range.style.background = `linear-gradient(to right, #eb7470, #eb7470 ${(this.percent / this.songDuration) * 100}%, white ${(this.percent / this.songDuration) * 100}%, white)`;
        this.$nextTick(() => {

        })
    },
    filters: {
        date(value) {
            if (!value) return '00:00';
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
                console.log(this.currentSong);

                // document.title = `${this.currentSong.song_name}-${this.currentSong.artist_name}`; 
                document.title = obj.name;
            },
            deep: true
        },
        songList: {
            handler() {
                localStorage.setItem('songList', JSON.stringify(this.songList));
            },
            deep: true
        }
    }
}
</script>

    <style lang="scss" scoped>
 .固定定位{
     position:fixed;
     width: 100%;
     left: 0px;
     z-index: 30;
     background-image: url("~@/assets/img/manhua/minBanner.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-bottom: _vw(10);
 }
    .弹框 {

        .目录 {
            padding: _vw(0) _vw(0) _vw(10) _vw(10);
            .title_tc {
                position: fixed;
                left: 0;
                top: 0px;
                z-index: 20;
                width: 100%;
                height: _vw(44);
                text-align: center;
                border-bottom: 1px solid red;
                line-height: _vw(44);
                color: red;
            }
            .ul_ {
                padding-left: _vw(10);
                padding-top: _vw(44);
                .men_active{
                    color:red;
                }
                li {
                    font-size: _vw(14);
                    border-bottom: _vw(1) solid #aaa7a7;
                    line-height: _vw(38);
                    font-size: _vw(14);
                    color:#726e6e;
                }
            }
        }
    }
input,
button {
    outline: none;
}
.main {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    color: #fff;
    background: #ffffff;
   
    //    导航样式
    .title_nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: _vw(44);
        color: #fff;
        line-height: _vw(44);
        font-size: _vw(20);
        z-index: 2;
        .menu-show {
            padding-right: _vw(10);
            .iconfont {
                font-size: _vw(20);
                color: #ffffff;
            }
        }
        .arrow {
            color: #ffffff !important;
        }
    }
    //    导航样式
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
    margin: 0px auto;
    margin-top: _vw(10);
    width: _vw(200);
    height: _vw(200);
    border-radius: _vw(200);
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
.ctrl-box {
    vertical-align: middle;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: _vw(10);
    width: 80%;
    padding: _vw(10) 0px;
    margin: _vw(20) auto _vw(10) auto;
    .left_btn {
        display: flex;
        justify-content: space-between;
        width: 60%;
        margin: 0px auto;
        line-height: _vw(30);
        .暂停播放 {
            .iconfont {
                font-size: _vw(30);
            }
        }
    }

    .righty_btn {
        margin-top: _vw(20);
        display: flex;
        align-items: center;
        width: 60%;
        margin: 0px auto;
        margin-top: _vw(10);
    }
}


.last {
    .iconfont {
        font-size: _vw(16);
    }

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


.next {
  
    .iconfont {
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

.声音调节 {
    .iconfont {
        color: #ffffff;
        font-size: _vw(14);
    }
}



.voice {
    width: 100% !important;
    margin-left: _vw(10);
}

.progress-bar {

    width: 90%;
    margin: 0px auto;
    display: flex;
    align-items: center;
}

.timer {
    vertical-align: sub;
    font-size: _vw(14);
}

input[type="range"] {
    -webkit-appearance: none;
    width: 80%;
    height: _vw(8);
    border-radius: _vw(6);
    background-color: #fff;
}


input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -3px;
    height: _vw(10);
    width: _vw(10);
    background: #eb7470;
    border-radius: 50%;
    border: solid _vw(3) #fff;
    box-shadow: 0 0 0 _vw(3) rgba(255, 255, 255, 0.5);
}

.song-list {
    width: 100%;
    margin: 0px auto;
    overflow-y: scroll;
    padding-top: _vw(410);
    background: #ffffff;
}


.song-list-item {
    display: block;
    line-height: 35px;
    color: #5c5b5b;
    width: 90%;
    margin:0px auto;
    border-bottom: 1px solid #cfcece;
}

.c-red {
    color: #ec0b30 !important;
    font-size: 20;

}




</style>
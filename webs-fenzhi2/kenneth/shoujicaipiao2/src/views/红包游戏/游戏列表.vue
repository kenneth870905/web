<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">趣味游戏</h1>
            <button @click="$router.push('/hbOrderList')" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">记录</button>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <div class="img_1">
                    <img :src="config.img_url+'static/image/hbgame/bg.jpg'" @click="tishi()">
                </div>
                <div class="img_list">
                    <div @click="g1(0)">
                        <img :src="config.img_url+'static/image/hbgame/bg4.png'" alt="">
                    </div>
                    <div @click="g1(1)">
                        <img :src="config.img_url+'static/image/hbgame/bg3.png'" alt="">
                    </div>
                </div>
            </div>

            <div class="box_2">
                <div class="img_2">
                    <img :src="config.img_url+'static/image/hbgame/bg1.jpg'" @click="$router.push('/guaguale/buy')">
                </div>
            </div>

            
            <!-- <ul class="type_1" :class="`index${active}`">
                <li :class="{active:active==0}" @click="active=0">
                    <div><img :src="config.img_url+'static/image/hbgame/22.gif'" alt="" srcset=""></div>
                    <div>扫雷游戏</div>
                </li>
                <li :class="{active:active==1}" @click="active=1">
                    <div><img :src="config.img_url+'static/image/hbgame/jinqiang.png'" alt="" srcset=""></div>
                    <div>禁抢游戏</div>
                </li>
                <li :class="{active:active==2}" @click="active=2">
                    <div><img :src="config.img_url+'static/image/hbgame/niuniu.png'" alt="" srcset=""></div>
                    <div>牛牛游戏</div>
                </li>
            </ul> -->
            <!-- 扫雷红包 -->
            <!-- <ul class="mui-table-view list1" v-show="active==0">
				<li class="mui-table-view-cell" v-for="(item, index) in roomList" :key="index" @click="$router.push(`/hbGame/room?id=${item.Id}&name=${item.Name}&type=${item.Type}`)">
                    <div class="img_1"><img :src="config.img_url+'static/image/hbgame/33.gif'" alt="" srcset=""></div>
                    <div class="text_1">
                        <div class="title_1">{{item.Name}}</div>
                        <div class="title_2">
                            {{item.Title}}
                        </div>
                    </div>
				</li>
            </ul> -->
            <!-- 禁抢红包 -->
            <!-- <ul class="mui-table-view list1"  v-show="active==1">
				<li class="mui-table-view-cell" v-for="(item, index) in roomList2" :key="index" @click="$router.push(`/hbGame/room?id=${item.Id}&name=${item.Name}&type=${item.Type}`)">
                    <div class="img_1"><img :src="config.img_url+'static/image/hbgame/jinqiang.png'" alt="" srcset=""></div>
                    <div class="text_1">
                        <div class="title_1">{{item.Name}}</div>
                        <div class="title_2">
                            {{item.Title}}
                        </div>
                    </div>
				</li>
            </ul> -->
            <!-- 牛牛红包 -->
            <!-- <ul class="mui-table-view list1"  v-show="active==2">
				<li class="mui-table-view-cell" v-for="(item, index) in roomList3" :key="index" @click="$router.push(`/hbGame/room?id=${item.Id}&name=${item.Name}&type=${item.Type}`)">
                    <div class="img_1"><img :src="`${config.img_url}static/image/hbgame/niuniu2.gif`" alt="" srcset=""></div>
                    <div class="text_1">
                        <div class="title_1">{{item.Name}}</div>
                        <div class="title_2">
                            {{item.Title}}
                        </div>
                    </div>
				</li>
            </ul> -->


        </div>
    </div>
</template>

<script>
import { api_获取游戏房间 , api_禁抢房间} from "@/api/红包游戏.js";
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            active:0,
            roomList:[],
            roomList2:[],
            roomList3:[]
        }
    },
    computed: {
        ...mapState({
            config:'config',
            userinfo:x=>x.user.userinfo,
        })
    },
    methods: {
        tishi(){
            // mui.alert('扫雷红包游戏公测中，请进入普通房间体验游戏！','提示','好的')
            mui.alert('请点击下方房间进入！','提示','好的')
        },
        g1(index){
            // 不是扫雷红包就需要登录
            if(this.userinfo.UserId && (this.userinfo.UserId.startsWith('demo') || this.userinfo.UserId.startsWith('Demo'))){
                this.$toast('亲！试玩账号不用进入哦~');
                return
            }
            if(!this.userinfo.UserId){
                this.$toast('请先登录');                
                return
            }
            
            var item = this.roomList[index];
            if(item){
                this.$router.push(`/hbGame/room?id=${item.Id}&name=${item.Name}&type=${item.Type}`)
            }else{
                // mui.alert('扫雷红包优化升级中<br/>10月18日再次开放','提示','好的')
                mui.alert('【此房间暂未开放】','提示','好的')
            }
        },
        getRoom(){
            // 100 是扫雷
            api_获取游戏房间(100).then(x=>{
                if(x.data.code==0){
                    this.roomList = x.data.msg
                }else{
                    // this.$toast(x.data.msg)
                }
            }).catch(err=>{})

            api_禁抢房间(300).then(x=>{
                if(x.data.code==0){
                    this.roomList2 = x.data.msg;
                }else{
                    // this.$toast(x.data.msg)
                }
            }).catch(err=>{})

             //牛牛
            api_获取游戏房间(200).then(x=>{
                if(x.data.code ===0){
                    this.roomList3 = x.data.msg;
                }
            }).catch(err=>{})

        }
    },
    mounted() {
        this.getRoom();
    }
}
</script>

<style lang="scss" scoped>
.img_1{
    font-size: 0px;
    margin: _vw(10) _vw(10) _vw(5);
}
.img_list{
    display: flex;
    font-size: 0px;
    margin: 0px _vw(7.5) _vw(10);
    div{
        width: 50%;
        margin:0px _vw(2.5);
    }
}

.img_2{
    font-size: 0px;
    // margin: _vw(30) _vw(10) _vw(10);
    margin: _vw(10) _vw(10) _vw(10);
}
img{
    width: 100%;
    border-radius: 5px;
}

.box_1{
    background: #ffffff;
}
.box_2{
    background: #ffffff;
    margin: 20px 0px 0px;
}


.mui-table-view:after{
    display: none;
}

.mui-content{
    display: flex;
    flex-direction: column;
}

.type_1{
    flex-shrink: 0;
    text-align: center;
    font-size: _vw(13);
    display: flex;
    border-bottom: 1px solid #dedede;
    padding:_vw(15) 0px;
    color: #9e9e9e;
    position: relative;
    &::after{
        position: absolute;
        width: 15%;
        bottom: 0px;
        height: 2px;
        content: "";
        background: #d92d38;
        transition: all 0.3s;
    }
    &.index0::after{
        left: 5%
    }
    &.index1::after{
        left: 30%
    }
    &.index2::after{
        left: 55%
    }
    li{
        width: 25%;
        &.active{
            color: #d92d38;
        }
    }
    img{
        width: _vw(45);
        height: _vw(45);
    }
}


.list1{
    flex: 1;
    li{
        display: flex;
    }
    .img_1{
        width: _vw(50);
        height: _vw(50);
        flex-shrink: 0;
        margin: 0px _vw(10) 0px 0px;
        img{
            width: 100%;
        }
    }
    .text_1{
        flex: 1;
        width: 0;
        display:flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .title_1{
        font-size: _vw(13);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .title_2{
        font-size: _vw(12);
        color: #9e9e9e;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

</style>

<!--
 * @Description: In User Settings Edit
 * @Autor: kenneth
 * @Date: 2019-08-23 20:28:52
 * @LastEditors: kenneth
 * @LastEditTime: 2019-09-14 18:55:37
 -->
<template>
    <div class="content_1">
        <div class="left1">
            <a :href="下载地址" target="_blank">
                <div class="img_box">
                    <img src="static/image/ruanjianxiazai.png" alt="" srcset="">
                </div>
                <div>软件下载</div>
            </a>
            <a :href="config.online_chat" target="_blank">
                <div class="img_box">
                    <img src="static/image/kefu.png" alt="" srcset="">
                </div>
                <div>在线客服</div>
            </a>
            <a href="/Lottery/Home/Index/2" target="chat0902">
                <div class="img_box">
                    <img src="static/image/caipiao.jpg" alt="" srcset="">
                </div>
                <div>在线投注</div>
            </a>
        </div>

        <ul class=tabs>
            <li :class="{'active':type_1==0}" @click="type_1=0">消息列表</li>
            <!-- <li :class="{'active':type_1==1}" v-if="聊天室state.user.ChatRole==1" @click="type_1=1">活跃人数({{聊天室state.user.ChatRole==1 ? 聊天室state.人员列表.length : '***'}})</li> -->
            <li :class="{'active':type_1==1}" @click="type_1=1">活跃人数({{房间人数}})</li>
        </ul>

        <div class="详情">
            <div v-if="type_1==0">
                <ul class="tabs_1">
                    <li :class="{active:type_2==0}" @click="type_2=0">消息</li>
                    <li :class="{active:type_2==1}" @click="type_2=1">管理员</li>
                </ul>
                <ul class="list1" v-if="type_2==0">
                    <li :class="{active:!私聊state.正在聊天code}" @click="进入群聊()">
                        <div class="img_box">
                            <img src="static/image/liaotian.png" alt="" srcset="">
                        </div>
                        <div class="text_1">
                            <div>{{聊天室state.当前房间.Name ? 聊天室state.当前房间.Name : '未选择房间'}}</div>
                            <div class="内容提示" v-if="聊天室state.msglist.length>0">
                                <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==1">{{聊天室state.msglist[聊天室state.msglist.length-1].Content}}</span>
                                <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==2">系统计划</span>
                                <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==3">分享彩票</span>
                                <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==4">图片</span>
                            </div>
                        </div>
                    </li>

                    <li v-show="聊天室state.当前房间.Id!=item.房间.Id" v-for="(item, index) in 聊天室state.房间记录">
                        <div class="img_box" @click="进入群聊1(item)">
                            <img src="static/image/liaotian.png" alt="" srcset="">
                        </div>
                        <div class="text_1" @click="进入群聊1(item)">
                            <div>{{item.房间.Name}}</div>
                            <div>
                                <!-- <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==1">{{聊天室state.msglist[聊天室state.msglist.length-1].Content}}</span>
                                <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==2">计划</span>
                                <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==3">分享彩票</span>
                                <span v-if="聊天室state.msglist[聊天室state.msglist.length-1].Type==4">图片</span> -->
                            </div>
                        </div>
                        <i @click="删除房间记录(index)" class="关闭1 el-icon-circle-close"></i>
                    </li>

                    <li @click="$router.push('/privateChat?id='+item.SenderProfile.Code)" :class="{active: item.SenderProfile.Code==私聊state.正在聊天code}" v-for="(item, index) in 私聊state.消息列表" :key="index">
                        <div class="img_box">
                            <img v-if="!item.SenderProfile.ImgId" src="static/image/touxiang/wutu.jpg" alt="" srcset="">
                            <img v-if="item.SenderProfile.ImgId" :src="'static/image/touxiang/'+item.SenderProfile.ImgId" alt="" srcset="">
                        </div>

                        <div class="text_1">
                            <div>{{item.SenderProfile.Nickname ? item.SenderProfile.Nickname : item.SenderProfile.MemberId}}</div>
                            <div v-if="item.Message">
                                <div class="消息">
                                    <span v-if="item.Message.MessageType==1">{{item.Message.Message}}</span>
                                    <span v-if="item.Message.MessageType==4">图片</span>
                                </div>
                                <div class="未读" v-show="item.MessageCount>0 && item.SenderProfile.Code!= 私聊state.正在聊天.正在聊天code">
                                    {{item.MessageCount}}
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
                <div class="" v-if="type_2==1">
                    <ul class="list2">
                        <li @click="会员详情(item)" v-for="(item, index) in 管理员" :key="index">
                            <div>{{item.Name}}</div>
                            <div>
                                <img v-if="item.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">
                                <img v-if="item.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="type_1==1" class="人员">
                <div class="查找">
                    <el-input prefix-icon="el-icon-search" size="mini" v-model="username"></el-input>
                </div>
                <ul class="list2">
                    <li @click="会员详情(item)" v-for="(item, index) in 循环list" :key="index">
                        <div>{{item.Name}}</div>
                        <div>
                            <img class="img_1" v-if="item.Vip=='游客'" src="static/image/unLoad-hd.png" alt="" srcset="">

                            <template v-if="item.ChatRole">
                                <img v-if="item.ChatRole==1" :src="config.api_url+'/App_Upload/ChatVip/管理员.png'" alt="">
                                <img v-if="item.ChatRole==2" :src="config.api_url+'/App_Upload/ChatVip/计划员.png'" alt="">
                            </template>
                            <template v-else>
                                <img v-if="item.Vip!='游客' && 聊天室state.user.VipImg" :src="config.api_url+'/App_Upload/ChatVip/'+item.Vip+'.png'" alt="">
                                <span v-if="item.Vip!='游客' && !聊天室state.user.VipImg">{{item.Vip}}</span>
                            </template> 
                        </div>
                    </li>
                </ul>
                <div class="分页">
                    <el-pagination :hide-on-single-page="true" @current-change="fenye" small layout="prev, pager, next" :page-size="20" :total="新会员.length"></el-pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState , mapGetters , mapActions , mapMutations } from "vuex";
export default {
    name:"",
    data() {
        return {
            type_1:0,   //消息列队  活跃人数
            type_2:0,   //消息 客服
            username:'',
            pageindex:1
        }
    },
    computed: {
        ...mapState({
            config:'config',
            聊天室state:x=>x.聊天室,
            私聊state:x=>x.私聊
        }),
        房间人数(){
            if(this.聊天室state.user.NickName){
                if(this.聊天室state.user.ChatRole==1){
                    // 管理员
                    var n = 0
                    this.聊天室state.会员人数.forEach(item => {
                        n+=item.UserCount
                    });
                    return Math.round(n)
                }else {
                    // 普通会员
                    return '99+'
                }
            }else{
                return '****'
            }
        },
        新会员(){
            var list=this.聊天室state.人员列表.filter(x=>x.Name.includes(this.username));
            return list
        },
        循环list(){
            return this.新会员.slice( (this.pageindex-1)*20 , this.pageindex*20)
        },
        管理员(){
            return this.聊天室state.人员列表.filter(x=>x.ChatRole==1)
        },
        下载地址(){
            if(typeof website == "object"){
                var url = location.hostname.replace('www.','');
                // var url='1996997.com';   //
                var obj={}
                if (website.list.hasOwnProperty(url)) {
                    var key = website.list[url]
                    if (website.hasOwnProperty(key)) {
                        obj = website[key]
                    }
                }
                if(obj.app_download){
                    return obj.app_download
                }else{
                    return this.config.app_download;
                }
            }else{
                return this.config.app_download;
            }
        }
    },
    methods: {
        ...mapMutations({
            删除房间记录:'聊天室/删除房间记录'
        }),
        ...mapActions({
            点击会员详情:'聊天室/点击会员详情',
            进入记录房间:'聊天室/进入记录房间'
        }),
        进入群聊(){
            this.$router.push('/');
            this.私聊state.正在聊天code=''
        },
        进入群聊1(item){
            this.$router.push('/');
            this.私聊state.正在聊天code=''
            this.进入记录房间(item)
        },
        async 会员详情(item){
            item.OnlineId=item.Code;
            item.Nickname = item.Name;
            if(item.ChatRole==1){
                var r =  await this.$confirm('现在就要私聊联系管理员~', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    return true
                }).catch(() => {
                    return false
                });
                if(!r){
                    return
                }
                this.type_1 = 0 ;
                this.type_2 = 0 ;
                this.$router.push('/privateChat?id='+item.Code)
            }else if(this.聊天室state.user.ChatRole==1){
                this.点击会员详情(item);         
            }else{
                this.$alert('对方不是管理员，不能私聊哦~', '提示', {
                    confirmButtonText: '我知道了',
                    callback: action => {
                        
                    }
                });
            }
        },
        fenye(index){
            console.log(index);
            this.pageindex=index
        },
    },
    mounted() {
        
    },
}
</script>

<style lang="scss" scoped>

.分页{
    flex-shrink: 0;
    background: #ffffff;
    text-align: center;
}
.content_1{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.left1{
    flex-shrink: 0;
    font-size: 14px;
    display: flex;
    text-align: center;
    margin: 10px 0px 0px;
    a{
        width: calc(100% / 3);
        color: #ffffff;
        text-decoration: none;
        &:hover{
            color: #ff0;
        }
    }
    .img_box{
        width: 40px;
        height: 40px;
        margin: 0px auto 3px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
}

.tabs{
    flex-shrink: 0;
    margin: 3px 0px 0px;
    line-height: 36px;
    font-size: 14px;
    display: flex;
    // background: #252e3e * 2;
    background: rgba(0,0,0,0.2);
    text-align: center;
    >li{
        width: 50%;
        flex-grow: 1;
        cursor: pointer;
        color: #eeeeee;
        &:hover{
            background: rgba(0,0,0,0.3);
        }
    }
    .active{
        color: #ffffff;
        background: rgba(0,0,0,0.4);
    }
}
.tabs_1{
    padding: 5px ;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 14px;
    >li{
        width: 110px;
        line-height: 25px;
        cursor: pointer;
    }
    .active{
        background: rgba(0,0,0,0.4);
        border-radius: 25px;
    }
}
.详情{
    height: 100%;
    overflow: auto;
    // * 设置滚动条的样式 */
    &::-webkit-scrollbar {
        width:6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
        // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        background: #e8e8e8;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        background:#2e394d;
        border-radius: 6px;
    }
}

.list1{
    color: #dddddd;
    font-size: 14px;
    >li{
        height: 40px;
        position: relative;
        display: flex;
        padding: 10px;
        align-items: center;
        cursor: pointer;
        border-top: 1px solid #252e3e;
        &.active{
            background: rgba(0,0,0,0.2);
        }
        &:hover{
            background:  rgba(0,0,0,0.2);
            .关闭1{
                display: block;
            }
        }
        .关闭1{
            position: absolute;
            top:calc(50% - 10px) ;
            right: 5px;
            font-size: 20px;
            display: none;
            transition: all 0.3s;
            &:hover{
                transform: scale(1.5);
            }
        }
        .内容提示{
            font-size: 12px;
            color: #d4d4d4;
        }
    }
    .img_box{
        width: 40px;
        height: 40px;
        flex-shrink: 0;
        margin: 0px 5px 0px 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .text_1{
        width: calc(100% - 40px);
        flex: 1;
        width: 0px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        >div{
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: flex;
            align-items: center;
            span{
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .消息{
            width: 100%;
        }
        .未读{
            white-space: nowrap;
            flex-shrink: 0;
            min-width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 100%;
            background: red;
            font-size: 12px;
            padding: 0px 3px;
            box-sizing: border-box;
            text-align: center;
        }
    }
    
}

.人员{
    display: flex;
    height: 100%;
    flex-direction: column;
    .查找{
        padding: 10px 10px;
        flex-shrink: 0;
        /deep/ input{
            background: rgba(0,0,0,0.2);
            border-radius:28px;
            border: 1px solid #a28e8e;
            color: #ffffff;
        }
    }
}

.list2{
    height: 100%;
    overflow: auto;
    font-size: 14px;
    // * 设置滚动条的样式 */
    &::-webkit-scrollbar {
        width:6px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
        // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
        background: #e8e8e8;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
        // background:#2e394d;
        background:var(--color);
        border-radius: 6px;
    }
    >li{
        padding: 0px 20px;
        display: grid;
        grid-template-columns: 50% 50%;
        height: 50px;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;
        &:hover{
            // transform: scale(1.1);
            background: rgba(0,0,0,0.3);
        }
        &:nth-child(2n-1){
            background: rgba(0,0,0,0.2);
        }        
        >div:nth-child(2){
            text-align: right;
        }
        .img_1{
            width: 30px;
        }
        .img_2{
            max-height: 20px;
        }
    }
}



</style>
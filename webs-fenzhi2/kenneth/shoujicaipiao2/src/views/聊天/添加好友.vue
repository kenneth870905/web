<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">添加好友</h1>
            <!-- <button @click="添加()" class="mui-btn mui-btn-blue mui-btn-link mui-pull-right">添加</button> -->
        </header>
        <div class="mui-content mui-fullscreen">
            <van-search class="search_1" v-model="friendId" show-action placeholder="请输入用户Id" @search="onSearch" >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <div class="box_1" v-show="type==1">
                该用户不存在
            </div>
            <div class="box_2" v-show="type==2">
                <div class="img_1">
                    <img v-if="user.ImgId" :src="`${config.img_url}static/image/touxiang/${user.ImgId}`" alt="" srcset="">
                    <img v-else :src="`${config.img_url}static/image/touxiang/wutu.jpg`" alt="" srcset="">
                </div>
                <div class="text_1">
                    <div v-show="user.NickName">昵称：{{user.NickName}}</div>
                    <div>账号：{{user.Id}}</div>
                </div>
            </div>
            <!-- <div class="btn_1" @click="$router.push('/privateChat?Code='+user.Id)" v-show="type==2 && status==1"> -->
            <div class="btn_1" v-show="type==2 && status==1">
                已经在好友列表
            </div>
            <div class="btn_1" @click="add()" v-show="type==2 && status==-1">
                添加到通讯录
            </div>

        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { api_添加好友 , api_搜索人员} from "@/api/聊天接口.js";
export default {
    name: "",
    data() {
        return {
            friendId:"",
            type:0, //0 表示为查询 1 表示未找到用户 2 显示用户 
            user:{
                // MemberId: "huhu01",
                // ImgId: "GL3.png",
                // NickName: "猪队友1",
                // status -1 不是好友 0 待验证 1 已经是好友 2 已拒绝
            },
            status:-2,  // status -2 页面初始化 -1 不是好友 0 待验证 1 已经是好友 2 已拒绝
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
    methods: {
        onSearch(){
            var kong = /^\s*$/g;
            if(kong.test(this.friendId)) return
            api_搜索人员({friendId:this.friendId}).then(x=>{
                // status -1 不是好友 0 待验证 1 已经是好友 2 已拒绝
                console.log(x)
                if(x.data.code!=0){
                    this.type = 1
                }else{
                    this.user=x.data.msg.members[0];
                    this.status = x.data.msg.status
                    this.type = 2
                }
            }).catch(err=>{
                this.type = 1
                this.status = -2
                console.log(err)
            })
        },
        add(){
            var kong = /^\s*$/g;
            if(kong.test(this.friendId)) return;
            api_添加好友(this.friendId).then(x=>{
                if(x.code!=0){
                    this.$toast(x.data.msg)
                }
            }).catch(err=>{
                this.$toast('系统错误，稍后再试')
            })
        }
    },
}
</script>

<style lang="scss" scoped>

.search_1{
    margin: 10px 0px 0px 0px;
    /deep/ input{
        margin: 0px;
        background: none;
        height: 24px;
        line-height: 24px;
        padding: 0px;
        text-align: left;
    }
}

.box_1{
    margin: 10px 0px 0px;
    height: 100px;
    line-height: 100px;
    font-size: 12px;
    text-align: center;
    background: #ffffff;
    color: #4e4e4e;
}

.box_2{
    background: #fff;
    margin: 10px 0px 0px;
    padding: 10px;
    display: flex;
    align-items: center;
    font-size: 14px;
    .img_1{
        width: 60px;
        height: 60px;
        margin: 0px 15px 0px 0px;
        img{
            width: 100%;
            border-radius: 100%;
            height: 100%;
            border-radius: 100%;
        }
    }
}

.btn_1{
    margin: 10px 0px 0px;
    text-align: center;
    line-height: 40px;
    background: #fff;
    font-size: 13px;
    color: #0026c5;
}

</style>

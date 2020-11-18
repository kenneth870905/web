<template>
    <div class="评论详情">
        <div class="img_1">
            <van-icon name="manager" />
        </div>
        <div class="content">
            <div class="title_1">
                <div class="name">{{obj.nickname ? obj.nickname : obj.userName}}</div>
                <div class="zan" :class="{'active':obj.isDianZan}" @click="点赞()">
                    <span>{{obj.dianzhanCount}}</span>
                    <van-icon name="good-job" />
                </div>
            </div>
            <div class="回复内容" @click="点击回复(obj)">
                <span>{{obj.text}}</span>
                <span class="回复昵称" v-if="obj.revertObj && obj.revert!=obj.parentId">//@{{obj.revertObj.nickname ? obj.revertObj.nickname : obj.revertObj.userName}}：</span>
                <span v-if="obj.revertObj && obj.revert!=obj.parentId">{{obj.revertObj.text}}</span>
            </div>
            <div class="time" @click="点击回复(obj)">
                <span>{{obj.creationTime | ft}}</span>
                <span>·</span>
                <span>回复</span>
                <span>·</span>
                <!-- <span>举报</span> -->
                <!-- <span @click="显示回复框(obj.id,'')">{{obj.huiFuCount}}回复</span> -->
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name:"",
    props:{
        obj:{
            default:()=>{}
        }
    },
    inject:['点击回复'],
    data() {
        return {
            
        }
    },
    filters:{
        ft(t){
            if(!t) return t;
            return moment(t).format('HH:mm')
        }
    },
    methods: {
        点赞(){
            this.$toast.loading({mask: true,duration:0})
            this.$axios.post('/DianZan/save?a=123', {reviewId:this.obj.id} ).then(x=>{
                this.$toast.clear();                
                if(x.data.code==1){
                    if(this.obj.isDianZan){
                        this.obj.dianzhanCount--
                    }else{
                        this.obj.dianzhanCount++
                    }
                    this.obj.isDianZan = !this.obj.isDianZan
                }else{
                    this.$toast(x.data.message)
                }
            }).catch(err=>{
                this.$toast('系统错误')
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.评论详情{
    display: flex;
    padding: _vw(12) _vw(15);
}
.content{
    flex:1;
    border-bottom:1px solid #eeeeee;
}
.img_1{
    width: _vw(32);
    height: _vw(32);
    margin: 0px _vw(10) 0px 0px;
    flex-shrink: 0;
    background: #ececec;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888888;
    font-size: _vw(20);
    img{
        width: 100%;
        height: 100%;
    }
}

.title_1{
    margin: 0px 0px _vw(10) 0px;
    display: flex;
    .name{
        font-weight: bold;
        flex:1;
        font-size: _vw(14);
    }
    .zan{
        font-size: _vw(12);
        color: rgb(130, 140, 155);
        margin:0px 0px 0px _vw(5);
        display: flex;
        align-items: center;
        &.active{
            color:rgb(68, 138, 255);
        }
        i{
            font-size: _vw(18);
            margin: 0px 0px 0px _vw(3);
        }
    }
}

.回复内容{
    font-size: _vw(15);
    color: #4e4e4e;
    line-height: _vw(24);
    word-break: break-all;
    // word-break: break-word;
    // white-space:pre-line;
    .回复昵称{
        color: #c7c7c7;
    }
}

.time{
    display: flex;
    font-size: _vw(12);
    align-items: center;
    margin: _vw(10) 0px;
    span:nth-child(1){
        color: #adadad;
    }
    span{
        margin-right: _vw(5);
    }
}


</style>


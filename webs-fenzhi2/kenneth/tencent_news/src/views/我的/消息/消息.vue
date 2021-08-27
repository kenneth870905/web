<template>
    <div>
        <van-nav-bar title="消息" left-arrow @click-left="$back"></van-nav-bar>
        <div class="Main">
            <van-list v-model="评论.loading" :finished="!this.评论.loading && 评论.total!=-1 && 评论.list.length>=评论.total" finished-text="没有更多了" @load="onLoad">
                <ul class="list">
                    <li v-for="(item, index) in 评论.list" :key="index">
                        <div class="img_1">
                            <img :src="item.huiFu.photo" v-if="item.huiFu.photo" />
                            <van-icon name="manager" v-else />
                        </div>
                        <div class="content">
                            <div class="title_1"><span class="name">{{item.huiFu.nickname ? item.huiFu.nickname : item.huiFu.userName}}</span> 回复了你</div>
                            <div class="text_1">{{item.huiFu.text}}</div>
                            <div class="time_1">
                                {{item.huiFu.creationTime}}
                                <!-- <span class="btn_1" @click="$router.push(`/pl?rid=32&newId=7231`)">回复TA</span> -->
                                <span class="btn_1" @click="$router.push(`/pl?rid=${item.huiFu.id}&newId=${item.newId}`)">回复TA</span>
                            </div>
                            <div class="原文" @click="$router.push(`/new?id=${item.newId}`)">
                                <div class="">{{item.text}}</div>
                                <div class="来源">来自：{{item.newTitle}}</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            
            评论:{
                query:{
                    pageSize:10,
                    pageIndex:0,
                    // newId:'',
                    // parentId:""
                },
                list:[],
                total:-1,
                loading:false,
            }
        }
    },
    methods: {
        onLoad(){
            console.log('onLoad');
            this.评论.query.pageIndex++;
            this.查询评论();
        },
        查询评论(){
            this.$axios.post('/PingLun/myHuiFu',this.评论.query).then(x=>{
                this.评论.list = [...this.评论.list , ...x.data.data] ;
                this.评论.total = x.data.total;
                this.评论.loading = false
            }).catch(err=>{})
        },
    },
}
</script>

<style lang="scss" scoped>
.list{
    padding:_vw(15);
    >li{
        border-bottom: 1px solid #eeeeee;
        padding: 0px 0px _vw(20) 0px;
        margin: 0px 0px _vw(20) 0px;
        display: flex;
    }
    .img_1{
        width: _vw(32);
        height: _vw(32);
        flex-shrink: 0;
        margin: 0px _vw(10) 0px 0px;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
    }
    .content{
        width: 0;
        flex-grow: 1;
    }
    .title_1{
        color: rgb(130, 140, 155);
        .name{
            color: #4e4e4e;
        }
    }
    .text_1{
        font-size: _vw(14);
        margin: _vw(10) 0px;
    }
    .time_1{
        font-size: _vw(12);
        color: #828c9b;
        display: flex;
        align-items: center;
        .btn_1{
            line-height: _vw(18);
            padding: 0px _vw(8);
            border-radius: _vw(18);
            background: #edf2fa;
            margin: 0px 0px 0px _vw(10);
        }
    }
    .原文{
        background: #f4f8fd;
        padding: _vw(12);
        font-size: _vw(14);
        margin: _vw(15) 0px 0px 0px;
        .来源{
            margin: _vw(10) 0px 0px;
            padding: _vw(10) 0px 0px;
            color: #828c9b;
            border-top: 1px solid #d8d8d8;
        }
    }
}
</style>

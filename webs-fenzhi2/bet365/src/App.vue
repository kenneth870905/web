<template>
    <div id="app">
        <router-view />
        <entergame v-if="显示进入游戏弹框" />

         <!-- 系统公告 -->
        <el-dialog class="系统公告" title="系统公告" width="900px" :visible.sync="系统公告.show" :close-on-click-modal="false" :before-close="close1">
            <div class="iframe">
                <iframe :src="系统公告.url" frameborder="0"></iframe>
            </div>
            <div class="底部">
                <el-button @click="close1" type="danger" size="mini">我知道了</el-button>
            </div>
        </el-dialog>

        <!-- 系统消息 -->
        <el-dialog title="您有新的消息" :visible.sync="系统公告.显示系统Messages" width="700px" center class="系统Messages" :close-on-click-modal="false" :before-close="closeMessage">
            <span v-html="系统公告.系统Messages"></span>
            <span slot="footer" class="dialog-footer">
                <el-button style="width:100%" type="primary" size="small" @click="closeMessage()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { api_隐藏公告 } from "@/api/公告接口.js";
import entergame from '@/components/entergame.vue'
import { mapState , mapGetters , mapActions } from 'vuex'
export default {
    name: 'App',
    components: {
        entergame
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            显示进入游戏弹框: '显示进入游戏弹框',
            userinfo:'userInfo',
            config:'config'
        }),
        ...mapGetters({
            系统公告: "系统公告"
        })
    },
    //判断是电脑版还还是手机版访问
    beforeCreate: function () {
        if (document.body.clientWidth <= 750) {
            location.href = config.mobile_url
        }
    },
    methods: {
        ...mapActions({
            Online:'Online'
        }),
        获取配置文件() {
            var title_1 = this.config.title
            var url = window.location.origin.includes('www.') ? window.location.hostname : 'www.' + window.location.hostname
            var url1 = config.api_url + '/App_Upload/Agents/Json/' + url + '.json';
            this.设置config(['title', ''])
            // console.log(url1);
            // this.$axios.get('http://1996996.com/App_Upload/Agents/Json/www.1996996.com.json').then(x=>{
            this.$axios.get(url1).then(x => {
                console.log(x)
                var data = x.data;
                document.title = data.Title;
                // if(data.Logo){
                //     var logo='/App_Upload/Agents/Logo/'+data.Id+'.png';
                // }
                this.设置config(['title', data.Title])

            }).catch(err => {
                console.log(err);
                document.title = title_1;
                this.设置config(['title', title_1]);
            })
        },
        async closeMessage() {
            var obj = {
                Id: this.userinfo.Messages[0].Id,
                Type: 2,
                groupId: null
            };
            await api_隐藏公告(obj);
            this.Online();
        },
        async close1() {
            if (this.userinfo.Notices && this.userinfo.Notices.length > 0) {
                if (this.userinfo.Notices[0].Group) {
                    var obj = {
                        Id: 0,
                        Type: 1,
                        groupId: this.userinfo.Notices[0].Group
                    };
                } else {
                    var obj = {
                        Id: this.userinfo.Notices[0].Ids[0].Id,
                        Type: 1,
                        groupId: null
                    };
                }
                await api_隐藏公告(obj);
            } else if (this.userinfo.Ids && this.userinfo.Ids.length > 0) {
                var obj = { Id: this.userinfo.Ids[0].Id, Type: 1 };
                await api_隐藏公告(obj);
            }
            this.Online();
        }
    },
    mounted() {

        setInterval(() => {
            this.Online()
        }, 1000 * 60);
        this.Online();

        var url = window.location.origin.includes("www.") ? window.location.hostname : "www." + window.location.hostname;
        this.$axios.get(config.api_url + "/App_Upload/Agents/Json/" + url + ".json").then(x => {
        // this.axios.get(config.api_url + '/App_Upload/Agents/Json/www.1996996.com.json').then(x=>{
            document.title = x.data.Title;
            this.config.title = x.data.Title;
            if (x.data.Logo) {
                this.config.showlog = true;
                this.config.logo = this.config.api_url + "/App_Upload/Agents/Logo/" + x.data.Id +".png";
            }
            this.config.getConfig = 1; //1 表示获取文件成功 3 表示获取文件失败
            if (x.data.QQ) {
                this.config.qq = x.data.QQ;
            }
        }).catch(err => {
            document.title = title;
            this.config.title = title;
            this.config.showlog = true;
            this.config.getConfig = 3;
        });
    },
}

</script>

<style>
.w1000 {
    width: 1200px;
    margin: 0px auto;
    min-width: 1200px;
}
body {
    min-width: 1200px;
    position: relative;
}
.cb {
    clear: both;
}

* {
    margin: 0;
    padding: 0;
}
body {
    background: #007251;
}
a {
    text-decoration: none;
}
ul li {
    list-style: none;
}
</style>


<style lang="scss" scoped>

.系统公告 {
    /deep/ .el-dialog__header {
        text-align: center;
        background: red;
        padding-top: 10px;
        .el-dialog__title {
            color: #ffffff;
        }
        .el-dialog__headerbtn {
            top: 13px;
            .el-dialog__close {
                color: #ffffff;
            }
        }
    }

    /deep/ .el-dialog__body {
        height: 550px;
        padding-left: 0px;
        padding-right: 0px;
        overflow: auto;
        padding-top: 0px;
    }
    .iframe {
        height: 100%;
    }
    iframe {
        width: 100%;
        height: 100%;
    }
    .底部 {
        position: absolute;
        background: #cccccc;
        left: 0px;
        width: 100%;
        bottom: 0px;
        text-align: center;
        padding: 10px 0px;
    }
}

.系统Messages {
    .el-dialog__body {
        height: 400px;
        overflow: auto;
    }
}
</style>
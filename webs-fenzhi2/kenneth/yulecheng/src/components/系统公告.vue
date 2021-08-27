<template>
    <div>
        <el-dialog class="系统公告" title="系统公告" width="900px" :visible.sync="iframe.show" :close-on-click-modal="false" :before-close="close1">
            <div class="iframe">
                <iframe :src="iframe.url" frameborder="0"></iframe>
            </div>
            <div class="底部">
                <el-button @click="close1" type="danger" size="mini">我知道了</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { api_隐藏公告 } from '@/api/公告接口.js'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    name: '',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            userInfo: 'userInfo'
        }),
        iframe(){
            var obj = {
                url: '',
                show: false
            }
            // {"Notices":[{"Id":15,"HowLong":1},{"Group":null,"Ids":[{"Id":15,"HowLong":1}]},{"Group":1,"Ids":[{"Id":12,"HowLong":1}],"Messages":[]}
            if ((!this.userInfo.Messages || this.userInfo.Messages.length == 0) && this.userInfo.Notices && this.userInfo.Notices.length > 0) {
                let Notice = this.userInfo.Notices[0];
                //手机版本
                if (Notice.Id) {
                    obj.show = true;
                    obj.url = `${config.api_url}/Systems/Notice/Show/${Notice.Id}?p=${Notice.HowLong}`
                } else if (Notice.Group) {
                    obj.show = true;
                    obj.url = `${config.api_url}/Systems/Notice/Show?groupid=${Notice.Group}`
                } else if (Notice.Ids && Notice.Ids.length > 0) {
                    obj.show = true;
                    obj.url = `${config.api_url}/Systems/Notice/Show/${Notice.Ids[0].Id}`
                }
            }
            return obj
        }
    },
    methods: {
        ...mapActions({
            openloading:"openloading"
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        async close1() {
            // this.修改state(['系统公告', false])
            this.openloading(true)
            let Notice = this.userInfo.Notices[0];
            let addCookie = '';
            //手机版本
            if (Notice.Id) {
                var obj = { Id: Notice.Id, Type: 1 }
                addCookie = Notice.Id 
                this.userInfo.Notices.splice(0, 1)
            } else if (Notice.Group) {
                var obj = {Id: 0,Type: 1,groupId: Notice.Group}
                let L1 = [];
                Notice.Ids.map((item)=>{
                    L1.push(item.Id)
                })
                addCookie = L1.join(',')
                this.userInfo.Notices.splice(0, 1)
            } else if (Notice.Ids && Notice.Ids.length > 0) {
                var obj = {Id: Notice.Ids[0].Id,Type: 1}
                addCookie = Notice.Ids[0].Id
                Notice.Ids.splice(0, 1)
                if(Notice.Ids.length==0){
                    this.userInfo.Notices.splice(0, 1)
                }
            }
            // var c = this.getCookie('NoticeIds')
            // if (c) {
            //     document.cookie = `NoticeIds=${c},${addCookie}`;
            // } else {
            //     document.cookie = `NoticeIds=${addCookie}`
            // }
            try {
                await api_隐藏公告(obj)            
            } catch (error) {}
            this.openloading(false)
        }
    }
}
</script>

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
        box-sizing: border-box;
        height: 570px;
        padding-left: 0px;
        padding-right: 0px;
        overflow: auto;
        padding-top: 0px;
        padding-bottom: 50px;
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
        line-height: 50px;
    }
}
</style>

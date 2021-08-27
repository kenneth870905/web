<template>
    <div class="系统公告" v-if="iframe.show">
        <div class="内容">
            <div class="iframe" :style="style">
                <iframe ref="iframe" @load="load()" :src="iframe.url" frameborder="0"></iframe>
            </div>
            <div class="btn_1" @click="关闭()">我知道了</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { api_隐藏公告 } from "@/api/公告接口.js";

export default {
    name: "",
    data() {
        return {
            显示: false,
            // 大约 90% - 42px
            // style:{height:"calc(90vh - 13vw)"}
            style:{}
        }
    },
    computed: {
        ...mapState({
            userinfo: state => state.user.userinfo,
            config: 'config'
        }),
        iframe() {
            var obj = {
                url: '',
                show: false
            }
            // {"Notices":[{"Id":15,"HowLong":1},{"Group":null,"Ids":[{"Id":15,"HowLong":1}]},{"Group":1,"Ids":[{"Id":12,"HowLong":1}],"Messages":[]}
            if ((!this.userinfo.Messages || this.userinfo.Messages.length == 0) && this.userinfo.Notices && this.userinfo.Notices.length > 0) {
                let Notice = this.userinfo.Notices[0];
                //手机版本
                if (Notice.Id) {
                    obj.show = true;
                    obj.url = `${this.config.api_url}/Systems/Notice/Show/${Notice.Id}?p=${Notice.HowLong}`
                } else if (Notice.Group) {
                    obj.show = true;
                    obj.url = `${this.config.api_url}/Systems/Notice/Show?groupid=${Notice.Group}`
                } else if (Notice.Ids && Notice.Ids.length > 0) {
                    obj.show = true;
                    obj.url = `${this.config.api_url}/Systems/Notice/Show/${Notice.Ids[0].Id}`
                }
            }
            // 手机版本格式为
            // data = {"Notices":[{"Id":15,"HowLong":1},{"Id":12,"HowLong":1}],"Messages":[]}
            // url = '/apis/Systems/Notice/Show/15?p=1'
            // 点击参数 = {Id: 15,Type: 1}
            //电脑版本
            // data = {"Notices":[{"Group":null,"Ids":[{"Id":15,"HowLong":1}]},{"Group":1,"Ids":[{"Id":12,"HowLong":1},{"Id":9,"HowLong":1},{"Id":8,"HowLong":1}]}],"Messages":[]}
            // // 如果 Group 存在
            // url = '/Systems/Notice/Show?groupid=1'
            // 点击参数 = {Id: 0,Type: 1,groupId: 1}
            // // NoticeIds 保存 Ids 数组集合
            // // 如果 Group 不存在
            // url = /Systems/Notice/Show/15   
            // 点击参数 = {Id: 15,Type: 1}

            // if( (!this.userinfo.Messages || this.userinfo.Messages.length==0 ) && this.userinfo.Notices && this.userinfo.Notices.length>0){
            //     obj.show=true
            //     obj.url=config.api_url+'/Systems/Notice/Show/'+this.userinfo.Notices[0].Id+'?p='+this.userinfo.Notices[0].HowLong
            // }
            return obj
            // return config.api_url
        }
    },
    methods: {
        ...mapActions({
            getUserInfo: 'user/getUserInfo',
        }),
        ...mapMutations({
            加载中: '加载中'
        }),
        load(){
            console.log('加载完成')
            var iframe = this.$refs.iframe.contentWindow;
            var b_h = iframe.document.querySelector('html').offsetHeight
            // this.style = {height:b_h+'px'}
            iframe.document.querySelector('html').style.overflow = 'auto'
        },
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        关闭() {
            this.加载中(true)
            let Notice = this.userinfo.Notices[0];
            let addCookie = '';
            //手机版本
            if (Notice.Id) {
                var obj = { Id: Notice.Id, Type: 1 }
                addCookie = Notice.Id 
                this.userinfo.Notices.splice(0, 1)
            } else if (Notice.Group) {
                var obj = {Id: 0,Type: 1,groupId: Notice.Group}
                let L1 = [];
                Notice.Ids.map((item)=>{
                    L1.push(item.Id)
                })
                addCookie = L1.join(',')
                this.userinfo.Notices.splice(0, 1)
            } else if (Notice.Ids && Notice.Ids.length > 0) {
                var obj = {Id: Notice.Ids[0].Id,Type: 1}
                addCookie = Notice.Ids[0].Id
                Notice.Ids.splice(0, 1)
                if(Notice.Ids.length==0){
                    this.userinfo.Notices.splice(0, 1)
                }
            }

            // var obj = {
            //     Id: this.userinfo.Notices[0].Id,
            //     Type: 1
            // }

            // var c = this.getCookie('NoticeIds')
            // if (c) {
            //     document.cookie = `NoticeIds=${c},${addCookie}`;
            // } else {
            //     document.cookie = `NoticeIds=${addCookie}`
            // }
            
            // 删除这条信息公告id
            api_隐藏公告(obj).then(x => {
                // this.getUserInfo()
                this.加载中(false)
            }).catch(err => {
                // this.getUserInfo()
                this.加载中(false)
            })
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.系统公告 {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 22;
    overflow: auto;
    .内容 {
        width: _vw(300);
        height: _vw(500);
        // width: 90%;
        // max-height: 90%;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        padding: 0px 0px _vw(50) 0px;
        position: relative;
        .btn_1 {
            position: absolute;
            width: 100%;
            left: 0px;
            bottom: 0px;
            line-height: _vw(50);
            text-align: center;
            background: #f4f5fa;
            border-top: 1px solid #d4d4d4;
        }
        iframe {
            width: 100%;
            height: 100%;
        }
        .iframe {
            max-height: 100%;
            height: 100%;
            overflow: auto;
        }
    }
}
</style>

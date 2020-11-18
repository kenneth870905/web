<template>
    <div>
        <van-nav-bar title="关于我们" left-arrow :fixed="true" @click-left="$back()" />
        <div class="content">
            <ul class="title_1">
                <li @click="go('/About/')" :class="{active:urlS=='/About/'}">APP下载</li>
                <li @click="go('/jianjie')" :class="{active:urlS=='/jianjie'}">公司简介</li>
                <li @click="go('/rongyu')" :class="{active:urlS=='/rongyu'}">证件荣誉</li>
                <li @click="go('/contactUs')" :class="{active:urlS=='/contactUs'}">联系我们</li>
                <li @click="go('/recruit')" :class="{active:urlS=='/recruit'}">人才招募</li>
            </ul>
            <div class="view_1">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'',
    data() {
        return {
            urlS:"/About/"
        }
    },
    methods:{
         go(url){
             this.urlS=url
             this.$router.history.push(url);
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    padding: 1px 0px;
    position: absolute;
    top: _vw(46);
    bottom: 0px;
    left: 0px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .view_1{
        height: 100%;
        overflow: auto;
        padding: _vw(10);
    }
}
.title_1{
    flex-shrink: 0;
    font-size: _vw(12);
    line-height: _vw(30);
    text-align: center;
    display: flex;
    border: 1px solid #FF4429;
    margin: _vw(5) _vw(10) 0px;
    border-radius: _vw(5);
    color: #FF4429;
    li{
        width: calc(100% / 5);
    }
    .active{
        background: #FF4429;
        color: #ffffff;
    }
}
</style>

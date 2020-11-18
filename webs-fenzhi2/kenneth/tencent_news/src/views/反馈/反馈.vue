<template>
    <div class="反馈">
        <van-nav-bar title="反馈" left-arrow @click-left="$back"></van-nav-bar>
        
        <div class="box_1">
            <van-button type="info" round icon="edit">我来说一下</van-button>
        </div>
        <div class="box_2">
            <van-icon name="manager" />
            <span>我的反馈</span>
            <van-icon class="right" name="arrow" />
        </div>

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ul class="list_1">
                <li class="item" v-for="(item, index) in 3" :key="index">
                    <div class="img_1">
                        <img src="https://q4.qlogo.cn/g?b=qq&k=V2SqKFLXqLoVZZBNyZicBVw&s=100" alt="">
                    </div>
                    <div class="content">
                        <div class="name">Tanya</div>
                        <div class="text_1">腾讯网移动版已改版升级，使用中遇到问题“先截图、再复制链接”，反馈时“上传截图、粘贴链接”，能够帮助我们更快的定位到问题，感谢您的支持。</div>
                        <div class="time_1">
                            <div class="time_2">2017年8月18日</div>
                            <van-icon name="comment-o" />
                        </div>
                        <ul class="回复">
                            <li>
                                <span class="name">Davion：</span>
                                <span>微信、王者与荣耀、QQ等问题反馈途径请返回“常见问题”列表。</span>
                                <div class="img_box">
                                    <img src="static/image/美女.jpg" alt="" srcset="">
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </van-list>
        
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {
            finished:false,
            loading:false
        }
    },
    methods: {
        onLoad(){
            this.loading=true;
        }
    },
}
</script>

<style lang="scss" scoped>
.反馈 {
    height: 100%;
    background: #efeff4;
}
.box_1 {
    text-align: center;
    padding: _vw(15);
    background: #ffffff;
    margin: 0px 0px _vw(10) 0px;
    button {
        width: 50%;
    }
}
.box_2 {
    background: #ffffff;
    line-height: _vw(44);
    padding: 0px _vw(10);
    margin: 0px 0px _vw(10) 0px;
    * {
        line-height: inherit;
    }
    span {
        margin: 0px 0px 0px _vw(10);
    }
    i {
        color: #c7c7cc;
    }
    .right {
        float: right;
    }
}

.item{
    background: #ffffff;
    padding: _vw(15);
    display: flex;
    .img_1{
        width: _vw(30);
        height: _vw(30);
        margin: 0px _vw(10) 0px 0px;
        flex-shrink: 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .name{
        color: #ffa434;
        margin: 0px 0px _vw(5) 0px;
        font-size: _vw(15);
    }
    .text_1{
        font-size: _vw(14);
        color: #353535;
    }
    .time_1{
        display: flex;
        color:#b2b2b2;
        margin: _vw(10) 0px;
        font-size: _vw(12);
        .time_2{
            flex-grow: 1;
        }
    }
}

.回复{
    background: #f4f7fa;
    padding: _vw(10);
    li{
        font-size: _vw(15);
    }
    .name{
        color: #ffa434;
    }
    .img_box{
        img{
            max-width: 100%;
            max-height: 150px;
        }
    }
}
</style>

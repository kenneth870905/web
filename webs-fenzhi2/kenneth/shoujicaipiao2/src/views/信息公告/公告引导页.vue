<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">信息公告</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="bg_1">
                <img :src="config.img_url+'static/image/notice_1.png'" alt="" srcset="">
            </div>
            <div class="box_1">
                <ul>
                    <li @click="$router.push('/notice')">
                        <i class="图标 icon iconfont icon-gonggao"></i>
                        <span>系统公告</span>
                        <i class="icon iconfont icon-xiangyou"></i>
                    </li>
                    <li @click="$router.push('/message')">
                        <i class="图标 icon iconfont icon-wenben"></i>
                        <span>消息通知</span>
                        <i class="icon iconfont icon-xiangyou"></i>
                    </li>
                </ul>
            </div>
                
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:'config'
        })
    },
}
</script>

<style lang="scss" scoped>
.mui-bar-nav{   
    box-shadow: none;
}

.bg_1{
    position: relative;
    z-index: 0;
    width: 100%;
    @include bgcolor;
    img{
        width: 100%;
    }
}

.box_1{
    position: relative;
    z-index: 1;
    width: 90%;
    // background: #f3f3f3;
    background:linear-gradient(#dedede, #fff);
    border-radius: 10px;
    margin: _vw(-30) auto 0px;
    padding: 20px;
    li{
        background: #ffffff;
        border-radius: 5px;
        height: _vw(46);
        margin: _vw(10) 0px;
        padding: 0px 15px;
        display: flex;
        align-items: center;
        span{
            flex-grow: 1;
            font-size: _vw(14);
        }
        .图标{
            color: red;
            margin: 0px 5px 0px 0px;
            font-size: _vw(20);
        }
    }
}
</style>

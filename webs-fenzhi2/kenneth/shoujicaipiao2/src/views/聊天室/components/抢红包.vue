<template>
    <div class="抢红包">
        <div class="内容">
            <img class="bg" src="static/image/liaotian/hongbao.png" alt="" srcset="">
            <div @click="设置抢红包(false)" class="关闭">
                <i class="icon iconfont icon-guanbi"></i>
            </div>
            <div class="红包数量">
                30 
            </div>
            <ul class="list">
                <li v-for="(item, index) in 20" :key="index">
                    <i class="icon iconfont icon-hongbao"></i>
                    <div>系统管理员发送18894元整点红包</div>
                    <button :class="{'过期':index>3}">
                        {{index>3 ? '已过期' : '领取'}}
                    </button>
                </li>
            </ul>
            <div class="领取条件">
                <marquee scrolldelay="100">
                    领取条件：每天累计打码1000以上，即可领取当天24个整点红包。
                </marquee>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            
        }
    },
    inject:['设置抢红包']
}
</script>

<style lang="scss" scoped>
.抢红包{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0,0,0,0.3);
    z-index: 21;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
    .内容{
        width: _vw(300);
        position: relative;
        max-height: 100%;
        overflow: auto;
    }
    .bg{
        width: 100%;
    }
    .关闭{
        position: absolute;
        top: _vw(5);
        right: _vw(5);
        background: rgba(0,0,0,0.3);
        color: #ffffff;
        border-radius: 100%;
        width: _vw(30);
        height: _vw(30);
        text-align: center;
        line-height: _vw(30);
        font-size: _vw(12);
    }
    .红包数量{
        text-align: center;
        position: absolute;
        width: 100%;
        left: 0px;
        top: _vw(70);
        line-height: _vw(55);
        font-size: _vw(24);
        color: red;
    }
    
}
.list{
    width: 100%;
    position: absolute;
    top: _vw(130);
    bottom: _vw(55);
    overflow: auto;
    li{
        display: flex;
        padding: _vw(5) _vw(10);
        i{
            font-size: _vw(20);
            margin: 0px _vw(5) 0px 0px;
            flex-shrink: 0;
            color: #f9ea00;
        }
        div{
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ffffff;
            font-size: _vw(13);
        }
        button{
            flex-shrink: 0;
            font-size: _vw(12);
            width: _vw(50);
            height: _vw(20);
            padding: 0px;
            background: linear-gradient(90deg,#fae799,#ffc04a);
            color: #c30b00;
            border: none;
            border-radius: _vw(20);
        }
    }  
}
.领取条件{
    position: absolute;
    width: 100%;
    line-height: _vw(42);
    left: 0px;
    bottom: 0px;
    box-sizing: border-box;
    color: #ffffff;
    font-size: _vw(12);
    padding:0px _vw(40);
    marquee{
        display: block;
    }
}
</style>
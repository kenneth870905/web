<template>
    <div>
        <ul class="开奖号" >
            <li class="定位">
                <div class="时间">时间</div>
                <div class="期数">期数</div>
                <div class="item item1">
                    <div @tap="type=0" :class="{'active':type==0}">号码</div>
                    <!-- <div @tap="type=1" :class="{'active':type==1}">大小</div> -->
                    <!-- <div @tap="type=2" :class="{'active':type==2}">
                        单双
                    </div> -->
                    <div @tap="type=3" :class="{'active':type==3}">
                        总和/形态
                    </div>
                </div>
            </li>
            <li v-for="(item, index) in 30" :key="index">
                <div class="时间">11:30</div>
                <div class="期数">0529009</div>
                <div class="item item2">
                    <div class="号码列表" v-if="type==0">
                        <span class="号码 红球">9</span>
                        <span class="号码 红球">3</span>
                        <span class="号码 红球">1</span>
                    </div>
                    <div class="龙虎列表" v-if="type==3">
                        <span class="红色字体">33</span>
                        <span>大</span>
                        <span>单</span>
                        <span class="红色字体">9</span>
                        <span class="红色字体">5</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name:"",
    data() {
        return {
            type:0
        }
    },
}
</script>

<style lang="scss" scoped>
.开奖号{
    background: #ffffff;
    text-align: center;
    .定位{
        position: sticky;
        top: 0px;
        background: #ffffff;
    }
    >li{
        padding: _vw(10) _vw(5);
        display: flex;
        align-items: center;
        // border-block:
        border-bottom: 1px solid #efeff4;
    }
    .时间{
        color: #999999;
        font-size: _vw(13);
        width: _vw(50);
        flex-shrink: 0;
    }
    .期数{
        width: _vw(60);
        flex-shrink: 0;
        color: #999999;
        font-size: _vw(13);
    }
    .item{
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .item1{
        color: #212121;
        font-size: _vw(14);
        div{
            height: _vw(26);
            line-height: _vw(26);
            border-radius: _vw(26);
            padding: 0px _vw(10);
        }
        .active{
            color: #ffffff;
            background: #ff7614;
        }
    }
}

.号码列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
    .号码{
        width: _vw(22);
        height: _vw(22);
        border-radius: 5px;
        border-radius: 100%;
        text-align: center;
        font-size: _vw(12);
        line-height: _vw(22);
        color: #ffffff;
        // text-shadow: 0px 1px 0px #000000;
    }
    .蓝球{
        background: #0064ec;
    }
    .红球{
        background: $color;
    }
}

.龙虎列表,
.单双列表,
.大小列表{
    display: flex;
    width: 100%;
    justify-content: space-around;
}

.龙虎列表{
    font-size: _vw(14);
    .红色字体{
        color: $color;
    }
}

</style>

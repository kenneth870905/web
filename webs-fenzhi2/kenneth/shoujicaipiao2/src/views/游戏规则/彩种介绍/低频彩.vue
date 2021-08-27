<template>

    <div class="mint-tab-container-item lottery-intro wfgz-content" style="">
            <div class="timing">
                <div class="topic"><i class="iconfont icon-wait"></i>开奖时间</div>
                <div class="time">
                    排列三:
                    <p>一天一期，每天20:30开奖</p>
                </div>
                <div class="time">
                    福彩3D:
                    <p>一天一期，每天21:15开奖</p>
                </div>
            </div>
            <div class="intro">
                <div class="topic"><i class="iconfont icon-rule"></i>玩法简介</div>
                <div class="list">
                    <div class="item"><span>1.</span>
                        <p>每期从0-9中随机开出3个号码作为开奖号。</p>
                    </div>
                </div>
                <div class="list">
                    <div class="item"><span>2.</span>
                        <p>玩法分为定位胆、不定胆和排列三，具体玩法说明如下：</p>
                    </div>
                    <div class="children">
                        <div class="item"><span><i class="iconfont icon-jiantou8"></i></span>
                            <p> 定位胆：在任意位置上选1个号码</p>
                        </div>
                        <!---->
                    </div>
                    <div class="children">
                        <div class="item"><span><i class="iconfont icon-jiantou8"></i></span>
                            <p> 不定胆</p>
                        </div>
                        <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                            <p>直选：选择三个数字投注，顺序一致。将投注号码以唯一的排列方式进行投注。</p>
                        </div>
                        <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                            <p>组选三：选择三个数字投注，顺序不限，但投注的三位号码有两位相同（对子）。有2个数字相同的3个数字有3种不同的排列方式，即1次投注有3个中奖机会，这种投注方式为组选三。示例：112，排列方式有112、121、211。
                            </p>
                        </div>
                        <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                            <p>组选六：选择三个数字投注，顺序不限，且投注的三位号码各不相同。3个不同的数字有6种不同的排列方式，即1次投注有6个中奖机会，这种投注方式为组选六。示例：123，排列方式有123、132、213、231、312、321。
                            </p>
                        </div>
                        <!---->
                    </div>
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
}
</script>

<style lang="scss" scoped>
.wfgz-content{
    padding: _vw(10);
}
.topic {
    margin-bottom: _vw(15);
    i {
        margin-right: _vw(5);
    }
}
.icon{
    color: $color;
}
.list{
    .item {
        display: flex;
        margin-left: _vw(5);
    }
} 
.time{
    margin-left: _vw(20);
}

.icon-tubiaozhizuo-{
    transform: rotate(-90deg);
    display: block;
}

</style>

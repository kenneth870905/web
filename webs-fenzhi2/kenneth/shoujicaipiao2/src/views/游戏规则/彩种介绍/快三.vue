<template>
    <div class="mint-tab-container-item lottery-intro wfgz-content">
                    <div class="timing">
                        <div class="topic"><i class="icon iconfont icon-dengdai"></i>开奖时间</div>
                        <div class="time">
                            分分快三:
                            <p>00:00-00:00（次日），每1分钟一期，全天1440期</p>
                        </div>
                        <div class="time">
                            江苏快三:
                            <p>8:40-22:10，每20分钟一期，全天41期</p>
                        </div>
                    </div>
                    <div class="intro">
                        <div class="topic"><i class="icon iconfont icon-wenben"></i>玩法简介</div>
                        <div class="list">
                            <div class="item"><span>1.</span>
                                <p>快3投注是指以三个号码组合为一注进行单式投注，每个投注号码为1-6共六个自然数中的任意一个，一组三个号码的组合称为一注。</p>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>2.</span>
                                <p>每期从3粒骰子的点数中随机开出3个号码作为开奖号。</p>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>3.</span>
                                <p>快3根据号码组合共分为“和值”、“三同号”、“二同号”、“三不同号”、“二不同号”、“三连号通选”投注方式，具体规定如下：</p>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 和值投注：是指对三个号码的和值进行投注，包括“和值4”至“和值17”投注。</p>
                                </div>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 三同号投注：是指对三个相同的号码进行投注，具体分为：</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>三同号通选：是指对所有相同的三个号码（111、222、…、666）进行投注；</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>三同号单选：是指从所有相同的三个号码（111、222、…、666）中任意选择一组号码进行投注。</p>
                                </div>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 二同号投注：是指对两个指定的相同号码进行投注，具体分为：</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>二同号复选：是指对三个号码中两个指定的相同号码和一个任意号码进行投注；</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>二同号单选：是指对三个号码中两个指定的相同号码和一个指定的不同号码进行投注。</p>
                                </div>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 三不同号投注：是指对三个各不相同的号码进行投注。</p>
                                </div>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 二不同号投注：是指对三个号码中两个指定的不同号码和一个任意号码进行投注。</p>
                                </div>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 三连号通选投注：是指对所有三个相连的号码（仅限：123、234、345、456）进行投注。</p>
                                </div>
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

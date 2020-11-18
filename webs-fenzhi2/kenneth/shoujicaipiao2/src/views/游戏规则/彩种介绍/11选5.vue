<template>

    <div class="mint-tab-container-item lottery-intro wfgz-content">
                    <div class="timing">
                        <div class="topic"><i class="icon iconfont icon-dengdai"></i>开奖时间</div>
                        <div class="time">
                            分分11选5:
                            <p>00:00-00:00（次日），每1分钟一期，全天1440期</p>
                        </div>
                        <div class="time">
                            山东11选5:
                            <p>8:37-22:57，每20分钟一期，全天43期</p>
                        </div>
                        <div class="time">
                            广东11选5:
                            <p>9:11-23:01，每20分钟一期，全天42期</p>
                        </div>
                    </div>
                    <div class="intro">
                        <div class="topic"><i class="icon iconfont icon-wenben"></i>玩法简介</div>
                        <div class="list">
                            <div class="item"><span>1.</span>
                                <p>11选5号码投注范围01-11，每期开出5个号码作为开奖号，顺序从左至右。</p>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>2.</span>
                                <p>11选5玩法即竞猜5位开奖号码的全部或部分号码。</p>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>3.</span>
                                <p>直选：将投注号码以惟一的排列方式进行投注。</p>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>4.</span>
                                <p>组选：将投注号码的所有排列方式作为一注投注号码进行投注，即号码顺序不限，开奖号中包含投注号码则中奖。示例：前三组选01 02 03，排列方式有01 02 03、01 03 02、02 01
                                    03、02 03 01、03 01 02、03 02 01，共计6种。</p>
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

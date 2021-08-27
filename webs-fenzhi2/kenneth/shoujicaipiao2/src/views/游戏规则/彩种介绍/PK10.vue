<template>
<div class="mint-tab-container-item lottery-intro wfgz-content">
            <div class="timing">
                <div class="topic"><i class="icon iconfont icon-dengdai"></i>开奖时间</div>
                <div class="time">
                    北京PK拾:
                    <p>9:30-23:50，每20分钟一期，全天44期</p>
                </div>
                <div class="time">
                    极速PK拾:
                    <p>全天24小时不间断开奖，每1分钟一期，全天1440期</p>
                </div>
            </div>
            <div class="intro">
                <div class="topic"><i class="icon iconfont icon-wenben"></i>玩法简介</div>
                <div class="list">
                    <div class="item"><span>1.</span>
                        <p>每期从01-10中随机开出10个号码作为当期开奖车号，顺序从左至右。</p>
                    </div>
                </div>
                <div class="list">
                    <div class="item"><span>2.</span>
                        <p>PK拾采用排列式玩法。从左至右共有十个投注位置，排列顺序分别为一至十号位置，每个位置可从01-10的自然数中选择一个号码。</p>
                    </div>
                </div>
                <div class="list">
                    <div class="item"><span>3.</span>
                        <p>先选择投注位置个数，投注位置个数最少一个、最多十个，在所选位置上从01-10的自然数中选择一个号码进行投注。</p>
                    </div>
                </div>
                <div class="list">
                    <div class="item"><span>4.</span>
                        <p>若投注位置个数超过两个的，后选位置的投注号码不能与前面所有已选位置的投注号码相同。</p>
                    </div>
                </div>
                <div class="list">
                    <div class="item"><span>5.</span>
                        <p>所选号码按位置顺序排序组成一组号码，该组号码即为一注PK拾投注号码。</p>
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

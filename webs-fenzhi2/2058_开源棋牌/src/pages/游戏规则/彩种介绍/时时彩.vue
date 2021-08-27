<template>
    <div class="mint-tab-container-item lottery-intro wfgz-content">
        <div class="timing">
            <div class="topic">
                <i class="icon iconfont icon-dengdai"></i>开奖时间
            </div>
            <div class="time">
                重庆时时彩:
                <p>07:30-23:50（51期），每20分钟一期，00:30-03:10（9期），每20分钟一期，全天59期</p>
            </div>
            <div class="time">
                分分时时彩:
                <p>00:00-00:00（次日），每1分钟一期，全天1440期</p>
            </div>
            <div class="time">
                三分时时彩:
                <p>00:00-00:00（次日），每3分钟一期，全天480期</p>
            </div>
            <div class="time">
                五分时时彩:
                <p>09:05-23:55，每5分钟一期，全天179期</p>
            </div>
        </div>
        <div class="intro">
            <div class="topic">
                <i class="icon iconfont icon-wenben"></i>玩法简介
            </div>
            <div class="list">
                <div class="item">
                    <span>1.</span>
                    <p>时时彩投注区分为万位、千位、百位、十位和个位，各位号码范围为0～9。每期从各位上开出1个号码作为中奖号码，即开奖号码为5位数。时时彩玩法即是竞猜5位开奖号码的全部号码、部分号码或部分号码特征。</p>
                </div>
            </div>
            <div class="list">
                <div class="item">
                    <span>2.</span>
                    <p>时时彩中“复式”和“单式”的玩法规则相同，区别于单式需手动勾选位置、输入号码。</p>
                </div>
            </div>
            <div class="list">
                <div class="item">
                    <span>3.</span>
                    <p>时时彩分星彩玩法和大小单双玩法。星彩玩法包括五星、三星、二星和一星。</p>
                </div>
                <div class="children">
                    <div class="item">
                        <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                        <p>直选: 将投注号码以唯一的排列方式进行投注。</p>
                    </div>
                    <!---->
                </div>
                <div class="children">
                    <div class="item">
                        <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                        <p>组选: 将投注号码的所有排列方式作为一注投注号码进行投注。示例：123，排列方式有123、132、213、231、312、321，共计6种。</p>
                    </div>
                    <!---->
                </div>
                <div class="children">
                    <div class="item">
                        <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                        <p>组选三: 在三星组选中，如果一注组选号码的3个数字有两个数字相同，则有3种不同的排列方式，因而就有3个中奖机会，这种组选投注方式简称组选三。示例：112，排列方式有112、121、211。</p>
                    </div>
                    <!---->
                </div>
                <div class="children">
                    <div class="item">
                        <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                        <p>组选六: 在三星组选中，如果一注组选号码的3个数字各不相同，则有6种不同的排列方式，因而就有6个中奖机会，这种组选投注方式简称组选六。示例：123，排列方式有123、132、213、231、312、321，共计6种。</p>
                    </div>
                    <!---->
                </div>
                <div class="children">
                    <div class="item">
                        <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                        <p>大小单双: 号码0～9中，0～4为小，5～9为大，1、3、5、7、9为单，0、2、4、6、8为双。</p>
                    </div>
                    <!---->
                </div>
                <div class="children">
                    <div class="item">
                        <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                        <p>龙虎: 根据指定位置上的号码数值比大小，首选号大于后选号为龙，小则为虎。</p>
                    </div>
                    <!---->
                </div>
                <div class="children">
                    <div class="item">
                        <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                        <p>跨度: 对指定位置上的号码的最大最小数字差值进行投注。</p>
                    </div>
                    <!---->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    data() {
        return {

        }
    },
}
</script>

<style scoped>
.wfgz-content{
    padding: _vw(10);
}
.topic {
    margin-bottom: _vw(15);
}
.topic i {
        margin-right: _vw(5);
    }

.icon{
    color: red;
}

.list .item {
        display: flex;
        margin-left: _vw(5);
    }

.time{
    margin-left: _vw(20);
}

.icon-tubiaozhizuo-{
    transform: rotate(-90deg);
    display: block;
}

</style>


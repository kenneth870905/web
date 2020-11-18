<template>
<div class="mint-tab-container-item lottery-intro wfgz-content">
    <div class="timing">
        <div class="topic"><i class="icon iconfont icon-dengdai"></i>开奖时间</div>
        <div class="time">
            香港六合彩:
            <p>每周开奖3期，通常于周二、周四及非赛马日的周六或周日21:35开奖</p>
        </div>
        <div class="time">
            极速六合彩:
            <p>每5分钟一期，24小时不间断开奖，全天开奖288期</p>
        </div>
        <div class="time">
            澳门六合彩:
            <p>每一天一期，每晚21:35开奖</p>
        </div>
        <div class="time">
            台湾六合彩:
            <p>通常每周二和周五20：50开奖</p>
        </div>
    </div>
    <div class="intro">
        <div class="topic"><i class="icon iconfont icon-wenben"></i>玩法简介</div>
        <div class="list">
            <div class="item"><span>1.</span>
                <p>每期从01-49中随机开出7个号码，首6个号码为：正码，第7个号码为：特码。</p>
            </div>
        </div>
        <div class="list">
            <div class="item"><span>2.</span>
                <p>具体规则说明如下：</p>
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 特码大小单双</p>
                </div>
                <div class="item detail">
                    <p>特大:开出的特码在25~48范围内。</p>
                </div>
                <div class="item detail">
                    <p>特小:开出的特码在01~24范围内。</p>
                </div>
                <div class="item detail">
                    <p>特双:特码为双数，如18、20、34、42。</p>
                </div>
                <div class="item detail">
                    <p>特单:特码为单数，如01、11、35、47。</p>
                </div>
                <div class="item detail">
                    <p>和局:特码为49。</p>
                </div>
                <!---->
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 特码合数大小单双</p>
                </div>
                <div class="item detail">
                    <p>合大:指特码的个位加上十位之和大于等于7，如07、09、43、36。</p>
                </div>
                <div class="item detail">
                    <p>合小:指特码的个位与十位相加之和小于等于6，如30、14、22。</p>
                </div>
                <div class="item detail">
                    <p>合双:指指特码的个位加上十位之和为“双数”，如02、11、33、44。</p>
                </div>
                <div class="item detail">
                    <p>合单:指特码的个位加上十位之和为“单数”，如01、14、36、47。</p>
                </div>
                <div class="item detail">
                    <p>和局:当期开出的特码为49时，视为和局，自动返还投注本金。</p>
                </div>
                <!---->
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 特码尾数大小</p>
                </div>
                <div class="item detail">
                    <p>特尾大:5尾~9尾为大，如05、18、19。</p>
                </div>
                <div class="item detail">
                    <p>特尾小:0尾~4尾为小，如01、32、44。</p>
                </div>
                <div class="item detail">
                    <p>和局:当期开出的特码为49时，视为和局，自动返还投注本金。</p>
                </div>
                <!---->
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 总和大小单双</p>
                </div>
                <div class="item detail">
                    <p>总和大:当期开奖号码的7个号码相加之和大于或等于175。</p>
                </div>
                <div class="item detail">
                    <p>总和小:当期开奖号码的7个号码相加之和小于或等于174。</p>
                </div>
                <div class="item detail">
                    <p>总和单:当期开奖号码的7个号码相加之和为奇数。</p>
                </div>
                <div class="item detail">
                    <p>总和双:当期开奖号码的7个号码相加之和为偶数。</p>
                </div>
                <!---->
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 生肖，顺序为 {{生肖顺序}}，如今年是{{生肖顺序[0]}}年，则以{{生肖顺序[0]}}开始，依顺序将49个号码分为12个生肖，具体如下：</p>
                </div>
                <div class="item detail" v-for="(item, index) in marSixNums.sx" :key="index">
                    <p>{{item.name}}：{{item.list.join('、')}}</p>
                </div>
                <p class="item detail">注：生肖中49亦算输赢，不为和；十二生肖属性会根据每年的农历年而变更。</p>
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 色波，指49个号码球分别有红、蓝、绿三种颜色，以特码开出的颜色和投注的颜色相同视为中奖，颜色代表如下：</p>
                </div>
                <div class="item detail">
                    <p>红波：{{marSixNums.colors.HO.list.join('、')}}</p>
                </div>
                <div class="item detail">
                    <p>蓝波：{{marSixNums.colors.LA.list.join('、')}}</p>
                </div>
                <div class="item detail">
                    <p>绿波：{{marSixNums.colors.LV.list.join('、')}}</p>
                </div>
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 特码头数</p>
                </div>
                <div class="item detail">
                    <p>'0'头:01、02、03、04、05、06、07、08、09</p>
                </div>
                <div class="item detail">
                    <p>'1'头:10、11、12、13、14、15、16、17、18、19</p>
                </div>
                <div class="item detail">
                    <p>'2'头:20、21、22、23、24、25、26、27、28、29</p>
                </div>
                <div class="item detail">
                    <p>'3'头:30、31、32、33、34、35、36、37、38、39</p>
                </div>
                <div class="item detail">
                    <p>'4'头:40、41、42、43、44、45、46、47、48、49</p>
                </div>
            </div>
            <div class="children">
                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 特码尾数</p>
                </div>
                <div class="item detail">
                    <p>'0'尾:10、20、30、40</p>
                </div>
                <div class="item detail">
                    <p>'1'尾:01、11、21、31、41</p>
                </div>
                <div class="item detail">
                    <p>'2'尾:02、12、22、32、42</p>
                </div>
                <div class="item detail">
                    <p>'3'尾:03、13、23、33、43</p>
                </div>
                <div class="item detail">
                    <p>'4'尾:04、14、24、34、44</p>
                </div>
                <div class="item detail">
                    <p>'5'尾:05、15、25、35、45</p>
                </div>
                <div class="item detail">
                    <p>'6'尾:06、16、26、36、46</p>
                </div>
                <div class="item detail">
                    <p>'7'尾:07、17、27、37、47</p>
                </div>
                <div class="item detail">
                    <p>'8'尾:08、18、28、38、48</p>
                </div>
                <div class="item detail">
                    <p>'9'尾:09、19、29、39、49</p>
                </div>
            </div>
            <div class="children">
                <div class="item">
                    <span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                    <p> 五行</p>
                </div>
                <div v-for="(item, index) in marSixNums.wus" :key="index" class="item detail">
                    <p>{{item.name}}：{{item.list.join('、')}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    name: "",
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            marSixNums: 'marSixNums'
        }),
        生肖顺序() {
            var l = [];
            for (const key in this.marSixNums.sx) {
                l.push(this.marSixNums.sx[key].name)
            }
            return l.join('>')
        }
    },
}
</script>

<style lang="scss" scoped>
.wfgz-content {
    padding: _vw(10);
}

.topic {
    margin-bottom: _vw(15);

    i {
        margin-right: _vw(5);
    }
}

.icon {
    color: $color;
}

.list {
    .item {
        display: flex;
        margin-left: _vw(5);
    }
}

.time {
    margin-left: _vw(20);
}

.icon-tubiaozhizuo- {
    transform: rotate(-90deg);
    display: block;
}
</style>

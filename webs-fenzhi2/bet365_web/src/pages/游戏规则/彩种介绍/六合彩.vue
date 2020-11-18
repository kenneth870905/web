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
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>特大:开出的特码在25~48范围内。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>特小:开出的特码在01~24范围内。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>特双:特码为双数，如18、20、34、42。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>特单:特码为单数，如01、11、35、47。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>和局:特码为49。</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 特码合数大小单双</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>合大:指特码的个位加上十位之和大于等于7，如07、09、43、36。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>合小:指特码的个位与十位相加之和小于等于6，如30、14、22。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>合双:指指特码的个位加上十位之和为“双数”，如02、11、33、44。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>合单:指特码的个位加上十位之和为“单数”，如01、14、36、47。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>和局:当期开出的特码为49时，视为和局，自动返还投注本金。</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 特码尾数大小</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>特尾大:5尾~9尾为大，如05、18、19。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>特尾小:0尾~4尾为小，如01、32、44。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>和局:当期开出的特码为49时，视为和局，自动返还投注本金。</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 总和大小单双</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>总和大:当期开奖号码的7个号码相加之和大于或等于175。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>总和小:当期开奖号码的7个号码相加之和小于或等于174。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>总和单:当期开奖号码的7个号码相加之和为奇数。</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>总和双:当期开奖号码的7个号码相加之和为偶数。</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 生肖，顺序为 鼠 &gt;牛 &gt;虎 &gt;兔 &gt;龙 &gt;蛇 &gt;马 &gt;羊 &gt;猴 &gt;鸡 &gt;狗 &gt;猪
                                        ，如今年是狗年，则以狗开始，依顺序将49个号码分为12个生肖，具体如下：</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>狗:02、14、26、38</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>鸡:03、15、27、39</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>猴:04、16、28、40</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>羊:05、17、29、41</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>马:06、18、30、42</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>蛇:07、19、31、43</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>龙:08、20、32、44</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>兔:09、21、33、45</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>虎:10、22、34、46</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>牛:11、23、35、47</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>鼠:12、24、36、48</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>豬:01、13、25、37、49</p>
                                </div>
                                <p class="item detail">注：生肖中49亦算输赢，不为和；十二生肖属性会根据每年的农历年而变更。</p>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 色波，指49个号码球分别有红、蓝、绿三种颜色，以特码开出的颜色和投注的颜色相同视为中奖，颜色代表如下：</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>红波:01、02、07、08、12、13、18、19、23、24、29、30、34、35、40、45、46</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>蓝波:03、04、09、10、14、15、20、25、26、31、36、37、41、42、47、48</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>绿波:05、06、11、16、17、21、22、27、28、32、33、38、39、43、44、49</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 特码头数</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'0'头:01、02、03、04、05、06、07、08、09</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'1'头:10、11、12、13、14、15、16、17、18、19</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'2'头:20、21、22、23、24、25、26、27、28、29</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'3'头:30、31、32、33、34、35、36、37、38、39</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'4'头:40、41、42、43、44、45、46、47、48、49</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 特码尾数</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'0'尾:10、20、30、40</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'1'尾:01、11、21、31、41</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'2'尾:02、12、22、32、42</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'3'尾:03、13、23、33、43</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'4'尾:04、14、24、34、44</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'5'尾:05、15、25、35、45</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'6'尾:06、16、26、36、46</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'7'尾:07、17、27、37、47</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'8'尾:08、18、28、38、48</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>'9'尾:09、19、29、39、49</p>
                                </div>
                                <!---->
                            </div>
                            <!-- <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p> 五行</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>金:04 05 18 19 26 27 34 35 48 49</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>木:01 08 09 16 17 30 31 38 39 46 47</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>水:06 07 14 15 22 23 36 37 44 45</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>火:02 03 10 11 24 25 32 33 40 41</p>
                                </div>
                                <div class="item detail"><span><i class="iconfont icon-yuandian"></i></span>
                                    <p>土:12 13 20 21 28 29 42 43</p>
                                </div>
                            </div> -->
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

<style  scoped>
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

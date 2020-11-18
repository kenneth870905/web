<template>

    <div class="mint-tab-container-item lottery-intro wfgz-content">
                    <div class="timing">
                        <div class="topic"><i class="icon iconfont icon-dengdai"></i>开奖时间</div>
                        <div class="time">
                            幸运28:
                            <p>08:00-06:00（次日），每2分钟一期，全天660期（06:00-08:00期间不开奖）</p>
                        </div>
                    </div>
                    <div class="intro">
                        <div class="topic"><i class="icon iconfont icon-wenben"></i>玩法简介</div>
                        <div class="list">
                            <div class="item"><span>1.</span>
                                <p>投注号码竞猜范围为0-27，共28个号码。每期开出3个号码作为开奖号码，3个号码之和即为特码。</p>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>2.</span>
                                <p>玩法分为：豹子、混合、波色、特码和特码包三。</p>
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>3.</span>
                                <p>混合：指对开奖特码的形态进行投注，形态号码如下</p>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>大小: 14~27为大，0~13为小</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>极大小: 22~27为极大，0~5为极小</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>大单: 15、17、19、21、23、25、27</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>大双: 14、16、18、20、22、24、26</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>小单: 1、3、5、7、9、11、13</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>小双: 0、2、4、6、8、10、12</p>
                                </div>
                                <!---->
                            </div>
                        </div>
                        <div class="list">
                            <div class="item"><span>4.</span>
                                <p>波色：指对开奖特码的波色进行投注，波色号码如下：</p>
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>绿波号码: 1、4、7、10、16、19、22、25</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>蓝波号码: 2、5、8、11、17、20、23、26</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>红波号码: 3、6、9、12、15、18、21、24</p>
                                </div>
                                <!---->
                            </div>
                            <div class="children">
                                <div class="item"><span><i class="icon iconfont icon-tubiaozhizuo-"></i></span>
                                    <p>灰波号码: 0、13、14、27（若开出灰波号码，则投注任何波色均视为不中奖。）</p>
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

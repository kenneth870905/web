<template>
    <div class="mint-tab-container-item lottery-rule wfgz-rule">
            <div class="rule">
                <p>前一</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            前一
                            <i class="van-icon van-icon-arrow-down"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>前一</span>
                                <p>从01-10中任选1个号码组成一注。所选号与开奖号第一位相同，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>前二</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            前二
                            <i class="van-icon van-icon-arrow-down"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>前二</span>
                                <p>从第一位、第二位中各选1个不同的号码组成一注。所选号与开奖号前两位号码相同，且顺序一致，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>前三</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            前三
                            <i class="van-icon van-icon-arrow-down"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>前三</span>
                                <p>从第一位至第三位中各选1个不同的号码组成一注。所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>定位胆</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            定位胆
                            <i class="van-icon van-icon-arrow-down"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>定位胆</span>
                                <p>从任意位置上选1个号码进行投注。所选号与相同位置上的开奖号一致，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>冠亚和</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            冠亚和
                            <i class="van-icon van-icon-arrow-down"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>和值</span>
                                <p>从3-19中任选1个号码组成一注。所选号等于开奖号冠、亚军车号相加之和，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>龙虎</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            龙虎
                            <i class="van-icon van-icon-arrow-down"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>冠军</span>
                                <p>对冠军车号大于第十名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的冠军车号大于或小于第十名的形态相同，即为中奖。</p>
                            </div>
                            <div class="content"><span>亚军</span>
                                <p>对亚军车号大于第九名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的亚军车号大于或小于第九名的形态相同，即为中奖。</p>
                            </div>
                            <div class="content"><span>季军</span>
                                <p>对季军车号大于第八名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的季军车号大于或小于第八名的形态相同，即为中奖。</p>
                            </div>
                            <div class="content"><span>第四名</span>
                                <p>对第四名车号大于第七名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的第四名车号大于或小于第七名的形态相同，即为中奖。</p>
                            </div>
                            <div class="content"><span>第五名</span>
                                <p>对第五名车号大于第六名车号为龙，小则为虎进行投注，任选1个形态为一注。所选形态与开奖号的第五名车号大于或小于第六名的形态相同，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>大小单双</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            大小单双
                            <i class="van-icon van-icon-arrow-down"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>冠亚季军</span>
                                <p>对开奖号冠、亚、季军的车号大（06~10）小（01~05）单双进行投注。所选形态与相同位置上的开奖号形态一致，即为中奖。</p>
                            </div>
                            <div class="content"><span>冠亚和</span>
                                <p>对冠、亚军车号相加之和的大（12~19）小（3~11）单双进行投注，任选一个形态为一注。所选形态符合开奖号冠、亚军车号相加之和的形态，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import $ from 'jquery'
export default {
    name:"",
    data() {
        return {
            
        }
    },
    mounted() {
        $('.title').click(function(){
            console.log('132')
            $(this).next().toggle(300);
        })
    },
}
</script>

<style  scoped>
.subtitle:not(:last-child), .title:not(:last-child){
    margin-bottom: 0px;
}
.box{
    padding: 0;
}
.wfgz-rule{
    padding-bottom: 40px;
}

.rule>p{
        background: #f5f5f9;
        padding: 5px 10px;
        margin: 0px;
    }
.rule .title{
        padding: 0px 10px 0px 35px;
        border-bottom: 1px solid #e4e4e4;
        line-height: 36px;
        font-size: 14px;
}
.rule .title i{
            float: right;
            color: #929292;
            font-size: 14px;
        }

.content{
    padding: 0px 15px;
}
</style>
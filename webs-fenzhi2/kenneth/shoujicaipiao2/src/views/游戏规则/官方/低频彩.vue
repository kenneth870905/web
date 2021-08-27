<template>
    
    <div class="mint-tab-container-item lottery-rule wfgz-rule">
            <div class="rule">
                <p>三码</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            直选
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>直选-复式</span>
                                <p>从第一、二、三位中各选1个不同的号码组成一注。所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</p>
                            </div>
                            <div class="content"><span>直选-和值</span>
                                <p>从0-27中任选1个号码组成一注。所选号等于开奖号的三个号码相加之和，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            组选
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>组选-组三</span>
                                <p>从0-9中任选2个号码组成两注。不限顺序，开奖号中包含全部所选号，且其中一个号码出现2次，即为中奖。</p>
                            </div>
                            <div class="content"><span>组选-组六</span>
                                <p>从0-9中任选3个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</p>
                            </div>
                            <div class="content"><span>组选-混合</span>
                                <p>从第一、二、三位中各选1个不同的号码组成一注。所选号与开奖号前三位号码相同，且顺序一致，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>二码</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            后二码直选
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>复式</span>
                                <p>从十、个位中各选1个号码组成一注。所选号与开奖号十、个位号码相同，且顺序一致，即为中奖。</p>
                            </div>
                            <div class="content"><span>和值</span>
                                <p>从0-18中任选1个号码组成一注。所选号等于开奖号十、个位两个号码相加之和，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            后二码组选
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>复式</span>
                                <p>从0-9中任选2个号码组成一注。不限顺序，所选号与开奖号十、个位相同，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            前二码直选
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>复式</span>
                                <p>从百、十位中各选1个号码组成一注。所选号与开奖号百、十位号码相同，且顺序一致，即为中奖。</p>
                            </div>
                            <div class="content"><span>和值</span>
                                <p>从0-18中任选1个号码组成一注。所选号等于开奖号百、十位两个号码相加之和，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                    <div class="item">
                        <div class="title">
                            前二码组选
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>复式</span>
                                <p>从0-9中任选2个号码组成一注。不限顺序，开奖号百、十位中包含全部所选号，即为中奖。</p>
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
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>定位胆</span>
                                <p>任选1个位置并选1个号码组成一注。所选号与相同位置上的开奖号一致，即为中奖。</p>
                            </div>
                            <!---->
                        </div>
                    </div>
                </div>
            </div>
            <div class="rule">
                <p>不定胆</p>
                <div class="box">
                    <!---->
                    <div class="item">
                        <div class="title">
                            不定胆
                            <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                        <div style="display: none;">
                            <div class="content"><span>一码不定胆</span>
                                <p>从0-9中任选1个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</p>
                            </div>
                            <!---->
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
    mounted() {
        $('.title').click(function(){
            console.log('132')
            $(this).next().slideToggle(300);
        })
    },
}
</script>

<style lang="scss" scoped>
.wfgz-rule{
    padding-bottom: 40px;
}
.rule{
    >p{
        background: #f5f5f9;
        padding: 5px 10px;
        margin: 0px;
    }
    .title{
        padding: 0px 10px 0px 35px;
        border-bottom: 1px solid #e4e4e4;
        line-height: 36px;
        font-size: 14px;
        i{
            float: right;
            color: #929292;
            font-size: 14px;
        }
    }
}
.content{
    padding: 0px 15px;
}
</style>

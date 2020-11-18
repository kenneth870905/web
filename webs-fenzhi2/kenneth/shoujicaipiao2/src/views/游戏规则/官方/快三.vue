<template>
    
    <div class="mint-tab-container-item lottery-rule wfgz-rule">
                    <div class="rule">
                        <p>二不同号</p>
                        <div class="box">
                            <div class="item">
                                <div class="title">
                                    二不同号
                                    <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>二不同号</span>
                                        <p>从二同号和不同号中各选1个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>二同号</p>
                        <div class="box">
                            <div class="item">
                                <div class="title">
                                    二同号
                                    <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>单选</span>
                                        <p>从二同号和不同号中各选1个号码组成一注。不限顺序，开奖号中包含全部所选号，即为中奖。</p>
                                    </div>
                                    <div class="content"><span>复选</span>
                                        <p>从6组对子中任选1个对子号码组成一注。不含豹子，开奖号中包含所选对子，即为中奖。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>三不同号</p>
                        <div class="box">
                            <div class="item">
                                <div class="title">
                                    三不同号
                                    <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>三不同号</span>
                                        <p>从1-6中任选3个不相同的号码组成一注。不限顺序，所选号与开奖号相同，即为中奖。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>三同号</p>
                        <div class="box">
                            <div class="item">
                                <div class="title">
                                    三同号
                                    <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>单选</span>
                                        <p>选任意一组号码组成一注。所选号与开奖号相同，即为中奖。</p>
                                    </div>
                                    <div class="content"><span>通选</span>
                                        <p>对6组豹子号码进行通选投注。开奖号与6组豹子号中任意一组号码相同，即为中奖。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>三连号-通选</p>
                        <div class="box">
                            <div class="item">
                                <div class="title">
                                    三连号-通选
                                    <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>三连号-通选</span>
                                        <p>对4组三连号进行通选投注。开奖号与4组三连号中任意一组号码相同，即为中奖。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>和值</p>
                        <div class="box">
                            <div class="item">
                                <div class="title">
                                    和值
                                    <i class="icon iconfont icon-icon-arrow-bottom2"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>和值</span>
                                        <p>从3-18中任选1个号码组成一注。所选号等于开奖号的3个号码相加之和，即为中奖。</p>
                                    </div>
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

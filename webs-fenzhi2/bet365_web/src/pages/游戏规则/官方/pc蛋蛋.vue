<template>
    
    <div class="mint-tab-container-item lottery-rule wfgz-rule">
                    <div class="rule">
                        <p>混合</p>
                        <div class="box">
                            <!---->
                            <div class="item">
                                <div class="title">
                                    混合
                                    <i class="van-icon van-icon-arrow-down"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>混合</span>
                                        <p>对特码的大（14-27）、小（0-13）、单、双、极大（22-27）、极小（0-5）形态进行投注，任选1个形态组成一注。所选形态与开奖特码的形态相同，即为中奖。</p>
                                    </div>
                                    <!---->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>波色</p>
                        <div class="box">
                            <!---->
                            <div class="item">
                                <div class="title">
                                    波色
                                    <i class="van-icon van-icon-arrow-down"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>波色</span>
                                        <p>对开奖特码的波色进行投注，任选1个波色组成一注。所选波色与开奖特码波色相同，即为中奖。如开出灰波（0、13、14、27）则投注任何波色均视为不中奖。</p>
                                    </div>
                                    <!---->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>豹子</p>
                        <div class="box">
                            <!---->
                            <div class="item">
                                <div class="title">
                                    豹子
                                    <i class="van-icon van-icon-arrow-down"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>豹子</span>
                                        <p>投注当期的3个开奖号为豹子号码。3个开奖号码为同一号码，即为中奖。</p>
                                    </div>
                                    <!---->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>特码包三</p>
                        <div class="box">
                            <!---->
                            <div class="item">
                                <div class="title">
                                    特码包三
                                    <i class="van-icon van-icon-arrow-down"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>特码包三</span>
                                        <p>对开奖特码进行投注，任选3个号码组成一注。所选的3个号码中任一号码与开奖特码相同，即为中奖。</p>
                                    </div>
                                    <!---->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rule">
                        <p>特码</p>
                        <div class="box">
                            <!---->
                            <div class="item">
                                <div class="title">
                                    特码
                                    <i class="van-icon van-icon-arrow-down"></i></div>
                                <div style="display: none;">
                                    <div class="content"><span>特码</span>
                                        <p>对开奖特码进行投注，任选1个号码组成一注。所选号与开奖特码相同，即为中奖。</p>
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
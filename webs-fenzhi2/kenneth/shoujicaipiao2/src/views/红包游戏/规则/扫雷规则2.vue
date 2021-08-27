<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">玩法规则</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="img_1">
                <img :src="config.img_url+'static/image/hbgame/saolei_21.jpg'" />
            </div>
            <div class="content_1">
                <div class="title_1">
                    扫雷群规
                </div>
                <ul class="list1">
                    <li>
                        1.赔率<span class="黄色">1.6</span>倍，抢包者如中雷，须赔付给发包者<span class="黄色">红包总金额的1.6倍</span>
                    </li>
                    <li>
                        <span>
                        2.豹子顺子有奖励
                        </span>
                        <div>顺子（至少四位连续自然数 如：12.34）</div>
                        <div>豹子（至少三位相同的数字 如1.11）</div>
                        <div>吉祥数字（有特殊含义的数字）</div>
                    </li>
                </ul>
                <div class="title_2">
                    顺子奖励
                </div>
                <table class="table_1">
                    <thead>
                        <tr>
                            <td>抢包金额(元)</td>
                            <td>顺子奖励(元)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>12.34</td>
                            <td>18.88</td>
                        </tr>
                        <tr>
                            <td>23.45</td>
                            <td>28.88</td>
                        </tr>
                        <tr>
                            <td>34.56</td>
                            <td>38.88</td>
                        </tr>
                        <tr>
                            <td>45.67</td>
                            <td>58.88</td>
                        </tr>
                        <tr>
                            <td>56.78</td>
                            <td>68.88</td>
                        </tr>
                        <tr>
                            <td>67.89</td>
                            <td>78.88</td>
                        </tr>
                        <tr>
                            <td>123.45</td>
                            <td>666.66</td>
                        </tr>
                        <tr>
                            <td>234.56</td>
                            <td>888.88</td>
                        </tr>
                    </tbody>
                </table>
                <div class="title_2">
                    豹子奖励
                </div>
                <table class="table_1">
                    <thead>
                        <tr>
                            <td>抢包金额(元)</td>
                            <td>豹子奖励(元)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1.11-9.99</td>
                            <td>5.88</td>
                        </tr>
                        <tr>
                            <td>11.11</td>
                            <td>28.88</td>
                        </tr>
                        <tr>
                            <td>22.22</td>
                            <td>38.88</td>
                        </tr>
                        <tr>
                            <td>33.33</td>
                            <td>38.88</td>
                        </tr>
                        <tr>
                            <td>44.44</td>
                            <td>58.88</td>
                        </tr>
                        <tr>
                            <td>55.55</td>
                            <td>68.88</td>
                        </tr>
                        <tr>
                            <td>66.66</td>
                            <td>78.88</td>
                        </tr>
                        <tr>
                            <td>77.77</td>
                            <td>88.88</td>
                        </tr>
                        <tr>
                            <td>88.88</td>
                            <td>99.99</td>
                        </tr>
                        <tr>
                            <td>99.99</td>
                            <td>199.99</td>
                        </tr>
                        <tr>
                            <td>111.11</td>
                            <td>666.66</td>
                        </tr>
                        <tr>
                            <td>222.22</td>
                            <td>888.88</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:"config"
        })
    },
}
</script>

<style lang="scss" scoped>
.mui-content{
    background: #ef4f43;
}
.img_1{
    img{
        width: 100%;
    }
}
.content_1{
    background: #fffbf2;
    border-radius: 10px;
    margin: 15px;
    padding: 15px ;
    color: #f96028;
    .title_1{
        background: #fa125c;
        color: #ffffff;
        width: _vw(140);
        background: #fa125c;
        margin: 0px auto _vw(20);
        position: relative;
        text-align: center;
        line-height: _vw(22);
        font-size: _vw(14);
        &::before,
        &::after{
            position: absolute;
            content: "";
        }
        &::after{
            left: _vw(-11);
            border-top: _vw(11) solid transparent;
            border-right: _vw(11) solid #fa125c;
            border-bottom: _vw(11) solid transparent;
        }
        &::before{
            right: _vw(-11);
            border-top: _vw(11) solid transparent;
            border-left: _vw(11) solid #fa125c;
            border-bottom: _vw(11) solid transparent;
        }
    }
    .list1{
        font-size: _vw(15);
        color: #ef551f;
        line-height: _vw(22);
        li{
            margin: 0px 0px 18px 0px;
        }
        div{
            margin: 10px 0px 0px 0px;
            text-indent: _vw(12);
        }
    }
    .title_2{
        font-size: _vw(16);
        font-weight: bold;
        margin: _vw(20) 0px 10px;
    }
    .table_1{
        text-align: center;
        width: 100%;
        border-left: 1px solid #ef551f;
        border-top: 1px solid #ef551f;
        border-right: 1px solid #ef551f;
        thead{
            background: #ef551f;
            color: #fff;
            td:nth-child(1){
                border-right: 1px solid #ffffff;
            }
        }
        tbody{
            td{
                border-bottom: 1px solid #ef551f;
            }
            td:nth-child(1){
                border-right: 1px solid #ef551f;
            }
        }
        td{
            height: _vw(36);
        }
    }
}
.黄色{
    color: #f9bb09
}

</style>

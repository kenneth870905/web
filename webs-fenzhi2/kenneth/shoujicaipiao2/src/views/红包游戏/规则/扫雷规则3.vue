<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a  class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">玩法规则</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="img_1">
                <img :src="config.img_url+'static/image/hbgame/saolei_23.jpg'" />
            </div>
            <div class="content_1">
                <div class="box_1">
                    <div class="border_1 box_2">
                        1.赔率<span class="红色">1.6</span>倍，抢包者如中雷，须赔付给发包者<span class="红色">红包总金额的1.6倍</span>
                    </div>
                </div>

                <div class="box_1">
                    <div class="border_1 box_2">
                        <div>2.豹子顺子有奖励</div>
                        <div><span class="红色">顺子</span>（至少四位连续自然数 如：12.34）</div>
                        <div><span class="红色">豹子</span>（至少三位相同的数字 如1.11）</div>
                        <div><span class="红色">吉祥数字</span>（有特殊含义的数字）</div>
                    </div>
                </div>

                <div class="box_1">
                    <div class="border_1">
                        <div class="title_1">顺子奖励</div>
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
                    </div>
                </div>

                <div class="box_1">
                    <div class="border_1">
                        <div class="title_1">豹子奖励</div>
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
    background: #090806;
}
.img_1{
    img{
        width: 100%;
    }
}
.content_1{
    margin: 0px 10px;
    font-size: _vw(14);
    .box_1{
        overflow: hidden;
        border-radius: 8px;
        color: #9a7b43;
        margin: 0px 0px _vw(10) 0px;
    }
    .border_1{
        padding: 5px 5px 20px;
        background: #fef7e5;
        border-top: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 15px solid transparent;
        border-image: linear-gradient(60deg, #f4cb8b,#fcf7ae, #a87c3d);
        border-image-slice: 10;
        min-height: calc( #{_vw(80)} + 25px) 
    }
    .box_2{
        line-height: _vw(22);
    }
    .title_1{
        color: #d63733;
        padding: 5px;
        font-weight: bold;
    }
    .table_1{
        width: 85%;
        margin: 0px auto;
        text-align: center;
        border-left: 1px solid #ae8441;
        border-top: 1px solid #ae8441;
        border-right: 1px solid #ae8441;
        border-bottom: 1px solid #ae8441;
        td{
            height: _vw(36);
        }
        td:nth-child(1){
            border-right: 1px solid #ae8441;
        }
        thead{
            background: #f5c55f;
            color: #fff;
        }
        tbody{
            td{
                border-top: 1px solid #ae8441;
            }
        }
    }
}
.红色{
    color:#d63733; 
}



</style>

<template>
    <div class="banner">
        <img src="static/image/banner-3.jpg" alt />
    </div>

    <div class="box-1">
        <div class="w1200">
            <div class="title">通知:</div>
            <marquee>滚动文字滚动文字滚动文字滚动文字</marquee>
            <div></div>
        </div>
    </div>

    <div class="list">
        <el-row :gutter="20">
            <el-col :span="12" v-for="item in 4">
                <div class="item" @click="showDetails=true">
                    <div>
                        <img src="https://file.32828a.com/images/LUCKYCF/3eae58be1dace3463c2368c8cf33cf30_5178877.jpg" alt srcset />
                    </div>
                    <div class="title-1">不计输赢 天天洗码 1% 无上限</div>
                    <i class="icon-1 el-icon-zoom-in"></i>
                </div>
            </el-col>
        </el-row>
    </div>

    <el-dialog title="红利优惠" v-model="showDetails" width="1000px" >
        <div class="Details">
                <img class="w-100 img-fluid" id="promotionImage" src="https://file.32828a.com/images/LUCKYCF/22445990dc36a1b1b1cd1f7c05c0bbf7_5133943.jpg">
                <br>
                <br>
                <h5 id="promotionTitle">新用户首存最高送88888泰铢</h5>
                <hr>
                <div id="promotionContent"><p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">【活动内容】</font></span></span></span></span></p>

                <table class="MsoTableGrid" style="border-collapse:collapse; width:484.8500pt; border:1.0000pt solid windowtext; text-align:justify; font-family:&quot;Times New Roman&quot;; font-size:10pt">
                    <tbody>
                        <tr style="height:13.4000pt">
                            <td style="border-bottom:1.0000pt solid windowtext; width:96.9500pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:1.0000pt solid windowtext; border-right:1.0000pt solid windowtext; border-top:1.0000pt solid windowtext" valign="top" width="161">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">存款</span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:82.7000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:1.0000pt solid windowtext" valign="top" width="137">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">比例</span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:121.1000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:1.0000pt solid windowtext" valign="top" width="201">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">红利金额</span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:87.1000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:1.0000pt solid windowtext" valign="top" width="145">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">流水倍数</span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:97.0000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:1.0000pt solid windowtext" valign="top" width="161">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">最低存款</span></span></span></span></p>
                            </td>
                        </tr>
                        <tr style="height:26.8000pt">
                            <td style="border-bottom:1.0000pt solid windowtext; width:96.9500pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:1.0000pt solid windowtext; border-right:1.0000pt solid windowtext; border-top:none" valign="top" width="161">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">首存</span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:82.7000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:none" valign="top" width="137">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">10%</span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:121.1000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:none" valign="top" width="201">
                            <p align="center" class="p" style="text-indent:0.0000pt; text-align:center"><span style="font-size:12pt"><span style="font-family:Calibri"><span style="font-size:12.0000pt"><span style="font-family:宋体">达到 <font face="Calibri">88888 </font><font face="宋体">泰铢</font></span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:87.1000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:none" valign="top" width="145">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">1</span></span></span></span></p>
                            </td>
                            <td style="border-bottom:1.0000pt solid windowtext; width:97.0000pt; padding:0.0000pt 5.4000pt 0.0000pt 5.4000pt ; border-left:none; border-right:1.0000pt solid windowtext; border-top:none" valign="top" width="161">
                            <p align="center" style="text-align:center"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体">10 THB</span></span></span></span></p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">【申请方式】只要您在</font><font face="宋体">好运来斗鸡</font><font face="宋体">注册成为会员，首次存款后联系在线客服申请</font></span></span></span></span></p>

                <p style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">【活动规则】</font></span></span></span></span></p>

                <ol>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">在</font><font face="宋体">好运来斗鸡</font><font face="宋体">进行第一次存款时，会员可自由选择，获取</font><font face="Calibri">/</font><font face="宋体">放弃。（注意：如果在未向客服申请红利之前已经投注，我们将视为您放弃本优惠享有权利。）</font></span></span></span></span></li>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">会员首次存款后</font>, <font face="宋体">必须</font><font face="Calibri">24</font><font face="宋体">小时内向在线客服申请</font><font face="Calibri">, </font><font face="宋体">审核通过后将在</font><font face="Calibri">20</font><font face="宋体">分钟内派发到您的会员账户里。</font></span></span></span></span></li>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">首次存款优惠</font><font face="Calibri">1</font><font face="宋体">倍的有效投注额可申请提款，财务保留权限审核</font><font face="Calibri">/</font><font face="宋体">取消您的提款申请。</font></span></span></span></span></li>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">每位会员首存红利只限申请一次，多账户申请将被取消申请此优惠资格。</font></span></span></span></span></li>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">此项优惠必须在斗鸡投注进行，投注在真人荷官，彩票，老虎机将不计算在内。</font></span></span></span></span></li>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">本优惠不得与返点优惠并用，会员获得首次存款优惠后，必须成功进行一次取款才可获得返点。</font></span></span></span></span></li>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">会员同一地址，同一账户，同一姓名，同一提款账户，同一电话或同一</font>IP<font face="宋体">等相同者，我们将视为同一人。我们有权随时收回任何会员任何或者全部优惠。</font></span></span></span></span></li>
                    <li style="text-align:justify"><span style="font-size:10.5pt"><span style="font-family:Calibri"><span style="font-size:10.5000pt"><span style="font-family:宋体"><font face="宋体">好运来斗鸡场保留对活动的最终解释权，以及在无通知的情况下修改、终止活动的权利。</font></span></span></span></span></li>
                </ol>

                <p style="text-align:justify">&nbsp;</p>
                </div>
        </div>
    </el-dialog>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(props) {
        
        let showDetails=ref(false)
        return {
            showDetails
        }
    }
}
</script>

<style lang="scss" scoped>
.banner {
    font-size: 0px;
    img {
        width: 100%;
    }
}
.list {
    margin: 30px auto;
    width: 1200px;
    .item {
        margin-bottom: 20px;
        padding: 10px;
        background: #fff;
        cursor: pointer;
        position: relative;
    }
    .icon-1 {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba($color: #000000, $alpha: 0.4);
        color: #fff;
        font-size: 50px;
        transition: all 0.3s;
        opacity: 0;
        &::before {
            margin-top: 30px;
            transition: all 0.3s;
        }
        &:hover {
            opacity: 1;
            &::before {
                margin-top: 0px;
            }
        }
    }

    .title-1 {
        padding: 5px;
        font-size: 20px;
        text-align: center;
        color: var(--color);
    }
    img {
        width: 100%;
    }
}

.box-1 {
    background: var(--color);
    line-height: 40px;
    > div {
        overflow: hidden;
        display: flex;
        align-items: center;
        position: relative;
        &::after,
        &::before {
            content: "";
            width: 100px;
            height: 100px;
            position: absolute;
        }
        &::before {
            top: -50px;
            left: -20px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
        &::after {
            top: -10px;
            right: -30px;
            z-index: 1;
            transform: rotate(45deg);
            background: var(--color);
        }
    }
    .title {
        white-space: nowrap;
        flex-shrink: 0;
        color: #fff;
        position: relative;
        z-index: 1;
    }
    marquee {
        background: #fff;
    }
}

.Details{
    img{
        max-width: 100%;
    }
}
</style>
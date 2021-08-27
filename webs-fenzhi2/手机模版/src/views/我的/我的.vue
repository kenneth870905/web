<template>
    <div>
        <div class="account-top" style="background-image:url('static/image/my/bg_1.png')">
            <p class="title_1">lixunhuan</p>
            <div class="account-money">
                账户余额
                <br>
                <b class="txt-s2">5555</b>元
            </div>
            <p class="btn_1">
                <span @click="$router.push('/my/recharge')">消耗金币</span>
                <span @click="$router.push('/my/withdrawals')">可提现金币</span> 
            </p>
        </div>

        <ul class="account-list">
            <li @click="$router.push('/my/zhzc')">
                <p class="img_1">
                    <img src="static/image/my/bg_2.png">
                </p>
                <div class="title_1">账户资产</div>
                <span class="red_1">288.00</span>
                <span class="text_1">元</span>
                <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/txjl')" class="noborder">
                <p class="img_1">
                    <img src="static/image/my/bg_6.png">
                </p>
                <div class="title_1">提现记录</div>
                <van-icon name="arrow" />
            </li>
            
           
            
        </ul>
        <div class="退出登录">退出登录</div>
    </div>

</template>

<script> 

export default {
    data() {
        return {
          
        }
    },
    components: { // 注册组件

    },
    computed: {
         
    },
    created(){
    },
    methods: {
       
         


    },
    mounted() {
       
    },
}


</script>
<style lang="scss" scoped>
.account-top {
    position: fixed;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 1px 0px;
    font-size: _vw(13);
    background-size: cover;
    .title_1 {
        margin: _vw(20) _vw(10);
    }
    .account-money {
        text-align: center;
        b {
            font-size: _vw(20);
        }
    }
    .btn_1 {
        display: flex;
        margin: _vw(15) 0px 0px;
        background: rgba(255, 255, 255, 0.2);
        span {
            line-height: _vw(40);
            width: 50%;
            text-align: center;
            &:nth-child(1) {
                border-right: 1px solid #acacac;
            }
        }
    }
}

.account-list {
    padding: _vw(166) 0px _vw(20);
    font-size: _vw(13);
    white-space: nowrap;
    li {
        background: #ffffff;
        padding: _vw(10) _vw(20);
        display: flex;
        align-items: center;
        position: relative;
        &:last-child {
            &::after {
                display: none;
            }
        }
        &.noborder {
            margin-bottom: _vw(10);
            &::after {
                display: none;
            }
        }
        &:after {
            position: absolute;
            left: _vw(20);
            right: _vw(20);
            height: 1px;
            content: "";
            background: #dedede;
            bottom: 0px;
        }
        .img_1 {
            flex-shrink: 0;
            margin: 0px;
            width: _vw(28);
            height: _vw(28);
            margin: 0px _vw(10) 0px 0px;
            img {
                width: 100%;
            }
        }
        .title_1 {
            width: 100%;
        }
        .red_1 {
            color: #f00;
            margin: 0px _vw(2) 0px 0px;
        }
        .text_1 {
            color: #999;
        }
        .van-icon-arrow {
            flex-shrink: 0;
            margin: 0px 0px 0px _vw(5);
            font-size: _vw(16);
        }
        .number {
            color:red;
            font-size: _vw(12);
            // height: _vw(14);
            // line-height: _vw(14);
            // background: #f00;
            // color: #ffffff;
            // padding: _vw(0) _vw(5);
            // border-radius: _vw(14);
        }
    }
}

.退出登录 {
    height: _vw(50);
    text-align: center;
    font-size: _vw(20);
    background: #ffffff;
    line-height: _vw(50);
    width: 100%;
    color: red;
}
</style>
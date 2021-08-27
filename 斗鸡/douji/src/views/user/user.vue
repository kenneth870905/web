<template>
    <div class="banner">
        <img src="static/image/doujiBanner.jpg" alt="" srcset="">
    </div>
    <div class="user">
        
        <div class="user-title">
            <div>
                欢迎：abc12345678
            </div>
            <div class="money">账户余额：10000.00  <i class="el-icon-refresh"></i> </div>
        </div>
        
        <div class="content">
            <ul class="left-nav">
                <li><div :class="{active:path=='/user/recharge'}" @click="$router.push('/user/recharge')">充值</div></li>
                <li><div :class="{active:path=='/user/withdraw'}" @click="$router.push('/user/withdraw')">提现</div></li>
                <li><div :class="{active:path=='/user/TransactionRecord'}" @click="$router.push('/user/TransactionRecord')">交易记录</div></li>
                <li><div :class="{active:path=='/user/Conversion'}" @click="$router.push('/user/Conversion')">额度转换</div></li>
                <li><div :class="{active:path=='/user/Agent'}" @click="$router.push('/user/Agent')">代理信息</div></li>
                <li >
                    <div @click="$router.push('/user/Account')">账户信息</div>
                    <ul>
                        <li><div :class="{active:path=='/user/Account'}" @click="$router.push('/user/Account')">个人资料</div></li>
                        <li><div :class="{active:path=='/user/bank'}" @click="$router.push('/user/bank')">银行卡</div></li>
                    </ul>
                </li>
            </ul>
            <div class="right">
                <!-- <div class="title-2">{{title}}</div> -->
                <router-view></router-view>
            </div>
        </div>
        
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
export default {
    setup(props) {
        let route = useRoute()
        console.log(route.meta)
        // let title = computed(()=>{
        //     return route.meta.title
        // })
        let path = computed(()=>{
            return route.path
        })

        return {
            // title,
            path
        }
    }
}
</script>

<style lang="scss" scoped>
.banner{
    font-size: 0px;
    img{
        width: 100%;
    }
}

.user{
    width: 1200px;
    margin: 20px auto;
    background: #fff;
    border-radius: 10px;
    padding: 15px;
}
.user-title{
    font-size: 28px;
    color: var(--color);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.money{
    font-size: 20px;
    color: var(--color);
    i{
        color: #000;
        cursor: pointer;
    }
}

.content{
    display: flex;
    border-top: 1px solid #eee;
    margin: 20px 0px 0px;
    .left-nav{
        width: 200px;
        border-right: 1px solid #eee ;
        border-left: 1px solid #eee;
        ul{
            padding: 0px 0px 0px 30px;
        }
        li{
            >div{
                border-bottom: 1px solid #eee;
                padding: 10px 20px;
                cursor: pointer;
                &:hover{
                    background: var(--color);
                    color: #fff;
                }
                &.active{
                    background: var(--color);
                    color: #fff;
                }
            }
            
        }
    }
}

.right{
    padding: 10px;
    flex-grow: 1;
    width: 0;
}
</style>


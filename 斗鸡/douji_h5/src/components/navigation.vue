<template>
    <van-nav-bar fixed placeholder >
        <template #left>
            <van-icon name="wap-nav" size="20" @click="openLeftNav=true" color="var(--color)"/>
        </template>
        <template #title>
            <div class="logo" @click="$router.push('/')">
                <img src="static/image/logo.png" alt="" srcset="">
            </div>
        </template>
        <template #right>
            <van-icon name="manager" size="20" color="var(--color)" @click="$router.push('/personal')"/>
        </template>
    </van-nav-bar>

    <div class="letNav" :class="{open:openLeftNav}">
        <div class="mask" @click="openLeftNav=false"></div>
        <div class="nav">
            <van-icon name="cross" class="close" @click="openLeftNav=false"/>
            <div class="logo2">
                <img src="static/image/logo.png" alt="" srcset="">
            </div>
            <ul class="list">
                <li>
                    <div class="item-title" @click="clickTitle('/')"><span>首页</span></div>
                </li>
                <li>
                    <div class="item-title" @click="clickTitle('我的账户',$event)"><span>我的账户</span> <van-icon class="icon-1" name="arrow-down" /></div>
                    <div class="item-content">
                        <ul>
                            <li>充值</li>
                            <li>提现</li>
                            <li>交易记录</li>
                            <li>额度转换</li>
                            <li>代理信息</li>
                            <li>个人资料</li>
                            <li>银行卡</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div class="item-title"  @click="clickTitle('斗鸡',$event)"><span>斗鸡</span> <van-icon class="icon-1" name="arrow-down" /></div>
                    <div class="item-content">
                        <ul>
                            <li>SV388</li>
                            <li>Digmaan</li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div class="item-title" @click="clickTitle('/Discount')"><span>红利活动</span></div>
                </li>
                <li>
                    <div class="item-title" @click="clickTitle('/alliance')"><span>联属伙伴</span></div>
                </li>
            </ul>
            
        </div>
    </div>


</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
    setup(props) {
        let openLeftNav= ref(false)

        let router =  useRouter()

        let clickTitle=(path,e)=>{
            
            if(!e) {
                router.push(path)
                openLeftNav.value=false
                return
            }
            // 删除其他li的class
            let remClass=(li_2)=>{
                if(li_2.className.indexOf('open')!==-1){
                    li_2.querySelector('.item-content').style.height='0px'
                    setTimeout(() => {
                        li_2.classList.remove('open')
                    }, 300);
                }
            }
            
            let div = e.currentTarget
            let li = div.parentElement
            let itemContent = div.nextElementSibling
            if(li.className.indexOf('open') !== -1){
                itemContent.style.height = '0px'
                setTimeout(() => {
                    li.classList.remove('open')
                }, 300);
            }else{
                let liList = div.parentElement.parentElement.children
                for (let i = 0; i < liList.length; i++) {
                    if(liList[i]!=li){
                        remClass(liList[i])
                    } 
                }
                li.classList.add('open')
                let height =itemContent.querySelector('ul').offsetHeight
                itemContent.style.height = height+'px'
            }
        }

        return{
            clickTitle,
            openLeftNav

        }
    }
}
</script>

<style lang="scss" scoped>
.logo{
    height: 48px;
    display: flex;
    align-items: center;
    img{
        height: 80%;
    }
}
.letNav{
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: auto;
    top: 0px;
    left: 0px;
    z-index: 1;
    // transition: all .3s;
    visibility: hidden;
    &.open{
        visibility: inherit;
        .nav{
            left: 0px;
        }
        .mask{
            opacity: 1;
        }
    }
    .mask{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0px;
        top: 0px;
        background: rgba($color: #000000, $alpha: 0.6);
        opacity: 0;
        transition: all .3s;
    }
    .nav{
        height: 100%;
        width: 80%;
        overflow: auto;
        background: #fff;
        position: relative;
        left: -100%;
        transition: all .3s;
    }
    .logo2{
        height: 56px;
        padding: 0px 0px;
        border-bottom: 6px solid var(--color);
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin: 0px 0px 0px 25px;
        width: fit-content;
        img{
            height: 40px;
        }
    }
    .close{
        font-size: 30px;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .list{
        height: calc(100% - 56px);
        overflow: auto;
        padding: 30px 25px;
        >li{
            border-bottom: 1px solid #eee;
        }
        .item-title{
            height: 56px;
            font-size: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .open{
            .item-content{
                display: block;
            }
            .icon-1{
                transform: rotate(180deg);
            }
        }
        .icon-1{
            transition: all .3s;
        }
        .item-content{
            display: none;
            height: 0px;
            overflow: hidden;
            transition: all 0.3s;
        }
        ul{
            padding: 0px 20px;
            li{
                line-height: 48px;
                color: rgba($color: #000000, $alpha: 0.6);
            }
        }
    }
}
</style>
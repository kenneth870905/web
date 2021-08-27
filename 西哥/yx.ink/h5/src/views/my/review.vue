<template>
    <div class="tem">
        <van-nav-bar fixed title="评价记录" left-arrow @click-left="$back()"></van-nav-bar>
        
        <div class="pingjia-item" v-for="item in 0">
            <div class="sp">
                <div class="img">
                    <img src="https://img.alicdn.com/imgextra/i3/1860270913/TB2ZkMnbFXXXXbGXpXXXXXXXXXX_!!1860270913.jpg_200x200.jpg" alt="" srcset="">
                </div>
                <div class="xiangqing">
                    <div class="t1">英爵伦 夏季新品T恤 男士字母印花 欧美风潮半袖修身衣服圆领短袖英爵伦 夏季新品T恤 男士字母印花 欧美风潮半袖修身衣服圆领短袖</div>
                    <div class="t2">黑色，XL</div>
                </div>
            </div>
            <div class="title-1">评价：</div>
            <div class="text-1">
                登录状态（合称登录状态）会影响用户的发布评论、举报、删除、消息提醒、跳转个人主页和页面收藏（合称互动行为），未登录用户仅可以浏览评论和点赞。
                Tip：由于 swan.login API 的非兼容改造，一站式互动组件统一改为在组件内强登录。
            </div>
            <div class="plimg">
                <img src="https://img.alicdn.com/imgextra/i3/1860270913/TB2ZkMnbFXXXXbGXpXXXXXXXXXX_!!1860270913.jpg_200x200.jpg" alt="" srcset="">
                <img src="https://img.alicdn.com/imgextra/i3/1860270913/TB2ZkMnbFXXXXbGXpXXXXXXXXXX_!!1860270913.jpg_200x200.jpg" alt="" srcset="">
            </div>
            <div class="tiem">2020-01-01 00:00</div>
        </div>

        <van-empty description="功能开发中"/>

    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
}
</script>

<style lang="scss" scoped>
.tem{
    padding: 46px 0px 0px;
}
.pingjia-item{
    background: #fff;
    padding: 10px 10px 0px;
    margin: 15px 0px;
    .sp{
        display: flex;
        padding: 0px 0px 5px;
        border-bottom:1px solid #eee;
        img{
            width: 50px;
            height: 50px;
            margin: 0px 15px 0px 0px;
            flex-shrink: 0;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .xiangqing{
            flex: 1;
            .t1{
                height: 32px;
                font-size: 12px;
                color: #666;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .t2{
                font-size: 12px;
                color: #333;
            }
        }
    }
    .title-1{
        font-size: 14px;
    }
    .text-1{
        font-size: 14px;
    }
    .plimg{
        padding: 5px 0px;
        img{
            width: 40px;
            height: 40px;
            background: #eee;
            margin: 0px 5px 5px 0px;
            object-fit: contain;
        }
    }
    .tiem{
        border-top: 1px solid #eee;
        font-size: 12px;
        color: #ababab;
        padding: 5px;
        text-align: right;
    }
}

</style>
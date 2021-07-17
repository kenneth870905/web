<template>
    <div class="banner">
        <img src="static/image/doujiBanner.jpg" alt srcset />
    </div>

    <van-notice-bar left-icon="volume-o" background="var(--color)" color="#fff" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
   
    <div class="title-1">联系我们</div>


    <ul class="list">
        <li class="title-2">需要帮忙？通过以下渠道联系我们的客服人员：</li>
        <li>
            <a href="tel:+63988888888">电话：+63988888888</a>
        </li>
        <li>
            <a href="mailto:xxxxxxxx@gmail.com">邮箱：xxxxxxxx@gmail.com</a>
        </li>
        <li>
            <a href="javascript:;">QQ：88888888</a>
        </li>
        <li class="weixin">
            <div class="title-3">微信客服</div>
            <div>
                <img src="https://file.32828a.com/images/LUCKYCF/4aef7068ee664914f53b451a516e42a3_5429190.jpg" alt="" srcset="">
            </div>
        </li>
    </ul>

</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.banner {
    font-size: 0px;
    img {
        width: 100%;
    }
}
.title-1 {
    font-size: 40px;
    text-transform: uppercase;
    color: var(--color);
    margin: 40px 15px 20px;
    text-align: center;
}

.list{
    margin: 10px 15px 30px;
    background: #fff;
    padding: 15px;
    li{
        padding: 8px 0px;
    }
    .title-2{
        font-size: 13px;
        color: rgba($color: #000000, $alpha: 0.6);
    }
    .weixin{
        border-top: 1px solid #eee;
        text-align: center;
        img{
            width: 50%;
        }
    }
}


</style>
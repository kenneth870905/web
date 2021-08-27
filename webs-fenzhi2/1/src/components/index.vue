<template>
    <div>
        <!-- 主页顶部 -->
        <div class="home_header">
            <img src="image/index/logo.png" alt />
            <button class="btn1">注册</button>
            <button class="btn1" style="margin-left:10px;">登录</button>
        </div>
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" class="home_lunbo">
            <van-swipe-item>
                <img src="image/index/lunbo1.jpg" alt />
            </van-swipe-item>
            <van-swipe-item>
                <img src="image/index/lunbo2.jpg" alt />
            </van-swipe-item>
            <van-swipe-item>
                <img src="image/index/lunbo3.jpg" alt />
            </van-swipe-item>
            <van-swipe-item>
                <img src="image/index/lunbo1.jpg" alt />
            </van-swipe-item>
        </van-swipe>
        <van-notice-bar
            text="好消息，好消息~2018年5月8日00:00起：本公司【北京PK10】【重庆时时彩】双面赔率1.990调整至1.995和定位胆9.90调整至9.95 ，敬请期待， bet365【亚洲版】全体成员感谢您一直以来对本公司的大力支持！"
            left-icon="van-icon van-icon-volume"
        />
        <!-- 游戏列表 -->
        <!-- <div class="column" >
            <tabs type="boxed" v-for="item in res" >
                <tab-item    :label="item.title">
                    <div class="column">
                        <tabs layout="left">
                            <tab-item label="北京体育">
                                <van-row type="flex">
                                    <van-col span="6" id="youxi_list">
                                        <img c src="image/index/hb.png" alt />
                                        <span style="line-height:5">HB电子</span>
                                    </van-col>
                                    <van-col span="6" id="youxi_list">
                                        <img c src="image/index/hb.png" alt />
                                        <span style="line-height:5">HB电子</span>
                                    </van-col>
                                </van-row>
                            </tab-item>
                            <tab-item label="上海体育">上海体育</tab-item>
                            <tab-item label="江苏体育">江苏体育</tab-item>
                            <tab-item label="南昌体育">南昌体育</tab-item>
                        </tabs>
                    </div> 
                </tab-item>
                 <tab-item label="彩票">
                     <div class="column">
                        <tabs layout="left">
                            <tab-item label="所有彩种">所有彩种</tab-item>
                            <tab-item label="北京pk10">北京pk10</tab-item>
                            <tab-item label="幸运飞艇">幸运飞艇</tab-item>
                            <tab-item label="北京pk10">北京pk10</tab-item>
                            <tab-item label="北京pk10">北京pk10</tab-item>
                            <tab-item label="幸运飞艇">幸运飞艇</tab-item>
                            <tab-item label="北京pk10">北京pk10</tab-item>
                            <tab-item label="北京pk10">北京pk10</tab-item>
                            <tab-item label="北京pk10">北京pk10</tab-item>
                            <tab-item label="幸运飞艇">幸运飞艇</tab-item>
                            <tab-item label="北京pk10">北京pk10</tab-item>
                        </tabs>
                    </div> 
                </tab-item>
                <tab-item label="真人">Music Tab</tab-item>
                <tab-item label="电子">Video Tab</tab-item>
                <tab-item label="棋牌">Document Tab2</tab-item>
            </tabs>
        </div>-->
        <van-tabs type="card">
            <van-tab v-for="(item,index) in res" :key="index" :title="item.title">
                <van-tabs v-model="active">
                    <van-tab title="标签 1"></van-tab>
                    <van-tab title="标签 2">内容 2</van-tab>
                    <van-tab title="标签 3">内容 3</van-tab>
                    <van-tab title="标签 4">内容 4</van-tab>
                </van-tabs>
            </van-tab>
        </van-tabs>
        <!--底部导航-->
        <van-tabbar v-model="active">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="chat" @click="tz()">优惠活动</van-tabbar-item>
            <van-tabbar-item icon="records">充值提现</van-tabbar-item>
            <van-tabbar-item icon="gold-coin">我</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
    

<script>
export default {
    data() {
        return {
            active: 0,
            res: {}
        };
    },
    created() {
        this.list();
    },

    methods: {
        tz() {
            this.$router.push({
                name: "exam01"
            });
        },
        list() {
            this.$axios.get("json/home.json").then(x => {
                console.log(x.data);
                this.res = x.data;
            });
        }
    }
};
</script>

<style>
#youxi_list {
    width: 155px;
    height: 70px;
    background: #efefef;
    border-radius: 8px;
    margin: 8px;
}
#youxi_list img {
    height: 57px;
}
* {
    border: 0;
    padding: 0;
}
.home_header {
    width: 100%;
    height: 61px;
    background: linear-gradient(#464646, #0b0b0b);
}
.home_header img {
    width: 188px;
    height: 48px;
}

.home_lunbo img {
    width: 100%;
    height: 150px;
}
.btn1 {
    width: 53px;
    height: 30px;
    border-radius: 5px;
    background: #3f3f3f;
    color: white;
    position: relative;
    /* left: 65px; */
    font-size: 14px;
}
.van-tabs--card {
    padding-top: 10px;
}
.van-tabs__nav--card {
    margin: 0;
}
/* .van-tabs__nav--card .van-tab{
    padding: 0;
} */
</style>

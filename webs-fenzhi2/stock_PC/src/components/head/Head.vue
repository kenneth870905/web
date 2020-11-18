<template>
    <div class="顶部导航">
        <div class="nav">
            <div class="container nav_text">
                <div>客服热线：&nbsp;<span class="red">{{this.TEL}}</span>&nbsp;&nbsp; 易记网址：&nbsp;<span class="red">{{this.website}}</span></div>
                <div>
                    <router-link to="/login">立即登陆&nbsp;&nbsp;</router-link>
                    <router-link to="/about/HelpCenter">帮助中心&nbsp;&nbsp;</router-link>
                    <router-link to="/registered">免费注册&nbsp;&nbsp;</router-link>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="nav_div ">
                <div class="logo">
                    <img src="static/image/logo.png" alt="" srcset="">
                    <!-- <img :src="logoImg" alt=""> -->
                </div>

                <div class="nav_div-routet">
                    <div :class="{activecls:selectLab =='/'}" @click="clickTitle('/')">首页</div>
                                    <!-- 按天 1 按周 2 按月 3 免息 4 -->
                    <div :class="{activecls:selectLab =='/pz/1'}" @click="clickTitle('/pz/1')">按天配资</div>
                    <div :class="{activecls:selectLab =='/pz/2'}" @click="clickTitle('/pz/2')">按周配资</div>
                    <div :class="{activecls:selectLab =='/pz/3'}" @click="clickTitle('/pz/3')">按月配资</div>
                    <div :class="{activecls:selectLab =='/pz/4'}" @click="clickTitle('/pz/4')">免息配置</div>
                    
                    <div :class="{activecls:selectLab =='/about'}" @click="clickTitle('/about')">关于我们</div>
                    <div :class="{activecls:selectLab =='/software'}" @click="clickTitle('/software')">软件下载</div>
                    <div :class="{activecls:selectLab =='/generalize'}" @click="clickTitle('/generalize')">推广赚钱</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { logoImg } from "@/api/api.js";
export default {
    mounted() {
        // logoImg().then(x => {
        //     console.log(x);
        //     this.logoImg = x.data.data.logo;
        // });
    },
    data() {
        return {
            selectLab: "/",//默认路径
            logoImg: "",
            // imgURL:"",
            TEL: "400-6558-138",
            website: "www.76438.com",
        };
    },

    // created:{
    //  changeMessage();
    // },
    // computed: {
    //    changeMessage(){
    //     // 计算属性：依赖message变化而变化  依赖没变化就不会重新渲染；

    //       console.log( this.imgUrl)


    //    }
    // },

    //  computed:{
    //   // 计算属性的 getter
    //   reversedMessage:{
    //     // `this` 指向 vm 实例
    //     return this.imgURL=this.imgUrl+this.logoImg
    //   },
    // },
    methods: {
        //    获取A标签跳转的函数
        clickTitle(title) {
            this.selectLab = title; //把他点击的对象保存起来判断如果对应上了就为真就添加激活样式
            this.$router.history.push(title); //点击跳转的对应地址
        }
    }
}
</script>

<style lang="less" scoped>
.顶部导航{
    background: #ffffff;
}
.activecls {
    //导航标签激活样式
    color: #ff6700;
}
.container {
    //版心
    width: 1200px;
    margin: 0 auto;
}
.red {
    color: red;
}

// 最顶部导航
.nav {
    height: 40px;
    background-color: #f5f5f5;
    color: #959696;

    .nav_text {
        font-size: 14px;
        font-weight: 1000;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        a {
            color: #959696;
        }
    }
}

//子导航
.nav_div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding-top: 30px;
    .nav_div-routet {
        width: 100%;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        div{
            cursor: pointer;
        }
    }
    .logo {
        flex-shrink: 0;
        height:72px;
        margin-right: 50px;
        img{
            height: 100%;
        }
    }
}
</style>









<template>
    <div>
        <div class="mui-content mui-fullscreen" :class="{'active':img}">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title">头像设置</h1>
            </header>
            <div class="box_1">
                <div class="bg">
                    <img :src="config.img_url+'static/image/bg_0.png'" />
                </div>
                <div class="img_box" :class="{'active':active}">
                    <img v-if="img" :src="config.img_url+'static/image/touxiang/' + img" alt="">
                    <img v-if="!img && !Person.ImgId" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="">
                    <img v-if="Person.ImgId && !img" :src="config.img_url+'static/image/touxiang/'+Person.ImgId" alt="" srcset="">
                </div>
                <!-- <div class="operation"><button>立即设置</button></div> -->
                <div class="提示">设置头像，投注更有范</div>
            </div>

            <div class="box_2">
                <div class="头像集">
                    <div class="title_1">霸气头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img @click="设置图片('q'+item+'.jpg')" :src="config.img_url+'static/image/touxiang/q'+item+'.jpg'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">卡通头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img @click="设置图片('k'+item+'.png')" :src="config.img_url+'static/image/touxiang/k'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">绝色美女头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 20" :key="index">
                            <img @click="设置图片('l'+item+'.png')" :src="config.img_url+'static/image/touxiang/l'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">霸气总裁头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 20" :key="index">
                            <img @click="设置图片('n'+item+'.png')" :src="config.img_url+'static/image/touxiang/n'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1"><span class="红色">管理员</span>专用</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img @click="设置图片('GL'+item+'.png')" :src="config.img_url+'static/image/touxiang/Gl'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1"><span class="红色">计划员</span>专属</div>
                    <ul>
                        <li v-for="(item, index) in 6" :key="index">
                            <img @click="设置图片('GLJL'+item+'.png')" :src="config.img_url+'static/image/touxiang/GLJL'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            
            <div v-show="img" class="btn_1">
                <div @click="提交()">
                    立即使用
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// [
//     // 管理员
//     'GL1.png','GL2.png','GL3.png','GL4.png','GL5.png','GL6.png','GL7.png','GL8.png','GL9.png','GL10.png','GL11.png','GL12.png','GL13.png','GL14.png','GL15.png',
//     // 卡通
//     'k1.png','k2.png','k3.png','k4.png','k5.png','k6.png','k7.png','k8.png','k9.png','k10.png',
//     // 女头像
//     'l1.png','l2.png','l3.png','l4.png','l5.png','l6.png','l7.png','l8.png','l9.png','l10.png','l11.png','l12.png','l13.png','l14.png','l15.png','l16.png','l17.png','l18.png','l19.png','l20.png',
//     // 男头像
//     'n1.png','n2.png','n3.png','n4.png','n5.png','n6.png','n7.png','n8.png','n9.png','n10.png','n11.png','n12.png','n13.png','n14.png','n15.png','n16.png','n17.png','n18.png','n19.png','n20.png',
//     // 其他
//     'q1.jpg','q2.jpg','q3.jpg','q4.jpg','q5.jpg','q6.jpg','q7.jpg','q8.jpg','q9.jpg','q10.jpg'
// ]
import { api_修改头像 } from "@/api/个人资料.js";
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    name: "",
    data() {
        return {
            img:"",
            active:false
        }
    },
    computed: {
        ...mapState({
            config:'config',
            Person: x => x.个人资料.Person
        })
    },
    methods: {
        ...mapMutations({
            加载中: "加载中"
        }),
        ...mapActions({
            getPersonInfo: '个人资料/getPersonInfo'
        }),
        设置图片(item){
            if(item.includes('GL')){
                // if(this.Person.MemberType==1){
                    this.img=item;
                // }else{
                    // this.$toast('非管理员不能使用哦~')
                // }
            }else{
                this.img=item;
            }
        },
        提交() {
            this.加载中(true)
            api_修改头像(this.img).then(x => {
                if (x.data.code == 0) {
                    this.初始化()
                    this.$toast('设置成功')
                    history.back();
                } else {
                    this.$toast(x.data.msg)
                }
                this.加载中(false)
            }).catch(err => {
                this.加载中(false)
                this.$toast('系统错误稍后再试')
            })
        },
        async 初始化() {
            this.加载中(true)
            await this.getPersonInfo();
            this.加载中(false)
        }
    },
    mounted() {
        this.初始化();
    },
    destroyed() {
        
    },
    watch: {
        img(){
            this.active = true;
            setTimeout(() => {
                this.active=false
            }, 500);
        }
    },
}
</script>

<style lang="scss" scoped>
.红色{
    color: red;
}
.mui-bar{
    background: none;
    box-shadow: none;
}
.mui-content{
    display: flex;
    flex-direction: column;
    &.active{
        padding-bottom: _vw(50);
    }
}

.box_1{
    flex-shrink: 0;
    position: relative;
    @include bgcolor;
    padding: 44px 0px 10px;
    .bg{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .img_box{
        width: _vw(70);
        height: _vw(70);
        margin: 10px auto;
        background: #ffffff;
        border-radius: 100%;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        };
        // transition: all 0.3s;
        &.active{
            // transform: scale(1.5);
            animation: scale1 0.3s;
        }
    }
    .提示{
        text-align: center;
        color: #ffffff;
        font-size: 14px;
    }
}

@keyframes scale1 {
    0%{
        transform: scale(0.3)
    } 80%{
        transform: scale(1.5)
    } 100%{
        transform: scale(1)
    }
}

.box_2{
    height: 100%;
    overflow: auto;
    .头像集{
        background: #ffffff;
        margin: 10px 0px;
        padding: 0px _vw(10);
        .title_1{
            font-size: _vw(13);
            padding: 5px 10px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width: 20%;
                text-align: center;
                margin: 10px 0px;
            }
            img{
                width: _vw(60);
                height: _vw(60);
                border-radius: 100%;
                object-fit: cover;
            }
        }
    }
}

.btn_1{
    background: #ffffff;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    line-height: _vw(40);
    font-size: _vw(12);
    text-align: center;
    color: #ffffff;
    padding: _vw(5) _vw(10);
    div{
        @include bgcolor;
    }
}
</style>

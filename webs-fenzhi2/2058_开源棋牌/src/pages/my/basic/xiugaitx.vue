<template>
    <div>
        <div class="mui-content mui-fullscreen" :class="{'active':img}">
            <header class="mui-bar mui-bar-nav">
                <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
                <h1 class="mui-title" style="color:#fff;">头像设置</h1>
            </header>
            <div class="box_1">
                <div class="bg">
                    <img src="image/bg_0.png" />
                </div>
                <div class="img_boxnew" :class="{'active':active}">
                    <img v-if="img" :src="'image/touxiang/' + img" alt="">
                    <img v-if="!img && !Person.ImgId" src="image/touxiang/wutu.jpg" alt="">
                    <img v-if="Person.ImgId && !img" :src="config.img_url+'image/touxiang/'+Person.ImgId" alt="" srcset="">
                    <div class="提示">设置头像，投注更有范</div>
                </div>
                <!-- <div class="operation"><button>立即设置</button></div> -->
                
            </div>

            <div class="box_2">
                <div class="头像集">
                    <div class="title_1">霸气头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img @click="设置图片('q'+item+'.jpg')" :src="config.img_url+'image/touxiang/q'+item+'.jpg'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">卡通头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img @click="设置图片('k'+item+'.png')" :src="config.img_url+'image/touxiang/k'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">绝色美女头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 20" :key="index">
                            <img @click="设置图片('l'+item+'.png')" :src="config.img_url+'image/touxiang/l'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">霸气总裁头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 20" :key="index">
                            <img @click="设置图片('n'+item+'.png')" :src="config.img_url+'image/touxiang/n'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            
            <div v-show="img" class="btn_1">
                <div @click="提交()" style="background:#ec0909;">
                    立即使用
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            this.img=item
        },
        提交() {
            // this.加载中(true)
            console.log(123)
            api_修改头像(this.img).then(x => {
                if (x.data.code == 0) {
                    this.初始化()
                    this.$toast('设置成功')
                    history.back();
                } else {
                    this.$toast(x.data.msg)
                }
                // this.加载中(false)
            }).catch(err => {
                // this.加载中(false)
                this.$toast('系统错误稍后再试')
            })
        },
        async 初始化() {
            // this.加载中(true)
            await this.getPersonInfo();
            // this.加载中(false)
        }
    },
    mounted() {
        this.初始化();
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
.img_boxnew{
    text-align: center;
    animation: scale2 0.3s;
}
@keyframes scale2 {
    0%{
        transform: scale(0.3)
    } 80%{
        transform: scale(1.5)
    } 100%{
        transform: scale(1)
    }
}
.img_boxnew img{
    width: 80px;
    height: 80px;
    border-radius: 50%;   
    animation: scale2 0.3s;
}
.mui-bar{
    background: none;
    box-shadow: none;
}
.mui-content{
    display: flex;
    flex-direction: column;
    &.active{
        padding-bottom: 50px;
    }
}

.box_1{
    flex-shrink: 0;
    position: relative;
    // @include bgcolor;
    padding: 44px 0px 10px;
    background: #393939;
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
        width: 70px;
        height: 70px;
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
        padding: 0px 10px;
        .title_1{
            font-size: 13px;
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
                width: 60px;
                height: 60px;
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
    line-height: 40px;
    font-size: 12px;
    text-align: center;
    color: #ffffff;
    padding: 5px 10px;
}
</style>

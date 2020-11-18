<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">客服中心</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            
            <ul class="mui-table-view list">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right item" @click="$router.push('/my/zxkf')">
                        <div class="img_box"><img :src="config.img_url+'static/image/kefuCenter/zaixian.png'" alt=""></div>
                        <span class="红色">在线客服</span>
                        <span class="复制">点击进入</span>
					</a>
				</li>
                <li class="mui-table-view-cell item" @click="复制(config.qq)">
					<!-- <a class="mui-navigate-right item"> -->
                        <div class="img_box"><img :src="config.img_url+'static/image/kefuCenter/qq.png'" alt=""></div>
                        <span class="红色">{{config.qq}}</span>
                        <span class="复制">点击复制</span>
                    <!-- </a> -->
				</li>
                
                <li class="mui-table-view-cell" v-if="显示客服微信">
                    <div class="item1" @click="显示微信=!显示微信">
                        <div class="img_box">
                            <img :src="config.img_url+'static/image/zhifu/wechat.png'" alt="" srcset="">
                        </div>
                        <div class="红色">
                            微信客服 
                        </div>
                        <span class="复制">{{显示微信 ? '点击隐藏':"点击查看"}}</span>
                    </div>
                    <transition name="bounce">
                        <div v-if="显示微信">
                            <div class="二维码图片">
                                <img :src="config.api_url+'/App_Upload/wechatkf.jpg'" alt="">
                            </div>
                            <div class="扫码提示">扫码咨询</div>
                        </div>
                    </transition>
                </li>

                <li class="mui-table-view-cell item" @click="复制(config.mail)">
                    <div class="img_box"><img :src="config.img_url+'static/image/kefuCenter/youxiang.png'" alt=""></div>
                    <span class="红色">{{config.mail}}</span>
                    <span class="复制">点击复制</span>
				</li>
                
                <li class="mui-table-view-cell">
                    <a class="item" :href="`tel:${config.kefu_phone}`">
                        <div class="img_box"><img :src="config.img_url+'static/image/kefuCenter/dianhua.png'" alt=""></div>
                        <span class="红色">{{config.kefu_phone}}</span>
                        <span class="复制">点击拨打</span>
                    </a>
                </li>
            </ul>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import 复制 from '@/assets/js/复制.js'
export default {
    name:"",
    data() {
        return {
            显示微信:false
        }
    },
    computed: {
        ...mapState({
            config:'config',
            userinfo:x=>x.user.userinfo
        }),
        显示客服微信(){
            if(this.config.ck==0){
                return true
            }else{
                return this.userinfo.Ck>=this.config.ck
            }
        }
    },
    methods: {
        复制(text){
            复制(this,text)
        }
    },
}
</script>

<style lang="scss" scoped>
.list{
    .item{
        display: flex;
        align-items: center;
        padding-right: 35px;
    }
    .item1{
        padding-right: 20px;
        display: flex;
        align-items: center;
    }
    .img_box{
        width: _vw(30);
        margin: 0px _vw(10) 0px 0px;
        img{
            width: 100%;
        }
    }
    .红色{
        font-size: _vw(14);
        color: red;
        flex-grow: 1;
    }
    .复制{
        font-size: _vw(15);
        color: #595959;
    }
    .二维码图片{
        width: _vw(260);
        height: _vw(260);
        margin: 0px auto;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .扫码提示{
        font-size: _vw(13);
        color: #595959;
        text-align: center;
        letter-spacing: 3px;
    }
}

.bounce-enter-active {
    animation: bounce-in .3s;
}
.bounce-leave-active {
    animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
    0% {
        height: 0px;
        opacity: 0;
    }
    100% {
        opacity: 1;
        height: _vw(277);
    }
}
</style>
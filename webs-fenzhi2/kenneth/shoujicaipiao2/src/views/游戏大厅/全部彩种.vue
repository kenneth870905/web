<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">全部彩种</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <div v-if="item.title!='所有彩种'" v-for="(item, index) in 全部彩票类型" :key="index">
                <div class="标题">{{item.title}}</div>
                <ul class="列表">
                    <li @click="跳转(item1)" v-for="(item1 , index1) in item.children" :key="index1">
                        <div class="img_box">
                            <img :src="config.img_url+'static/image/home/caipiao/'+item1.id+ ext" alt="" srcset="">
                        </div>
                        <div>{{item1.title}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex';
export default {
    name:"",
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            config:'config',
            彩票玩法:x=>x.user.彩票玩法
        }),
        ...mapGetters({
            全部彩票类型:'全部彩票类型'
        }),
        ext(){
            if(this.全部彩票类型.length==0){
                return ''
            }else{
                return this.全部彩票类型[0].ext
            }
        }
    },
    methods: {
        ...mapActions({
            获取游戏彩票:'获取游戏彩票'
        }),
        跳转(item){
            if(this.config.newbet){
                this.$router.push(`/buyLottery?i=${item.id}&t=${this.彩票玩法}`)
            }else{
                this.$router.push('/cpiframe?i='+item.id+'&t='+this.彩票玩法)
            }
        }
    },
    mounted() {
        if(this.全部彩票类型.length==0){
            this.获取游戏彩票();
        }

    },
}
</script>

<style lang="scss" scoped>
.标题{
    padding: 0px _vw(15);
    line-height: _vw(30);
    font-size: _vw(13);
    color: #999999;
}
.列表{
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    >li{
        width: calc(100% / 3);
        padding: _vw(10) 0px;
        text-align: center;
        color: #757575;
        font-size: _vw(14);
        border-bottom: 1px solid #efeff4;
        border-right: 1px solid #efeff4;
        .img_box{
            width: _vw(50);
            height: _vw(50);
            margin: 0px auto _vw(5);
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    >li:nth-child(3n){
        border-right: none;
    }

}
</style>

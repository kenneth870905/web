<template>
    <div class="选择彩票">
        <div class="遮罩" @click="关闭选择彩票()"></div>
        <div class="轮播">
            <div class="swiper-container swiper_1" ref="swiper_1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in 新彩票" :key="index">
                        <ul class="彩票列表">
                            <li @click="进入彩票(item1)" v-for="(item1, index1) in item" :key="index1">
                                <div class="img_box">
                                    <img :src="config.img_url+'static/image/home/caipiao/'+item1.id+ext" alt="" srcset="">
                                </div>
                                <div>{{item1.title}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="swiper-pagination" ref="swiperPagination"></div>
            </div>
            <!-- <div class="开关">
                <span>习惯</span>
                <van-switch v-model="习惯开关" size="16px"/>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
import Swiper from "swiper";

export default {
    name:"",
    inject:['关闭选择彩票'],
    data() {
        return {
            swiperlist1:"",
            checked:true,
            // 习惯开关:this.$store.state.聊天室.习惯开关
        }
    },
    computed: {
        ...mapState({
            config:"config",
            彩票玩法:x=>x.user.彩票玩法,
            偏好彩票2:x=>x.聊天室.偏好彩票2
        }),
        ...mapGetters({
            全部彩票:'全部彩票',
            全部彩票类型:'全部彩票类型'
        }),
        新彩票(){
            var list=[];
            var list1=[]
            var list_2=JSON.parse(JSON.stringify(this.全部彩票));
            
            list_2.forEach(item => {
                item.排序 = this.偏好彩票2.findIndex(x=>x==item.id);
            });
            list_2.sort(function(x , y){
                return y.排序 - x.排序 
            })
            for (let i = 0; i < list_2.length; i++) {
                list1.push(list_2[i])
                if(list1.length==8){
                    list.push(list1);
                    list1=[];
                }
                if(i==list_2.length-1 && list1.length){
                    list.push(list1);
                }
            }
            return list
        },
        ext(){
            if(this.全部彩票类型.length>0){
                return this.全部彩票类型[0].ext
            }
            return ''
        }
    },
    methods: {
        ...mapActions({
            获取游戏彩票:'获取游戏彩票'  
        }),
        ...mapMutations({
            设置彩票点击率:'聊天室/设置彩票点击率',
            设置key:'聊天室/设置key',
            设置偏好彩票:'聊天室/设置偏好彩票'
        }),
        进入彩票(item){
            // console.log(item)
            // this.设置彩票点击率(item.id)
            // this.设置key(['偏好彩票2',item.id])
            this.设置偏好彩票(item.id)
            if(this.config.newbet){
                this.$router.push(`/buyLottery?i=${item.id}&t=${this.彩票玩法}`)
            }else{
                this.$router.push('/cpiframe?u=chat&i='+item.id+'&t='+this.彩票玩法)
            }
        }
    },
    mounted() {
        if(this.全部彩票.length==0){
            this.获取游戏彩票()
        }


        this.swiperlist1 = new Swiper(this.$refs.swiper_1, {
            // slidesPerView: 1,
            // slidesPerView: 'auto',
            observer: true,
            observeParents:true,
            pagination : this.$refs.swiperPagination,
            // onTransitionEnd:(swiper)=>{
            //     console.log(swiper.activeIndex)
            //     var activeIndex=swiper.activeIndex;
            //     var length=0;
            //     var index=0;
            //     this.当前选中=this.game1[this.轮播索引[activeIndex].index1];
            //     this.type_index=this.轮播索引[activeIndex].index2;
            //     if(this.type_index<2){
            //         this.swiper2.slideTo(0, 300, false);//切换到第一个slide，速度为1秒
            //     }else{
            //         this.swiper2.slideTo(this.type_index-2, 300, false);//切换到第一个slide，速度为1秒
            //     }
            // }
        });
    },
}
</script>

<style lang="scss" scoped>
.选择彩票{
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 10;
    .遮罩{
        height: calc(100% - #{_vw(280)});
        background: rgba(0,0,0,.2);
    }
    .轮播{
        height: _vw(280);
        background: rgba(0,0,0,.75);
        /deep/ .swiper-pagination-bullet{
            background: #ffffff;
            opacity: 1;
        }
        /deep/ .swiper-pagination-bullet-active{
            background: $color;
        }
    }
}
.swiper_1{
    height: 100%;
}

.彩票列表{
    display: flex;
    flex-wrap: wrap;
    color: #ffffff;
    font-size: _vw(12);
    padding: _vw(30) 0px 0px;
    li{
        width: 25%;
        text-align: center;
        margin: 0px 0px _vw(30) 0px;
    }
    .img_box{
        width: _vw(56);
        height: _vw(56);
        margin: 0PX auto _vw(4);
        img{
            width: 100%;
            height: 100%;
        }
    }
}

.开关{
    position: absolute;
    left: 10px;
    bottom: 10px;
    display: flex;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    span{
        margin: 0px 5px 0px 5px;
    }
}
</style>

<template>
    <ul class="list" :class="obj.title1">
        <li @click="跳转(item)" v-if="item.title!='代理加盟' && index<32" v-for="(item, index) in list" :key="index">
            <div class="img_box" :class="动画" v-if="!item.news">
                <img v-if="!obj.noSub && 显示图片" v-lazy="config.img_url+imgheader+item.imgid+imgtype" :key="config.img_url+item.imgid">
                <img v-if="obj.noSub && 显示图片" v-lazy="config.img_url+'static/image/home/'+item.img+'/'+item.imgid+item.ext" :key="config.img_url+item.imgid">
            </div>
            <div class="text_box" v-if="!item.news">
                <div>{{item.title}}</div>
                <div v-if="obj.title1=='彩票'">每{{item.desc}}开奖</div>
            </div>

            <div class="img_box" v-if="item.news">
                <img v-lazy="item.img" :key="config.img_url+item.imgid">
            </div>
            <div  class="text_box1" v-if="item.news">
                {{item.name}}
            </div>
        </li>
        <!-- <li v-for="(item, index) in news.list">
            {{item.path}}
        </li> -->
    </ul>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name:"",
    props:{
        obj:{
            default:()=>{
                return {}
            }
        },
        index:{
            default:0
        }
    },
    data() {
        return {
            动画:""
        }
    },
    computed: {
        ...mapState({
            config:'config',
            彩票玩法:x=>x.user.彩票玩法,     //官方信用
            userinfo:x=>x.user.userinfo,
        }),
        list(){
            if(this.obj.title=='六合彩'){
                var list= JSON.parse(JSON.stringify(this.obj.children));
                var number=this.config.news ? this.config.news.index : 0
                var list_1 = this.config.news ? this.config.news.list : [];
                    list_1.forEach(item => {
                        item.news=true
                    });
                return [...list.splice(0,number) , ...list_1 , ...list]
                // return this.obj.children
            }else{
                return this.obj.children
            }
        },
        news(){
            if(this.config.news){
                return this.config.news
            }else {
                return {
                    row:0,
                    list:[]
                }
            }
        },
        显示图片(){
            if(typeof LineSwitch !='undefined'){
                return this.config.img_url
            }else{
                return true
            }
        },
        imgheader(){
            return 'static/image/home/'+this.obj.img+'/'
        },
        imgtype(){
            return this.obj.ext
        }
    },
    methods: {
        ...mapActions({
            设置类型:"进入游戏/设置类型"
        }),
        跳转(item){
            if(item.news){
                this.$router.push(item.path)
            }else if(!item.彩票){
                if(this.userinfo.UserId){
                    this.设置类型(item)
                }else{
                    this.$router.push('/login')
                }
            }else if(this.config.newbet){
                this.$router.push(`/buyLottery?i=${item.id}&t=${this.彩票玩法}`)
            }else{
                this.$router.push('/cpiframe?i='+item.id+'&t='+this.彩票玩法)
            }
        }
    },
    watch: {
        彩票玩法(){
            this.动画='动画1';
            setTimeout(() => {
                this.动画='动画2'            
            }, 300);
            
            setTimeout(() => {
                this.动画=''            
            }, 600);
        }
    },
}
</script>

<style lang="scss" scoped>
.list{
    background: #ffffff;
    padding: _vw(10) 0px 0px;
    &.真人,
    &.捕鱼{
        background: none;
        padding: 0px _vw(3) 0px;
    }
}
.捕鱼,
.真人{
    display: flex;
    flex-wrap: wrap ;
    font-size: _vw(13);
    text-align: center;
    >li{
        width: 50%;
        padding:_vw(3);
        box-sizing: border-box;
        text-align: center;
        .img_box{
            font-size: 0px;
            height: _vw(105);
            img{
                width: 97%;
                max-height: 100%;
                // height: 97%;
                max-width: 100%;
                border-radius: 5px;
                box-shadow: 0px 0px 3px 0px #929292;
                object-fit: cover;
            }
        }
        .text_box{
            display: none;
        }
    }
}

.电子,
.体育,
.棋牌{
    display: flex;
    flex-wrap: wrap ;
    font-size: _vw(13);
    text-align: center;
    >li{
        margin: 0px 0px _vw(10) 0px;
        width: 25%;
        // flex-grow: 1;
        text-align: center;
        .img_box{
            margin: 0px auto 5px;
            width: _vw(75);
            height: _vw(75);
            img{
                width: 100%;
                height: 100%;
                // object-fit: contain;
                // object-fit: cover;
            }
        }

    }
}
.电子{
    img{
        object-fit: cover;
    }
}
.体育,
.棋牌{
    object-fit: contain;
}




.彩票{
    border-top: 1px solid #eee;
    color: #3a3a3a;
    display: flex;
    flex-wrap: wrap ;
    font-size: _vw(13);
    text-align: center;
    >li{
        display: flex;
        align-items: center;
        width: 50%;
        // padding: _vw(16) 0px _vw(16) _vw(18);
        padding: _vw(16) 0px _vw(16) 0px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        .img_box{
            text-align: center;
            width: _vw(74);
            // width: _vw(43);
            height: _vw(43);
            overflow: hidden;
            &.动画1{
                img{
                    transform: translate(-100%);
                    opacity: 0;
                }
            }
            &.动画2{
                img{
                    transform: translate(100%);
                    opacity: 0;
                }
            }
            img{
                transition: all 0.3s;
                width: _vw(43);
                height: 100%;
                object-fit: cover;
            }
        }
        .text_box{
            height: _vw(43);
            // margin: 0px 0px 0px _vw(13);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >div:nth-child(1){
                font-size: _vw(14)
            }
            >div:nth-child(2){
                color: #aaaab0;
                font-size: _vw(12);
            }
        }
    }
}


</style>

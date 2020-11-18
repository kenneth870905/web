<template>
    <div class="discounts">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">活动优惠</h1>
        </header>
        <div class="mui-content mui-fullscreen">
            <ul class="typeList" ref="typeList">
                <li v-for="(item, index) in type_lsit" :key="index" @click="选择类型(item,index)" :class="{active:item==当前类型}">
                    <div>{{item}}</div>
                </li>
            </ul>
            <ul class="container" ref="container">
                <li v-for="(item, index) in list" :key="index">
                    <div class="定位点"></div>
                    <!-- <div class="name" @click="修改show2(item,index)">
                        {{item.Name}}
                    </div> -->
                    <div class="signin_img" @click="修改show2(item,index)">
                        <div class="bg">
                            <img :src="item.Img" alt="">
                        </div>
                        <div v-if="item.Stop" class="已结束"><img src="static/image/hdjss.png" alt="" srcset=""></div>
                    </div>
                    <!-- <div v-show="item.show2" class="text" v-html="item.text"></div>                 -->
                    <div class="text" v-html="item.text"></div>                
                    <div class="时间" @click="修改show2(item,index)" v-show="!item.show2">
                        <!-- <div class="time">
                            <span v-if="!item.EndTime">长期有效</span>
                            <span v-else>{{item.StartTime}} 至 {{item.EndTime}}</span>
                        </div> -->
                        <div>{{item.Name}}</div>
                        <div class="详情按钮">
                            <div>查看详情</div>
                            <van-icon name="play" />
                            <!-- <i class="icon iconfont icon-xiangyou"></i> -->
                        </div>
                    </div>
                    <div class="收起" v-show="item.show2" @click="修改show2(item,index)">收起</div>
                    <!-- <div class="title_text">{{item.show2?'隐藏':'查询'}}活动详情</div> -->
                </li>
            </ul>
            <div v-if="优惠列表.length==0" class="无数据">暂无优惠活动</div>
        </div>
    </div>
</template>

<script>
import { api_获取优惠列表, api_优惠列表详情 , api_优惠类型 } from "@/api/优惠接口.js";
export default {
    data() {
        return {
            config: config,//引入顶级配置文件
            优惠列表: [],//页面内容
            text: "",//活动详情
            id:"",
            type_lsit:['所有优惠'],
            当前类型:"所有优惠"
        }
    },
    computed: {
        list(){
            if(this.当前类型=='所有优惠'){
                return this.优惠列表
            }else{
                return this.优惠列表.filter(x=>x.Classification==this.当前类型)
            }
        }
    },
    methods: {
        选择类型(item,index){
            this.当前类型 = item;
            this.$refs.typeList.querySelector(`ul>li:nth-child(${index+1})`).scrollIntoView({inline:'center',behavior:'smooth',block:"nearest"})
            this.优惠列表.map((item)=>{
                item.show2=false
            })
            $(this.$refs.container).find('.text').hide();
        },
        修改show2(item,index){
            if(item.Stop) return
            // item.Url ='http://www.agpromotion.net/events/mastertour/201912/index.php'
            if(item.Url){
                if(item.Url.startsWith('#')){
                    this.$router.push(item.Url.substring(1));
                }else if(item.Url.startsWith('http://') || item.Url.startsWith('https://')){
                    if (window.plus) {
                        plus.runtime.openURL(item.Url);
                    }else{
                        try {
                            window.webkit.messageHandlers.FillMoney.postMessage({ link: item.Url });                        
                        } catch (error) {
                            window.open(item.Url,'_blank');
                        }
                    }
                }else{
                    this.$router.push('/ifr/zdy?u='+item.Url)
                }
                return
            }
            new Promise((resolve, reject) => {
                if (!item.text) { 
                    api_优惠列表详情({ id: item.Id }).then(x => {
                        this.$set(item, 'text', x.data);
                        this.$nextTick(()=>{
                            this.$set(item, 'show2', !item.show2);
                            $(this.$refs.container).children().eq(index).find('.text').slideToggle(200)
                        })
                        resolve()
                    }).catch(err => {
                        resolve()
                    })
                }else{
                    this.$set(item, 'show2', !item.show2)
                    console.log(index);
                    console.log($(this.$refs.container))
                    $(this.$refs.container).children().eq(index).find('.text').slideToggle(200)
                }
                resolve()
            });
        },
        async 初始化展示(item){
            var index=this.优惠列表.findIndex(x=>x.Id==this.id);
            await this.修改show2(item,index);
            console.log(index)
            if(index<=1){
                return 
            }
            this.$nextTick(()=>{
                setTimeout(() => {
                    this.$refs.container.querySelector('li:nth-child('+(index)+')').querySelector('.时间').scrollIntoView({'behavior':'smooth',block:'start'})
                }, 300);
            })
        },
        获取类型(){
            api_优惠类型({ type: '' ,home:false}).then(x=>{
                if(x.data instanceof Array){
                    this.type_lsit = [...this.type_lsit , ...x.data ]; 
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    mounted() {
        this.id=this.$route.query.i ? this.$route.query.i : "";
        this.获取类型()
        api_获取优惠列表({ type: '' ,home:false}).then(x => {
            this.优惠列表 = x.status == 200 ? x.data : [];
            if(this.id){
                var obj=this.优惠列表.find(x=>x.Id==this.id);
                if(obj){
                    this.初始化展示(obj);
                }   
            }
        }).catch(err => {})
        
        
    },
}
</script>

<style  lang="scss" scoped>
.typeList{
    padding: 0px _vw(12) _vw(5);
    font-size: _vw(14);
    overflow: auto;
    white-space: nowrap;
    display: flex;
    background: #ffffff;
    li{
        text-align: center;
        padding: 0px _vw(13);
        &:nth-child(1){
            padding-left: 0px;
        }
        div{
            position: relative;
            padding: _vw(10) 0px;
        }
    }
    .active{
        div{
            border-bottom: 2px solid #e9c81c;
            color: #e9c81c;
        }
        div::after{
            position: absolute;
            left: 0px;
            right: 0px;
            bottom: 0px;
            content: '';
            margin: auto;
            width: 0;
            height: 0;
            border: _vw(5) solid transparent;
            border-bottom: _vw(5) solid #e9c81c;
        }
    }
}
.无数据{
    text-align: center;
    font-size: _vw(14);
    padding: _vw(20) 0px;
    color: #757575;
}
/deep/ td {
    border: 1px solid #ccc;
    text-align: center;
    padding-left: _vw(15);
    padding-top: _vw(8);
    
}

.container {
    width: 100%;
    margin: 0px auto;
    padding: 0px _vw(5) _vw(20) _vw(5);
    /deep/ *{
        white-space: inherit !important;
    }
}
.container {
    width: 100%;
    li {
        position: relative;
        width: 100%;
        background: #ffffff;
        margin-top: _vw(10);
        margin-bottom: _vw(10);
        .定位点{
            // position: absolute;
            top: -50px;
            width: 100%;
            height: 1px;
        }
        .name{
            font-size: _vw(14);
            color: #212121;
            padding: _vw(10);
        }
        .时间{
            text-align: center;
            padding: _vw(10);
            font-size: _vw(12);
            position: relative;
            .time{
                flex-grow: 1;
            }
            .详情按钮{
                position: absolute;
                right: _vw(6);
                top: _vw(10);
                display: flex;
                align-items: center;
            }
            i{
                margin: 0px 0px 0px _vw(5);
                font-size: _vw(12);
                line-height: _vw(12);
            }
        }
        .收起{
            background: #f7f7f7;
            padding: _vw(10);
            font-size: _vw(12);
            align-items: center;
            color: #212121;
            text-align: center;
        }
        .signin_img {
            width: 100%;
            font-size: 0px;
            position: relative; 
            padding: _vw(5) _vw(5) 0px _vw(5);
            .bg {
                img {
                    width: 100%;
                }
            }
            .已结束{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                text-align: right;
                background: rgba(0,0,0,0.5);
                padding: 30px 15px 5px;
                img{
                    height: 100%;
                }
            }
        }
        .text {
            background: #ffffff;
            padding: _vw(20) _vw(8) _vw(10) _vw(8);
            overflow: hidden;
            display: none;
        }
        .title_text {
            color: #007aff;
            height: _vw(40);
            line-height: _vw(40);
            background: #ffffff;
            border: 1px solid #ccc;
            border-top: none;
            padding-left: _vw(10);
            font-size: _vw(14);
        }
    }
}
</style>

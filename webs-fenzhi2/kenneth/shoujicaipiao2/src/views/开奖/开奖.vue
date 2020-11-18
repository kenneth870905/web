<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">开奖</h1>
        </header>
        <div class="mui-content">
            <ul class="list">
                <li class="" v-if="item.彩票详情" @click="$router.push('/kjzs?id='+key)" v-for="(item , key , index) in list" :key="index">
                    <div class="img_box">
                        <img :src="config.img_url+'static/image/home/caipiao/'+key+'.png'" alt="" srcset="">
                    </div>
                    <div class="right_1">
                        <div class="标题">
                            <span>{{item.彩票详情.title}}</span>
                            <span class="time mui-pull-right">{{item.ActualTime}}</span>
                        </div>
                        <div class="期号">
                            <span>{{item.IssueCode}}</span>         
                            <i class="mui-pull-right icon iconfont icon-xiangyou"></i>
                        </div>
                        <div>

                            <div v-if="!item.Content || item.Content.length==0">开奖中</div> 
                            <!-- 时时彩 -->
                            <yq v-if="item.type=='10' || item.type=='30' || item.type=='40' || item.type=='60'" :球组="item.Content"/>
                            <!-- pk10 -->
                            <pk10 v-if="item.type=='20'" :球组="item.Content"/>
                            <!-- 28 -->
                            <erba v-if="item.type=='50'" :球组="item.Content"/>
                            <!-- 六合彩 -->
                            <lhc v-if="item.type=='70'" :球组="item.Content"/>

                        </div>
                    </div>
                </li>

            </ul>
        </div>
    </div>
    
</template>

<script>
import { api_开奖公告 } from "@/api/游戏彩票接口.js";
import yq from './components/开奖号码/圆球号码.vue'
import pk10 from './components/开奖号码/pk10号码.vue'
import lhc from './components/开奖号码/六合彩号码.vue'
import erba from './components/开奖号码/28.vue'
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
    name:"",
    components:{
        yq,
        pk10,
        lhc,
        erba
    },
    data() {
        return {
            list:[]
        }
    },
    computed: {
        ...mapState({
            config:"config",
        }),
        ...mapGetters({
            全部彩票:"全部彩票"
        })
    },
    methods: {
        ...mapActions({
            获取游戏彩票:"获取游戏彩票"
        }),
        async 初始化(){
            if(this.全部彩票.length==0){
                await this.获取游戏彩票();
            }
            api_开奖公告().then(x=>{
                console.log(x)
                var data=x.data;
                // var list=[]
                for (const key in data) {
                    data[key].彩票详情=this.全部彩票.find(y=>y.id==key);
                    data[key].type=key.substring(0,2)
                }
                this.list=data;
            }).catch(err=>{})
        }
    },
    mounted() {
        this.初始化()
    },
}
</script>

<style lang="scss" scoped>
.list{
    >li{
        margin: 0px 0px _vw(5) 0px;
        background: #ffffff;
        display: flex;
        padding: _vw(5);
        align-items: center;
    }
    .img_box{
        width: _vw(40);
        height: _vw(40);
        flex-shrink: 0;
        margin: 0px 10px 0px 0px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .right_1{
        flex-grow: 1;
        width: 0;
        .标题{
            font-size: _vw(16);
            color: #212121;
        }
        .time{
            font-size: _vw(13);
            color: #868484;
        }
        .期号{
            margin: _vw(3) 0px;
            font-size: _vw(13);
            color: #868484;
        }
        .icon-xiangyou{
            font-size: _vw(14);
        }
    }
}
</style>

<template>
    <div class="sports">
        <div class="container">
            <div class="sports_box">
                <ul class="ul_title">
                    <!-- <li class="titleActive">全部</li> -->
                    <li @click="clicktite(index)" v-for="(item, index) in sports" :class="{'titleActive':tableType ==index}">{{item.title}}</li>
                </ul>
                <ul class="ul_content">
                    <li v-if="tableType==index" v-for="(item1, index) in sports">
                        <div class="none_box"></div>
                        <ul class="ul_content_li_ul">
                            <li @click="fishGet(item2)" v-for="(item2, index) in item1.children">
                                <div class="img_box"><img :src="item2.imgUrl" alt=""></div>
                                <p>{{item2.title}}</p>
                            </li>
                            <li class="none_li"></li>
                            <li class="none_li"></li>
                            <li class="none_li"></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState , mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            tableType: 0,
            sports: [],
        }
    },
    computed:{
        ...mapState({
            游戏彩票:"游戏彩票"
        })
    },
    methods: {
        ...mapActions({
            设置待进入游戏: '设置待进入游戏',
            设置进入游戏弹框: '设置进入游戏弹框',
            获取游戏json:"获取游戏json"
        }),
        ...mapMutations({
            修改state: '修改state'
        }),
        fishGet(item) {
            var obj = Object.assign({}, item)
            this.修改state(['Moneymin', ''])
            //  this.修改state(['Aname', item.kkk])
            var obj = {
                name: item.title,
                查询类型: item.type,
                gid: item.id
            }

            this.设置待进入游戏(obj)
            this.设置进入游戏弹框(true)
        },
        clicktite(num) {
            this.tableType = num
        },
        设置默认(){
            var t = this.$route.query.t ? this.$route.query.t : 0;
            if(this.sports.length >= t){
                this.tableType = t
            }
        },
        async init(){
            if(this.游戏彩票.length==0){
                await this.获取游戏json()
            }
            var obj = this.游戏彩票.find(x=>x.title=='捕鱼');
            var dataJson = obj ? obj.children : []
                dataJson = Array.from(dataJson);
            var obj2 = {
                children: [],
                title: "全部",
            }
                dataJson.map(y=>{
                    obj2.children.push(y)
                    y.imgUrl = "image" + "/home/" + y.img + "/" + y.imgid + y.ext
                })
            this.sports = [obj2]
        }
    },
    mounted() {
        this.init()      
    },
    watch: {
        $route(){
            this.设置默认();
        }
    },
}
</script>
  <style lang="scss" scoped>
.titleActive {
    background: #ffffff;
    color: #e94335 !important;
    font-weight: 600;
}
.sports {
    .container {
        .sports_box {
            width: 100%;
            min-height: 440px;
            border: 2px solid #e94335;
            margin-top: 10px;
            position: relative;
            .ul_title {
                position: absolute;
                top: 0px;
                left: 0px;
                height: 50px;
                display: flex;
                width: 100%;
                background: #e94335;
                font-size: 15px;
                li {
                    cursor: pointer;
                    width: 120px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 50px;
                    text-align: center;
                }
            }
            .ul_content {
                height: 100%;
                width: 100%;
                li::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                }
                li::-webkit-scrollbar-track {
                    background: rgb(239, 239, 239);
                    border-radius: 2px;
                }
                li::-webkit-scrollbar-thumb {
                    background: #bfbfbf;
                    border-radius: 10px;
                }

                li::-webkit-scrollbar-corner {
                    background: #179a16;
                }
                li {
                    .none_box {
                        height: 60px;
                    }
                    max-height: 700px;
                    overflow: auto;
                    height: 100%;
                    .ul_content_li_ul {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        li {
                            width: 200px;
                            height: 200px;
                            margin: 10px;
                            box-sizing: border-box;
                            // padding-top: 30px;
                            .img_box {
                                margin: 0px auto;
                                width: 150px;
                                height: 150px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            p {
                                margin: 10px 0px 10px 0px;
                                text-align: center;
                            }
                        }
                    }
                }
                .none_li {
                    background: none !important;
                }
            }
        }
    }
}
</style>
  
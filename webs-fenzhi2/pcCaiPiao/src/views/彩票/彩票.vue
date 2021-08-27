<template>
    <div class="immortal">
        <div class="container">
            <div class="immortal_box">
                <!-- <ul class="ul_title">
                    <li @click="clicktite(index)" v-for="(item, index) in immortal" :class="{'titleActive':tableType ==index}">{{item.title}}</li>
                </ul> -->
                <ul class="ul_content">
                    <li>
                        <ul class="ul_content_li_ul">
                            <li @click="点击(itemno)" v-for="(itemno, index) in list">
                                <div class="img_box"><img :src="itemno.minImg" alt=""></div>
                                <p>{{itemno.minName}}</p>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            tableType: 0,
            immortal: "",
        }
    },
    computed: {
        list(){
            let obj = config.navigation_list.find(x=>x.url=='/cp');
            let list = obj.childrenIn;
            return list
            // return config.
        }
    },
    methods: {
        ...mapMutations({
            修改state: '修改state'
        }),
        ...mapActions({
            获取平台余额: '获取平台余额',
            设置待进入游戏: '设置待进入游戏',
            设置进入游戏弹框: '设置进入游戏弹框',
        }),
        点击(item){
            console.log(item);
            if(item.gid){
                var obj = Object.assign({}, item)
                this.修改state(['Moneymin', ''])
                this.修改state(['Aname', ''])
                var obj = {
                    name: item.minName,
                    查询类型: item.type,
                    gid: item.gid
                }
                this.设置待进入游戏(obj)
                this.设置进入游戏弹框(true)
                this.获取平台余额(item.type)
                return
            }
            if(item.url){
                if(item.url_type==1){
                    window.open(item.url,'pcCaiPiao')
                }else{
                    this.$router.push(item.url)
                }
            }
        }
    },
    watch: {
        $route(){
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
.immortal {
    .container {
        .immortal_box {
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
                    box-sizing: border-box;
                    // padding-top: 40px;
                    max-height: 700px;
                    overflow: auto;
                    height: 100%;
                    .ul_content_li_ul {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                        li {
                            width: 20%;
                            padding: 10px;
                            box-sizing: border-box;
                            padding-top: 30px;
                            .img_box {
                                margin: 0px auto;
                                width: 150px;
                                height: 150px;
                                cursor: pointer;
                                img {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: contain;
                                }
                            }
                            p {
                                margin: 15px 0px 20px 0px;
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
  
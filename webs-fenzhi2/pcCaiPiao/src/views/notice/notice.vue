<template>
<div class="notice">
    <div class="container">

        <div class="table_box">

            <ul class="title_box_ul">
                <li>
                    <div @click="toggleTabs(-1)" class="qbBtn"><span @click="toggleTabs(-1)" class="text_btn">全部</span></div>
                </li>
                <li v-for="(item,index) in 彩票分类" :key="index">
                    <div @click="toggleTabs(index)" class="title_img_box"><img :src="`${config.api_url}/Areas/Lottery/Content/img/${item.img}`"></div>
                    <span @click="toggleTabs(index)">{{item.name}}</span>
                </li>
            </ul>
            <ul class="table_nav_ul">
                <li :class="{active:当前选中 && 当前选中.id==item.id}" v-for="(item,index) in minNav_1">
                    <span @click="选中彩票(item)">{{item.name}}</span>
                </li>
            </ul>

            <div class="table_content">
                <div class="zx_box">
                    <div class="left"><span class="iconfont icon-icon1 "></span><span>最新开奖结果</span></div>
                    <div v-if="当前选中 && 当前选中.今日昨日" class="right">
                        <div @click="getList(当前选中,1)">昨日</div>
                        <div @click="getList(当前选中,2)">前日</div>
                        <div @click="getList(当前选中,0)">今日</div>
                    </div>
                </div>

                <div class="content">
                    <!-- 点击全部展示的table -->
                    <table class="table" cellspacing="0px" v-if="!当前选中">
                        <thead>
                            <tr>
                                <th>彩种</th>
                                <th>期号</th>
                                <th>开奖时间</th>
                                <th>开奖号码</th>
                                <th>期数(每天)</th>
                                <th>开奖频率</th>
                                <th>玩法</th>
                                <th>记录</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in allDate_1">
                                <td>{{item.name}}</td>
                                <td>{{item.IssueCode}}</td>
                                <td>{{item.ActualTime}}</td>
                                <td class="num_td">
                                    <!-- 分分快  -->
                                    <div class="num_td_box4" v-if="item.key==40004">
                                        <!-- {{item.key}}__ 就是拿到的数据  10001. 20003. 40001 .   -->
                                        <div :class="'num_' + item1" v-for="(item1,index) in item.Content"></div>
                                    </div>
                                    <!-- 三分时时彩 分分时时彩  重庆时时彩  五分时时彩 排列三 福彩3D 山东11选5 广东11选5 分分11选5-->
                                    <div class="num_td_box" v-if="item.key==10000 || item.key==10001 || item.key==10002  || item.key==10003 || item.key==30000 || item.key==30001 || item.key==30002 || item.key==60000 || item.key==60001 || item.key==60005 ">
                                        <div v-for="(item1,index) in item.Content">{{item1}}</div>
                                    </div>
                                    <!-- 极速PK拾  北京PK拾  幸运飞艇  威尼斯飞艇-->
                                    <div class="num_td_box1" v-if="item.key==20000 || item.key==20001 || item.key==20002 || item.key==20003 || item.key==20004">
                                        <div :class="'Bcolor_' + item1" v-for="(item1,index) in item.Content">{{item1}}</div>
                                    </div>
                                    <!-- 六合彩 -->
                                    <div class="num_td_box" v-if="item.key==70000 || item.key==70001 || item.key==70002 || item.key==70003">
                                        <div :class="'BC_' + item.Content[0]">{{item.Content[0]}} </div>
                                        <div :class="'BC_' + item.Content[1]">{{item.Content[1]}} </div>
                                        <div :class="'BC_' + item.Content[2]">{{item.Content[2]}} </div>
                                        <div :class="'BC_' + item.Content[3]">{{item.Content[3]}} </div>
                                        <div :class="'BC_' + item.Content[4]">{{item.Content[4]}} </div>
                                        <div :class="'BC_' + item.Content[5]">{{item.Content[5]}} </div>+
                                        <div :class="'BC_' + item.Content[6]">{{item.Content[6]}} </div>
                                    </div>

                                    <!-- 幸运28  -->
                                    <div class="num_td_box3" v-if="item.key==50000">
                                        <div :class="'BackColor_' + item.Content[0]">{{item.Content[0]}} </div>+
                                        <div :class="'BackColor_' + item.Content[1]">{{item.Content[1]}} </div>+
                                        <div :class="'BackColor_' + item.Content[2]">{{item.Content[2]}} </div>=
                                        <div :class="'BackColor_' + item.Content[3]">{{item.Content[3]}} </div>
                                    </div>
                                </td>
                                <td>{{item.彩票频率.期数}}</td>
                                <td>{{item.彩票频率.分钟数}}</td>
                                <td><span class=" iconfont icon-guize" @click="go('/playRule?id='+item.key)"></span></td>
                                <td><span class="iconfont icon-qushi_shangsheng" @click="goType(item.key)"></span></td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else v-loading="loading" class="list2">
                        <!-- 三分彩  时时彩  -->
                        <table10 v-if="type==10" :list="list" />

                        <!--PK10开始  -->
                        <table20 v-if="type==20" :list="list" />

                        <!-- 低频彩开始 飞艇开始 -->
                        <table30 v-if="type==30" :list="list" />

                        <!-- 块3 -->
                        <table40 v-if="type==40" :list="list" />

                        <!-- PC蛋蛋开始 -->
                        <table50 v-if="type==50" :list="list" />

                        <!-- 11选5一样 -->
                        <table60 v-if="type==60" :list="list" />

                        <!--六合彩 -->
                        <table70 v-if="type==70" :list="list" />
                    </div>
                </div>
            </div>

        </div>
    </div>

</div>
</template>

<script>
import table10 from './10.vue'
import table20 from './20.vue'
import table30 from './30.vue'
import table40 from './40.vue'
import table50 from './50.vue'
import table60 from './60.vue'
import table70 from './70.vue'
import moment from 'moment'
import {
    api_近期开奖,
    api_开奖公告,
    apimin_开奖公告,
    apimin_开奖公告_noDate,
    apimin_开奖公告_昨日,
    apimin_开奖公告_前日,
    api_开奖记录
} from "@/api/开奖公告.js";
import {
    all
} from 'q';
import {
    mapState
} from "vuex";
export default {
    data() {
        return {
            dateTable: false,
            nowIndex: -1, //分类 全部为-1 
            allDate: [], //点击全部的数据

            当前选中: "",
            list: [],

            彩票分类: [{
                    name: "三分彩",
                    img: "sanfencai.png",
                    children: [{
                        name: "三分时时彩",
                        期数: "480期",
                        分钟数: "3分钟",
                        id: 10000,
                        今日昨日: true
                    }]
                },
                {
                    name: "时时彩",
                    img: "shishicai.png",
                    children: [{
                            name: "分分时时彩",
                            期数: "1440期",
                            分钟数: "1分钟",
                            id: 10001,
                            今日昨日: true
                        },
                        {
                            name: "重庆时时彩",
                            期数: "59期",
                            分钟数: "20分钟",
                            id: 10002,
                            今日昨日: true
                        },
                        {
                            name: "五分时时彩",
                            期数: "179期",
                            分钟数: "5分钟",
                            id: 10003,
                            今日昨日: true
                        }
                    ]
                },
                {
                    name: "PK10",
                    img: "pkshi.png",
                    children: [{
                            name: "北京PK拾",
                            期数: "44期",
                            分钟数: "20分钟",
                            id: 20001,
                            今日昨日: true
                        },
                        {
                            name: "五分PK拾",
                            期数: "44期",
                            分钟数: "20分钟",
                            id: 20004,
                            今日昨日: true
                        },
                        {
                            name: "极速PK拾",
                            期数: "1440期",
                            分钟数: "1分钟",
                            id: 20000,
                            今日昨日: true
                        }
                    ]
                },
                {
                    name: "低频彩",
                    img: "dipincai.png",
                    children: [{
                            name: "极速3D",
                            期数: "1440期",
                            分钟数: "1分钟",
                            id: 30002,
                            今日昨日: true
                        },
                        {
                            name: "排列三",
                            期数: "每天1期",
                            分钟数: "20:25",
                            id: 30000
                        },
                        {
                            name: "福彩3D",
                            期数: "每天1期",
                            分钟数: "21:10",
                            id: 30001
                        }
                    ]
                },
                {
                    name: "快3",
                    img: "kuaisan.png",
                    id: 4,
                    children: [{
                            name: "分分快3",
                            期数: "1440期",
                            分钟数: "1分钟",
                            id: 40004,
                            今日昨日: true
                        },
                        {
                            name: "五分快3",
                            期数: "288期",
                            分钟数: "5分钟",
                            id: 40005,
                            今日昨日: true
                        },
                        {
                            name: "江苏快3",
                            期数: "41期",
                            分钟数: "20分钟",
                            id: 40003,
                            今日昨日: true
                        }

                    ]
                },
                {
                    name: "PC蛋蛋",
                    img: "pcdandan.png",
                    children: [{
                        name: "幸运28",
                        期数: "660期",
                        分钟数: "2分钟",
                        id: 50000,
                        今日昨日: true
                    }]
                },
                {
                    name: "11选5",
                    img: "shiyixuanwu.png",
                    children: [{
                            name: "分分11选5",
                            期数: "1440期",
                            分钟数: "1分钟",
                            id: 60005,
                            今日昨日: true
                        },
                        {
                            name: "广东11选5",
                            期数: "42期",
                            分钟数: "20分钟",
                            id: 60001,
                            今日昨日: true
                        },
                        {
                            name: "山东11选5",
                            期数: "43期",
                            分钟数: "20分钟",
                            id: 60000,
                            今日昨日: true
                        }
                    ]
                }, {
                    name: "六合彩",
                    img: "liuhecai.png",
                    children: [{
                            name: "极速六合彩",
                            期数: "288期",
                            分钟数: "5分钟",
                            id: 70000,
                            今日昨日: true
                        },
                        {
                            name: "香港六合彩",
                            期数: "1期",
                            分钟数: "2/3天",
                            id: 70001
                        },
                        {
                            name: "澳门六合彩",
                            期数: "1期",
                            分钟数: "21:35开奖",
                            id: 70002
                        },
                        {
                            name: "台湾六合彩",
                            期数: "每周2期",
                            分钟数: "20:50开奖",
                            id: 70003
                        },
                    ]
                }, {
                    name: "飞艇",
                    img: "feiting.png",
                    children: [{
                            name: "幸运飞艇",
                            期数: "180期",
                            分钟数: "5分",
                            id: 20002,
                            今日昨日: true
                        },
                        {
                            name: "新幸运飞艇",
                            期数: "180期",
                            分钟数: "5分",
                            id: 20005,
                            今日昨日: true
                        },
                        {
                            name: "威尼斯飞艇",
                            期数: "480期",
                            分钟数: "3分钟",
                            id: 20003,
                            今日昨日: true
                        }
                    ]
                }
            ],
            loading: false
        }
    },
    components: {
        table10,
        table20,
        table30,
        table40,
        table50,
        table60,
        table70
    },
    mounted() {
        var id = this.$route.query.item; // 彩票id
        if (id) {
            this.nowIndex = this.彩票分类.findIndex(x => x.children.find(y => y.id == id));
            this.彩票分类.map(x => {
                if (x.children.find(y => y.id == id)) {
                    this.当前选中 = x.children.find(y => y.id == id)
                }
            })
            this.getList(this.当前选中);
        } else {
            this.alldata()
        }

        // console.log(moment().format('YYYY MM DD'))
        // console.log(moment().subtract(0, 'days').format('YYYY MM DD'))
        // console.log(moment().subtract(1, 'days').format('YYYY MM DD'))
        // console.log(moment().subtract(7, 'days').format('YYYY MM DD'))
        // console.log(moment().subtract(6, 'days').format('YYYY MM DD'))
    },
    computed: {
        ...mapState({
            config: "config"
        }),
        type() {
            if (!this.当前选中) {
                return ''
            } else {
                return this.当前选中.id.toString().substring(0, 2)
            }
        },
        minNav_1() {
            var list = []
            if (this.nowIndex == -1) {
                this.彩票分类.forEach(element => {
                    list = [...list, ...element.children] //数租合并第一个全部
                });
            } else {
                list = this.彩票分类[this.nowIndex].children
            }
            return list
        },
        allDate_1() {
            var list = []
            if (this.nowIndex == -1) {
                return this.allDate; //就返回所有的
            } else if (this.nowIndex == 0) {
                return this.allDate.filter(x => x.key == '10000') //查找等于10000的
            } else if (this.nowIndex == 1) {
                var type = this.nowIndex; // 查找1开头的   除开10000
                return this.allDate.filter(x => x.key.substring(0, 1) == type && x.key != '10000');
            } else if (this.nowIndex == 2) { // 查找2开头的   除开20002   20003
                var type = this.nowIndex; // 
                return this.allDate.filter(x => x.key.substring(0, 1) == type && x.key != '20002' && x.key != '20003');
            } else if (this.nowIndex == 3) {
                var type = this.nowIndex; // 
                return this.allDate.filter(x => x.key.substring(0, 1) == type);
            } else if (this.nowIndex == 4) {
                var type = this.nowIndex; // 
                return this.allDate.filter(x => x.key.substring(0, 1) == type);
            } else if (this.nowIndex == 5) {
                var type = this.nowIndex; // 
                return this.allDate.filter(x => x.key.substring(0, 1) == type);
            } else if (this.nowIndex == 6) {
                var type = this.nowIndex; // 
                return this.allDate.filter(x => x.key.substring(0, 1) == type);
            } else if (this.nowIndex == 7) {
                var type = this.nowIndex; // 
                return this.allDate.filter(x => x.key.substring(0, 1) == type);
            } else if (this.nowIndex == 8) {
                return this.allDate.filter(x => x.key == '20002' || x.key == '20003');
            } else {
                return this.allDate
            }
        },
    },
    methods: {
        goType(id) {
            this.nowIndex = this.彩票分类.findIndex(x => x.children.find(y => y.id == id));
            this.彩票分类.map(x => {
                if (x.children.find(y => y.id == id)) {
                    this.当前选中 = x.children.find(y => y.id == id)
                }
            })
            this.getList(this.当前选中);
            this.$router.replace(`/notice?item=${this.当前选中.id}`)
        },
        go(url) {
            this.$router.history.push(url);
        },
        //点击分类
        toggleTabs: function (maxindex) {
            this.当前选中 = '';
            this.nowIndex = maxindex;
            this.alldata();
        },
        alldata() {
            api_开奖公告().then(x => {
                var add = x.data
                let list = []
                var this_1 = this
                for (let key in add) {
                    var obj = add[key];
                    obj.key = key; // {{item.key}}__ obj.key=key;  就是拿到的数据  10001. 20003. 40001 .  
                    if (obj.key == 50000) { // 把 总和 push到数租的最后一个 位置
                        var arry = obj.Content
                        var allHE = parseInt(arry[0]) + parseInt(arry[1]) + parseInt(arry[2])
                        arry.push(allHE)
                    }
                    let o = {};
                    this.彩票分类.forEach(item => {
                        if (item.children.find(y => y.id == key)) {
                            o = item.children.find(y => y.id == key)
                        }
                    })
                    obj.name = o.name
                    obj.彩票频率 = {
                        期数: o.期数,
                        分钟数: o.分钟数
                    }
                    list.push(obj)
                }
                this.allDate = list
            }).catch(err => {
                console.log(err);
            })
        },
        getjson(day) {
            var year = moment().format('YYYY')
            if (this.当前选中.id == 30001 || this.当前选中.id == 30000 || this.当前选中.id == 70001 || this.当前选中.id == 70002 || this.当前选中.id == 70003) {
                var time = moment().subtract(day, 'days').format('YYYY');
            } else {
                var time = moment().subtract(day, 'days').format('YYYYMMDD');
            }
            return new Promise((resolve, reject) => {
                api_开奖记录(this.当前选中.id, year, time).then(x => {
                    resolve(x.data)
                }).catch(err => {
                    resolve(err);
                })
            });
        },
        获取近期开奖(day) {
            var q1 = {
                lotteryCode: this.当前选中.id,
                state: 1
            }
            return new Promise((resolve, reject) => {
                //如果不是今天的就不需要获取最新的
                if (day != 0) {
                    resolve([])
                    return
                }
                api_近期开奖(q1).then(x => {
                    if (x.data.Top5) {
                        resolve(x.data.Top5)
                    } else {
                        resolve([])
                    }
                }).catch(err => {
                    resolve([])
                })
            });
        },
        选中彩票(item) {
            this.$router.replace(`/notice?item=${item.id}`)
            this.getList(item)
        },
        async getList(item, day) {
            var this_1 = this
            this.当前选中 = item
            day = day ? day : 0
            this.list = []
            this.loading = true
            var all = await Promise.all([
                this.getjson(day),
                this.获取近期开奖(day)
            ])
            setTimeout(() => {
                this.loading = false
            }, 300);
            // 数组 0 获取json文件 1 最新开奖
            all[1].map(z => {
                let o = all[0].find(y => y.IssueCode == z.IssueCode);
                if (o) {
                    o.Content = z.Content ? z.Content.join('|') : ''
                }
                // 没开奖时间不能像下面这样添加
                // else{  
                //     let o1 = Object.assign({},z)
                //         o1.Content = o1.Content ? o1.Content.join('|') : ''
                //     all[0].unshift(o1)
                // }
            })
            all[0].map(y => {
                y.Content = y.Content ? y.Content.split('|') : ''
            })
            this.list = all[0];
        },
    },
}
</script>

<style lang="scss" scoped>
.icon-qushi_shangsheng,
.icon-guize {
    cursor: pointer;
}

.list2 {
    min-height: 400px;
}

// 内容头部开始
.table_nav_ul {
    border: 1px solid #ffcd9b;
    padding: 10px 10px 10px 10px;
    display: flex;
    flex-wrap: wrap;

    .active {
        color: red;
    }

    span {
        &:hover {
            color: red;
        }

        cursor: pointer;
    }

    li {
        height: 27px;
        width: 96px;
        line-height: 27px;
        box-sizing: border-box;
        text-align: center;
        position: relative;
        color: #666666;
        font-size: 15px;
        text-align: center;

        &::after {
            position: absolute;
            left: 0px;
            top: 10%;
            width: 1px;
            height: 80%;
            content: "";
            background: #666666;
        }
    }

    li:nth-child(10n + 1) {
        &::after {
            display: none;
        }
    }
}

// 公用table th开始
thead {
    width: 100%;
    background: #fff2c9;

    tr {
        background: #fff2c9;
        height: 36px;
        width: 100%;

        th {
            height: 36px;
            vertical-align: middle;
            border: 1px solid #ffcd9b;
            font-size: 14px;
            font-weight: 400px;
        }
    }
}

tbody {
    min-height: 400px;

    tr {
        td {
            border-collapse: collapse;
            vertical-align: middle;
            border: 1px solid #ffcd9b;
            height: 36px;
            text-align: center;
            min-width: 28px;
            font-size: 14px;
        }
    }
}

//公用 小圆点
.num_td_box {
    font-size: 22px;

    div {
        font-size: 14px;
        border-radius: 50%;
        background: red;
    }

    .BC_05,
    .BC_06,
    .BC_11,
    .BC_16,
    .BC_17,
    .BC_21,
    .BC_22,
    .BC_27,
    .BC_28,
    .BC_32,
    .BC_33,
    .BC_38,
    .BC_39,
    .BC_43,
    .BC_44,
    .BC_49 {
        background: #6acc7b;
    }

    .BC_03,
    .BC_04,
    .BC_09,
    .BC_10,
    .BC_14,
    .BC_15,
    .BC_20,
    .BC_25,
    .BC_26,
    .BC_31,
    .BC_36,
    .BC_37,
    .BC_41,
    .BC_42,
    .BC_47,
    .BC_48 {
        background: #51abf0;
    }

    .BC_01,
    .BC_02,
    .BC_07,
    .BC_08,
    .BC_12,
    .BC_13,
    .BC_18,
    .BC_19,
    .BC_23,
    .BC_24,
    .BC_29,
    .BC_30,
    .BC_34,
    .BC_35,
    .BC_40,
    .BC_45,
    .BC_46 {
        background: #f45959;
    }
}

//公用 结束

//  公用小方块开始
.num_td_box1 {
    div {
        border-radius: 4px;
    }

    .Bcolor_01 {
        background: #eedd0f;
    }

    .Bcolor_02 {
        background: #0092dd;
    }

    .Bcolor_03 {
        background: #4b4b4b;
    }

    .Bcolor_04 {
        background: #ff7600;
    }

    .Bcolor_05 {
        background: #17e2e5;
    }

    .Bcolor_06 {
        background: #5234ff;
    }

    .Bcolor_07 {
        background: #bfbfbf;
    }

    .Bcolor_08 {
        background: #ff2600;
    }

    .Bcolor_09 {
        background: #780b00;
    }

    .Bcolor_10 {
        background: #07bf00;
    }
}

//  公用小方块结束

.notice {
    .table_box {

        //  头部
        .title_box_ul {
            margin-top: 20px;
            background: #fff7f0;
            display: flex;
            flex-wrap: wrap;

            li {
                display: flex;
                padding-top: 10px;
                height: 40px;
                width: 110px;
                box-sizing: border-box;

                >* {
                    cursor: pointer;
                }

                .qbBtn {
                    width: 60px;
                    height: 25px;
                    border-radius: 10px;
                    background-color: #bd10e0;
                    text-align: center;
                    line-height: 18px;
                    margin: 0px auto;

                    .text_btn {
                        text-align: center;
                        font-size: 14px;
                        color: #ffffff;
                        line-height: 25px;
                    }
                }

                .title_img_box {
                    width: 26px;
                    height: 26px;
                    margin: 0px 10px 0px 20px;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                span {
                    line-height: 28px;
                }
            }
        }

        // 内容
        .table_content {
            // 内容头部结束

            .zx_box {
                height: 30px;
                width: 100%;
                margin: 20px 0px 30px 0px;
                position: relative;
                display: flex;
                justify-content: space-between;

                .left {
                    .icon-icon1 {
                        color: #da1b25;
                        font-size: 36px;
                        font-weight: 1000;
                        position: relative;
                        top: 6px;
                        left: 0px;
                    }

                    span:nth-child(2) {
                        height: 30px;
                        font-size: 24px;
                    }
                }

                .right {
                    display: flex;
                    justify-content: flex-end;
                    padding-top: 10px;

                    div {
                        cursor: pointer;
                        width: 50px;
                        height: 30px;
                        line-height: 30px;
                        border-radius: 2px;
                        color: #fff;
                        background: #e94335;
                        margin-left: 10px;
                        text-align: center;
                    }
                }
            }

            .content {
                // height: 600px;
                width: 100%;

                // 点击全部展示的table开始
                .table {
                    width: 100%;

                    thead {
                        tr {
                            th {
                                border: none;
                                color: #673300;
                                font-size: 16px;
                            }
                        }
                    }

                    tbody {
                        min-height: 400px;
                        width: 100%;

                        tr:nth-child(2n) {
                            background: #fcfcfc;
                        }

                        tr:nth-child(2n + 1) {
                            background: #eaeaea;
                        }

                        tr {
                            width: 100%;
                            height: 36px;

                            .num_td {

                                .num_td_box4,
                                .num_td_box3,
                                .num_td_box2,
                                .num_td_box1,
                                .num_td_box {
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    flex-wrap: nowrap;

                                    div {
                                        width: 25px;
                                        height: 25px;
                                        line-height: 23px;
                                        color: #ffffff;
                                        margin: 0px 1px 0px 1px;
                                    }
                                }

                                .num_td_box1 {
                                    div {
                                        border-radius: 4px;
                                    }
                                }

                                .num_td_box2 {
                                    div {
                                        border-radius: 50%;
                                        background: #058fcf;
                                    }

                                    .jia {
                                        border-radius: none;
                                        background: none;
                                        color: #666666;
                                        font-size: 26px;
                                        line-height: 20px;
                                    }
                                }

                                .num_td_box3 {
                                    // div {
                                    // }
                                    // .jia {
                                    //     color: #666666;
                                    // }
                                }
                            }

                            td {
                                color: #673300;
                                border: none;

                                .icon-guize {
                                    color: #78b931;
                                    font-size: 24px;
                                }

                                .icon-qushi_shangsheng {
                                    color: #4990e2;
                                    font-size: 24px;
                                }
                            }
                        }
                    }
                }

                // 点击全部展示的table结束
                .table1 {
                    border-collapse: collapse;

                    width: 100%;

                    thead {
                        width: 100%;
                        background: #fff2c9;

                        tr {
                            border: 1px solid #ffcd9b;

                            background: #fff2c9;
                            border-collapse: collapse;

                            th {
                                border: 1px solid #ffcd9b;
                                height: 36px;
                                color: #673300;
                                vertical-align: middle;
                                border-collapse: collapse;
                                font-weight: 400;
                            }
                        }
                    }

                    tbody {
                        tr {
                            td {}

                            .zh {
                                padding: 0px 4px 0px 4px;
                            }
                        }
                    }
                }

                .table8,
                .table2 {
                    border-collapse: collapse;
                    width: 100%;
                }

                .table6,
                .table5,
                .table4 {
                    border-collapse: collapse;
                    width: 100%;

                    thead {
                        tr {
                            th:nth-child(3) {
                                width: 390px;
                            }

                            th:nth-child(4) {
                                width: 280px;
                            }
                        }
                    }

                    tbody {
                        tr {
                            td {}
                        }
                    }
                }

                .table7 {
                    width: 100%;
                    border-collapse: collapse;

                    tbody {
                        tr {
                            td {}

                            .num_td {}
                        }
                    }
                }

                .table3 {
                    border-collapse: collapse;
                    width: 100%;

                    thead {
                        tr {
                            th:nth-child(3) {
                                width: 540px;
                            }

                            th {}
                        }
                    }

                    tbody {
                        tr {
                            td {
                                border-collapse: collapse;
                                vertical-align: middle;
                                height: 37px;
                                border-collapse: collapse;
                                border: 1px solid #ffcd9b;
                                border-collapse: collapse;
                                vertical-align: middle;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

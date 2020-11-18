<template>
    <div>
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">意见反馈</h1>
            <button class="mui-btn mui-btn-blue mui-btn-link mui-pull-right" @click="$router.push('/tianjiayijian')">我要反馈</button>
        </header>
        <div class="mui-content mui-fullscreen">
            <div class="box_1">
                <ul class="header">
                    <li class="time" @click="选择时间('begindate')">{{query.begindate}}</li>
                    <li>至</li>
                    <li class="time" @click="选择时间('enddate')">{{query.enddate}}</li>
                    <li class="selector">
                        <van-dropdown-menu>
                            <van-dropdown-item @change="changeState" v-model="query.state" :options="option1" />
                        </van-dropdown-menu>
                    </li>
                </ul>
                <table class="table table_1">
                    <thead>
                        <tr>
                            <td>标题</td>
                            <td>状态</td>
                            <td>时间</td>
                        </tr>
                    </thead>
                </table>
            </div>

            <div class="box_2">
                <van-list v-model="loading" :finished="query.page>=total && !loading" :finished-text="list.length!=0 ? '没有更多了' : '暂无相关数据'" @load="onLoad">
                    <table class="table">
                        <tr @click="显示详情(item)" v-for="(item, index) in list" :key="index">
                            <td>{{item.Title}}</td>
                            <td>{{item.FeedBackState == 0 ? '未处理':"已处理"}}</td>
                            <td>{{item.CreateTime | ft}}</td>
                        </tr>
                    </table>
                </van-list>
            </div>

            <!-- <van-datetime-picker v-model="currentDate" type="year-month" :min-date="minDate" /> -->
            <van-popup v-model="showPicker" position="bottom">
                <van-datetime-picker v-model="currentDate" @confirm="confirm" @cancel="showPicker=false" type="date" :max-date="maxDate" />
            </van-popup>
        </div>

        <!-- <div class="弹框">
            <ul>
                <li>
                    <label>标题</label>
                    <div></div>
                </li>
            </ul>
        </div> -->

        <van-popup v-model="详情.show" position="bottom" :style="{height:'30%'}">
            <ul class="详情">
                <li>
                    <label>标题：</label>
                    <div>{{详情.obj.Title}}</div>
                </li>
                <li>
                    <label>内容：</label>
                    <div>{{详情.obj.Content}}</div>
                </li>
                <li>
                    <label>回复：</label>
                    <div>
                    </div>
                </li>
            </ul>
        </van-popup>
    </div>
</template>

<script>
import moment from 'moment'
import { api_获取反馈记录 } from "@/api/反馈接口.js";
export default {
    name: "",
    data() {
        return {
            详情:{
                show:false,
                obj:{}
            },

            loading: false,
            finished: false,
            option1: [
                { text: '全部', value: -1 },
                { text: '已处理', value: 1 },
                { text: '未处理', value: 0 }
            ],

            list: [],
            total: 1,

            showPicker: false,
            currentDate: new Date(),
            maxDate: new Date(),
            type: "begindate",       // begindate 和 enddate
            query: {
                page: 0, //第 1 页开始
                pagecount: 20,
                begindate: moment().subtract(1, 'month').format('YYYY-MM-DD'),
                enddate: moment().format('YYYY-MM-DD'),
                state: -1,       //0  未处理 1 已经处理 -1 全部
            },
        }
    },
    filters: {
        ft(time) {
            return moment(time).format('YYYY-MM-DD')
        }
    },
    methods: {
        显示详情(item) {
            this.详情.show = true;
            this.详情.obj = item;
        },
        changeState() {
            console.log(this.query.state)
            this.list = [];
            this.query.page = 1;
            this.获取数据();
        },
        选择时间(type) {
            this.type = type;
            this.showPicker = true;
        },
        confirm(value) {
            this.query[this.type] = moment(value).format('YYYY-MM-DD');
            this.showPicker = false;
            this.query.page = 1;
            this.list = [];
            this.获取数据();
        },
        onLoad() {
            console.log('onLoad')
            this.query.page++
            this.获取数据();
        },
        async 获取数据() {
            var r = await api_获取反馈记录(this.query)
            this.list = [...this.list, ...r.data.rows]
            this.total = r.data.total;
            this.loading = false;
        }
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    height: _vw(46);
    align-items: center;
    padding: _vw(10) _vw(10);
    background: #ffffff;
    font-size: _vw(14);
    .van-dropdown-menu {
        height: 100%;
    }
    /deep/ .van-dropdown-menu__title {
        font-size: _vw(13);
    }
    .selector {
        height: 100%;
        white-space: nowrap;
        flex-shrink: 0;
    }
    .time {
        background: #eeeeee;
        text-align: center;
        flex: 1;
        height: 100%;
        flex-grow: 1;
        margin: 0px 5px;
        line-height: _vw(26);
        border-radius: _vw(26);
    }
}

.mui-content {
    display: flex;
    flex-direction: column;
}
.box_1 {
    flex-shrink: 0p;
}

.box_2 {
    flex: 1;
    overflow: auto;
}
.table_1 {
    background: #ffffff;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
}
.table {
    white-space: nowrap;
    font-size: _vw(14);

    // table{
    width: 100%;
    table-layout: fixed;
    // }
    tr:nth-child(2n) {
        background: #ffffff;
    }
    td {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
        padding: 0px _vw(10);
        line-height: _vw(36);
        // width: 30%;
        &:nth-child(2) {
            width: _vw(70);
            text-align: center;
        }
        &:nth-child(3) {
            width: _vw(110);
            text-align: center;
        }
    }
}
.详情{
    font-size: _vw(14);
    padding: _vw(10);
    >li{
        display: flex;
        margin: 0px 0px _vw(10);
    }
    label{
        width:50px;
    }
    div{
        width: calc(100% - 50px);
    }
}
</style>
<template>
    <div class="搜索">
        <div class="bg">
            <img src="static/bg1.jpg" alt srcset />
        </div>
        <div class="搜索框">
            <div class="text-1">
                {{text[语言类型].t1}} CC+CVV
                <br v-if="text[语言类型].t2" />
                {{text[语言类型].t2}}
            </div>
            <div class="flex">
                <div>
                    <div class="select">
                        <el-select class="select-2" size="small" v-model="cardNumber" multiple filterable allow-create default-first-option :placeholder="text[语言类型].text_3">
                            <!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                        </el-select>
                        <el-button @click="handleFilter" class="btn-1" size="small" icon="el-icon-search"></el-button>
                    </div>
                </div>
                <div class="多语言">
                    <span :class="{active:语言类型==1}" @click="设置语言(1)">简体中文</span>
                    <span :class="{active:语言类型==2}" @click="设置语言(2)">English</span>
                    <span :class="{active:语言类型==3}" @click="设置语言(3)">русский</span>
                </div>
            </div>
        </div>

        <ul class="list" v-loading="fullscreenLoading">
            <li>{{text[语言类型].kahao}}</li>
            <li v-for="item in list">{{ item.cardNumberXX }}</li>
        </ul>

        <div class="分页">
            <el-pagination @current-change="getpage" layout="prev, pager, next" :total="20"></el-pagination>
        </div>

        <el-popover placement="left" trigger="hover">
            <ul class="list2">
                <li>
                    {{text[语言类型].genxin}}
                    <img src="static/t_logo.png" alt />
                    <el-link type="success" href="https://t.me/cvvhv" target="view_window">https://t.me/cvvhv</el-link>
                </li>
                <li>
                    {{text[语言类型].text_1}}
                    <img src="static/licq.png" alt /> icq：123123
                </li>
                <li>
                    {{text[语言类型].text_1}}
                    <img src="static/licq.png" alt /> icq：222444
                </li>
                <li>
                    {{text[语言类型].text_1}}
                    <img src="static/licq.png" alt /> icq：555333
                </li>
                <li>
                    {{text[语言类型].text_1}}
                    <img src="static/licq.png" alt /> icq：888777
                </li>
                <li>
                    {{text[语言类型].text_1}}
                    <img src="static/licq.png" alt /> icq：900000
                </li>
                <li>
                    {{text[语言类型].text_1}}
                    <img src="static/licq.png" alt /> icq：93339
                </li>
                <li>
                    {{text[语言类型].text_1}}
                    <img src="static/licq.png" alt /> icq：30088
                </li>
                <li>
                    {{text[语言类型].text_2}}
                    <img src="static/licq.png" alt /> icq：77777
                </li>
            </ul>
            <div class="联系我们 pc" slot="reference">
                {{text[语言类型].lianxi}}
                <br />
                {{text[语言类型].women}}
            </div>
        </el-popover>

        <div class="联系我们 shouji" @click="dialogVisible=true">
            {{text[语言类型].lianxi}}
            <br />
            {{text[语言类型].women}}
        </div>

        <el-dialog :title="text[语言类型].lianxi+text[语言类型].women" class="联系弹框" :visible.sync="dialogVisible" width="95%">
            <ul class="list3 shouji">
            <!-- <li class="title2">{{text[语言类型].lianxi}} {{text[语言类型].women}}</li> -->
            <li>
                <div>{{text[语言类型].genxin}}</div>
                <div class="item">
                    <img src="static/t_logo.png" alt />
                    <el-link type="success" href="https://t.me/cvvhv" target="view_window">https://t.me/cvvhv</el-link>
                </div>
            </li>
            <li>
                <div>{{text[语言类型].text_1}}</div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：123123
                </div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：222444
                </div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：555333
                </div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：888777
                </div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：900000
                </div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：93339
                </div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：30088
                </div>
            </li>
            <li>
                <div>{{text[语言类型].text_2}}</div>
                <div class="item">
                    <img src="static/licq.png" alt /> icq：77777
                </div>
            </li>
        </ul>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "ComplexTable",
    // components: { Pagination },
    filters: {
        parseTime(time) {
            return parseTime(time);
        },
    },
    data() {
        return {
            dialogVisible:false,
            语言类型: 1, //1 简体中文  2 英文 3 俄语
            options: [
                // {
                //     value: '选项1',
                //     label: '黄金糕'
                // },
            ],
            cardNumber: [],
            fullscreenLoading: false,
            list: [],
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: "+id",
                Query: {
                    cardNumber: "",
                },
            },
            text: {
                1: {
                    title:"蓝色火焰1.0",
                    t1: '第一手亚洲数据库',
                    // t2:"我们努力为你创造更高的利润",
                    lianxi: '联系',
                    women: "我们",
                    kahao: "卡号",
                    genxin: "新闻每日更新通知",
                    text_1: "7x24在线客服",
                    text_2: "合作咨询支持",
                    text_3:"请输入bin"
                },
                2: {
                    title:"Blue flame 1.0",
                    t1: 'First-hand Asian database',
                    // t2:"We strive to create higher profits for you",
                    lianxi: 'contact',
                    women: "Us",
                    kahao: "Card Number",
                    genxin: "Daily news update notification",
                    text_1: "7x24 online customer service",
                    text_2: "Cooperative consulting support",
                    text_3:'Please enter bin'
                },
                3: {
                    title:"Голубое пламя 1.0",
                    t1: "Азиатская база данных из первых рук",
                    // t2:"Мы стремимся приносить вам более высокую прибыль",
                    lianxi: 'Kонтакт',
                    women: "Mы",
                    kahao: "номер карты",
                    genxin: "Уведомление об обновлении новостей за день",
                    text_1: "Обслуживание клиентов онлайн 7x24",
                    text_2: "Совместная консультационная поддержка",
                    text_3:"пожалуйста, введите bin"
                }
            }
        };
    },
    created() {
        this.getList();
        document.querySelector('title').text = this.text[this.语言类型].title
    },
    methods: {
        联系我们() {
            document.querySelector('.list3').scrollIntoView()
        },
        设置语言(t) {
            this.语言类型 = t
            document.querySelector('title').text = this.text[t].title
        },
        getpage(val) {
            this.listQuery.page = val;
            this.getList();
        },
        getList() {
            this.listLoading = true;
            this.listQuery.Query.cardNumber = this.cardNumber.join(',')
            this.$axios.post('/Search/List', this.listQuery).then((response) => {
                console.log(response)
                this.list = response.data.data.items;
                this.total = response.data.data.total;
                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
            }).catch(err => {
                console.log(err)
            })
        },
        handleFilter() {

            this.listQuery.page = 1;
            this.getList();
        },
    },
};
</script>

<style lang="scss" scoped>
ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}
.搜索 {
    height: 100%;
    background: #101010;
    overflow: auto;
}
.bg {
    height: 300px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.搜索框 {
    width: 1024px;
    max-width: 100%;
    margin: 0px auto;
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    @media (max-width: 750px) {
        .flex {
            // display: block;
            flex-direction: column-reverse;
            align-items: inherit;
        }
    }
    .多语言 {
        font-size: 14px;
        color: #ffd822;
        span {
            padding: 0px 5px;
            cursor: pointer;
        }
        span:not(:nth-child(1)) {
            border-left: 1px solid #393939;
        }
        .active {
            color: #bdbdbd;
        }
        @media (max-width: 750px) {
            text-align: right;
            padding: 10px;
        }
    }
    .text-1 {
        padding: 15px 0px;
        text-align: center;
        font-size: 22px;
        // color: #fff;
        color: #ffd822;
        border-bottom: 1px solid rgba($color: #fff, $alpha: 0.7);
        @media (max-width: 750px) {
            font-size: 18px;
        }
    }
    .select {
        padding: 10px 10px;
        ::v-deep input {
            border-radius: 0px;
        }
        /deep/ .el-tag.el-tag--info {
            background: #65ca09;
        }
    }
    .select-2 {
        width: 300px;
    }
    @media (max-width: 750px) {
        .select {
            display: flex;
        }
        .select-2 {
            flex: 1;
        }
    }
    ::v-deep .el-input__suffix {
        display: none;
    }
    .btn-1 {
        border-radius: 0px;
        height: 32px;
        border-left: none;
    }
    ::v-deep .el-tag.el-tag--info {
        color: #000;
    }
}

.list {
    min-height: 500px;
    width: 1024px;
    max-width: 100%;
    // @media (max-width: 750px) {
    //     width: 100%;
    // }

    margin: 0px auto;
    color: #bdbdbd;
    text-align: center;
    // 1px solid #393939
    border: 1px solid #393939;
    li:nth-child(1) {
        color: #ffd822;
    }
    li {
        padding: 10px;
        border-bottom: 1px solid #393939;
    }
    li:nth-child(2n-1) {
        background: #090909;
    }
    ::v-deep .el-loading-mask {
        background-color: rgba($color: #fff, $alpha: 0.3);
    }
}

.分页 {
    text-align: center;
    margin: 20px 0px;
    ::v-deep .el-pagination {
        color: #bdbdbd;
    }
    ::v-deep .number.active {
        color: #ffd822;
    }
    ::v-deep .btn-prev,
    ::v-deep .number,
    ::v-deep .btn-next {
        background: none;
        color: #bdbdbd;
    }
}

.footer {
    background: #090909;
    text-align: center;
    padding: 10px;
    img {
        width: 50px;
    }
}

.联系我们 {
    text-align: center;
    position: fixed;
    right: 50px;
    bottom: 50px;
    background: #ffd822;
    width: 54px;
    height: 54px;
    font-size: 12px;
    display: flex;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
    // animation: identifier 3s linear infinite;
    &::after {
        width: 64px;
        height: 64px;
        border: 1px solid #ffd822;
        position: absolute;
        top: -5px;
        right: -5px;
        content: "";
        border-radius: 100%;
        animation: identifier 1.5s linear infinite;
    }
    @media (max-width: 750px) {
        right: 10px;
        bottom: 10px;
    }
}
@keyframes identifier {
    from {
        transform: scale(1);
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: scale(1.5);
    }
}

.list2 {
    li {
        display: flex;
        padding: 5px 0px;
        align-content: center;
    }
    img {
        margin: 0px 5px;
        width: 20px;
        height: 20px;
    }
}

.list3 {
    background: #333333;
    color: #fff;
    padding: 10px 0px 10px;
    font-size: 13px;
    .title2 {
        padding: 10px;
        color: #ffd822;
        font-size: 18px;
        display: block;
        text-align: center;
    }
    li {
        // display: flex;
        padding: 5px 10px;
        // align-content: center;
        // align-items: center;
    }
    .item {
        display: flex;
        align-items: center;
        padding: 5px 0px 5px 16px;
    }
    img {
        margin: 0px 5px;
        width: 20px;
        height: 20px;
    }
}

@media (min-width: 750px) {
    .shouji {
        display: none;
    }
}
@media (max-width: 750px) {
    .pc {
        display: none;
    }
}


.联系弹框{
    /deep/ .el-dialog__header{
         padding: 10px;
    }
    /deep/ .el-dialog__headerbtn{
        top: 10px;
        right: 10px;
    }
    /deep/ .el-dialog__body{
        padding: 10px;
    }
    /deep/ .el-dialog{
        background: rgba(255,255,255,0.8);
    }
}
</style>

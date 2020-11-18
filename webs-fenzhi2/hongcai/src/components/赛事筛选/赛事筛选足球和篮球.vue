<template>

    <div class='赛选'>
        <div class="title">
            <div class="left" @click="关闭弹窗口()">
                <van-icon name="arrow-left" class="arrow-left" />
            </div>
            <div class="cont_c">{{tableType== 1?'足球':"篮球"}}筛选</div>
            <div></div>
        </div>
        <van-tabs @change="change()" v-model="activedata"  class="tab">
            <!-- <van-tabs  :v-model="tableType==1 ? 0 : 1" animated class="tab"> -->
            <van-tab v-for="(item,index ) in list" :title="item.title" :key="index">
                <div class="内容">
                    <div class="全选">
                        <div class="全选框" @click="选择类型('全',item)">{{全选? '取消全选' :'全选'}}</div>
                    </div>
                    <ul>
                        <li v-for="(keey,index ) in item.qulist" @click="选择类型(keey)" :key="index">
                            <div class="div激活样式" :class="{'点击选择':keey.huh }">{{keey.value}}</div>
                        </li>
                    </ul>
                    <div class="确认" :class="{'active':datalist.length>0}" @click="确认函数()">确认</div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { 赛事搜索词 } from "@/api/比赛.js"

export default {
    inject:['筛选确认'],
    props: ['show', 'tableType'],
    data() {
        return {
            activedata: 0,
            全选: false,
            list: [],
            datalist: [],
            // 每个数组的长度:0,
            // objcs:{
            //     sj:"",
            // }
        }
    },
    mounted() {
        console.log(this.tableType)
        // alert(41)
        if (this.tableType == 2) {
            // alert("篮球")
            this.activedata = 1
        } else if (this.tableType == 1) {
            // alert("足球")
            this.activedata = 0
        } else {
            console.log("没找到tableType")
        }
        this.赛事搜索词的函数()
    },
    created() {
        // console.log(this.tableType)
    },
    methods: {
        change(){
            this.全选=false;
            this.datalist = [];
        },
        setActive(){
            this.activedata = this.tableType == 2 ? 1 : 0;
        },
        确认函数() {
            if(this.datalist.length==0) return
            if (this.datalist.length == this.list[this.activedata].qulist.length) {
              
                this.筛选确认(false,this.activedata )
            } else {
                this.筛选确认(this.datalist,this.activedata ) 
            }
        },
        赛事搜索词的函数() {
            赛事搜索词().then(x => {
                //    console.log(x.data.data.list)
                this.list = x.data.data.list
            }).catch(err => {
                console.log(err)
            })
        },
        选择类型(type, item) {
            if (type == '全') {
                this.全选 = !this.全选
                if (this.全选) {
                    console.log(item)
                    for (let i = 0; i < item.qulist.length; i++) {
                        this.$set(item.qulist[i], 'huh', true)
                    }
                    this.datalist = item.qulist
                } else {
                    for (let i = 0; i < item.qulist.length; i++) {
                        this.$set(item.qulist[i], 'huh', false)
                    }
                    this.datalist = []
                }

            } else {
                console.log(this.list[this.activedata])
                this.$set(type, 'huh', !type.huh)
                var list = this.list[this.activedata].qulist.filter(x => x.huh)
                this.datalist = list
            }
           
        },
        关闭弹窗口() {
            this.$emit('success', false);
        },
        onClickLeft() {
            history.back()
        },
    },
    watch: {
       
    },

}
</script>

<style lang="scss" scoped>
/deep/.van-tabs--line .van-tabs__wrap {
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.08);
    // border-bottom:_vw(2) solid
}

//==============================
.全选框 {
    line-height: _vw(30);
    border-radius: _vw(20);
    text-align: center;
    background: #f5f8ff;
    color: #666;
    font-size: _vw(14);
    width: _vw(75);
}
h1 {
    // padding-top:_vw(80);
    top: _vw(80);
    left: _vw(0);
    width: 100%;
}
//==============================
.赛选 {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    .title {
        position:fixed;
        left: 0px;
        top:0px;
        width: 100%;
        z-index: 10;
        background: red;
        line-height: _vw(44);
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        padding: _vw(0) _vw(10);
        box-sizing: border-box;
        font-size: _vw(18);
        font-weight: 600;
    }
    .tab {
        height: calc(100% - #{_vw(44)});
        /deep/ .van-tabs__content {
            height: 100%;
        }
        /deep/ .van-tab__pane {
            height: 100%;
        }
        .内容 {
            // background: green;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .全选 {
            width: 100%;
            // background: red;
            z-index: 100;
            margin-top: _vw(44);
            padding: _vw(10) _vw(10) _vw(10) _vw(10);
            box-sizing: border-box;
            border-bottom: _vw(1) solid rgb(243, 238, 238);
            display: flex;
            justify-content: flex-end;
            background: #ffffff;
            flex-shrink: 0;
        }
        ul {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            overflow: auto;
            align-content: baseline;
            padding-top: _vw(10);
            .点击选择 {
                background: rgba(255, 34, 34, 0.05);
                color: #f22 !important;
                border: _vw(1) solid #f22;
            }
            li {
                width: 25%;
                display: flex;
                justify-content: center;
                margin-bottom: _vw(10);
                .div激活样式 {
                    line-height: _vw(30);
                    border-radius: _vw(20);
                    text-align: center;
                    background: #f5f8ff;
                    color: #666;
                    font-size: _vw(14);
                    width: _vw(75);
                }
            }
        }
        .确认 {
            text-align: center;
            line-height: _vw(40);
            font-size: _vw(16);
            color: #cccc;
            bottom: 0px;
            left: 0px;
            width: 100%;
            border-top: _vw(1) solid #ccc;
            // background: green;
            &.active{
                color: #000;
            }
        }
    }
}
</style>

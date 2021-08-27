<template>
    <div>
        <el-dialog title="计划设置" class="设置计划" :visible.sync="dialogVisible" width="60%" :before-close="关闭计划设置" top="10vh">
            <div class="title1">
                <el-dropdown @command="handleCommand">
                    <el-button type="primary" size="mini">
                        {{计划[query.PlanCount]}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">一期计划</el-dropdown-item>
                        <el-dropdown-item command="2">二期计划</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="danger" class="更新" size="mini" @click="更新缓存()">更新缓存</el-button>
            </div>
            <ul class="list">
                <li v-for="(item, index) in 彩票" :key="index" v-if="item.LotteryPlayTypes && item.LotteryPlayTypes.length>0">
                    <div class="header" @click="展开收起($event,item)">
                        <div class="img_box">
                            <img :src="'static/image/home/caipiao/'+item.LotteryCode+'.png'" alt="" srcset="">
                        </div>
                        <div class="title">
                            {{item.LotteryName}}
                        </div>
                        <el-button @mouseover.native='可以展开=false' @mouseout.native="可以展开=true"  plain round size="mini" @click="启用(item)" :type="item.IsStart ? 'warning' : 'success'">{{item.IsStart ? '停用':"启用"}}</el-button>
                    </div>
                    <div class="cont_1">
                        <ul class="玩法列表">
                            <li v-for="(item1, index1) in item.LotteryPlayTypes" :key="index1">
                                <div class="header_1">
                                    <div>
                                        {{item1.MethodName}}
                                    </div>
                                    <div class="头像" @click="点击头像(item,item1)" :class="{'灰色':item1.ChatId.length==0}" title="点击修改头像">
                                        <img v-if="item1.Header" :src="'static/image/touxiang/'+item1.Header" alt="" srcset="">
                                        <img v-else src="static/image/touxiang/GLJL1.png" alt="" srcset="">
                                    </div>
                                </div>
                                <ul class="房间">
                                    <li v-for="(item2, index2) in 房间" :key="index2" @click="勾选(item1,item2,item)" :class="{active:item1.ChatId.includes(item2.Id)}">
                                        <div class="多选框">
                                            <i class="el-icon-check"></i>
                                        </div>
                                        <div>
                                            {{item2.Name}}
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <!-- <el-button-group class="btn">
                            <el-button size="mini" @click="取消()">取消</el-button>
                            <el-button size="mini" type="success" plain @click="确定(item)">确定</el-button>
                        </el-button-group> -->
                    </div>
                </li>
            </ul>
        </el-dialog>

        <el-dialog title="修改头像" class="头像列表" top="10vh" :visible.sync="设置头像.show" width="450px" >
            <div class="box_2">
                <div class="头像集">
                    <div class="title_1"><span class="红色">管理员</span>专用</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img :class="{'active':'GL'+item+'.png'==设置头像.已选头像}" @click="设置图片('GL'+item+'.png')" :src="'static/image/touxiang/GL'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1"><span class="红色">计划员</span>专属</div>
                    <ul>
                        <li v-for="(item, index) in 6" :key="index">
                            <img :class="{'active':'GLJL'+item+'.png'==设置头像.已选头像}" @click="设置图片('GLJL'+item+'.png')" :src="'static/image/touxiang/GLJL'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="btn_1" v-show="设置头像.已选头像" size="small" @click="保存头像()">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios'
import { api_已设计划, api_获取房间列表 , api_更新计划 , api_获取计划设置 , api_启用计划 , api_删除计划 , api_redis初始化} from "@/api/聊天室接口.js";
import { api_获取彩票配置 } from "@/api/游戏彩票接口.js";
import { mapState , mapGetters, mapActions } from 'vuex'
export default {
    name: "",
    inject: ['关闭计划设置'],
    data() {
        return {
            dialogVisible: true,
            彩票: [],
            房间: [],
            选择头像:false,
            设置头像:{
                已选头像:"",
                show:false,
                obj:"",
                obj1:""
            },
            可以展开:true,
            计划:{
                1:'一期计划',
                2:"二期计划"
            },
            query:{
                PlanCount:1     //1 一期计划 2 二期计划
            }
        }
    },
    computed: {
        ...mapState({
            config:"config" 
        })
    },
    methods: {
        ...mapActions({
            '加载中':"加载中",
            成功提示:"成功提示",
            失败提示:"失败提示"
        }),
        handleCommand(command){
            // console.log(command)
            this.query.PlanCount = command;
            this.获取彩票()
        },
        更新缓存(){
            this.加载中(true);
            api_redis初始化().then(x=>{
                console.log(x)
                if(x.data.code==0){
                    this.成功提示('更新成功')
                }else{
                    this.失败提示(x.data.msg)
                }
                this.加载中(false);
            }).catch(err=>{
                this.失败提示('系统错误，稍后再试')
                this.加载中(false);
            })
        },
        async 启用(item){
            this.加载中(true);
            let q = {
                    lotterycode:item.LotteryCode,
                    PlanCount:this.query.PlanCount
                }
            try {
                if(item.IsStart){
                    var r = await api_删除计划(q);
                }else{
                    var r = await api_启用计划(q);
                }
            } catch (error) {
                this.失败提示('系统错误，稍后再试');
                this.加载中(false)
                return
            }
            if(r.data.code==0){
                this.成功提示('设置成功')
                item.IsStart=!item.IsStart
            }else{
                this.失败提示(r.data.msg)
            }
            this.加载中(false);
        },
        勾选(item1,item2 , item){
            console.log(item1,item2)
            if(item1.ChatId.includes(item2.Id)){
                var index = item1.ChatId.findIndex(x=>x==item2.Id);
                item1.ChatId.splice(index,1)
            }else{
                item1.ChatId.push(item2.Id)
            }
            item.PlanCount = this.query.PlanCount;
            console.log(item)
            this.确定(item)
        },
        保存头像(){
            this.设置头像.obj1.Header = this.设置头像.已选头像;
            this.设置头像.show = false;
            this.确定(this.设置头像.obj);
        },
        设置图片(url){
            this.设置头像.已选头像=url;
        },
        点击头像(item , item1){
            if(item1.ChatId.length == 0){
                this.失败提示('请先设置房间')
                return
            }
            this.设置头像.obj = item;
            this.设置头像.obj1 = item1;
            this.设置头像.已选头像=item1.Header;
            this.设置头像.show=true;
        },
        async 确定(item) {
            console.log(item);
            // this.加载中(true)
            try {
                var r = await api_更新计划(item)
            } catch (error) {
                // this.加载中(false);
                this.失败提示('系统错误，稍后再试')
                return
            }
            if(r.data.code==0){
                // this.成功提示('设置成功')
            }else{
                this.失败提示(r.data.msg)
            }
            this.获取彩票();
            // this.加载中(false)
        },
        async 取消(){
            var r =await this.$confirm('此操作将不会保存所有变更, 是否继续?', '提示', {
                // confirmButtonText: '确定',
                // cancelButtonText: '取消',
                // type: 'warning'
            }).then(() => true).catch(() => false);
            console.log(r)
            if(r==true){
                this.获取彩票()
            }
        },
        展开收起(e, item) {
            if(!this.可以展开){
                return false
            }
            var div = e.currentTarget.parentElement.querySelector('.cont_1');
            if (div.style.height == '' || div.style.height == '0px') {
                let h = 0;
                div.querySelectorAll('.cont_1>*').forEach(item => {
                    h += item.clientHeight;
                });
                div.style.height = h + 'px';
            } else {
                div.style.height = '0px';
            }
        },
        async 获取彩票() {
            // this.加载中(true)
            var r = await api_获取计划设置(this.query);
            this.彩票 = r.data.LotteryPlayTyeps;
            this.房间 = r.data.Rooms;
            // this.加载中(false)
        }
    },
    mounted() {
        this.获取彩票()
    },
}
</script>

<style lang="scss" scoped>


.设置计划{
    /deep/ .el-dialog {
        height: calc(100% - 20vh);
    }
    /deep/ .el-dialog__body {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #cccccc;
        height: calc(100% - 54px);
        box-sizing: border-box;
        padding: 5px 0px 5px;
        // * 设置滚动条的样式 */
        &::-webkit-scrollbar {
            width: 6px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
            background: #e8e8e8;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            background: #2e394d;
            border-radius: 6px;
        }
    }
}
.title1{
    padding: 5px 15px;
    .更新{
        margin: 0px 0px 0px 10px;
    }
}
.list {
    flex: 1;
    overflow: auto;
    padding: 0px 15px;
    li {
        background: #eeeeee;
        margin: 5px 0px;
    }
    .header {
        padding: 0px 15px;
        display: flex;
        align-items: center;
        height: 45px;
        border-bottom: 1px solid #ffffff;
    }
    .title {
        flex-grow: 1;
    }
    .img_box {
        margin: 0px 10px 0px 0px;
        width: 20px;
        height: 20px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .btn {
        width: 100%;
        button {
            width: 50%;
        }
    }
}

.cont_1 {
    transition: all 0.3s;
    height: 0px;
    overflow: hidden;
}

.玩法列表 {
    display: flex;
    padding: 5px 15px;
    flex-wrap: wrap;
    .header_1 {
        font-weight: bold;
        display: flex;
        align-items: center;
        .头像{
            width: 40px;
            height: 40px;
            margin: 0px 0px 0px 5px;
            &.灰色{
                img{
                    filter: grayscale(100%);
                    opacity: 0.4;
                }
            }
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 100%;
                border: 1px solid #ffffff;
                cursor: pointer;
            }
        }
    }
    > li {
        padding: 0px 25px;
        border-right: 1px solid #ffffff;
    }
}

.头像列表{
    /deep/ .el-dialog__header{
        border-bottom: 1px solid #cccccc;
    }
    /deep/ .el-dialog{
        height: 100vh - 20vh;
        margin-top:10vh;
    }
    /deep/ .el-dialog__body{
        padding: 0px 10px;
        height: calc(100% - 54px - 53px);
        overflow: auto;
        &::-webkit-scrollbar {
            width:6px;
        }
        /* 滚动槽 */
        &::-webkit-scrollbar-track {
            // -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
            background: #e8e8e8;
        }
        /* 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
            // background:#2e394d;
            background:var(--color);
            border-radius: 6px;
        }
    }
    /deep/ .el-dialog__footer{
        border-top: 1px solid #eeeeee;
        padding: 10px 20px 10px;
        .btn_1 {
            width: 100%;
        }
    }
}
.房间{
    >li{
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover{
            color: #409eff;
        }
        .多选框{
            width: 14px;
            height: 14px;
            border:1px solid #8e8e8e;
            text-align: center;
            line-height: 14px;
            margin: 0px 5px 0px 0px;
            i{
                display: none;
            }
        }
        &.active{
            color: #409eff;
            .多选框{
                background: #409eff;
            }
            i{
                display: block;
                color: #ffffff;
            }
        }
    }

}
.box_2{
    height: 100%;
    
    .头像集{
        background: #ffffff;
        margin: 10px 0px;
        padding: 0px _vw(10);
        .title_1{
            font-size: _vw(13);
            padding: 5px 10px;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width: 20%;
                text-align: center;
                margin: 10px 0px;
                cursor: pointer;
            }
            img{
                width: _vw(60);
                height: _vw(60);
                border-radius: 100%;
                object-fit: cover;
                box-shadow: 0px 0px 1px 1px #c7c7c7;
                box-sizing: border-box;
                &.active{
                    border: 3px solid red
                }
            }
        }
    }
}
</style>
<template>
    <div class="个人资料">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>聊天室</el-breadcrumb-item>
            <el-breadcrumb-item>个人资料</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="详情">
            <div class="标题">
                基本资料
                
            </div>
            <el-form size="mini" ref="form">
                <el-form-item label="头像：">
                    <div class="头像">
                        <img v-if="!个人资料.ImgId" :src="config.img_url+'static/image/touxiang/wutu.jpg'" alt="" srcset="">
                        <img v-if="个人资料.ImgId" :src="config.img_url+'static/image/touxiang/'+个人资料.ImgId" alt="" srcset="">
                        <div @click="选择头像=true">
                            <i class="el-icon-edit"></i>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="账号：">
                    <el-input :value="userinfo.UserId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="余额：">
                    <el-input :value="userinfo.Money" :disabled="true"></el-input>
                    <el-button type="success" plain @click="充值()">充提</el-button>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input :value="个人资料.Nickname" placeholder="未设置" v-show="!修改昵称" :disabled="true"></el-input>
                    <el-input v-model="昵称1" placeholder="未设置" v-show="修改昵称"></el-input>
                    <el-button @click="点击修改()" :type="修改昵称 ? 'warning' : ''">{{修改昵称 ? '保存':"修改"}}</el-button>
                    <el-button @click="取消修改()" v-show="修改昵称">取消</el-button>
                </el-form-item>
            </el-form>
            <div class="提示">提示：了解更多个人信息请移步至<a href="/Members/Info/Person" target="pcliaotianshi">个人中心</a></div>
        </div>

        <el-dialog title="修改头像" class="头像列表" top="10vh" :visible.sync="选择头像" width="450px" >
            <div class="box_2">
                <div class="头像集">
                    <div class="title_1">霸气头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img :class="{'active':'q'+item+'.jpg'==已选头像}" @click="设置图片('q'+item+'.jpg')" :src="config.img_url+'static/image/touxiang/q'+item+'.jpg'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">卡通头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img :class="{'active':'k'+item+'.png'==已选头像}" @click="设置图片('k'+item+'.png')" :src="config.img_url+'static/image/touxiang/k'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">绝色美女头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 20" :key="index">
                            <img :class="{'active':'l'+item+'.png'==已选头像}" @click="设置图片('l'+item+'.png')" :src="config.img_url+'static/image/touxiang/l'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1">霸气总裁头像专区</div>
                    <ul>
                        <li v-for="(item, index) in 20" :key="index">
                            <img :class="{'active':'n'+item+'.png'==已选头像}" @click="设置图片('n'+item+'.png')" :src="config.img_url+'static/image/touxiang/n'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1"><span class="红色">管理员</span>专用</div>
                    <ul>
                        <li v-for="(item, index) in 10" :key="index">
                            <img :class="{'active':'GL'+item+'.png'==已选头像}" @click="设置图片('GL'+item+'.png')" :src="config.img_url+'static/image/touxiang/GL'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="头像集">
                    <div class="title_1"><span class="红色">计划员</span>专属</div>
                    <ul>
                        <li v-for="(item, index) in 6" :key="index">
                            <img :class="{'active':'GLJL'+item+'.png'==已选头像}" @click="设置图片('GLJL'+item+'.png')" :src="config.img_url+'static/image/touxiang/GLJL'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="btn_1" size="small" @click="保存()">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { api_GetPersonInfo, api_修改昵称 , api_修改头像  } from "@/api/个人资料.js";
import { mapState, mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            修改昵称: false,
            昵称1: '',
            // 个人资料: this.$store.state.个人资料,
            选择头像:false,
            已选头像:''
        }
    },
    computed: {
        ...mapState({
            config: 'config',
            userinfo: 'userinfo',
            个人资料: '个人资料'
        })
    },
    methods: {
        ...mapActions({
            加载中: "加载中",
            成功提示: "成功提示",
            失败提示: "失败提示",
            获取个人资料: "获取个人资料"
        }),
        设置图片(url){
            if(url.includes('GL')){
                if(this.个人资料.MemberType==1){
                    this.已选头像=url;
                }else{
                    this.失败提示('非管理员不能使用哦~')
                }
            }else{
                this.已选头像=url;
            }
        },
        取消修改(){
            this.修改昵称=false;
        },
        async 点击修改() {
            this.修改昵称 = !this.修改昵称;
            if (this.修改昵称) {
                this.昵称1 = this.个人资料.Nickname
            }
            if (!this.修改昵称) {
                this.加载中(true);
                try {
                    var r = await api_修改昵称(this.昵称1)
                } catch (error) {
                    this.加载中(false);
                    this.失败提示('系统错误，稍后再试')
                    return
                }
                if (r.data.code != 0) {
                    this.失败提示(r.data.msg)
                    this.加载中(false);
                    return
                }
                this.成功提示('修改成功');
                await this.获取个人资料();
                this.加载中(false);
            }
        },
        充值() {
            window.open('/Members/Money/Recharge', 'pcliaotianshi')
        },
        async 保存(){
            if(!this.已选头像){
                this.失败提示('请选择头像');
                return
            }
            this.加载中(true);
            try {
                var r = await api_修改头像(this.已选头像); 
            } catch (error) {
                this.加载中(false);
                this.失败提示('系统错误，稍后再试');
                return
            }
            if(r.data.code==0){
                this.成功提示('设置成功');
                this.选择头像=false;
            }else{
                this.失败提示(r.data.msg);
            }
            await this.获取个人资料();
            this.加载中(false);
        }
    },
    mounted() {
        // this.初始化();
    },
    watch: {
        
    },
}
</script>

<style lang="scss" scoped>
.个人资料 {
    height: 100%;
    overflow: auto;
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
        // background:#2e394d;
        background: var(--color);
        border-radius: 6px;
    }
}
.红色{
    color: red;
}

.详情 {
    width: 500px;
    margin: 0px auto;
    padding: 0px 50px 50px;
    box-sizing: border-box;
    border: 1px solid #eeeeee;
    min-height: 100%;
    .标题 {
        padding: 20px 0px 20px;
        border-bottom: 1px solid #eeeeee;
        margin: 0px 0px 20px;
        font-weight: bold;
        font-size: 18px;
    }
    /deep/ .el-form-item__content {
        flex-grow: 1;
    }
    /deep/ .el-form-item--mini.el-form-item {
        display: flex;
        align-items: center;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
        border: none;
        border-bottom: 1px solid #e4e7ed;
        color: #000000;
        border-radius: 0px;
        background-color: inherit;
    }
    /deep/ .el-form-item__content {
        display: flex;
    }
    .头像 {
        width: 100px;
        height: 100px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 100%;
        }
        border-radius: 100%;
        overflow: hidden;
        position: relative;
        &:hover {
            div {
                opacity: 1;
            }
        }
        div {
            cursor: pointer;
            width: 100%;
            position: absolute;
            bottom: 0px;
            left: 0px;
            background: rgba(0, 0, 0, 0.6);
            line-height: 28px;
            text-align: center;
            color: #ffffff;
            font-size: 15px;
            opacity: 0;
            transition: all 0.3s;
        }
    }
}
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

.提示{
    color: #a0a0a0;
    margin: 40px 0px 0px;
    font-size: 13px;
    a{
        font-weight: bold;
        color: #106cd6;
        margin: 0px 5px;
    }
}
</style>
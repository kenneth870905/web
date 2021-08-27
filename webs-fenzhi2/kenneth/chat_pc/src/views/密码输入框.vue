<!--
 * @Description: In User Settings Edit
 * @Author: kenneth
 * @Date: 2019-08-26 20:46:09
 * @LastEditTime: 2019-09-14 17:15:44
 * @LastEditors: kenneth
 -->
<template>
    <div>
        <el-dialog title="请输入房间密码" :visible.sync="聊天室state.显示密码输入框" width="400px">
            <div>
                <div class="密码输入框">
                    <input id="input1" type="text" ref="input" @keyup.enter="回车()" @focus="焦点=true" @blur="焦点=false" v-model="密码">
                    <ul class="网格">
                        <li class="隐藏" v-for="(item, index) in 6" :key="index">
                            <div class="圆点" v-if="密码组[index] && 密码组[index].str && !密码组[index].show"></div>
                            <div class="str" v-if="密码组[index] && 密码组[index].str && 密码组[index].show">{{密码组[index].str}}</div>
                            <div v-if="焦点 && (密码组.length==index || (密码组.length==6 && index==5) )" class="竖线"></div>
                        </li>
                    </ul>
                </div>
                <div class="提示">提示：即将进入<span>{{聊天室state.预设房间.Name}}</span>房间，请输入密码</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="聊天室state.显示密码输入框 = false">取 消</el-button>
                <el-button size="small" type="primary" @click="确认密码()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState , mapActions, mapMutations} from "vuex";
export default {
    name: "",
    data() {
        return {
            密码组:[],
            焦点:false,
            密码:""
        }
    },
    computed: {
        ...mapState({
            聊天室state:x=>x.聊天室
        })
    },
    methods: {
        ...mapMutations({
            设置聊天室:'聊天室/设置key'
        }),
        ...mapActions({
            登录聊天室:'聊天室/登录聊天室',
            失败提示:'失败提示'
        }),
        回车(){
            this.确认密码();
        },
        确认密码(){
            if(this.密码组.length!=6){
                this.失败提示('密码长度错误');
                return
            }
            this.设置聊天室(['房间密码',this.密码])
            if(this.聊天室state.预设房间){
                this.设置聊天室(['当前房间',this.聊天室state.预设房间])
            }
            // this.聊天室state.房间密码=this.密码
            // this.聊天室state.当前房间=this.聊天室state.预设房间;
            this.登录聊天室();
            this.密码='';
        }
    },
    mounted() {
        
    },
    watch: {
        密码(){
            this.密码 = this.密码.slice(0, 6);
            if(this.密码组.length<this.密码.length){
                var obj={
                        str:this.密码.slice(this.密码.length-1,this.密码.length),
                        show:true,
                        time:setTimeout(() => {
                            obj.show=false
                        }, 500)
                    }          
                this.密码组.push(obj);
            }else{              
                this.密码组.splice(this.密码.length)
            }                   
        },
        '聊天室state.显示密码输入框'(newvalue,oldvalue){
            if(newvalue){
                this.$nextTick(()=>{
                    this.$refs.input.focus();
                })
            }
        }
    },
}
</script>

<style lang="scss" scoped>


.密码输入框{
    position: relative;
    height: 50px;
    overflow: hidden;
    input{
        position: absolute;
        height: 100%;
        background: none;
        width: 200%;
        top: 0px;
        left: -100%;
        outline: none;
        box-sizing: border-box;
        border: none;
    }
    ul{
        width: 100%;
        height: 100%;
        display: flex;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
        box-sizing: border-box;
        >li{
            flex: 1;
            border-left: 1px solid #cccccc;
            display: flex;
            align-items: center;
            justify-content: center;
            .圆点{
                width: 10px;
                height: 10px;
                border-radius: 100%;
                background: #000000;
            }
            .竖线{
                height: 60%;
                width: 2px;
                background: red;
                animation: sansuo 2s infinite;
            }
        }
    }
}
.提示{
    margin: 25px 0px 0px;
    span{
        color: red;
        margin: 0px 10px;
    }
}
@keyframes sansuo{
    0%{
        background: red;
    }25%{
        background: #ffffff;
    }50%{
        background: red
    }75%{
        background: #ffffff;
    }100%{
        background: red;
    }
}

</style>
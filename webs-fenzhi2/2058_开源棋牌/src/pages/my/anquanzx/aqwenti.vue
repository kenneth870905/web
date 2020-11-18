<template>
   <div >
      <van-nav-bar title="安全问题设置" left-arrow @click-left="onClickLeft" />
      <div class="mui-content mui-fullscreen" >
            <ul class="mui-table-view list">
                <li class="mui-table-view-cell" >
                    <a class="mui-navigate-right item" @click="选择()">
                        <label>问题</label>
                        <span :class="{'提示':!当前问题}"  style="padding-left:18px;">
                            {{当前问题 ? 当前问题 : '请选您的安全问题'}}
                        </span>
                    </a>
                </li>
                <li class="mui-table-view-cell item">
                    <label>回答</label>
                    <input type="text" v-model="回答" placeholder="请输入问题答案">
                </li>
            </ul>
            <div class="提示1">
                提示：设置安全问题可更好的保护您的账户安全！
            </div>
            <button class="btn" @click="提交()">确定</button>
        </div>
  </div>
</template>

<script>
import { api_修改安全问题 } from "@/api/个人资料.js";
export default {
    data(){
        return{
            问题列表:[
                {value:"",text:"您父亲的职业"},
                {value:"",text:"您父亲的姓名"},
                {value:"",text:"您学号(工号)"},
                {value:"",text:"您母亲的生日"},
                {value:"",text:"小学班主任名字"},
                {value:"",text:"你配偶的姓名"},
                {value:"",text:"你配偶的生日"},
                {value:"",text:"初中班主任名字"},
                {value:"",text:"您的出生地"},
                {value:"",text:"您母亲的姓名"},
                {value:"",text:"您父亲的生日"},
                {value:"",text:"高中班主任名字"},
                {value:"",text:"您的车牌号码"}
            ],
            当前问题:"",
            回答:""
        }
    },
    methods:{
         onClickLeft() {
            this.$router.go(-1);
        }, 
        选择(){
            var 选择器 = new mui.PopPicker();
            选择器.setData(this.问题列表);
            选择器.show((items)=> {
                this.当前问题=items[0].text;
                选择器.dispose();
                选择器 = null;
            });
        },
        提交(){
            if(!this.当前问题){
                this.$toast('请选择安全问题')
                return
            }else if(!this.回答){
                this.$toast('请填写回答')
                return
            }
            var obj={
                question:this.当前问题,
                answer:this.回答
            }
            api_修改安全问题(obj).then(x=>{
                console.log(x);
                if(x.data.code==0){
                    this.$toast('设置成功');
                    history.back();
                }else{
                    this.$toast(x.data.msg);
                }
            });
            // question: 您学号(工号)
            // answer: T307
        }
    }
}
</script>

<style>
.van-nav-bar {
    background: #c1c1c1;
}
.van-nav-bar__title {
    color: white;
    font-size: 18px;
    font-weight: bold;
}
.van-nav-bar .van-icon {
    color: white;
}
.list {
    font-size: 14px;
}
.list .item {
        display: flex;
        align-items: center;
}
.list .item label {
            width:50px;
            flex-shrink: 0;
        }
.list .item .提示 {
            color: #9c9c9c;
        }
.list .item input {
            height: 100%;
            margin: 0px;
            padding: 0px;
            border: none;
        }
        input::-webkit-input-placeholder {
            color: #9c9c9c;
        }
        input::-moz-placeholder {
            color: #9c9c9c;
        }
        input::-moz-placeholder {
            color: #9c9c9c;
        }
        input::-ms-input-placeholder {
            color: #9c9c9c;
        }
.提示1 {
    padding: 20px 15px;
    font-size: 14px;
    color: #e45252;
}
.mui-content>.mui-table-view:first-child{
        margin-top: 58px;
}
.btn {
    width: 93%;
    height: 40px;
    background: #213862;
    border-radius: 20px;
    color: white;
    margin: 12px;
    margin-top: 30px;
}
</style>
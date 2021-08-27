<template>
<div class="register">
  <p class="title_p">用户注册</p>
  <ul class="register_ul">
      <li>
           <el-input  placeholder="请输入真实姓名"  @keyup.enter="注册()" v-model="user.name">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
      </li>

      <li>
           <el-input  placeholder="请输入账号"  @keyup.enter="注册()" v-model="user.uid">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
      </li>

       <li>
           <el-input  placeholder="请输入手机号"  @keyup.enter="注册()"  v-model="user.phone">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
      </li>

      <li>
           <el-input  placeholder="请输入6-16位的密码"  @keyup.enter="注册()" v-model="user.pwd">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
      </li>

         <li>
           <el-input  placeholder="请再次输入密码"   @keyup.enter="注册()" v-model="user.pwd1">         
            <i  slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
       </li>

        <li>
           <el-input  placeholder="推荐人ID,可不填"  @keyup.enter="注册()" v-model="user.ruid">
            <i  slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
       </li>

       

         <li>
          <el-input  class="img_input"   @keyup.enter="注册()" placeholder="图片验证码"  v-model="user.code">
            <i slot="suffix"><div class="img_box"><img src="../../assets/css/phoneCode.jpg" alt="">  </div></i>
        </el-input>
       </li>

         <li>
             <el-input class="img_input"  @keyup.enter="注册()" placeholder="短信验证码"  v-model="user.sms">
                <i slot="suffix"><div class="code_box">获取验证码 </div></i>
            </el-input>
        </li>

          <li>
              <el-checkbox v-model="同意协议"><span class="yi">我已阅读并同意<span class="fred">《服务条款》</span></span></el-checkbox>
          </li>

            <li>
             <div class="btn" @click="注册()">注册</div>
           </li>
 
  </ul>
</div>
</template>  
<script>

import {  api_注册接口 ,} from "@/api/请求登录的接口.js";
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            同意协议:false,
              user: {
                name:"",//真实姓名
                uid: "",//账户名
                pwd1:"",//确认密码
                pwd: "",//密码
                code: "",  //图片验证嘛
                sms: "",   //短息验证码
                ruid:"", //推荐人id
                phone:"",//手机号
            },
        }
    },
    


    components: { // 注册组件
       ...mapState({
            config: 'config'
        }),
    },
    created() {
      
        
    },
    computed: {
     
    },
    methods: {
             
      注册(){
       
        var phoneTest=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
        if(!phoneTest.test(this.user.phone)){
           this.$message.success("请输入正确格式的电话号码");
                 return
                }else if(this.user.sms){
                this.$message.success("请输入验证码");
                return
            }
            if(!this.this.user.uid){
             this.$message.success("请输入用户名");   
              return                 
            }else if(!this.user.pwd){
                this.$message.success("请输入密码"); 
                return
            }else if(this.user.pwd){

            }
            else if(this.user.pwd!=this.user.pwd){
                    this.$toast('两次密码不一致');
                    return;
            }else if(!this.user.code){
                    this.$toast('请输入验证码');
                    return;
             }
             else if(!this.user.code){
                    this.$toast('请输入验证码');
                    return;
             }
          //   var obj= {
          //   realName:this.user.name,//真实姓名
          //   account: this.user.uid,//账户
          //   password: this.user.pwd,//密码
          //   confirmPassword:this.user.pwd1,//确认密码
          //   mobile:this.user.code,//手机验证码
          //   refAccount:this.user.ruid,//推荐人
          //   smsCode:this.user.phone,//手机验证码
          // }
          //  api_注册接口(obj).then(x=>{
          //    console.log(x)
          //  }).catch(err=>{
          //  })
      },
        // 改变验证码(){
        // this.验证码地址 = this.config.api_url + "/Home/Verify?v=" + Math.random();
        // },
       
      
  }
}


</script>
<style lang="scss" scoped>
.img_box,.code_box{
    position: absolute;
        top:_vw(4);
        right:_vw(10);
        width:_vw(100);
        height: _vw(33);

        img{
            width: 80%;
            height: 100%;
        }
}
.code_box{
  border-left: 1px solid #ccc;
        width:_vw(90);
        text-align: center;
        line-height: _vw(33);
        color:red;
}
.register{
  .title_p{
      font-size:_vw(22);
      text-align: center;
      border-bottom: 1px solid #ccc;
      line-height: _vw(50);
      margin:0px;
      margin-bottom: 10px;
  }
  .register_ul{
    li{
        text-align: center;
        height: _vw(37);
            width:90%;
            margin: 0px auto;
            margin-bottom: _vw(20);
      
            /deep/.el-input__inner{
            width: 100%;
            border-radius: _vw(35);
            }
            .btn{
                width: 100%;
                height: 100%;
                background: red;
                border-radius: _vw(35);
                color:#ffffff;
                font-weight: 600;
                line-height: _vw(40);
                text-align: center;

            }
    }
      li:nth-child(8){
          margin-bottom: _vw(8)
      }
  }
}

 
</style>
<template>
    <div class="修改资料">
             <van-nav-bar  title="修改资料"  class="title"  left-arrow  @click-left="onClickLeft" /> 

        <div class="top">
                <van-uploader :after-read="afterRead"  class="圆外">
                     <div class="yuan">
                          <img :src="configData.api_url+url" alt=""  v-if="!show">
                          <div class="背景" v-if="show" :style="'background-image: url(' + configData.api_url+userinof.head + ')'">
                               <div class="meng" >
                                    <van-icon name="plus"  />
                                </div>
                          </div>
                         
                    </div>
                </van-uploader>

        </div>


          <van-collapse v-model="activeNames" class="box_ul">
              <!-- 姓名 -->
                <van-collapse-item title="设置昵称" name="1" class="li" :value="userinof.user_name" >
                    <van-cell-group  class="input">
                        <van-field  v-model="name" center clearable placeholder="请输入新昵称" maxlength="5" >
                            <van-button slot="button" class="btn" size="small" type="primary" @click="姓名点击提交('1')">确认</van-button>
                        </van-field>
                    </van-cell-group>
                </van-collapse-item>
                <!-- 性别 -->

                <van-collapse-item title="设置性别" name="2"  class="li" :value="userinof.sex=='1'?'男' :'女'" >
                     <van-radio-group v-model="userinof.sex"  @change="设置性别的函数()" >
                        <van-radio name="1" class="radio" icon-size="23"> 男</van-radio>
                        <van-radio name="2"  class="radio" icon-size="23">女 </van-radio>
                        </van-radio-group>
                </van-collapse-item>


                <van-collapse-item title="设置个性签名" class="li" name="3" :value="userinof.des" >
                    <van-cell-group  class="input">
                        <van-field  v-model="des" center clearable placeholder="请输入性别" maxlength="10" >
                            <van-button slot="button" class="btn" size="small" type="primary" @click="设置个性签名(des,'Des')" >确认</van-button>
                        </van-field>
                    </van-cell-group>
              </van-collapse-item>


        </van-collapse>

    </div>

</template>

<script> 
import {上传头像,修改资料,获取用户信息} from "@/api/用户信息.js"
import axios from 'axios';
import { Toast } from 'vant';
//  import {  mapState } from 'vuex' 

export default {
    data() {
        return {
           configData: config,
            show:true,
            url:"",
            activeNames: ['1'],
            name:"",
            des:"",
            sex:"",
            userinof:{
              user_name:"",
              sex:"",
              des:"",
              head:"",
            },

        }
    },
    computed: { 
    //    ...mapState({
    //                 取出当前数据:"是否登录",
    //                  个人用户信息:"userinfo"
    //             }),
    },
    created(){
     this.获取用户信息的函数()
    },
    methods: {
        获取用户信息的函数(){
          获取用户信息().then(x=>{
              console.log(x)
              if(x.data.code==1){
                  this.userinof= x.data.data
              }
          }).catch(err=>{
              console.log(err)
          })
        },
        设置性别的函数(){
 
            var obj={
                        name:this.userinof.sex
                    }
                 修改资料(obj).then(x=>{
                      console.log(obj)
                      if(x.data.code==1){
                          Toast(x.data.msg)
                      }else{
                          Toast(x.data.msg)
                      }
                    }).catch(err=>{
                        console.long(err)
                    })   
        },
        姓名点击提交(){
            if(this.name!==""){
                  var obj={
                        name:this.name
                    }
                 修改资料(obj).then(x=>{
                      console.log(obj)
                      if(x.data.code==1){
                          var nameq=this.name
                        //   console.log(nameq)
                          this.userinof.user_name=nameq
                          Toast(x.data.msg)
                      }else{
                          Toast(x.data.msg)
                        
                      }
                    }).catch(err=>{
                        console.long(err)
                    })   
            }else{
                 Toast('请输入要更改的内容')
            }
        },
        设置个性签名(){
          if(this.des!==""){
                  var obj={
                        des:this.des
                    }
                  
                 修改资料(obj).then(x=>{
                      console.log(obj)
                      if(x.data.code==1){
                          var nameq=this.des
                          this.userinof.des=nameq
                          Toast(x.data.msg)
                      }else{
                          Toast(x.data.msg)
                        
                      }
                    }).catch(err=>{
                        console.long(err)
                    })   
            }else{
                 Toast('请输入要更改的内容')
            }
        },
      
        afterRead(file) {
        // 此时可以自行将文件上传至服务器
        console.log(file);
 
        let formData = new FormData();
         formData.append('image', file.file);
   	
        console.log(file.file);
          axios.post(this.configData.api_url +'/admin/Appuserinformation/upload',formData,{headers:{'Content-Type':'multipart/form-data'}}).then(x => {
            if(x.data.code==1){
                  Toast('图片上传成功')
                  this.url=x.data.data.head_url
                  console.log(this.url)
                  this.show=false
            }else{
                  Toast('图片上传失败')
            }
        }, err => {
            Toast('图片上传失败')
        })
    },
        uploadImg(){
          alert("读取完成 可以在这里发请求")
          console.log(this.imgBase64)
        },
        overSize(){
         alert("文件大小超过限制")
        },
        onClickLeft() {//头部
            history.back()
         },
    },
    mounted() {
        
    },
}


</script>
<style lang="scss" scoped>

/deep/.van-cell{
    font-size: _vw(14);
    line-height: _vw(30);
}
/deep/.van-cell__right-icon{
    font-size: _vw(14);
    line-height: _vw(30);
}
/deep/.van-button--small{
    font-size: _vw(14);
    min-width: _vw(80);
    height: _vw(28);
}
/deep/{
    font-size: _vw(16);
}
/deep/.van-radio__label{
    line-height: _vw(30);
}
.修改资料{
           background: #f3f3f4;
           position: absolute;
           left:0px;
           right:0px;
           width: 100%;
           height: 100%;
           overflow-y:auto;
           padding:0px;
           padding-bottom:_vw(20);
           box-sizing: border-box;
      .title{
            background: #ec304c; 
            margin-bottom: none; 
            position: fixed;
            left: 0px;
            top:0px;
            width: 100%;
           /deep/.van-nav-bar__title{
           color:#ffffff !important; 
           font-size:_vw(18) ;           
            } 
            /deep/.van-icon{
            color:#ffffff !important;            
            }  
        }

    .top{
           height: _vw(160);
           background: #f3f3f4;
           box-sizing: border-box;
           padding-top:_vw(44);
         .圆外{
             display: flex;
              justify-content: center; 
         .yuan{
            width: _vw(75);
            height: _vw(75);
            border-radius: 50%;
        
            margin-top:_vw(20);
            position: relative;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%
            }
            .背景{
                    width: _vw(75);
                    height: _vw(75);
                    border-radius: 50%;
                      position: absolute;
                    left:0px;
                    top:0px;
                    background-size: 100%;
                    background-repeat: no-repeat;
               .meng{
                    width: _vw(75);
                    height: _vw(75);
                    border-radius: 50%;
                    position: absolute;
                    left:0px;
                    top:0px;
                    background:rgba(0,0,0,0.7);
                    color:#ffffff;
                    line-height: _vw(75);
                    text-align: center;
                    font-size: _vw(30)
                  }
            }
            
        }    
         }
        
       }
       .box_ul{
           .li{
               background: #ffffff;
               margin-bottom: _vw(20);
               .radio{
                   margin-bottom: _vw(10);
               }
               /deep/.van-cell{
                   background: none;
                   /deep/  input{
                        color:rgb(8, 75, 199) !important;
                   }
               }
               .input{
                   background: #f1f1f1;
                   .btn{
                       background: #ec304c;
                       border:none;
                   }
               }
               
           }
       }
    //    ul{
    //        padding:0px _vw(10);
    //        background: #ffffff;
    //        li:nth-last-child(1){
    //          border-bottom: none;
    //        }
    //        li{
    //            display:flex;
    //            justify-content:space-between;
    //            div{
    //                line-height:_vw(40);
    //                .icon{
    //                line-height:_vw(34);
    //                }
    //             }
    //            border-bottom: 1px solid #ccc;
    //        }
    //    }

}

</style>
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d8839202"],{b1fb:function(e,t,o){"use strict";o("d2fd")},cd45:function(e,t,o){var s=o("24fb");t=s(!1),t.push([e.i,".login[data-v-4cdf801c]{position:relative;display:flex;justify-content:center;align-items:center}.bg[data-v-4cdf801c],.login[data-v-4cdf801c]{height:100%}.bg[data-v-4cdf801c]{position:absolute;width:100%;-o-object-fit:cover;object-fit:cover;top:0;left:0}.login-form[data-v-4cdf801c]{position:relative;z-index:1;width:400px;background:rgba(0,38,70,.9);padding:1px 10px;border-radius:5px}.login-form .title[data-v-4cdf801c]{color:#fff}",""]),e.exports=t},d2fd:function(e,t,o){var s=o("cd45");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var r=o("499e").default;r("d92a2d5e",s,!0,{sourceMap:!1,shadowMode:!1})},dd7b:function(e,t,o){"use strict";o.r(t);var s=o("7a23");const r=Object(s["fb"])("data-v-4cdf801c");Object(s["G"])("data-v-4cdf801c");const a={class:"login"},c=Object(s["m"])("img",{src:"static/loginbg.png",class:"bg",alt:"",srcset:""},null,-1),l=Object(s["m"])("h3",{class:"title"},"视频管理",-1),d=Object(s["l"])("登录");Object(s["E"])();const n=r((e,t,o,n,u,i)=>{const b=Object(s["M"])("el-input"),p=Object(s["M"])("el-form-item"),m=Object(s["M"])("el-button"),f=Object(s["M"])("el-form");return Object(s["D"])(),Object(s["i"])("div",a,[c,Object(s["m"])(f,{ref:"from1",model:n.user,rules:n.rules,class:"login-form",autocomplete:"on","label-position":"left"},{default:r(()=>[l,Object(s["m"])(p,{prop:"username"},{default:r(()=>[Object(s["m"])(b,{modelValue:n.user.username,"onUpdate:modelValue":t[1]||(t[1]=e=>n.user.username=e),onKeyup:Object(s["db"])(n.submitForm,["enter","native"]),placeholder:""},null,8,["modelValue","onKeyup"])]),_:1}),Object(s["m"])(p,{prop:"password"},{default:r(()=>[Object(s["m"])(b,{modelValue:n.user.password,"onUpdate:modelValue":t[2]||(t[2]=e=>n.user.password=e),onKeyup:Object(s["db"])(n.submitForm,["enter","native"]),placeholder:"","show-password":""},null,8,["modelValue","onKeyup"])]),_:1}),Object(s["m"])(p,{label:""},{default:r(()=>[Object(s["m"])(m,{type:"primary",style:{width:"100%"},onClick:n.submitForm},{default:r(()=>[d]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model","rules"])])});o("bc3a");var u={setup(){const{proxy:e}=Object(s["o"])(),t=Object(s["I"])(null),o=Object(s["H"])({username:"",password:""}),r={username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]},a=()=>{let r=Object(s["U"])(t);r.validate(t=>{if(!t)return console.log("error submit!!"),!1;console.log(o),e.$axios.post("login",o).then(t=>{console.log(t),1==t.code?(e.$message({showClose:!0,message:"登录成功",type:"success"}),localStorage.videoUpdate=t.token,e.$router.push("/")):e.$message({showClose:!0,message:"登录失败",type:"error"})}).catch(t=>{e.$message({showClose:!0,message:"连接异常，请稍后再试",type:"error"}),console.error(t)})})};return Object(s["A"])(()=>{}),{user:o,rules:r,from1:t,submitForm:a}}};o("b1fb");u.render=n,u.__scopeId="data-v-4cdf801c";t["default"]=u}}]);
//# sourceMappingURL=chunk-d8839202.6839bf1d.js.map
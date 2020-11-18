<template>
  <div>
    <Header/>
      <div class="bg" >
        <div id="hdpublic">
            <img src="static/lijikaihu/181011073009.jpg" alt="">
		</div>
       <div id="Game-Menual" >
          <div class="Game-Menual-box">
            <a href="/cn/forget" target="_self">忘记密码</a>   
            <a href="/cn/register">免费注册</a>
            <a href="/agent" target="_self">代理注册</a>
            <a href="/hg_sports" target="_self">体育投注</a>
            <a href="/visual/" target="_self">真人娱乐</a>
            <a href="/game" target="_self">电子游艺</a>
            <a href="/cn/caipiao" target="_self">彩票游戏</a>
            <a href="/cn/lines" target="_self">备用网址</a>						    
            <a href="/cn/youhui" target="_self">优惠活动</a>				
          </div>
        </div>
        <!--  -->
         <div class="form">
     <div class="reg_top" id="reg_top">
     </div>
    <div class="reg_head">
        <!-- <p style="background:url(/style/bet017/favicon.ico) no-repeat left center; background-size:48px 48px;" class="add_title">立即加入</p> -->
    </div>
     <form action="" method="post" name="register" id="register">
         <h2>代理注册</h2>
         <div class="use">
             <label>代理商专属链接地址：www.t2201.com/?p=代理ID  </label>
         </div>
        <div class="reg_bottom"></div>
           <h2>代理资料</h2>
         <div><label><span>代理账号:</span><input type="text" name="realname" value=""> * 6-20个英文和数字组成 </label></div>
         <div><label><span>密码:</span><input name="qkmm" type="password" value=""> * 6-20个英文和数字组成 </label></div>
         <div><label><span>确认密码:</span><input name="reqkmm" type="password" value="">* 6-20个英文和数字组成</label></div>
         <div class="reg_bottom"></div>
         
          <div class="reg_bottom"></div>
           <h2>代理资料</h2>
         <div><label><span>代理账号:</span><input type="text" name="realname" value=""> * 6-20个英文和数字组成 </label></div>
         <div><label><span>密码:</span><input name="qkmm" type="password" value=""> * 6-20个英文和数字组成 </label></div>
         <div><label><span>确认密码:</span><input name="reqkmm" type="password" value="">* 6-20个英文和数字组成</label></div>
         <div class="reg_bottom"></div>
     </form>
         
</div>
      </div>
        <Fotter/>
   </div>
</template>

<style scoped>
#submitbutton{  position: absolute;left: 207px; width: 183px; }
#register div select { background: url(../../assets/lijikaihu/reg_input.png) no-repeat 0px -84px; margin: 0px; padding: 3px; height: 27px; width: 184px; border:none 0px; line-height: 27px; vertical-align: middle; background-color:transparent; }
#register{ position: absolute;  left: 681px; top:215px; }
/* form{ line-height:28px; position: absolute; top: 0px; } */
.form label span{ display:block; width:90px; float:left; text-align: right; padding-right: 15px; color: red;  color: #FFEB3B; font-size: 12px;}
.form h2{ font-weight: bold; color: #FF0; padding-left: 39px; background: url(../../assets/lijikaihu/reg_border_top.png) no-repeat 15px bottom; height: 20px; line-height: 15px; width: 725px; font-size:12px; }
.form div{ font-size: 12px; line-height: 40px; height:40px; color: #f8e678; border-right: solid 2px #9b836f; border-left: solid 2px #9b836f; width: 631px; margin-left: 15px; padding-left: 100px; position: relative; }
.form div ul{ position: absolute; top: -18px; left: 340px; background: url() no-repeat 15px 29px; height:41px; list-style-type:none; font-size: 13px; }
.form div ul li{ color:#FFF; line-height: 16px; background-color: #F00; filter: Alpha(Opacity=70); Opacity: 0.7; border: 2px solid #E7E9C3; padding: 3px; height: 16px;}
.form input{ float:left; width:174px; height:27px; background: url(../../assets/lijikaihu/reg_input.png) no-repeat 0px -84px; margin: 0px; border:none 0px; background-color:transparent; padding: 0px 0px 0px 10px; vertical-align: middle; line-height: 27px; margin-top:6px; margin-right:5px; display:inline; }
.form .fltxt { display:block; float:left; font:none;}


form textarea{width:80%;height:200px;}
.form .reg_top { margin-left: 0px; height: 60px; background: url() no-repeat; width: 764px; border:none 0px; padding-left: 0px; }
.form .reg_add { margin-left: 0px; background: url() no-repeat center center; height: 48px; padding-top:7px;  font-weight: bold; padding-left: 280px;  margin-top: 10px; width: 444px; margin-bottom: 10px; border:none 0px; }
.form .reg_bottom { background: url(../../assets/lijikaihu/reg_border_bottom.png) no-repeat; height: 15px; border:none 0px; width: 735px; margin-bottom: 15px; padding-left: 0px; }
.form #register .submitDiv { padding-left: 250px; width: 481px; }
.form dl { padding-left: 30px; color:#c9b2a0; }
.form dl dd span { color: #f8e678; }
.form .check input { background-image: none; height: 13px; width: 13px; margin-right: 10px; }

.form div.reg_add_top_left { float:left; width:48px; height:48px; border:0px; margin:0; padding:0px;}
.form div.reg_add_top_right { float:left; width:300px; height:41px;  border:0px; margin:0; padding:0px;  padding-left:10px; padding-top:7px; }

.form .reg_head{ width:100%; height: 48px; padding: 5px; background:url() no-repeat center -4px; text-align: center; border: none;}
.form .reg_head p.add_title{ display: inline-block; font-size: 14px; font-weight: bold;padding-left: 55px;
    line-height: 48px;}
.form .reg_desc{padding-left: 24px; border: none; line-height: 24px; padding-bottom: 10px; height: auto;}


#publiclinesshua { margin:60px auto 10px auto; width:236px; height:32px; line-height:32px; color:#000000; background:url(../../assets/beiyongwangzhi/buttonbg.jpg) no-repeat; text-align:center; font-size:16px;}
.hengxian{
    border:0.5px solid #999;
}
.wangzhi_inp{
    position: absolute;
    margin-left: 787px;
    margin-top: -245px;
    color: #FFF;
    font-size: 17px;
}
.wangzhi_inp ul {
    margin-top:10px;
}
.wangzhi_inp ul li input{
    background: #F000;
    border: 0;
    color: #FFF;
   
}


 #hdpublic img{ 
     width: 100%;
 } 
.bg{ width:100%; height:770px; margin:0 auto; background:url(../../assets/tiyusaishi/c_bg_x01.jpg); position:relative;} /*通用背景*/
#Game-Menual a { font-size: 12px; display:block;height:33px; width:222px;line-height:33px; color: #8F8F8F; text-align:center;text-decoration:none; background:url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat center top; margin-bottom:6px;}
#Game-Menual a:hover { color: #FFF; background:url(../../assets/beiyongwangzhi/sidebar_over.png) no-repeat center bottom;}
#left_down { margin:0; height:40px; }
#left_down img { display:none;}
/* 1111111111111 */
#lineswwbox img{ margin-left: 221px; margin-top: -348px; }

</style>

<script>
import Header from '@/components/Header/Header.vue'//头部组件引入
import Fotter from '@/components/Fotter/Fotter.vue'
export default {
    data(){
        return{
        }
    },
     components: {
        // 注册组件
        Header,
        Fotter
    },
}
</script>

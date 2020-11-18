<template>
    <div class="冰心推荐">

        <!-- <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">冰心推荐</span>
            <van-icon name="contact" class="sqzj" />
        </div> -->
        <div class="投注" @click="$router.history.push('/buyLottery')"><img src="@/assets/img/bxtj/betting.6320e08.png" alt=""></div>
        <div class="六合大神" @click="$router.history.push('/markSixSanito')"><img src="@/assets/img/bxtj/icon_lhds.3759253.png" alt=""></div>        
        <div class="返回" @click="返回()"><van-icon name="arrow-left" class="arrow_left" /></div>
    <div class="top_fixid"> 
        <div class="LED展示" v-if="led">
            <div class="ked_content">
                <div class="left"> <marquee direction="left">This text will scroll from bottom tomarquee direction="up">This text will scroll from bottom to top top</marquee></div>
                <div class="right" @click="关闭()"><van-icon name="cross" class="cross" /></div>
            </div>
        </div>
         <div class="开奖" :class="{height:lottery==false}">
             <div class="收起"  v-if="lottery" :class="{poitnonA:lottery==true}"  @click="开奖()"><van-icon name="arrow-up" class="up" /></div>
             <div class="收起 "  :class="{poitnon:lottery==false}" v-if="!lottery"  @click="开奖()"><van-icon name="arrow-down" class="down" /></div>
               <div class="text_num"  v-if="lottery">2019-09-05 2019102期</div>
          <ul class="kj_ul"  v-if="lottery" >
               <li class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li>
                <li class="qiu">
                   <div class="red"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">羊/土</div>
               </li>
                <li  class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">虎/水</div>
               </li>
                <li  class="qiu">
                   <div class="red"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li>
                <li  class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li> 
                  <li  class="qiu">
                   <div class="green"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">猴/土</div>
               </li> 
               <li class="jia_li">
                    <div class="jia">&nbsp;</div>
                   <div  class="text">&nbsp;</div>
               </li>
               <li  class="qiu">
                   <div class="red"> 22</div>
                   <div class="text" :style="{'color':皮肤区分.color}">马/金</div>
               </li>
             </ul>
         </div>
          <div class="tab_t">
              <div  @click="clicktite(0)" :class="{'titleActive':tableType ==0}">大厅</div>
              <div  @click="clicktite(1)" :class="{'titleActive':tableType ==1}">精华帖</div>
              <div  @click="clicktite(2)" :class="{'titleActive':tableType ==2}">热门贴</div>
              <div  @click="clicktite(3)" :class="{'titleActive':tableType ==3}">今日发表</div>
          </div>
          </div>

          <div  class="tab_content" :class="{padding_top:lottery==false}" v-if="tableType==0"> 
              <div class="img_box"><img src="@/assets/img/bxtj/close.d142dd8.png" alt=""></div>
              <ul class="c_ul">
                  <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                   <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                    <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                    <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                   <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
              </ul>
          </div>
          <div  class="tab_content" v-if="tableType==1"> 
              <div class="img_box"><img src="@/assets/img/bxtj/close.d142dd8.png" alt=""></div>
              <ul class="c_ul">
                  <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                   <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
              </ul>

          </div>
          <div   class="tab_content" v-if="tableType==2"> 

               <div class="img_box"><img src="@/assets/img/bxtj/close.d142dd8.png" alt=""></div>
              <ul class="c_ul">
                  <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                   <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
              </ul>
          </div>
          <div  class="tab_content" v-if="tableType==3"> 
               <div class="img_box"><img src="@/assets/img/bxtj/close.d142dd8.png" alt=""></div>
              <ul class="c_ul">
                  <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                   <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
              </ul>
         </div>
          <div  class="tab_content"  v-if="tableType==4">



               <div class="img_box"><img src="@/assets/img/bxtj/close.d142dd8.png" alt=""></div>
              <ul class="c_ul">
                  <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
                   <li>
                     <div class="top">
                         <div class="left_n">
                             <div class="tx"><img src="@/assets/img/bxtj/ddbc630b-d576-42ef-9bac-083ee4378611.png" alt=""></div>
                             <span class="n_text">来自彩圈:清醒人</span>
                         </div>
                         <div class="right_i">
                             <span class="num_t">5387</span>
                              <div class="i_img"><img src="@/assets/img/bxtj/icon_zan.3777ae9.png" alt=""></div>
                         </div>
                     </div>
                     <div class="content">
                         103期【清醒人】=====【七不中】=====全国最牛逼的料稳定投资.稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!稳定收入.值得信赖!
                     </div>
                     <div class="bottom">
                         <div class="l_time">2019-09-07 21:02:00</div>
                         <div class="r_icon">
                             <div class="icon_img"><img src="@/assets/img/bxtj/icon_ll.e47f82d.png" alt=""></div>
                             <p>36</p>
                               <div  class="icon_img dh"><img src="@/assets/img/bxtj/icon_pl.235f6b3.png" alt=""></div>
                             <p>38</p>
                             
                         </div>
                     </div>
                  </li>
              </ul>

          </div>
       <!-- </div> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {  
        return {
            led:true,
            lottery:true,
            tableType:0,
            bai: {
                color: "#333333",
                topbj: "#5dadff",
             
            },
            hei: {
                color: "#333333",
                topbj: "#1d1e23",
             
            }
        }
    },
    components: { // 注册组件
        
    },
    created() {
        
    
    },

    computed: {
        ...mapState({
            皮肤切换: '皮肤切换',
        }),
        皮肤区分() {
            if (this.皮肤切换 == true) {
                return this.bai
            } else {
                return this.hei
            }
        },
   
    },
    methods:{
        clicktite(index) {
            this.tableType = index
        },
        返回() {//头部
            history.back()
        },
             开奖(){
         this.lottery=!this.lottery
        },
        
        关闭(){
            this.led=false;
        }
     
    }
    
}


</script>
<style lang="scss" scoped>
.冰心推荐{
    //    .div_top {
    //     position: fixed;
    //     left: 0px;
    //     top: 0px;
    //     width: 100%;
    //     z-index: 20;
    //     box-sizing: border-box;
    //     height: _vw(35);
    //     line-height: _vw(35);
    //     display: flex;
    //     justify-content: space-between;
    //     padding: _vw(0) _vw(4);
    //     .text_t{
    //         font-size: _vw(18);
    //     }
    //     .sqzj{
    //         font-size: _vw(16);
    //     line-height: _vw(35);

    //     }
    //   }
    .投注{
        width: _vw(47);
       height: _vw(47);
       border-radius: 50%;
         position: fixed;
       top:_vw(100);
       right:_vw(20);
       z-index:40;
       img{
           width: 100%;
           height: 100%;
       }
    }
        .六合大神{
        width: _vw(40);
       height: _vw(100);
    //    border-radius: 50%;
         position: fixed;
       bottom:_vw(100);
       right:_vw(20);
       z-index:40;
       img{
           width: 100%;
           height: 100%;
       }
    }
   .返回{
       width: _vw(40);
       height: _vw(40);
       border-radius: 50%;
       background-color: rgba(0,0,0,.4);
         text-align: center;      
       position: fixed;
       top:50%;
       left:0px;
       z-index:40;
       .arrow_left{
       line-height: _vw(40);
       color:rgb(236, 230, 230);
       }
   }
    .top_fixid{
        background-color:#ffffff;
        // padding-top:_vw(300);
      position:fixed;
      left:0px;
      top:0px;
      z-index:30;
      width: 100%;
      .LED展示{
        background: #1d1e23;
          height: _vw(40);
          position: fixed;
          left:0px;
          top:0px;
          z-index:20;
          .ked_content{
              display:flex;
              justify-content: space-between;
              width: 94%;
              margin:0px auto;
              .left{
                color:#ffffff;
               line-height: _vw(40);
               flex:1;
               font-size: _vw(12)
              }
              .right{
               width: _vw(40);
                 .cross{
                     color:#ffffff;
                     line-height: _vw(40);
                     margin-left: _vw(10);

                 }
              }
          }
      }
      .height{
          height: _vw(0)  !important;
          .poitnon{
              top:_vw(0)  !important;
          }
      }
      .开奖{
          height: _vw(100);
          border-bottom: 1px solid rgb(226, 223, 223);
           .text_num{
               font-size: _vw(12);
               line-height: _vw(30);
               padding-left: _vw(20);
           }
           .poitnonA{
               top:_vw(100)  !important;
           }
            // padding-bottom:_vw(10);
          .收起{
              width: _vw(50);
              height: _vw(14);
              font-size: _vw(11);
               text-align: center;
               position: absolute;
               top:_vw(105);
               left:50%;
               margin-left: _vw(-25);
               background: #ffffff;
               border:1px solid rgb(226, 223, 223);
               border-top:none;
               z-index: 10;
              .up{
                
            }
          }
        //   border-bottom: 1px solid #ccc;
        .kj_ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:_vw(10) _vw(20) _vw(0) _vw(20);
            box-sizing:border-box;
          
         .qiu, .jia_li{
             width:_vw(36);
             .green{
                 background: url("~@/assets/img/home/img_lhc_green.f7d5291.png") no-repeat;               
             }
             .red{
                 background: url("~@/assets/img/home/img_lhc_red.ae2b900.png") no-repeat;  
             }
             .green, .red,.jia{
                 width:_vw(36);
                 height: _vw(36);
                 border-radius: 50%;
                 background-size: 100% 100%;
                 line-height: _vw(36);
                 text-align:center;
                 font-size: _vw(14);
                 margin:0px auto;
             }
             .text{
                 font-size: _vw(12);
                color:#ffffff;

                //  margin:0px auto;
                 text-align:center;
             }
         }
         .jia_li{
            width: _vw(16) !important;
            .jia{
                width:_vw(16) !important;
                 height: _vw(16) !important;
                 background: url("~@/assets/img/home/img_jh@2x.7a2dbc3.png");
                  background-position: center center !important
             }
        }
        }
      }

      .tab_t{
          padding:_vw(10)_vw(0);
        background: #f0f0f0;
          width: 100%;
          display: flex;
          justify-content: space-around;
          .titleActive{
              color:#c01833;
              font-weight:1000;
          }
          div{
             font-size: _vw(15);
              border-right:_vw(1) solid #ccc;
              text-align: center;
              width: 25%;
          }
      }
    }
    .padding_top{
        padding-top:_vw(40) !important;
        background: red;
    }
      .tab_content{
          padding-top:_vw(142);
          background-color:#f0f0f0 ;
        //   height: 800px;
              width: 100%;
              .img_box{
                  height: _vw(60);
                  width: 100%;
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
              .c_ul{
                  width: 100%;
                  li{
                      background: #ffffff;
                      margin-bottom:_vw(10);
                      padding:_vw(10);
                    .top{
                      display:flex;
                      justify-content:space-between;
                      align-items: center;
                      .left_n{
                         display:flex;
                        align-items: center;
                        .tx{
                            width: _vw(42);
                            height: _vw(42);
                            border-radius: 50%;
                            margin-right: _vw(10);
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .n_text{
                            font-size: _vw(14);
                            color:#999999;
                        }
                      }
                      .right_i{
                         display:flex;
                        align-items: center;
                         .i_img{
                            width: _vw(26);
                            height: _vw(26);
                            border-radius: 50%;
                            margin-left: _vw(10);
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .num_t{
                             font-size: _vw(14);
                            color:#999999;
                        }
                      }
                    }
                    .content{
                         color: #000;
                        margin: 2vw 0;
                        line-height: 1.5;
                        font-size: _vw(14);
                        width: auto;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical; 
                    }
                    .bottom{
                         display:flex;
                         justify-content: space-between;
                      .l_time{
                            font-size: _vw(12);
                            color:#999999;
                      }
                      .r_icon{
                         display:flex;

                        align-items: center;
                        p{
                            font-size: _vw(12);
                            color:#999999;
                            margin:0px;
                        }
                        .dh{
                            margin-left: _vw(10);
                            margin-right: _vw(2);
                        }
                        .icon_img{
                            width: _vw(14);
                            img{
                                width: 100%;
                                height:100%;
                            }
                        }
                      }
                    }
                  }
              }
          }
    // }
}
</style>
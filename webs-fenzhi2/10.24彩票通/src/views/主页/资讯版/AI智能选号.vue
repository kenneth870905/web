<template>
    <div class="AI智能选号">
           
         <!-- 帮助弹出框 开始-->
            <van-popup v-model="bzshow" class="帮助弹出框">
            <div class="top_title">
                <div class="l_b"><span class="iconfont iconbangzhu"></span>&nbsp;&nbsp;<span class="text_t">帮助说明</span></div>
                <div class="r_b">
                    <van-icon name="cross" class="cross" @click="bzshow=false" />
                </div>
            </div>

            <div class="C_zh">
                <h3>什么是AI智能选号？</h3>
                <p class="p">AI智能选号时系统根据一定的算法在您输入特定一些对您有涵义的数字后推算出的六合彩正码或特码</p>
                <!-- <p class="p">当开出结果与杀号号码一致时，代表杀错，该期计划失败</p>
                <p class="p">当开出结果与杀号号码不一致时，代表杀对，该期计划成功</p> -->

                <div class="bottom_b">
                    <div class="l_top">恋人幸运号：</div>
                    <div class="r_p">选择你的生日和你对象的生日后系统自动计算本期特码。</div>
                </div>
                <div class="bottom_b">
                    <div class="l_top">家人幸运号：</div>
                    <div class="r_p">选择你的生日和你家人的生日后系统自动计算本期幸运码。</div>
                </div>
                <div class="bottom_b">
                    <div class="l_top">生日幸运号：</div>
                    <div class="r_p">选择寿星日期后系统自动计算本期幸运码。</div>
                </div>
                <div class="bottom_b">
                    <div class="l_top">生肖卡牌：</div>
                    <div class="r_p">12张牌，点击翻开三张，随机获得三个幸运生肖号码。</div>
                </div>
                <div class="bottom_b">
                    <div class="l_top">摇一摇：</div>
                    <div class="r_p">晃动手机，系统自动随机提供本期幸运号码。</div>
                </div>
            </div>

        </van-popup>
        <!-- 帮助弹出框 结束-->
       <!-- 时间选择弹出框 -->
           <van-popup v-model="itemshow" :overlay="true" position="bottom" class="弹出框" :close-on-click-overlay="false">
               <van-datetime-picker
                  v-model="currentDate"
                  type="date"
                  :min-date="minDate"
                  :max-date="maxDate"
                  @confirm="queding"
                  @change="getColumnValue"
                />
          </van-popup>

        <div class="div_top" :style="{'background':皮肤区分.topbj,'color':皮肤区分.color}">
            <span class="iconfont iconzuobian" @click="返回()"></span>
            <span class="text">AI智能选号</span>
            <span class="sqzj" @click="bzshow=true"><span class="iconfont iconbangzhu" :style="{'color':皮肤区分.color}"></span></span>
        </div>
        <div class="content">
            <div class="nav_top">
                <div class="banner"><img :src="皮肤区分.bjimg" alt=""></div>
                <div class="xddw">
                    <div @click="clicktite(0)"><img :src="tableType==0?皮肤区分.Asx:皮肤区分.sx" alt=""></div>
                    <div class="zhuo" @click="clicktite(1)"><img :src="tableType==1?皮肤区分.Ayiy:皮肤区分.yiy" alt=""></div>
                    <div class="zhong" @click="clicktite(2)"><img :src="tableType==2?皮肤区分.Aar:皮肤区分.ar" alt=""></div>
                    <div class="you" @click="clicktite(3)"><img :src="tableType==3?皮肤区分.Ajr:皮肤区分.jr" alt=""></div>
                    <div @click="clicktite(4)"><img :src="tableType==4?皮肤区分.Asr:皮肤区分.sr" alt=""></div>
                </div>

                <ul class="ul_content">
                    <li v-if="tableType==0" class="生肖" @click="随机()">
                        <div class="div_w ">
                            <div class="div" :class="{show:active}">
                                <img  v-if="sxdt.long" :src="皮肤区分.long" alt="">
                                <img  v-if="!sxdt.long" :src="皮肤区分.Along" alt="">
                            </div>
                        </div>

                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.gou" :src="皮肤区分.gou" alt="">
                                <img  v-if="!sxdt.gou" :src="皮肤区分.Agou" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.ji" :src="皮肤区分.ji" alt="">
                                <img  v-if="!sxdt.ji" :src="皮肤区分.Aji" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.tu" :src="皮肤区分.tu" alt="">
                                <img  v-if="!sxdt.tu" :src="皮肤区分.Atu" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.zhu" :src="皮肤区分.zhu" alt="">
                                <img  v-if="!sxdt.zhu"  :src="皮肤区分.Azhu" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.shu" :src="皮肤区分.shu" alt="">
                                <img  v-if="!sxdt.shu" :src="皮肤区分.Ashu" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.hou" :src="皮肤区分.hou" alt="">
                                <img  v-if="!sxdt.hou" :src="皮肤区分.Ahou" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.ma" :src="皮肤区分.ma" alt="">
                                <img  v-if="!sxdt.ma" :src="皮肤区分.Ama" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.hu" :src="皮肤区分.hu" alt="">
                                <img  v-if="!sxdt.hu" :src="皮肤区分.Ahu" alt="">
                            </div>
                        </div>
                        <div class="div_w ">
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.se" :src="皮肤区分.se" alt="">
                                <img  v-if="!sxdt.se" :src="皮肤区分.Ase" alt="">
                            </div>
                        </div>
                        <div class="div_w ">

                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.yang" :src="皮肤区分.yang" alt="">
                                <img  v-if="!sxdt.yang" :src="皮肤区分.Ayang" alt="">
                            </div>
                        </div>
                        <div class="div_w " >
                            <div class="div"  :class="{show:active}">
                                <img  v-if="sxdt.niu" :src="皮肤区分.niu" alt="">
                                <img  v-if="!sxdt.niu" :src="皮肤区分.Aniu" alt="">
                            </div>
                        </div>
                    </li>
                    <li v-if="tableType==1"  class="摇一摇" >
                      <audio  autoplay="autoplay" v-if="videoshow">

                         <source src="@/assets/img/aixh/video/4.mp3" type="audio/mp3" />
                            <!-- <source src="@/assets/img/video/2.mp3" type="audio/ogg" /> -->
                        </audio>

                         <div class="yao_img">
                            <img :src="皮肤区分.yaoyiyao">
                         </div>
                         <div class="num" >
                             <span  v-show="shownum" v-for="(item,index) in arrynum"  :key="index">{{item}}</span>
                             <span  v-show="!shownum" v-for="(item,index) in 7"  :key="index">?</span>
                         </div>
    
                    </li>
                    <li v-if="tableType==2" class="爱人">
                     <p class="titile">
                         <van-icon name="like" class="like"/>送爱人一注注幸运号
                     </p>
                     <div class="content_c">
                          <div class="left"><img :src="皮肤区分.arimg" ></div>
                          <div class="right">
                                 <div class="right_top">
                                     <span>爱人生日:</span>
                                     <div class="点选" @click="选择生日(1)" >{{时间.爱人生日1}}<span class="iconfont iconxiala"></span></div>
                                 </div>
                                 <div class="right_bottom">
                                      <span>我的生日:</span>
                                     <div class="点选" @click="选择生日(2)">{{时间.我的生日2}}<span class="iconfont iconxiala"></span></div>
                                 </div>
                          </div>
                     </div>
                      <div class="num">
                             <span  v-show="!shownum" v-for="(item,index) in 7"  :key="index">?</span>

                         </div>
                    </li>
                    <li v-if="tableType==3" class="家人">
                         <p class="titile">
                         <van-icon name="like" class="like"/>送家人一注注幸运号
                     </p>
                     <div class="content_c">
                          <div class="left"><img :src="皮肤区分.arimg" ></div>
                          <div class="right">
                                 <div class="right_top">
                                     <span>家人生日:</span>
                                     <div class="点选" @click="选择生日(3)">{{时间.家人生日3}}<span class="iconfont iconxiala"></span></div>
                                 </div>
                                 <div class="right_bottom">
                                      <span>我的生日:</span>
                                     <div class="点选"  @click="选择生日(4)">{{时间.我的生日4}}<span class="iconfont iconxiala"></span></div>
                                 </div>
                          </div>
                     </div>
                      <div class="num">
                             <span  v-show="!shownum" v-for="(item,index) in 7"  :key="index">?</span>
                     </div>
                    </li>
                    <li v-if="tableType==4"  class="生日">
                        <p class="titile">
                         <van-icon name="like" class="like"/>送寿星一注注幸运号
                     </p>
                     <div class="content_c">
                          <div class="left"><img :src="皮肤区分.arimg" ></div>
                          <div class="right">
                                 <div class="right_top">
                                     <span>寿星生日:</span>
                                     <div class="点选"  @click="选择生日(5)">{{时间.寿星生日5}}<span class="iconfont iconxiala"></span></div>
                                 </div>
                              
                          </div>
                     </div>
                      <div class="num">
                           <span  v-show="!shownum" v-for="(item,index) in 7"  :key="index">?</span>
                     </div>

                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import { setTimeout } from 'timers'
import { nextTick } from 'q'
export default {
    data() {
        return {
            arrynum:[],//摇一摇随机数
            videoshow:false,
            tableType: 0,
             active:false,
             zhong:false,
             itemshow:false,
             currentDate: new Date(),
              minDate: new Date(1900,1,1),
              maxDate:new Date(),
              名字:"",
               bzshow:false,
               shownum:false,

            时间:{
                爱人生日1:"请选择生日",
                我的生日2:"请选择生日",
                家人生日3:"请选择生日",
                我的生日4:"请选择生日",
                寿星生日5:"请选择生日",
            },
            sxdt: {
                long: true,
                gou: true,
                ji: true,
                tu: true,
                zhu: true,
                shu: true,
                hou: true,
                ma: true,
                hu: true,
                se: true,
                yang: true,
                niu: true,
            },
            bai: {
                color: "#ffffff",
                topbj: "#5dadff",
                bjimg: require("@/assets/img/aixh/bai/default.a723aac.png"), 
                yaoyiyao: require("@/assets/img/aixh/AIshake@2x.fbb4573.png"),
                arimg: require("@/assets/img/aixh/bai/a57667c7-d5da-4292-8ea5-5d3469b884d6.png"),

                sx: require("@/assets/img/aixh/bai/zodiac_default.8af9a1e.png"),
                Asx: require("@/assets/img/aixh/bai/zodiac_select.d1cc5fe.png"),

                yiy: require("@/assets/img/aixh/bai/shake_default.75b0e11.png"),
                Ayiy: require("@/assets/img/aixh/bai/shake_select.1cabcf3.png"),

                ar: require("@/assets/img/aixh/bai/love_default.996c5ff.png"),
                Aar: require("@/assets/img/aixh/bai/love_select.e6ee02a.png"),

                jr: require("@/assets/img/aixh/bai/family_default.48b925a.png"),
                Ajr: require("@/assets/img/aixh/bai/family_select.5b96f8c.png"),

                sr: require("@/assets/img/aixh/bai/birthday_default.f8f95be.png"),
                Asr: require("@/assets/img/aixh/bai/birthday_select.b027f63.png"),




                long: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Along: require("@/assets/img/aixh/bai/Dragon.0df4def.png"),

                gou: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Agou: require("@/assets/img/aixh/bai/dog.15bffe8.png"),

                ji: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Aji: require("@/assets/img/aixh/bai/Chicken.5452c69.png"),

                tu: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Atu: require("@/assets/img/aixh/bai/rabbit.5ee5a81.png"),

                zhu: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Azhu: require("@/assets/img/aixh/bai/pig.ffa511a.png"),

                shu: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Ashu: require("@/assets/img/aixh/bai/mouse.5cff589.png"),

                hou: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Ahou: require("@/assets/img/aixh/bai/monkey.9fd4789.png"),

                ma: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Ama: require("@/assets/img/aixh/bai/horse.3a68b4d.png"),

                hu: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Ahu: require("@/assets/img/aixh/bai/tiger.4f10248.png"),

                se: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Ase: require("@/assets/img/aixh/bai/snake.c8b1714.png"),

                yang: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Ayang: require("@/assets/img/aixh/bai/sheep.094424f.png"),

                niu: require("@/assets/img/aixh/bai/back.51601b7.png"),
                Aniu: require("@/assets/img/aixh/bai/cattle.493dcb4.png"),



            },
            hei: {
                color: "#eacd91",
                topbj: "#1d1e23",
                bjimg: require("@/assets/img/aixh/hei/zodiac.66324eb.png"),
                yaoyiyao: require("@/assets/img/aixh/AIshake@2x.8d7557d.png"),
                arimg: require("@/assets/img/aixh/hei/AIbirthday@2x.aaac0b1.png"),


                sx: require("@/assets/img/aixh/hei/zodiac_default.98c9a3c.png"),
                Asx: require("@/assets/img/aixh/hei/birthday_select.47f551b.png"),

                yiy: require("@/assets/img/aixh/hei/shake_default.a31135e.png"),
                Ayiy: require("@/assets/img/aixh/hei/shake_select.ac1d576.png"),

                ar: require("@/assets/img/aixh/hei/love_default.958f1c4.png"),
                Aar: require("@/assets/img/aixh/hei/love_select.5c919af.png"),

                jr: require("@/assets/img/aixh/hei/family_default.892d2f7.png"),
                Ajr: require("@/assets/img/aixh/hei/family_select.3df7426.png"),

                sr: require("@/assets/img/aixh/hei/birthday_default.7a563aa.png"),
                Asr: require("@/assets/img/aixh/hei/birthday_select.47f551b.png"),



                long: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Along: require("@/assets/img/aixh/hei/Dragon.4728a14.png"),

                gou: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Agou: require("@/assets/img/aixh/hei/dog.596fa6b.png"),

                ji: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Aji: require("@/assets/img/aixh/hei/Chicken.de35001.png"),

                tu: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Atu: require("@/assets/img/aixh/hei/rabbit.dfb8f11.png"),

                zhu: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Azhu: require("@/assets/img/aixh/hei/pig.edc0f0c.png"),

                shu: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Ashu: require("@/assets/img/aixh/hei/mouse.de990c2.png"),

                hou: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Ahou: require("@/assets/img/aixh/hei/monkey.402870e.png"),

                ma: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Ama: require("@/assets/img/aixh/hei/horse.60b3f25.png"),

                hu: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Ahu: require("@/assets/img/aixh/hei/tiger.93bdbea.png"),

                se: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Ase: require("@/assets/img/aixh/hei/snake.c794d22.png"),

                yang: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Ayang: require("@/assets/img/aixh/hei/sheep.fc648c6.png"),

                niu: require("@/assets/img/aixh/hei/back.eac5d39.png"),
                Aniu: require("@/assets/img/aixh/hei/cattle.6101f0d.png"),


            },
            t:""
        }
    },
    components: { // 注册组件

    },
    mounted(){


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
    methods: {
     摇一摇(){
                            this.videoshow=false;

        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion',deviceMotionHandler,false);
            }
            var this_=this
        //获取加速度信息
        //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
        //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
            var SHAKE_THRESHOLD = 4000;
            var last_update = 0;
            var x, y, z, last_x = 0, last_y = 0, last_z = 0;
            function deviceMotionHandler(eventData) {
                    var acceleration =eventData.accelerationIncludingGravity;
                    var curTime = new Date().getTime();
                    if ((curTime-last_update)> 10) {
                        var diffTime = curTime -last_update;
                        last_update = curTime;
                        x = acceleration.x;
                        y = acceleration.y;
                        z = acceleration.z;
                        var speed = Math.abs(x +y + z - last_x - last_y - last_z) / diffTime * 10000;             if (speed > SHAKE_THRESHOLD) {
                            // alert("你中奖啦！");  // Do something
                             this_.videoshow=false;//video标签 显示出来制动播放音频
                                this_.shownum=true //显示带有数字的deo                            
                                try {
                                    clearTimeout(this_.t); //需要执行的代码块
                                } catch (error) {}
                                this_.videoshow=true;
                                 let arry=[]
                                for (let i = 0; i < 7; i++) { 
                                        var random = 38 - 0 + 1;
                                        var num = Math.floor(Math.random() * random + 0);
                                        arry.push(num)
                                }
                                    this_.arrynum=arry
                                console.log( this_.arrynum)

                                this_.t =  setTimeout(()=>{
                                    this_.videoshow=false;   
                                },1000)
                           
                        }
                        last_x = x;
                        last_y = y;
                        last_z = z;
                    }
            }
        },



        queding(d){
           var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() //类时间搓需要转换
            if(this.名字==1){
            this.时间.爱人生日1=datetime
            }else if(this.名字==2){
            this.时间.我的生日2=datetime               
            }else if(this.名字==3){
            this.时间.家人生日3=datetime               
            }else if(this.名字==4){
            this.时间.我的生日4=datetime               
            }else if(this.名字==5){
            this.时间.寿星生日5=datetime               
            }
           this.itemshow=false;
        },
        getColumnValue(index){
         
        },
        选择生日(type){
            this.itemshow=true
            this.名字=type
        },
        随机() {

            function 随机取三个值(arr, count) {
                var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
                while (i-- > min) {
                    index = Math.floor((i + 1) * Math.random());
                    temp = shuffled[index];
                    shuffled[index] = shuffled[i];
                    shuffled[i] = temp;
                }
                return shuffled.slice(min);
            }
            var arry = Object.keys(this.sxdt)//转数组
            var sange = 随机取三个值(arry, 3) //随机取数值的3个值
            var maxobj = this.sxdt
            for(let key in maxobj){
                maxobj[key]=true //解决每次点击的时候都关闭前一个卡片
            }
            for (var i = 0; i < sange.length; i++) {
                if (maxobj[sange[i]]) {
                    maxobj[sange[i]] = false;
                   this.active=true
            }
            }

        },
        返回() {//头部
            history.back()
        },
        clicktite(index) {
            this.tableType = index
            if(index==1){
                this.摇一摇()
            }
        },

    }

}


</script>
<style lang="scss" scoped>
// =====================公用===============
.num{
        display:flex;
        padding:_vw(80) _vw(10) _vw(0) _vw(10);
        justify-content:space-between;
        >span:nth-last-child(1){
            background:goldenrod;
        }
        span{
          
        }
        
        .iconfont{
            
        }
        >span{
              font-size: _vw(30);
                width: _vw(30);
                display: block;
               height: _vw(30);
               background: black;
               color:#ffffff;
               border-radius: _vw(50);
               font-size: _vw(16);
               font-weight:800;
               text-align: center;
               line-height: _vw(30);
               
            
        }

    }

// =====================公用===============

.AI智能选号 {
        .帮助弹出框 {
        width: 90%;
        border-radius: _vw(6);
        .top_title {
            border-top-left-radius: _vw(10);
            border-top-right-radius: _vw(10);
            display: flex;
            justify-content: space-between;
            height: _vw(35);
            background: #eacd91;
            padding: _vw(0) _vw(10);
            .l_b,
            .r_b {
                line-height: _vw(35);
                .text_t {
                    font-size: _vw(14);
                }
                .cross,
                .iconbangzhu {
                    color: #ffffff;
                }
            }
        }
        .C_zh {
            font-size: _vw(12);
            background: #ffffff;
            border-bottom-left-radius: _vw(10);
            border-bottom-right-radius: _vw(10);
            h3 {
                margin: 0px;
                padding: _vw(12) _vw(10) _vw(10) _vw(0);
            }
            .p {
                margin: 0px;
            }
            padding: _vw(10);
            .bottom_b {
                display: flex;
                margin-top: _vw(10);
                margin-bottom: _vw(10);
                .l_top {
                    width: _vw(90);
                    font-size: _vw(14);
                    font-weight: 800;
                }
                .r_p{
                 flex:1;
                 font-weight: 400;
                 font-size:_vw(11)
                }
            }
        }
    }


    .div_top {
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        z-index: 20;
        box-sizing: border-box;
        height: _vw(35);
        line-height: _vw(35);
        display: flex;
        justify-content: space-between;
        padding: _vw(0) _vw(4);
        .iconzuobian {
            font-size: _vw(17);
        }
        .sqzj {
            .iconbangzhu {
                font-size: _vw(19);
            }
        }
        .text {
            font-size: _vw(15);
        }
    }
    .content {
        padding-top: _vw(30);
        box-sizing: border-box;
        .nav_top {
            height: _vw(232);
            position: relative;
            .banner {
                height: _vw(232);
                width: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .xddw {
                position: absolute;
                left: 0px;
                width: 100%;
                bottom: 0;
                z-index: 10;
                // background: yellow;
                height: _vw(50);
                display: flex;
                justify-content: space-around;
                .zhuo,
                .you {
                    position: relative;
                    left: 0px;
                    top: _vw(20);
                }
                .zhong {
                    position: relative;
                    left: 0px;
                    top: _vw(30);
                }
                div {
                    width: _vw(50);
                    height: _vw(50);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .ul_content {
                //   background: red;
                //   height: 100%;
                .生肖 {
                    display: flex;
                    padding: _vw(50) _vw(0) _vw(0) _vw(0);
                    flex-wrap: wrap;
                    box-sizing: border-box;
                    .div_w {
                        width: 25%;
                        height: _vw(88);
                        margin-bottom: _vw(30);
                        box-sizing: border-box;
                        .show{
                             transform:rotate(180deg);
                             transition-duration:3s;  /*过渡时间为3秒*/
                             transition-property:all;
                        }
                        .div {
                            width: _vw(65);
                            height: _vw(88);
                            margin: 0px auto;
                             transform:rotate(0deg);                          
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .show{

                        }
                    }
                }
                .摇一摇{
                    padding-top:_vw(60);
                    box-sizing: border-box;
                   .yao_img{
                      width:_vw(150) ;
                      height:_vw(150) ;
                      margin:0px auto;
                      img{
                          width: 100%;
                          height: 100%;
                      }
                   } 
                   
                }
                .生日,.家人,.爱人{
                    padding:_vw(30) _vw(10) _vw(0) _vw(20);
                    .titile{
                     font-size: _vw(16);
                      display:flex;
                      align-items: center;
                        /deep/.van-icon{
                            font-size: _vw(20)
                         }
                     .like{
                        font-size: _cw(30);
                        color:red;
                     }
                    }
                    .content_c{
                        display: flex;
                        justify-content: space-between;
                         align-items: center;
                        .left{
                           width: _vw(100); 
                           height: _vw(100); 
                           img{
                               width: 100%;
                               height: 100%;
                           }
                        }
                        .right{
                        //    height: _vw(100); 
                        //  background: yellow;
                        font-size: _vw(16);
                        //   height: _vw(30);
                        //   display:flex;
                           .right_top,.right_bottom{
                               margin:_vw(6) _vw(0);
                             display: flex;
                             align-items: center;
                             .点选{
                                 width:_vw(160);
                                 height:_vw(32);
                                 background: #f0f0f0;
                                 margin-left: _vw(10);
                                 display:flex;
                                 justify-content: space-between;
                                 padding:_vw(0) _vw(10);
                                 box-sizing: border-box;
                                 align-items: center;
                             }
                           }
                         
                        }
                      }
                }
            }
        }
    }
}
</style>
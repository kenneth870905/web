<template>
    <div class="home">
         <!-- <audio controls="controls">
            <source src="@/assets/img/video/1.mp3" type="audio/mp3" />
        </audio> -->
        <BigImg v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></BigImg>
        <!-- <div class="弹出框"  v-if="queren">
            <div class="box"> 你确定要将某某提出群聊吗？</div>
        </div> -->
        <div class="content_content">
            <div class="up_box">
                <div class="nume_yuan">
                    <div class="toux">
                        <span class="iconfont icontubiao-"></span>
                    </div>
                    <span class="name_text">{{username}}</span>
                </div>

                <div class="top_input">
                    <el-form :model="user" ref="user" class="shouLogin_input_box">
                        <div class="form_box yzm_input">
                            <div class="name_input">绑定数量:</div>
                            <el-form-item prop="num">
                                <el-input placeholder="绑定数量" v-model="user.num" :clearable="true" ref="密码" @keyup.enter.native="submitForm()"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form_box">
                            <el-button size="medium" type="danger" @click="submitForm()">提交</el-button>
                        </div>
                    </el-form>
                </div>
            </div>

            <div class="content">
                <div class="right">
                    <div class="left">
                        <!-- 没有好友显示的ul -->
                        <ul class="name_ul" v-if="list.length<1">
                            <li>
                                <div class="name fff">暂无好友</div>
                                <div class="sex fff">...</div>
                            </li>
                        </ul>
                        <!-- 没有好友显示的ul -->
                        <div class="置顶">
                            <div v-if="list.length>=1 && showliaot==true">
                                <div class="置顶_小" v-if="正在聊天.gender==0 || 正在聊天.gender==1">
                                    <div class="name">{{正在聊天.nick}}</div>
                                    <div class="sex" v-if="正在聊天.gender==0">
                                        <div class="性别">女</div>
                                        <div class="新消息" v-if="正在聊天.num!==0">{{正在聊天.num}}</div>
                                    </div>
                                    <div class="sex" v-if="正在聊天.gender==1">
                                        <div class="性别">男</div>
                                        <div class="新消息" v-if="正在聊天.num!==0">{{正在聊天.num}}</div>
                                    </div>
                                </div>
                                <div class="置顶_小" v-if="正在聊天.gender==2">
                                    <div class="name">{{正在聊天.qun}}</div>
                                    <div class="园">群</div>
                                </div>
                            </div>
                        </div>

                        <ul class="name_ul" v-if="list.length>=1">
                            <li v-for="(item,index) in list " @click="clicktite(item,index)" v-if="item!=正在聊天" :class="{'titleActive':item ==正在聊天}">
                                <div class="li_div" v-if="item.gender==0 || item.gender==1">
                                    <div class="name">{{item.nick}}</div>
                                    <div class="sex" v-if="item.gender==0">
                                        <div class="性别">女</div>
                                        <div class="新消息" v-if="item.num!==0">{{item.num}}</div>
                                    </div>
                                    <div class="sex" v-if="item.gender==1">
                                        <div class="性别">男</div>
                                        <div class="新消息" v-if="item.num!==0">{{item.num}}</div>
                                    </div>
                                </div>

                                <div class="li_div" v-if="item.gender==2">
                                    <div class="name">{{item.qun}}</div>
                                    <div class="sex">
                                        <div class="群男女">群</div>
                                        <div class="新消息" v-if="item.num!==0">{{item.num}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <ul class="ul_max">
                        <li>
                            <div class="content_right">
                                <ul class="对话窗口" id="table">
                                    <li v-for="(item1,index) in 正在聊天.msglist">
                                        <div v-if="item1.my">
                                            <div v-if="item1.type=='text'">
                                                <p class="时间">{{item1.timedata ? item1.timedata : item1.time}}</p>
                                                <div class="我方显示">
                                                    <div class="hf_text">
                                                        <div class="name_N">&nbsp;{{item1.nick ? item1.nick : username}}&nbsp;&nbsp;</div>
                                                        <div class="text_t">&nbsp;&nbsp;{{item1.msg}}&nbsp;&nbsp;</div>
                                                        <div class="三角"></div>
                                                    </div>
                                                    <div class="hf_img">
                                                        <span class="iconfont icontubiao-"></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-if="item1.type=='img'">
                                                <p class="时间">{{item1.time}}</p>
                                                <div class="我方显示">
                                                    <div class="img_box">
                                                        <div class="name_N">&nbsp;{{item1.nick ? item1.nick : username}}&nbsp;&nbsp;</div>
                                                        <div class="img_div">
                                                            　<img id="smallImg" v-if="item1.imgurl" :src="item1.imgurl" @click="clickImg(item1)">
                                                            　<img id="smallImg" v-if="item1.msg" :src="configUrl.api_url+item1.msg" @click="clickImg(item1)">
                                                        </div>
                                                    </div>
                                                    <div class="hf_img" >
                                                        <span class="iconfont icontubiao-"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="!item1.my && item1.type=='text'">
                                            <p class="时间">{{item1.time}}</p>
                                            <div class="texthename">
                                                <div class="hf_img img_box" @click="踢人(item1)">
                                                    <div class="踢人" v-if="item1.tiren" @click="确认踢人(item1)" >确认踢人</div>
                                                    <span class="iconfont icondeng"></span>
                                                </div>
                                                <div class="hf_text"> 
                                                    <div class="name_N">&nbsp;{{item1.nick}}&nbsp;</div>
                                                    <div class="text_t" v-if="item1.type=='text'">&nbsp;{{item1.msg}}&nbsp;</div>
                                                    <div class="三角"></div>
                                                </div>
                                            </div>
                                        </div>
                                            
                                                <div v-if="item1.type=='sound'">
                                        <!-- <div v-if="!item1.my && item1.type=='sound'"> -->
                                            <p class="时间">{{item1.time}}</p>
                                            <div class="texthename">
                                                <div class="hf_img img_box" @click="踢人(item1)">
                                                    <div class="踢人" v-if="item1.tiren" @click="确认踢人(item1)" >确认踢人</div>
                                                    <span class="iconfont icondeng"></span>
                                                </div>
                                                <div class="hf_text"> 
                                                    <div class="name_N">&nbsp;{{item1.nick}}&nbsp;</div>
                                                    <!--  -->
                                                    <div class="text_t" @click="下载语音(item1)" ><span class="iconfont iconshengyin1"></span> 点击下载接收语音
                                                    </div>
                                                    <!-- <div class="text_t" v-if="item1.type=='text'">&nbsp;{{item1.msg}}&nbsp;</div> -->
                                                    <div class="三角"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="!item1.my && item1.type=='img'">
                                            <p class="时间">{{item1.time}}</p>
                                            <div class="texthename">
                                                <div class="hf_img " @click="踢人(item1)">
                                                 <div class="踢人" v-if="item1.tiren" @click="确认踢人(item1)" >确认踢人</div>
                                                    <span class="iconfont icondeng"></span>
                                                </div>

                                                <div class="img_box">
                                                    <div class="name_N">&nbsp;{{item1.nick}}&nbsp;&nbsp;</div>
                                                    <div class="img_div">
                                                        　 <img id="smallImg" :src="configUrl.img_url+item1.msg" @click="clickImg(item1)">
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="bottom_right" v-if="this.正在聊天!==''">
                                <div class="输入框">
                                    <div class="点击发图片">
                                        <div class="上面的框">
                                            <span class="iconfont icontianjiatupian"></span>
                                        </div>

                                        <input @change="点击发送('img')" accept="image/*" name="img" id="upload_file" type="file" />
                                    </div>

                                    <el-input type="textarea" :autosize="{ minRows:6, maxRows: 6}" @keyup.enter.native="点击发送('text')" placeholder="按Enter发送" autofocus v-model="textarea"></el-input>
                                </div>

                                <div class="bottom_bottom">
                                    <div class="btn" @click="点击发送('text')">发送(s)</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { setInterval } from "timers";
import { 绑定数量, 请求会员列表, 聊天对话群, 发送图片, 聊天对话个人,踢出群聊} from "@/api/api.js";
import { constants } from 'crypto';
import qs from 'qs';
import BigImg from '@/components/imgmax.vue'
export default {
    data() {
        return {
            tiren:false,//踢人按钮
            imgURL: "",
            username: "",
            showImg: false,
            tableType: 0,
            imgSrc: "",
            list: [],
            user: {
                num: "" //文字验证嘛
            },
            textarea: "",
            定时器: 0,
            会话框: [],
            正在聊天: {},
            showliaot: false,
            configUrl: configUrl,
        };
    },
    props: ['正在聊天.msglist'],
    components: { BigImg },
    computed: {
        newlist() {
            var list = this.list;
            list = list.sort((x, y) => {
                var num1 = x.num;
                var num2 = y.num;
                if (num1 === num2) {
                    return y.排序 - x.排序;
                }
                return y.num - x.num
            })
            return list
        }
    },
    methods: {
         
        clickImg(item1) {
            this.showImg = true;
            // 获取当前图片地址
            // console.log(item1)
            // this.imgSrc = item1.imgurl ? item1.imgurl : item1.msg;
            this.imgSrc = item1.imgurl ? item1.imgurl : this.configUrl.img_url +item1.msg;
        },
        viewImg() {
            this.showImg = false;
        },
        踢人(item){
            this.$set(item,'tiren',!item.tiren)
        },
        确认踢人(item1){
            console.log(item1)
                 var tokendata = window.localStorage.getItem("token");
             var obj = {
                        token: tokendata,
                        type: "order",
                        msg: item1.cvxid,
                        vxid: item1.vxid,
                        cvxid:item1.cvxid,
                        qunid:item1.qunid
                    };
            踢出群聊(obj).then(x=>{
                if(x.status==200){
                 
                 alert("您已将   "+ item1.nick+"   踢出该群！")               
                }
            }).catch(err=>{
                console.log(err)
            })
         
        },
        下载语音(item){
            window.open('http://www.wechatapi.com/vxupload/'+item.msg)  
            // console.log(item)
            
        },
     

        进行排序() {
            var list = this.list;
            list = list.sort((x, y) => {
                var num1 = x.num;
                var num2 = y.num;
                if (num1 === num2) {
                    return y.排序 - x.排序;
                }
                return y.num - x.num
            });
            this.list = list;
        },
        tick() {
            var date = new Date();
            this.year = date.getFullYear();
            var monthnum = date.getMonth() + 1;
            this.month = monthnum < 10 ? "0" + monthnum : monthnum;
            this.date = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            this.hour =
                date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            this.minute =
                date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
            var currentTime = this.year + "-" + this.month + "-" + this.date + "  " + this.hour + ":" + this.minute + ":" + this.second;
            return currentTime;
        },
        会员列表函数() {
            this.定时器 = setInterval(() => {
                var token = window.localStorage.getItem("token");
                请求会员列表(token).then(x => {
                    if (x.status == 200) {
                        if (x.data.result == true) {
                            var datalist = x.data.msg;
                            this.list.forEach(item => {
                                item.排序 = 0;
                                })
                                console.log(datalist)
                            datalist.forEach(item => {
                                if (item.gender == 0 || item.gender == 1) {//个人对个人
                                    var obj= '';
                                    if(item.qunid){
                                        obj = this.list.find(x => x.cvxid == item.cvxid && x.qunid==item.qunid);
                                    }else{
                                        obj = this.list.find(x => x.cvxid == item.cvxid && !x.qunid);
                                    }
                                    if (!obj) {
                                        item.num = 1
                                        item.排序 = 1;
                                        item.正在聊 = 0;
                                        item.msglist = [Object.assign({}, item)];
                                        this.list.push(item);
                                    } else {
                                        item.排序 = 1;
                                        obj.num++
                                        obj.msglist.push(item);
                                    }
                                } else {
                                    var obj = this.list.find(x => x.vxid == item.vxid && x.qunid == item.qunid);//如果是群 如果这两个值都存在空数组里 
                                    if (!obj) {//这就就排除他 
                                        item.num = 1
                                        item.排序 = 1;
                                        item.正在聊 = 0;
                                        if (item.cvxid == item.vxid) {//如果这两个值想等 就代表都是自己讲的话就让他显示在右边
                                            item.my = true
                                            // item.nick
                                        }
                                        //  console.log(item)
                                        item.msglist = [Object.assign({}, item)];
                                        this.list.push(item);

                                    } else {
                                        item.排序 = 1;
                                        if (item.cvxid == item.vxid) {//如果这两个值想等 就代表都是自己讲的话就让他显示在右边
                                            item.my = true
                                        }
                                        obj.num++
                                        obj.msglist.push(item);
                                    }

                                }
                            });
                            this.进行排序()
                        }
                    } else {
                        this.$message.success("内部服务器错误");
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 5000);
        },
        clicktite(item, index) {
            this.showliaot = true
            this.tableType = index;
            this.list[this.tableType].num = 0;
            this.正在聊天 = item;
            console.log(item)
        },
        点击发送(type) {
            if (type == "img") {
                var file = document.getElementById("upload_file").files[0];
                if (file && file.name !== "") {//预防选这图片的时候卡死 发送过去的是烂图显示在页面
                    var tokendata = window.localStorage.getItem("token");
                    var obj = {
                        token: tokendata,
                        type: "img",
                        msg: '',
                        vxid: this.list[this.tableType].vxid,
                        cvxid: this.list[this.tableType].cvxid
                    };

                    var formdata1 = new FormData(); // 创建form对象
                    formdata1.append("file", file); // 通过append向form对象添加数据,可以通过append继续添加数据
                    formdata1.append("type", obj.type);
                    formdata1.append("msg", obj.msg);
                    formdata1.append("vxid", obj.vxid);
                    formdata1.append("cvxid", obj.cvxid);
                    let config = {
                        headers: { "Content-Type": "multipart/form-data" }
                    }; //添加请求头
                    axios.post(this.configUrl.api_url + "vx.php?action=upload&token=" + obj.token, formdata1, config).then(x => {

                        // axios.post("http://www.ceshi.com/wechat/vx.php?action=upload&token=" + obj.token, formdata1, config).then(x => {
                        if (x.status == 200) {
                            var qunidData = this.list[this.tableType].qunid//说明是群
                            if (qunidData) {
                                var tokendata = window.localStorage.getItem("token");
                                var obj = {
                                    token: tokendata,
                                    type: "img",
                                    msg: x.data.url,
                                    vxid: this.list[this.tableType].vxid,
                                    cvxid: this.list[this.tableType].cvxid,
                                    qunid: qunidData
                                };

                                聊天对话群(obj).then(x => {
                                    if (x.status == 200) {
                                        console.log("聊天对话调用成功")
                                    } else {
                                        console.log("聊天对话失败")
                                    }
                                    document.getElementById("upload_file").value = null; //解决多次发同一张图片聊天对话不显示
                                }).catch(err => {
                                    console.log("聊天对话失败报错")
                                    console.log(err);
                                });
                                //   图片上传成功以后调用聊天对话接口结束
                                // 渲染页面开始
                                this.imgURL = this.configUrl.img_url + x.data.url;//给点击图片放大使用
                                var imgurldata = this.configUrl.img_url + x.data.url;
                                var objimgaArry = {
                                    time: this.tick(),
                                    imgurl: imgurldata,
                                    type: "img",
                                    my: true,
                                };
                                this.正在聊天.msglist.push(objimgaArry)
                                if (this.正在聊天.msglist.length > 150) {
                                    this.正在聊天.msglist.splice(0, 150);
                                }
                                this.$nextTick(() => {
                                    document.querySelector('#table>li:last-child').scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
                                })
                            } else {//单个对话不需要带传qunid
                                var tokendata = window.localStorage.getItem("token");
                                var obj = {
                                    token: tokendata,
                                    type: "img",
                                    msg: x.data.url,
                                    vxid: this.list[this.tableType].vxid,
                                    cvxid: this.list[this.tableType].cvxid,
                                };
                                聊天对话个人(obj).then(x => {
                                    if (x.status == 200) {
                                        console.log("聊天对话调用成功")
                                    } else {
                                        console.log("聊天对话失败")
                                    }
                                    document.getElementById("upload_file").value = null; //解决多次发同一张图片聊天对话不显示
                                }).catch(err => {
                                    console.log("聊天对话失败报错")
                                    console.log(err);
                                });
                                //   图片上传成功以后调用聊天对话接口结束
                                // 渲染页面开始
                                this.imgURL = this.configUrl.img_url + x.data.url;//给点击图片放大使用
                                var imgurldata = this.configUrl.img_url + x.data.url;
                                var objimgaArry = {
                                    time: this.tick(),
                                    imgurl: imgurldata,
                                    type: "img",
                                    my: true,
                                };
                                this.正在聊天.msglist.push(objimgaArry)
                                if (this.正在聊天.msglist.length > 150) {
                                    this.正在聊天.msglist.splice(0, 150);
                                }
                                this.$nextTick(() => {
                                    document.querySelector('#table>li:last-child').scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
                                })
                            }
                        } else {
                            this.$message.success("图片上传失败");
                        }

                    });
                } else {
                    console.log("你未选择任何图片")
                }
            } else if (type == "text") {
                var testkong = this.textarea.split(" ").join("").length; //检测字符串是否全部为空
                if (testkong !== 0 && this.textarea != this.textarea.match(/^\s+$/)) {
                    var qunidData = this.list[this.tableType].qunid
                    //    console.log(qunidData)
                    if (qunidData) {
                        var tokendata = window.localStorage.getItem("token");
                        var obj = {
                            token: tokendata,
                            type: "text",
                            msg: this.textarea,
                            vxid: this.list[this.tableType].vxid,
                            cvxid: this.list[this.tableType].cvxid,
                            qunid: qunidData,
                        };

                        聊天对话群(obj).then(x => {
                            console.log(x.data);
                        }).catch(err => {
                            console.log(err);
                        });
                        var objdata = {
                            my: true,
                            msg: this.textarea,
                            type: "text",
                            timedata: this.tick(), //获取当前时间
                        };
                        this.正在聊天.msglist.push(objdata)
                        if (this.正在聊天.msglist.length > 150) {
                            this.正在聊天.msglist.splice(0, 150);
                        }
                        this.textarea = "";
                        this.$nextTick(() => {//让最后一个li 显示在可视窗口
                            //    setTimeout(()=>{
                            document.querySelector('#table>li:last-child').scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
                            // },200);
                        })
                    } else {
                        var tokendata = window.localStorage.getItem("token");
                        var obj = {
                            token: tokendata,
                            type: "text",
                            msg: this.textarea,
                            vxid: this.list[this.tableType].vxid,
                            cvxid: this.list[this.tableType].cvxid,
                        };

                        聊天对话个人(obj)
                            .then(x => {
                                console.log(x.data);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        var objdata = {
                            my: true,
                            msg: this.textarea,
                            type: "text",
                            timedata: this.tick(), //获取当前时间
                        };
                        this.正在聊天.msglist.push(objdata)
                        if (this.正在聊天.msglist.length > 150) {
                            this.正在聊天.msglist.splice(0, 150);
                        }
                        this.textarea = "";
                        this.$nextTick(() => {//让最后一个li 显示在可视窗口
                            //    setTimeout(()=>{
                            document.querySelector('#table>li:last-child').scrollIntoView({ behavior: "instant", block: "end", inline: "nearest" });
                            // },200);
                        })
                    }

                } else {
                    console.log("全是空格取消发送");
                }
            }else if(type == "sound"){
                 console.log("这里是音频")
            }

        },
        submitForm() {
            var tokendata = window.localStorage.getItem("token");
            var obj = {
                num: this.user.num,
                token: tokendata
            };
            绑定数量(obj).then(x => {
                console.log(x);
                if (x.status == 200) {
                    console.log(x.data.msg);
                    if (x.data.result == true) {//绑定成功
                        this.$message.success(x.data.msg);
                    } else {
                        this.$message.success(x.data.msg);
                    }
                } else {
                    this.$message.success("内部服务器错误");
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    created() {
        this.会员列表函数();
        this.username = window.localStorage.getItem("username");
         
    },
    destroyed() {
        clearInterval(this.定时器);
    },
    watch: {}
};
</script>

<style lang="scss" scoped>
.fff {
    color: #ffffff !important;
}
.titleActive {
    background: #43474c;
}
.home {
    background: url("../assets/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    position: relative;

    .content_content {
        position: absolute;
        top: 100px;
        left: 50%;
        width: 1000px;
        height: 700px;
        margin-left: -500px;
        border: 1px solid #acacac;
        .up_box {
            display: flex;
            justify-content: space-between;
            .nume_yuan {
                background: #43474c;
                width: 22%;
                display: flex;
                align-items: center;
                padding-left: 10px;
                box-sizing: border-box;
                .toux {
                    width: 50px;
                    height: 50px;
                    margin-right: 20px;
                    color: #0f1444;
                    background: #ffffff;
                    text-align: center;
                    .iconfont {
                        line-height: 50px;
                        font-weight: 1000;
                        font-size: 40px;
                    }
                }
                .name_text {
                    color: #ffffff;
                }
            }

            .top_input {
                height: 60px;
                width: 78%;
                background: #43474c;
                padding-right: 20px;
                box-sizing: border-box;
                .shouLogin_input_box {
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .yzm_input {
                        display: flex;
                        width: 300px;
                        height: 40px;
                        .name_input {
                            width: 100px;
                            line-height: 44px;
                            text-align: center;
                            font-size: 18px;
                            color: #ffffff;
                        }
                        /deep/.el-input__inner {
                            padding-left: 10px !important;
                        }
                        .el-input__prefix,
                        .el-input__suffix {
                            position: relative;
                            img {
                                position: absolute;
                                top: 5px;
                                left: 0px;
                            }
                        }
                    }

                    /deep/ .form_box {
                        outline: none !important;
                        margin-right: 20px;
                        .iconfont {
                            line-height: 40px;
                            font-size: 24px;
                            color: red;
                            height: 100%;
                        }
                        /deep/ .el-input--prefix .el-input__inner {
                            width: 150px !important;
                            outline: none !important;
                        }
                        .el-input.is-active .el-input__inner,
                        .el-input__inner:focus {
                            border-color: red !important;
                        }
                    }
                }
            }
        }
        .content {
            display: flex;
            width: 100%;
            height: 92%;

            .right {
                width: 100%;
                height: 640px;
                background: #2e3238;
                display: flex;
                .left {
                    height: 490px;
                    width: 22%;
                    background: #2e3238;
                    box-sizing: border-box;
                    position: relative;
                    .置顶 {
                        border-top: 1px solid #292c33;
                        height: 48px !important;
                        background: #4e4e4e;

                        .置顶_小 {
                            border-top: 1px solid #292c33;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 0px 8px;
                            .园 {
                                min-width: 20px;
                                height: 20px;
                                border-radius: 35px;
                                color: #ffffff;
                                text-align: center;
                                line-height: 20px;
                                padding: 0px 1px;
                                font-size: 14px;
                                background: #43474c;
                            }
                            .name,
                            .sex {
                                color: #fff;
                                line-height: 50px;
                                display: flex;
                                align-items: center;
                                justify-items: center;
                                font-size: 14px;
                                .性别 {
                                    min-width: 20px;
                                    height: 20px;
                                    border-radius: 35px;
                                    color: #ffffff;
                                    text-align: center;
                                    line-height: 20px;
                                    padding: 0px 1px;
                                    font-size: 14px;
                                    background: #43474c;
                                }

                                .新消息 {
                                    margin-left: 5px;
                                    min-width: 20px;
                                    height: 20px;
                                    border-radius: 35px;
                                    color: #ffffff;
                                    text-align: center;
                                    line-height: 20px;
                                    background: red;
                                    padding: 0px 1px;
                                }
                            }
                        }
                    }
                    .name_ul {
                        background: #2e3238;
                        max-height: 590px;
                        overflow: auto;
                        border-top: 1px solid #292c33;
                        width: 100%;
                        // height: 100%;
                        position: relative;
                        li {
                            border-bottom: 1px solid #292c33;
                            padding: 0px 8px;

                            // }
                            .li_div {
                                display: flex;
                                justify-content: space-between;

                                .name,
                                .sex {
                                    color: #fff;
                                    line-height: 50px;
                                    display: flex;
                                    align-items: center;
                                    justify-items: center;
                                    font-size: 14px;
                                    .性别 {
                                        min-width: 20px;
                                        height: 20px;
                                        border-radius: 35px;
                                        color: #ffffff;
                                        text-align: center;
                                        line-height: 20px;
                                        padding: 0px 1px;
                                        font-size: 14px;
                                        background: #43474c;
                                    }
                                    .群男女 {
                                        background: #43474c;
                                    }
                                    .新消息 {
                                        background: red;
                                        margin-left: 5px;
                                    }

                                    .新消息,
                                    .群男女 {
                                        min-width: 20px;
                                        height: 20px;
                                        border-radius: 35px;
                                        color: #ffffff;
                                        text-align: center;
                                        line-height: 20px;
                                        padding: 0px 1px;
                                        font-size: 14px;
                                    }
                                }
                            }
                        }
                    }
                }
                .ul_max {
                    width: 78%;
                    height: 100%;
                    background: #ffffff;
                    li {
                        width: 100%;
                        height: 100%;
                        .content_right {
                            height: 480px;
                            overflow: auto;
                            background: #ffffff;
                            box-sizing: border-box;
                            .对话窗口 {
                                li {
                                    .时间 {
                                        width: 130px;
                                        height: 20px;
                                        line-height: 20px;
                                        margin: 6px auto;
                                        background: #dcdcdc;
                                        color: #fff;
                                        font-size: 12px;
                                        text-align: center;
                                        border-radius: 3px;
                                    }

                                    .我方显示 {
                                        margin-bottom: 10px;
                                        padding-bottom: 10px;
                                        justify-content: flex-end;
                                        .img_box {
                                            .name_N {
                                                color: #ffffff;
                                                background: #ccc;
                                                height: _vw(19);
                                                min-width: _vw(120);
                                                text-align: right;
                                            }
                                        
                                            .img_div {
                                                max-width: 300px;
                                                img {
                                                    width: 100%;
                                                    height: 100%;
                                                }
                                            }
                                        }
                                        .hf_img {
                                            margin-left: 20px;
                                        }
                                        .hf_text {
                                            background: #69a74d;
                                            .name_N {
                                                text-align: right;
                                            }

                                            .三角 {
                                                right: -14px;
                                                border-right: 7px solid #ffffff;
                                                border-left: 7px solid #69a74d;
                                            }
                                        }
                                    }

                                    .texthename {
                                            padding-bottom: 10px;
                                            margin-bottom: 10px;

                                       
                                        .img_box {
                                            .name_N {
                                                color: #ffffff;
                                                background: #ccc;
                                                height: _vw(19);
                                                min-width: _vw(120);
                                            }
                                           
                                            .img_div {
                                                max-width: 300px;
                                                img {
                                                    width: 100%;
                                                    height: 100%;
                                                }
                                            }
                                        }
                                       

                                        .hf_img {
                                            margin-right: 20px;
                                            width:_vw(50);
                                            height:_cw(50);
                                            position: relative;
                                            margin-left:10px;
                                              .踢人{
                                                position: absolute;
                                                width: 138%;
                                                text-align: left;
                                                 background: red;
                                                top:-18px;
                                                left:-8px;
                                                font-size:14px;
                                                 text-align: center;
                                                color:#fff;
                                                z-index:30;
                                            
                                                font-size: _vw(14);
                                                font-weight: 700;

                                            }
                                        }
                                        .hf_text {
                                            background: #fafafa;
                                            .name_N {
                                                text-align: left;
                                            }
                                            .iconfont,
                                            span {
                                                line-height: 40px;
                                            }
                                            .三角 {
                                                left: -14px;
                                                border-right: 7px solid #fafafa;
                                                border-left: 7px solid #fff;
                                            }
                                        }
                                    }
                                    .texthename,
                                    .我方显示 {
                                        display: flex;
                                        .hf_img {
                                            width: 50px;
                                            height: 50px;
                                            color: #0f1444;
                                            background: #ffffff;
                                            text-align: center;
                                            .iconfont {
                                                line-height: 50px;
                                                font-weight: 1000;
                                                font-size: 40px;
                                            }
                                        }

                                        .hf_text {
                                            position: relative;
                                            border-radius: 4px;
                                            word-wrap: break-word;
                                            font-size: 14px;
                                            box-sizing: border-box;
                                            .name_N {
                                                color: #ffffff;
                                                background: #ccc;
                                                height: _vw(19);
                                                min-width: _vw(120);
                                            }
                                            .text_t {
                                                // padding:0px _vw(6);
                                                line-height: 40px;
                                                text-align: center;
                                                min-width: _vw(60);
                                            }
                                            .三角 {
                                                position: absolute;
                                                top: 20px;
                                                border-top: 7px solid #fff;
                                                border-bottom: 7px solid #fff;
                                                width: 0;
                                                height: 0;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .bottom_right {
                            //  height:124px;

                            border-top: 1px solid #f0eeee;
                            position: relative;
                            border-top: 1px solid #ccc;
                            box-sizing: border-box;

                            .bottom_bottom {
                                height: 40px;
                                display: flex;
                                justify-content: flex-end;
                                align-items: center;
                                position: absolute;
                                right: 0px;
                                bottom: 1px;
                                .btn {
                                    z-index: 20;
                                    background: #ffffff;
                                    height: 40px;
                                    width: 120px;
                                    text-align: center;
                                    line-height: 40px;
                                    border: 1px solid #ccc;
                                    background: rgb(240, 233, 233);
                                    font-size: 18px;
                                }
                            }

                            .输入框 {
                                padding-top: 10px !important ;
                                box-sizing: border-box;
                                padding-left: 20px !important ;
                                //  height:124px;
                                background: #ffffff;
                                .点击发图片 {
                                    height: 23px;
                                    width: 200px;
                                    overflow: hidden;
                                    position: relative;
                                    display: flex;
                                    justify-content: space-between;

                                    .上面的框 {
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        height: 23px;
                                        width: 70px;
                                        font-weight: 1000;
                                        // text-align: right;

                                        //  background:gold;
                                    }
                                    #upload_file {
                                        position: absolute;
                                        left: 0;
                                        top: 0;
                                        height: 23px;
                                        width: 70px;
                                        background: #69a74d;
                                        opacity: 0;
                                    }
                                }
                                /deep/ .el-textarea__inner:focus {
                                    border-color: #ccc;
                                    border: none;
                                }
                                /deep/.el-textarea__inner {
                                    width: 100% !important;
                                    height: 100%;
                                    border: none !important ;
                                    padding: 0px !important ;
                                    box-sizing: border-box;
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
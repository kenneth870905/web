<template>
    <div class="底部">
        <div class="header_1">
            <el-popover placement="top-start" width="350" trigger="click">
                <div class="表情">
                    <div class="content_1">
                        <ul class="字体表情" v-if="显示表情包.type==0">
                            <li @click="发送字体表情(item)" v-for="(item, index) in 字体表情" :key="index">{{item}}</li>
                        </ul>
                        <ul class="表情包2" v-if="显示表情包.type==1">
                            <li v-for="(item, index) in 表情列表1" :key="index">
                                <img :src="config.img_url+'static/image/liaotian/'+item" alt="">
                            </li>
                        </ul>
                        <ul class="表情包3" v-if="显示表情包.type==2">
                            <li v-for="(item, index) in 表情列表2" :key="index">
                                <img :src="config.img_url+'static/image/liaotian/'+item" alt="">
                            </li>
                        </ul>
                    </div>
                    <ul class="表情选项">
                        <li @click="显示表情包.type=0"><img :src="config.img_url+'static/image/liaotian/emoji-0.png'" alt="" srcset=""></li>
                        <!-- <li @click="显示表情包.type=1"><img src="static/image/liaotian/emoji-1.png" alt="" srcset=""></li>
                        <li @click="显示表情包.type=2"><img src="static/image/liaotian/emoji-2.png" alt="" srcset=""></li> -->
                    </ul>
                </div>
                <i slot="reference" class="icon iconfont icon-biaoqing"></i>
            </el-popover>

            <i class="icon iconfont icon-tupian" @click="选图片()"></i>
            <!-- <i class="icon iconfont icon-jilu" @click="查看投注()"></i> -->
            <div>
                您对<span class="红色" v-if="私聊state.正在聊天.SenderProfile">{{私聊state.正在聊天.SenderProfile.Nickname ? 私聊state.正在聊天.SenderProfile.Nickname : 私聊state.正在聊天.SenderProfile.MemberId}}</span>说：
            </div>
        </div>
        <div class="输入框">
            <div class="textarea_1">
                <div class="">
                    <div class="内容">{{textarea}}</div>
                    <textarea ref="textarea" @focus="获得焦点=true" @blur="获得焦点=false" @keyup.enter="keyup($event)" v-model="textarea"></textarea>
                </div>
            </div>
            <div class="发送" @click="发送()">
                <i class="icon iconfont icon-send"></i>
                发送
            </div>
        </div>

        <input ref="input_file" class="input_hide" v-if="file_show" id="upload_file" @change="input_change()" type="file" accept="image/*">

        <el-dialog title="剪切板图片预览" class="图片预览" :visible.sync="预览图片" width="350px" :close-on-click-modal="true">
            <div class="img_1" style="background: url('static/image/bg.png');">  
                <img v-if="剪切板img" :src="剪切板img" alt="" srcset="">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="预览图片 = false">取消</el-button>
                <el-button type="warning" @click="确定发送()">确定发送</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { mapState , mapActions } from "vuex";
export default {
    name: "",
    data() {
        return {
            textarea: "",
            显示表情包:{
                type:0
            },
            字体表情: ['😀', '😁', '😂', '😃', '😅', '😆', '😇', '😈', '😉', '😑', '😒', '😓', '😔', '😕', '😖', '😘', '😡', '😭', '😣', '😤', '😨',
                '😩', '😰', '😱', '😲', '😳', '😴', '😵', '😶', '😷', '🎤', '🎲', '🎵', '🏀', '🏂', '🏡', '🀄', '💡', '💢', '💣', '💤', '💩', '💪', '💰', '📚',
                '📞', '📢', '🚫', '🚿', '🌏', '🌻', '🍚', '🍫', '🍻', '👊', '👌', '👍', '👎', '👏', '👪', '👫', '😬', '👻', '👼', '👽', '👿', '💊', '💋', '💍',
                '🔫', '😊', '😋', '😌', '😍', '😎', '😏', '😚', '😜', '😝', '😞', '😟', '😪', '😫', '😢', '😯', '🙊', '🙏', '🌙', '🌲', '🌹', '🍉', '🍖',
                '🍦', '🍷', '🎁', '🎂', '🎄', '🎉', '🎓', '🐴', '🐶', '🐷', '👑', '💄', '💔', '🔥', '🕖', '🙈', '🙉', '🚀', '⭐', '⏰', '⏳', '⚡', '⚽', '⛄',
                '⛅', '☝', '☺', '✊', '✋', '✌', '✏', '☀', '☁', '☔', '☕', '❄'],
            表情列表1: [
                'lottery_1.gif', 'lottery_2.gif', 'lottery_3.gif', 'lottery_4.gif', 'lottery_5.gif', 'lottery_6.gif', 'lottery_7.gif', 'lottery_8.gif', 'lottery_9.gif', 'lottery_10.gif',
                'lottery_11.gif', 'lottery_12.gif', 'lottery_13.gif', 'lottery_14.gif', 'lottery_15.gif', 'lottery_16.gif', 'lottery_17.gif', 'lottery_19.gif', 'lottery_20.gif',
                'lottery_21.gif', 'lottery_22.gif', 'lottery_23.gif', 'lottery_24.gif', 'lottery_25.gif', 'lottery_26.gif', 'lottery_27.gif', 'lottery_28.gif', 'lottery_29.gif', 'lottery_30.gif',
            ],
            表情列表2: [
                'chick_1.gif', 'chick_2.gif', 'chick_3.gif', 'chick_4.gif', 'chick_5.gif', 'chick_6.gif', 'chick_7.gif', 'chick_8.gif', 'chick_9.gif',
                'chick_10.gif', 'chick_11.gif', 'chick_12.gif', 'chick_13.gif', 'chick_14.gif', 'chick_15.gif', 'chick_16.gif',
            ],
            file_show:true,
            获得焦点: false,
            预览图片: false,
            剪切板img:"",
            blob:""
        }
    },
    computed: {
        ...mapState({
            config:'config',
            私聊state:x=>x.私聊
        }),
    },
    methods: {
        ...mapActions({
            成功提示:'成功提示',
            加载中:'加载中',
            失败提示:'失败提示',

            发送消息:"私聊/发送消息",
            获取最新消息:"私聊/获取最新消息",
            销毁定时器:"私聊/销毁定时器",
        }),
        选图片(){
            this.$refs.input_file.click();
        },
        input_change(){
            var this_1=this
            var file = this.$refs.input_file.files[0]
            if(file && file.name !== ""){
                if(file.size / 1024 / 1024 > 5){
                    this.错误提示('图片不能大于5M，请重新选择。')
                    return
                }
                this.加载中(true)
                var fd = new FormData();
                fd.append('file',file);
                $.ajax({
                    url:this.config.img_upload+'/upload.php?action=up',
                    type:'POST',
                    data:fd,
                    processData:false,  //tell jQuery not to process the data
                    contentType: false,  //tell jQuery not to set contentType
                    success:(r)=>{
                        console.log(r)
                        this.file_show=false;
                        this.$nextTick((r)=>{
                            this.file_show=true;
                        });
                        
                        var obj={
                                ReceiverCode:this.私聊state.正在聊天code,
                                MessageType:4,
                                Message:r.url
                            };
                        this.发送消息(obj);
                        this.加载中(false);
                    },
                    error:(e)=>{
                        this.file_show=false;
                        this.$nextTick(()=>{
                            this.file_show=true;
                        });
                        this.加载中(false);
                    }
                })
            }else{

            }
        },
        keyup(e){
            var 空 = /^\s+$/;
            if(e.shiftKey){

            }else{
                if(!空.test(this.textarea)){
                    this.发送()
                }
            }
        },
        未开放(){
            this.失败提示('暂未开放')
        },
        发送字体表情(item){
            this.textarea+=item;
        },
        发送(){
        var obj={
                ReceiverCode:this.私聊state.正在聊天code,
                MessageType:1,
                Message:this.textarea
            }
            this.发送消息(obj)
            this.textarea='';
        },
        粘贴(event) {
            var this_1 = this;
            if (this.获得焦点) {
                if (event.clipboardData || event.originalEvent) {
                    //not for ie11   某些chrome版本使用的是event.originalEvent
                    var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
                    console.log(clipboardData)
                    console.log(clipboardData.items)
                    console.log(clipboardData.items.length)
                    if (clipboardData.items) {
                        // for chrome
                        var items = clipboardData.items,
                            len = items.length,
                            blob = null;
                        for (var i = 0; i < len; i++) {
                            if (items[i].type.indexOf("image") !== -1) {
                                blob = items[i].getAsFile();
                            }
                        }
                        if (blob !== null) {
                            var reader = new FileReader();
                            reader.onload = function (event) {
                                var base64_str = event.target.result
                                this_1.剪切板img = base64_str;
                                this_1.预览图片=true;
                            }
                            reader.readAsDataURL(blob);
                            this.blob = blob;
                            this.$refs.textarea.blur();
                        }
                    }
                }
            }
        },
        确定发送(){
            this.加载中(true);
            this.预览图片=false;
            var fd = new FormData();
                fd.append('file', this.blob);
                $.ajax({
                    url: this.config.img_upload + '/upload.php?action=up',
                    type: 'POST',
                    data: fd,
                    processData: false,  //tell jQuery not to process the data
                    contentType: false,  //tell jQuery not to set contentType
                    success: (r) => {
                        console.log(r)
                        var obj={
                                ReceiverCode:this.私聊state.正在聊天code,
                                MessageType:4,
                                Message:r.url
                            };
                        this.发送消息(obj);
                        this.加载中(false);
                    },
                    error: (e) => {
                        this.加载中(false);
                    }
                })
        },
        回车发送(e){
            if(this.预览图片 && e.key=='Enter'){
                this.确定发送()
            }
        }
    },
    mounted() {
        document.addEventListener('paste', this.粘贴)
        document.addEventListener('keyup', this.回车发送)
    },
    destroyed() {
        console.log('删除时间')
        document.removeEventListener('paste', this.粘贴)
        document.removeEventListener('keyup', this.回车发送)
    },
}
</script>

<style lang="scss" scoped>

.图片预览{
    /deep/ .el-dialog__headerbtn{
        top: 15px;
    }
    /deep/ .el-dialog__header{
        padding: 10px 20px 10px
    }
    /deep/ .el-dialog__body{
        padding: 5px;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
    }
    /deep/ .el-dialog__footer{
        padding: 10px 20px 10px;
    }
    /deep/ .dialog-footer{
        display: flex;
        justify-content: space-between;
    }
    .img_1{
        height: 350px;
        img{
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}


.input_hide{
    display: none;
}
.底部 {
    border-top: 1px solid #cccccc;
}
.红色 {
    color: red;
}
.header_1 {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    i {
        margin: 0px 15px 0px 0px;
        font-size: 20px;
        cursor: pointer;
    }
}
.输入框 {
    height: 125px;
    padding: 5px;
    display: flex;
    .textarea_1 {
        flex: 1;
        position: relative;
        overflow: auto;
        border: 1px solid #cccccc;
        &::-webkit-scrollbar {
            width: 4px;
        }
        &::-webkit-scrollbar-track {
            background: #e8e8e8;
        }
        &::-webkit-scrollbar-thumb {
            background: #2e394d;
            border-radius: 6px;
        }
        > div {
            position: relative;
            min-height: 100%;
        }
        .内容 {
            font-size: 14px;
            font-family: "微软雅黑";
            // word-wrap: break-word;
            word-break: break-all;
            white-space: pre-line;
            padding: 3px;
        }
        textarea {
            word-break: break-all;
            font-size: 14px;
            font-family: "微软雅黑";
            border: none;
            outline: none;

            position: absolute;
            top: -0px;
            left: 0px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background: #efefef;
            resize: none;
            &::-webkit-scrollbar {
                width: 0px;
            }
        }
    }
    .发送 {
        width: 90px;
        flex-shrink: 0;
        background: #127dec;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        i {
            font-size: 24px;
        }
    }
}

.表情 {
    background: #ffffff;
    height: 200px;
    display: flex;
    flex-direction: column;
    border:1px solid #cccccc;
    .content_1 {
        height: 100%;
        overflow: auto;
    }
    .字体表情 {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        li {
            text-align: center;
            width: calc(100% / 6);
            font-size: 30px;
        }
    }
    .表情选项 {
        flex-shrink: 0;
        border-top: 1px solid #cccccc;
        height: 40px;
        display: flex;
        li {
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #ccc;
        }
        img {
            width: 25px;
        }
    }
    .表情包2 {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        li {
            text-align: center;
            width: calc(100% / 5);
            padding: 5px;
        }
        img {
            width: 100%;
        }
    }
    .表情包3 {
        height: 100%;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        li {
            text-align: center;
            width: calc(100% / 4);
            padding: 0px 15px;
            box-sizing: border-box;
        }
        img {
            width: 100%;
        }
    }
}
</style>
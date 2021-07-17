<template>
    <div class="contactUs">
        <div class="left">
            联系我们
            <i class="el-icon-headset"></i>
        </div>
        <ul>
            <li>
                <div>
                    <i class="el-icon-headset"></i>
                    客服热线
                </div>
                <div class="text">+6388888888</div>
            </li>
            <li>
                <div>
                    <i class="el-icon-message"></i>
                    邮箱
                </div>
                <div class="text">xxxxxxx@gmail.com</div>
            </li>
            <li>
                <div>
                    <i class="el-icon-phone"></i>
                    WhatsApp
                </div>
                <div class="text">+639171485555</div>
            </li>
            <li>
                <div>
                    <i class="el-icon-chat-dot-round"></i>
                    微信
                </div>
                <div class="text">
                    <img class="erweima" src="https://file.32828a.com/images/LUCKYCF/4aef7068ee664914f53b451a516e42a3_5429190.jpg" alt="" srcset="">
                </div>
            </li>
        </ul>
    </div>

    <div class="msg">
        <i class="el-icon-chat-line-round"></i>
        <i class="el-icon-chat-dot-round"></i>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.contactUs{
    position: fixed;
    right: -200px;
    top: 200px;
    z-index: 10;
    color: var(--color);
    transition: all 0.3s;
    &:hover{
        right: 0px;
    }
    .left{
        background: #c8af96;
        padding: 10px;
        position: absolute;
        right: 141px;
        top: 59px;
        width: 160px;
        text-align: center;
        font-weight: bold;
        border-bottom: 1px solid #b9aa9a;
        transform: rotate(-90deg);
    }
    ul{
        width: 200px;
        text-align: center;
        background: #c8af96;
        font-size: 14px;
        li{
            padding: 10px 0px;
            &:hover{
                color: #fff;
                background: var(--color);
            }
        }
        li:not(:nth-child(1)){
            border-top: 1px solid var(--color);
        }
        .text{
            color: #fff;
            margin: 5px 0px 0px;
        }
        .erweima{
            width: 120px;
        }
    }
}

.msg{
    position: fixed;
    bottom: 15px;
    right: 15px;
    z-index: 10;
    width: 60px;
    height: 60px;
    background: #2a97d1;
    border-radius: 100%;
    box-shadow: 0px 0px 15px 0px #2a97d1;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover{
        box-shadow: 0px 0px 0px 0px #2a97d1;
        i:nth-child(1){
            opacity: 0;
        }
        i:nth-child(2){
            opacity: 1;
        }
    }
    i{
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        margin: auto;
        width: 30px;
        height: 30px;
        transition: all 0.3s;
        &:nth-child(2){
            opacity: 0;
        }
    }
}
</style>
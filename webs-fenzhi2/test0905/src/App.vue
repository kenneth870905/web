<template>
<div id="app">
    123
</div>
</template>

<script>
import $ from 'jquery';
import md5 from 'js-md5'
export default {
    name: 'App',
    components: {},
    mounted() {
        console.log()

        // var hash = md5.create();
        // hash.update('Message to hash');
        // hash.hex();
        var 随机数 = "dafacloud_" + Math.random()
        console.log('第一步', 随机数)

        console.log('第二步', encode(随机数)); //JUU2JTgwJUFBJUU4JUFGJTlFJUU1JTkyJTk2JUU1JTk1JUEx
        // 字符串转base64
        function encode(str) {
            // 对字符串进行编码
            var encode = encodeURI(str);
            // 对编码的字符串转化base64
            var base64 = btoa(encode);
            return base64;
        }
        // base64转字符串
        function decode(base64) {
            // 对base64转编码
            var decode = atob(base64);
            // 编码转字符串
            var str = decodeURI(decode);
            return str;
        }
        console.log('第三部', md5('q359352759' + md5('123456')))

        var a = md5(md5('q359352759' + md5('123456')) + 随机数);
        console.log('第四部', a)

        // $.ajax({
        //     type: "post",
        //     // url: "http://legou890.com/v1/users/login",
        //     url: "apis/v1/users/login",
        //     headers: {
        //         Origin: "http://legou890.com"
        //     },
        //     data: {
        //         userName: 'q359352759',
        //         password: '7dc23ee47211f7de6ccde782dffc6b8c',
        //         random: 'ZGFmYWNsb3VkXzAuNjcwMTk0NDEwNjcwMTk0Nw=='
        //     },
        //     success: function (response) {
        //         console.log(response)
        //     }
        // });

    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

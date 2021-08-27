var fs = require("fs");

console.log(123)

// 同步读取
var data = fs.readFileSync('域名.txt');
let 域名 = data.toString()
    域名 = 域名.replace(/	/g,'')
    域名 = 域名.replace(/ /g,'')
    // 域名 = 域名.replace(/\b/g,'')
    域名 = 域名.replace(/\r/g,'')
    域名 = 域名.replace(/\n/g,'|')

// console.log(域名);
let list = 域名.split('|')
let obj = {} 
    list.forEach(item=>{
        if(item){
            obj[item] = 20210209
        } 
    })

    console.log(JSON.stringify(obj))

// for (let i = 0; i < list.length; i++) {
//     if(list[i]) {
//         fs.writeFile(`json/www.${list[i]}.json`, '{"Id":20210209,"Title":"【澳发集团】威尼斯人","Home":true,"Type":1,"Logo":true,"QQ":null,"Ver":"20210209"}',  function(err) {
//             if (err) {
//                 return console.error(err);
//             }
//         });
//     }
// }



console.log("程序执行完毕。");
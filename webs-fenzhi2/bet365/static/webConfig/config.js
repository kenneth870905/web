//请求地址头部
var img_base_url="image/";
//基本配置
var title="bet3651";

var config={
        //跳转手机版
        mobile_url:'https://0698aa.com/bet365',
        // img_url:"https://tu.jienuoshangmao.com/",
        img_url:"",
        // api_url:"https://0698aa.com",
        api_url:"/api",
        iframe_url:'/api',
        //页面底部图片 共两张
        footer_1:"",
        footer_2:"",
        //在线客服跳转地址
        online_chat:"https://ssl-f588e8cb.smoothconv.com/dist/standalone.html?eid=143504",
        qq_tz:"https://wpa.qq.com/msgrd?v=3&uin=68383668&site=qq&menu=yes",
        //首页 滚动字幕
        roll_text:[  
            {
                title:"最新消息",
                text:" 好消息，好消息~2018年5月8日00:00起："+title+"【北京PK10】【重庆时时彩】双面赔率1.990调整至1.995和定位胆9.90调整至9.95 ，敬请期待， bet365【亚洲版】全体成员感谢您一直以来对本公司的大力支持！"
            }
        ],
        //备用网址页面测速网址
        cesu_list: [
            {
                url: "https://baidu.com",
                time: ""
            },
            {
                url: "https://baidu.com2",
                time: ""
            },
            {
                url: "https://baidu.com3",
                time: ""
            },
            {
                url: "https://baidu.com4",
                time: ""
            },
        ],
        //导航地址
        navigation_list:[
            {
                name:"首页",
                //跳转地址 没有就不跳写
                url:"/",
                //url类型 0表示vue内部地址  1表示 外部地址 如：http://image.baidu.com/
                url_type:0,
                //可填写本地图片和网络图片地址
                img:"",
                style:'',
                //子导航 格式和父导航保持一致
                children:[]
            },
            {
                name:"体育赛事",
                //跳转地址 没有就不跳写
                url:"/tiyusaishi",
                //url类型 0表示vue内部地址  1表示 外部地址 如：http://image.baidu.com/
                url_type:0,
                //可填写本地图片和网络图片地址
                img:"",
                style:'',
                //子导航 格式和父导航保持一致
                children:[]
            },
            {
                name:"视讯直播",
                url:"/shixunzhibo",
                url_type:0,
                img:"",
                style:'',
                children:[
                    // {
                    //     ename:"AG国际馆",
                    //     type:'AG国际馆',      
                    //     // id:"qjt",
                    //     gid:"1",
                    //     name:"AG国际馆",
                    //     url:"#/ag",
                    // },
                    // {
                    //     ename:"BG大游馆",
                    //     type:'BG大游馆',      
                    //     // id:"qjt",
                    //     gid:"2",
                    //     name:"BG大游馆",
                    //     url:"#/bg",
                    // },
                    // {
                    //     ename:"DS太阳城",
                    //     type:'DS太阳城',      
                    //     // id:"qjt",
                    //     gid:"3",
                    //     name:"DS太阳城",
                    //     url:"#/ds",
                    // },
                    // {
                    //     ename:"EB易博馆",
                    //     type:'EB易博馆',      
                    //     // id:"qjt",
                    //     gid:"4",
                    //     name:"EB易博馆",
                    //     url:"#/eb",
                    // },
                    // {
                    //     ename:"OG东方馆",
                    //     type:'OG东方馆',      
                    //     // id:"qjt",
                    //     gid:"5",
                    //     name:"OG东方馆",
                    //     url:"#/og",
                    // },
                    // {
                    //     ename:"AB亚洲馆",
                    //     type:'AB亚洲馆',      
                    //     // id:"qjt",
                    //     gid:"6",
                    //     name:"AB亚洲馆",
                    //     url:"#/ab",
                    // },
                    // {
                    //     ename:"IM申博馆",
                    //     type:'IM申博馆',      
                    //     // id:"qjt",
                    //     gid:"7",
                    //     name:"IM申博馆",
                    //     url:"#/im",
                    // },
                    // {
                    //     ename:"WM完美馆",
                    //     type:'WM完美馆',      
                    //     // id:"qjt",
                    //     gid:"8",
                    //     name:"WM完美馆",
                    //     url:"#/wm",
                    // },
                    // {
                    //     ename:"BBIN馆",
                    //     type:'BBIN馆',      
                    //     // id:"qjt",
                    //     gid:"9",
                    //     name:"BBIN馆",
                    //     url:"#/bbin",
                    // },
                ]
            },
            {
                name:"电子游艺",
                url:"/dianziyouyi",
                url_type:0,
                img:"",
                children:[
                    // {
                    //     ename:"FG电子",
                    //     type:'FG电子',      
                    //     // id:"qjt",
                    //     gid:"1",
                    //     name:"FG电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"CQ9电子",
                    //     type:'CQ9电子',      
                    //     // id:"qjt",
                    //     gid:"2",
                    //     name:"CQ9电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"MG电子",
                    //     type:'MG电子',      
                    //     // id:"qjt",
                    //     gid:"3",
                    //     name:"MG电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"新MG电子",
                    //     type:'新MG电子',      
                    //     // id:"qjt",
                    //     gid:"4",
                    //     name:"新MG电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"PT电子",
                    //     type:'PT电子',      
                    //     // id:"qjt",
                    //     gid:"5",
                    //     name:"PT电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"YG电子",
                    //     type:'YG电子',      
                    //     // id:"qjt",
                    //     gid:"6",
                    //     name:"YG电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"HB电子",
                    //     type:'HB电子',      
                    //     // id:"qjt",
                    //     gid:"7",
                    //     name:"HB电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"SW电子",
                    //     type:'SW电子',      
                    //     // id:"qjt",
                    //     gid:"8",
                    //     name:"SW电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"MW电子",
                    //     type:'MW电子',      
                    //     // id:"qjt",
                    //     gid:"9",
                    //     name:"MW电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"DT电子",
                    //     type:'DT电子',      
                    //     // id:"qjt",
                    //     gid:"10",
                    //     name:"DT电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"BBIN电子",
                    //     type:'BBIN电子',      
                    //     // id:"qjt",
                    //     gid:"11",
                    //     name:"BBIN电子",
                    //     url:"",
                    // },
                    // {
                    //     ename:"AG捕鱼王",
                    //     type:'AG捕鱼王',      
                    //     // id:"qjt",
                    //     gid:"12",
                    //     name:"AG捕鱼王",
                    //     url:"",
                    // },
                    // {
                    //     ename:"对战游戏",
                    //     type:'对战游戏',      
                    //     // id:"qjt",
                    //     gid:"13",
                    //     name:"对战游戏",
                    //     url:"",
                    // },
                ]
            },
            {
                name:"彩票游戏",
                url:"/caipiaoyouxi",
                url_type:0,
                img:"",
                style:''
            },
            {
                name:"优惠活动",
                url:"/youhuihuodong",
                url_type:0,
                img:"",
                style:''
            },
            {
                name:"备用网址",
                url:"/beiyongwangzhi",
                url_type:0,
                img:"",
                style:''
            },
            {
                name:"立即开户",
                url:"/lijikaihu",
                url_type:0,
                img:"",
                style:''
            },
            {
                name:"在线客服",
                url:"https://ssl-f588e8cb.smoothconv.com/dist/standalone.html?eid=143504",
                url_type:0,
                style:'1'
            }
        ],
   //底部导航
   navfotter_list: [
       {
           name:"关于我们",
           url:"/guanyuwomen"
       },
       {
        name:"联系我们",
        url:"/lianxiwomen"
       },
       {
        name:"博彩责任",
        url:"/bocaizenren"
       },
       {
        name:"我方简介",
        url:"/jianjie"
       },
       {
        name:"Cookies政策",
        url:"/zhengce"
       },
       {
        name:"存取款帮助",
        url:"/bangzhu"
       },
       {
        name:"常见问题",
        url:"/changjianwenti"
       },
       {
        name:"代理加盟 ",
        url:"/daili"
       },
   ],
   //备用网址 立即开户 左侧导航
    left_list: [
    {
        name:"忘记密码",
        url:"https://ssl-f588e8cb.smoothconv.com/dist/standalone.html?eid=143504"
    },
    {
        name:"免费注册",
        url:"/lijikaihu"
    },
    {
        name:"体育投注",
        url:"/tiyusaishi"
    },
    {
        name:"真人娱乐",
        url:"/shixunzhibo"
    },
    {
        name:"电子游艺",
        url:"/dianziyouyi"
    },
    {
        name:"彩票游戏",
        url:"/caipiaoyouxi"
    },
    {
        name:"备用网址",
        url:"/beiyongwangzhi"
    },
    {
        name:"优惠活动",
        url:"/youhuihuodong"
    },
 ],
}
        
// 通用 common
//首页 图片等配置
var homeConfig={
    //首页横幅
  
    // 滚动字幕
    roll_text:[
        {
            title:"威尼斯人娱乐城",
            text:"✿尊敬的威尼斯人娱乐城会员您好，感谢您的到来！我们拥有真人百家乐骰宝龙虎、电子游戏、老虎机、水果机、捕鱼、彩票等等游戏品类，满足您的所有需求。活动多多彩种多多，请尽情享受吧。"
        },
    ],

    Game_Menual:[
        {
            name:"忘记密码",
            type:'',      
            gid:"1",
            url:"",
        },
        {
            name:"免费注册",
            type:'',      
            gid:"2",
            url:"",
        },
        {
            name:"体育投注",
            type:'',      
            gid:"4",
            url:"",
        },
        {
            name:"真人娱乐",
            type:'',      
            gid:"5",
            url:"",
        },
        {
            name:"电子游艺",
            type:'',      
            gid:"6",
            url:"",
        },
        {
            name:"彩票游戏",
            type:'',      
            gid:"7",
            url:"",
        },
        {
            name:"备用网址",
            type:'',      
            gid:"8",
            url:"",
        },
        {
            name:"优惠活动",
            type:'',      
            gid:"9",
            url:"",
        },
    ],
    //游戏列表
    game_list:[
        {
            title: "真人视讯",
            url: img_base_url + "home/game_list_1.jpg",
            //这个 roter 不能随意修改
            roter: "/immortal",
            rule:"",    //游戏规则
            url_type:0, //内部地址
        },
        {
            title: "电子游艺",
            url: img_base_url + "home/game_list_2.jpg",
            // url: "slot-lobby-btn.jpg",
            roter: "/electron",
            rule:"",
            url_type:0,
        },
        {
            title: "双面盘彩票",
            // url: "lottery-lobby-btn.jpg",
            url: img_base_url + "home/game_list_3.jpg",
            roter: "/lottery",
            rule:"/1321",
            url_type:0,
        },
        {
            title: "捕鱼游戏",
            url: img_base_url + "home/game_list_4.jpg",
            // url: "fish-lobby-btn.jpg",
            roter: "/fish",
            rule:"",
            url_type:0,
        },
        {
            title: "棋牌游戏",
            url: img_base_url + "home/game_list_5.jpg",
            // url: "card-lobby-btn.jpg",
            roter: "/chess",
            rule:"",
            url_type:0,
        }
    ],

}

//游戏规则页面 
var LotteryRulesConfig={
        banner:img_base_url+"lottery-banner.jpg"
    }

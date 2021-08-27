
//基本配置
var title = "澳发彩票";

var config = {
    title: title,
    coupletUrlLeft: "#/fish",    //左边图片链接
    coupletUrlRight: "#/chess",  //右边边图片链接

    coupletRightTopText: "在线客服",    //couplet右边上面文字1
    coupletRightBottomText: "QQ客服",   //couplet右边文字2

    zaixianUrl: "https://now.mugrate.com/chat/chatClient/chatbox.jsp?companyID=925885&configID=68467&jid=8583169072&s=1",//在线客服地址
    QQ: "2244663726",    //QQ
    QQ2: "2220063726",    //QQ
    service_email: '客服邮箱',      //客服邮箱
    toushu_email: '投诉邮箱',       //投诉邮箱
    // kefu_phone:"09667781888",   //电话客服
    coupletImgLeft: "webConfig/image/buyu.png",//左边图片
    coupletImgRight: "webConfig/image/niuniu.png",//右边边图片
    coupletCodeImgLeft: "webConfig/image/app.png?v=1",//左边图片二维码 同首页二维码 页脚二维码  同手机购彩页面二维码
    coupletCodeImgRight: "webConfig/image/app.png?v=1",//右边边图片二维码 同首页二维码 页脚二维码 同手机购彩页面二维码

    titleImg: "webConfig/image/logo.png", //logo图片

    couplet: true, // 对联图片的显示和隐藏！

    // api_url:"",
    api_url: "/apis",

    iframe_url: "", //vuex使用
    
    time: 0,

    ck: 10,

    wx_kefu: true,   //是否显示微信客服

    telegram: {
        number: '@boleee',
        a: 'https://t.me/boleee',   //添加好友链接
        //不区分大小写  菲律宾        缅甸     泰国       澳大利亚    柬埔寨        美国
        whiteList: ['PHILIPPINES', 'Myanmar', 'Thailand', 'AUSTRALIA', 'CAMBODIA', 'UNITED STATES']
    },
    //导航地址
    nav_btn:false ,
    navigation_list: [
        {
            name: "首页",
            url: "/",
            childrenIn: [],
            图标: "",
            rm: "",
        },
        {
            name: "购彩",
            classlotty: "lottry_a",
            url: "/cp",
            图标: "iconfont icon-xiangxia",
            rm: "",
            childrenIn: [
                {
                    minName: "官方玩法",
                    minImg: 'image/Sonnav/官方玩法.png',
                    url: "/Lottery/Home/Index/1",
                    url_type:1
                },
                {
                    minName: "信用玩法",
                    minImg: 'image/Sonnav/信用玩法.png',
                    url: "/Lottery/Home/Index/2",
                    url_type:1
                },
                {
                    minName: "开奖记录",
                    minImg: 'image/Sonnav/开奖记录.png',
                    url: "/notice"
                },
                {
                    minName: "香港六合彩",
                    minImg: 'image/Sonnav/70001.png',
                    url: "/Lottery/Bet/Index/1/70001",
                    url_type:1
                },
                {
                    // tk:true,        //是否弹框 默认为false
                    minName: "VR彩票",
                    minImg: 'image/Sonnav/vr.png',
                    // url: "/Lottery/Bet/Index/1/70001",
                    gid:"16",
                    type:'VR',
                    url_type:0,
                    url:"/cp"
                },
            ],
        },
        {
            name: "真人",
            icon: [],
            url: "/immortal",
            rm: "",
            图标: "iconfont icon-xiangxia",
            childrenIn: [
                {
                    minName: "AG旗舰厅",
                    minImg: 'image/Sonnav/真人1.png',
                    url:"/immortal?t=1",
                },
                {
                    minName: "AG国际厅",
                    minImg: 'image/Sonnav/真人2.png',
                    url: "/immortal?t=1"
                },
                {
                    minName: "BBIN娱乐厅",
                    minImg: 'image/Sonnav/真人3.png',
                    url: "/immortal?t=2"
                },
                {
                    minName: "BG视讯大厅",
                    minImg: 'image/Sonnav/真人4.png',
                    url: "/immortal?t=3"
                },
                {
                    minName: "OG视讯大厅",
                    minImg: 'image/Sonnav/og.png',
                    url: "/immortal?t=4"
                },
                
                // {
                //     minName:"申博视讯大厅",
                //     minImg:"image/Sonnav/shenbo.png",
                //     url:"/immortal?t=5"
                // },
                {
                    minName:"欧博聚龙厅",
                    minImg:"image/Sonnav/oubo.png",
                    url:"/immortal?t=5"
                },
                {
                    minName:"博击视讯大厅",
                    minImg:"image/Sonnav/boji.png",
                    url:"/immortal?t=6"
                }
            ],
        },
        {
            name: "电子",
            icon: [],
            url: "/electron",
            rm: "",
            图标: "iconfont icon-xiangxia",
            childrenIn: [
                {
                    minName: "AG电子",
                    minImg: 'image/Sonnav/电子1.png',
                    // minImg:"image/daohang/dz-ag.png",
                    url: "/electron?t=0"
                },
                {
                    minName: "AG街机",
                    minImg: 'image/Sonnav/电子2.png',
                    url: "/electron?t=1"
                },
                {
                    minName: "MG电子",
                    minImg: 'image/Sonnav/电子3.png',
                    url: "/electron?t=2"
                },
                {
                    minName: "BBIN电子",
                    minImg: 'image/Sonnav/电子4.png',
                    url: "/electron?t=3"
                },
                {
                    minName:"BG电子",
                    minImg:"image/Sonnav/电子7.png",
                    url:"/electron?t=4"
                },{
                    minName:"泛亚电竞",
                    minImg:"image/Sonnav/电子6.png",
                    url:"/electron?t=5"
                },{
                    minName:"哈巴电游",
                    minImg:"image/Sonnav/电子8.png",
                    url:"/electron?t=6"
                },
                {
                    minName:"乐游电子",
                    minImg:"image/Sonnav/dianzi9.png",
                    url:"/electron?t=7"
                },{
                    minName:"CQ9电竞",
                    minImg:"image/Sonnav/dianzi10.png",
                    url:"/electron?t=8"
                },{
                    minName:"SW电游",
                    minImg:"image/Sonnav/dianzi11.png",
                    url:"/electron?t=9"
                },
                {
                    minName:"DT电子",
                    minImg:"image/Sonnav/dianzi12.png",
                    url:"/electron?t=10"
                },
                // {
                //     minName:"申博电游",
                //     minImg:"image/Sonnav/dianzi13.png",
                //     url:"/electron?t=12"
                // },
                {
                    minName:"欧博电游",
                    minImg:"image/Sonnav/dianzi14.png",
                    url:"/electron?t=11"
                }
            ],
        },
        {
            name: "捕鱼",
            icon: [],
            url: "/fish",
            rm: "",
            // 图标: "iconfont icon-xiangxia",
            图标: "",
            childrenIn:[]
            // childrenIn: [
            //     {
            //         minName: "AG捕鱼王二代",
            //         minImg: 'image/Sonnav/捕鱼1.png',
            //         url: "/fish?t=1"
            //     },
            //     {
            //         minName: "BG捕鱼大师",
            //         minImg: 'image/Sonnav/捕鱼5.png',
            //         url: "/fish?t=2"
            //     },
            //     {
            //         minName: "BG西游捕鱼",
            //         minImg: 'image/Sonnav/捕鱼4.png',
            //         url: "/fish?t=3"
            //     },
            //     {
            //         minName: "波音捕鱼达人",
            //         minImg: 'image/Sonnav/捕鱼3.png',
            //         url: "/fish?t=4"
            //     },
            //     {
            //         minName: "波音捕鱼大师",
            //         minImg: 'image/Sonnav/捕鱼2.png',
            //         url: "/fish?t=5"
            //     },
            //     {
            //         minName:"LY捕鱼大作战",
            //         url:"/fish?t=6",
            //         minImg:"image/Sonnav/捕鱼8.png"
            //     },{
            //         minName:"CQ9一炮捕鱼",
            //         url:"/fish?t=7",
            //         minImg:"image/Sonnav/捕鱼9.png",
            //     },{
            //         minName:"sw捕鱼多福",
            //         url:"/fish?t=8",
            //         minImg:"image/Sonnav/捕鱼7.png"
            //     },

            //     // {
            //     //     minName:"Ky红包捕鱼",
            //     //     url:"/fish?t=9",
            //     //     minImg:"image/Sonnav/510.png"
            //     // },{
            //     //     minName:"QL添加李逵捕鱼",
            //     //     url:"/fish?t=10",
            //     //     minImg:"image/Sonnav/51.png"
            //     // },{
            //     //     minName:"CQ9皇金渔场",
            //     //     url:"/fish?t=11",
            //     //     minImg:"image/Sonnav/AB3.png"
            //     // },{
            //     //     minName:"761金蟾捕鱼",
            //     //     url:"/fish?t=12",
            //     //     minImg:"image/Sonnav/52.png"
            //     // },{
            //     //     minName:"761大圣闹海",
            //     //     url:"/fish?t=13",
            //     //     minImg:"image/Sonnav/53.png"
            //     // },{
            //     //     minName:"761海王捕鱼",
            //     //     url:"/fish?t=14",
            //     //     minImg:"image/Sonnav/54.png"
            //     // },




            // ],
        },
        {
            name: "体育",
            icon: [],
            url: "/sports",
            rm: "",
            图标: "",
            childrenIn:[]
            // childrenIn: [
            //     {
            //         minName: "波音体育",
            //         minImg: 'image/Sonnav/体育1.png',
            //         url: "/sports?t=1"
            //     },
            //     {
            //         minName: "AG体育",
            //         minImg: 'image/Sonnav/体育2.png',
            //         url: "/sports?t=2"
            //     },
            //     {
            //         minName: '三昇体育',
            //         minImg: 'image/Sonnav/体育3.png',
            //         url: "/sports?t=3"
            //     },
            //     {
            //         minName: '泛亚体育',
            //         minImg: 'image/Sonnav/体育4.png',
            //         url: "/sports?t=4"
            //     },
            //     {
            //         minName: '皇冠体育',
            //         minImg: 'image/Sonnav/体育5.png',
            //         url: "/sports?t=5"
            //     }
            // ],
        },
        {
            name: "棋牌",
            icon: [],
            url: "/chess",
            图标: "iconfont icon-xiangxia",
            rm: "",
            childrenIn: [
                {
                    minName: '欢乐棋牌',
                    minImg: 'image/Sonnav/huanle_qipai.png',
                    url: "/chess?t=1"
                },
                {
                    minName: "开元棋牌",
                    minImg: 'image/Sonnav/棋牌1.png',
                    url: "/chess?t=2"
                },
                {
                    minName: "GM棋牌",
                    minImg: 'image/Sonnav/棋牌2.png',
                    url: "/chess?t=3"
                },
                {
                    minName: '爱棋牌',
                    minImg: 'image/Sonnav/棋牌3.png',
                    url: "/chess?t=4"
                },
                {
                    minName:"乐游棋牌",
                    minImg:"image/Sonnav/leyouqipai.png",
                    url:"/chess?t=5"
                },{
                    minName:"DT棋牌",
                    minImg:"image/Sonnav/dt.png",
                    url:"/chess?t=6"
                }
                
            ],
        },
        {
            name: "聊天室",
            url: "/index/chat/index.html",
            childrenIn: [],
            图标: "",
            rm: "",
            url_type: '1',   //1表示外部链接
        },
        {
            name: "优惠",
            icon: [],
            图标: "",
            rm: "",
            url: "/discounts",
            childrenIn: [],
        },
        {
            name: "APP",
            url: "/phone",
            rm: "iconfont icon-hot-",
            图标: "iconfont icon-shouji",
            childrenIn: [],
        },
        // {
        //     name:"开奖",
        //     icon:[],
        //     url:"/notice",
        //     childrenIn:[],
        //     图标:"",
        //     rm:"", 
        // },


    ],
}







// var title="威尼斯人"
var config = {
        // weihu:false,//控制维护页面的显示与隐藏
        // 图片前缀
        img_url: "",
        // 接口前缀 
        api_url: "/apis",
        // app 下载地址
        app_download: "https://luofandiya.com/down.php?id=1001",
        // 聊天室接口地址
        // wchat_url: 'https://0698aa.com',
        wchat_url:'http://10.10.27.30:100',
        // wchat_url:'http://10.10.27.122:82',
        // wchat_url:'http://10.10.27.31:82',
        // iframe 和 a 标签跳转前缀
        // iframe_url: "http://10.10.27.30:100",
        // iframe_url: "http://10.10.27.31:82",
        iframe_url: "http://0698aa.com",

        // iframe_url:"/apis",
        img_upload:'https://msg.xxqsw.com',
        //国际电话
        // internation_phone:"+639770796888",
        //监督电话
        // supervision_phone:"+639770797888",
        title: "威尼斯人",
        // logo:"webConfig/image/logo.png",
        //首页滚动字幕
        roll_titles: "✿尊敬的会员您好，感谢您的到来！我们拥有真人百家乐骰宝龙虎、电子游戏、老虎机、水果机、捕鱼、彩票等等游戏品类，满足您的所有需求。活动多多彩种多多，请尽情享受吧。",
    
        //在线客服跳转地址
        online_chat: "https://e-143504.chatnow.meiqia.com/dist/standalone.html",
        qq: "68383668",
        // 邮箱
        mail: "yunlaiservice@gmail.com",
        //显示微信客服二维码充值次数 0 表示一直显示
        ck: 0,
        tk:6,   //提款次数
    
        //绑定 支付银行卡 所有银行
        bank: ['农业银行', '中国银行', '招商银行', '建设银行', '交通银行', '渤海银行', '广大银行', '兴业银行', '民生银行', '中信银行', '广发银行', '华夏银行'],
        // mobile_url:"https://0698aa.com/m/other/index",
        telegram: {
            number: '1111',
            a: 'https://t.me/boleee',   //添加好友链接
            //不区分大小写  菲律宾        缅甸     泰国       澳大利亚    柬埔寨        美国
            whiteList: ['PHILIPPINES', 'Myanmar', 'Thailand', 'AUSTRALIA', 'CAMBODIA', 'UNITED STATES']
        },
        welcome_chat: '尊敬的用户：欢迎来到这里开启您的幸运之旅，请遵守聊天室相关规定，禁止任何形式的广告以及发送相关联系方式，管理员有权撤回不当言论或消息，并禁言停用用户账号，如果遇到充值或提现问题，请联系所在平台的客服，谢谢！',
        //个人中心隐藏页面
        my: {
            yuEbao:true,       //余额宝
            geRenBaoBiao: true,  //个人报表
            heMai:true,  //合买
            chatBoxes: true,    //聊天室
        },
        //天天礼包
        libao: [
            { name: "每日签到", path: '/ifr/qd', NoShiWan:true ,img: 'static/image/3.png' },
            { name: "每日首存", path: '/ifr/ShouChong', NoShiWan:true , img: 'static/image/1.png' },
            { name: "代理中心", path: '/agent', img: 'static/image/5.png' },
            {name:"余额宝",path:'/yeb/yeb',img:'static/image/2.png'},
            // { name: "余额宝", path: '', img: 'static/image/2.png' }, //没地址的不跳转
            // { name: "特邀嘉宾", path: '/ifr/vipbet', img: '', icon: 'icon iconfont icon-hezuo', bg: 'linear-gradient(30deg, rgb(233, 30, 99), rgb(255, 185, 209))' }
            { name: "特邀嘉宾", path: '/vipbet', img: '', icon: 'icon iconfont icon-hezuo', bg: 'linear-gradient(30deg, rgb(233, 30, 99), rgb(255, 185, 209))' }
        ],
        
        //隐藏注册推荐人Id
        ruidHidden:true,
        //首页彩票资料
        news:{
            index:3,    //从第几个开始排
            list:[
                {
                    name:"马会资料",
                    img:'webConfig/image/lhzl4.png',
                    path:'/lhzl/4'  //固定格式 六合资料
                },
                {
                    name:"高手专区",
                    img:'webConfig/image/lhzl2.png',
                    path:'/lhzl/2'
                },
                {
                    name:"精选彩图",
                    img:'webConfig/image/lhzl3.png',
                    path:'/lhzl/3'
                },
                {
                    name:"公式专区",
                    img:'webConfig/image/lhzl1.png',
                    path:"/lhzl/1"
                }
            ]
        }
        
    }
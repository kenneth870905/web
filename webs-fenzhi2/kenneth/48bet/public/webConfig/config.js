/* eslint-disable camelcase */
/* eslint-disable key-spacing */
/* eslint-disable indent */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable space-infix-ops */
//请求地址头部
var img_base_url="image/";

// 10.10.27.200
//基本配置
var title="48BET2";

var config={
        //控制维护页面的显示与隐藏
        // weihu:false,
        img_url:"",
        // api_url:"https://0698aa.com",
        api_url:"/apis",
        //每隔多少毫秒用户没点击就弹出弹框刷新页面 10代表10秒
        time:"1000",
        // iframe 和 a 标签跳转前缀  如果是本站请使用 "https://0698aa.com"
        iframe_url:"/apis",
        //国际电话
        internation_phone:"+639770796888",
        //监督电话
        supervision_phone:"+639770797888",
        title: title ,
        logo:"webConfig/image/logo.png",
        logoType:1,         //0 文件夹图片 1 威尼斯动图
        //是否显示底部  0 表示隐藏 1 表示显示
        footer_show:1,
        //在线客服跳转地址
        online_chat:"https://e-143504.chatnow.meiqia.com/dist/standalone.html",
        qq:"未获取配置qq",
        mobile_url:"https://0698aa.com/bet365m/#/",
        // app 二维码地址 
        // erweima:"https://0698aa.com/App_upload/appBet.png",
        //滚动字幕
        roll_text:"尊敬的48bet金宝博会员您好：由于公司系统全面升级更新，现188金宝博从2018年8月1日起升级为48bet。特此申明：会员资金和投注不受影响。感谢您对48bet金宝博一如既往的支持，48bet将持续为您提供最佳信誉和服务。如有疑问，请您咨询24小时在线客服,谢谢!~&nbsp;&nbsp;&nbsp;&nbsp;重要通知：公司入款银行账号不定期更换，请务必不要保存公司入款账号，以免转入到永久停用账号，财务不予受理。感谢支持！",
        //显示二维码充值次数
        ck:0,
        
        telegram:{
            number:'1111',
            a:'aaa',   //添加好友链接
            //不区分大小写  菲律宾        缅甸     泰国       澳大利亚    柬埔寨        美国
            whiteList:['PHILIPPINES','Myanmar','Thailand','AUSTRALIA','CAMBODIA','UNITED STATES']
        },

        //备用网址页面测速网址
        cesu_list: [
            { url: "https://48bet00.com" },
            { url: "https://48bet11.com" },
            { url: "https://48bet22.com" },
            { url: "https://48bet33.com" },
            { url:'https://48bet44.com'},
            { url:'https://48bet55.com'},
            { url:'https://48bet66.com'},
            { url:'https://48bet77.com'},
            { url:'https://48bet88.com'},
            { url:'https://48bet99.com'}
        ],
        // 左右侧栏
        celan:{
            left:[
                {img:'static/image/left_1.gif',url:"https://e-143504.chatnow.meiqia.com/dist/standalone.html"},
                {img:'static/image/left_2.gif',path:"/sports"},
                {img:'static/image/left_3.gif',path:"/iframe/deposit"}, //存款
            ],
            right:[
                {img:'static/image/right_1.gif',url:"https://e-143504.chatnow.meiqia.com/dist/standalone.html"},   
                {img:'static/image/right_2.gif',path:"/phone"},
                {img:'static/image/right_3.gif',path:""},
                {img:'static/image/right_4.gif',url:"https://e-143504.chatnow.meiqia.com/dist/standalone.html"},
            ]
        },
        //导航地址
        navigation_list:[
            {
                name:"首页",
                // 主要用于纯图标
                icon:"",
                //跳转地址 没有就不写
                url:"/",
                //url类型 0表示vue内部地址  1表示 外部地址 如：http://image.baidu.com/
                url_type:0,
                //可填写本地图片和网络图片地址
                img:"",
                //是否热门
                hot:false,
                //前端导航样式  主要用于 子导航
                style:0,
                //子导航 格式和父导航保持一致
                children:[]
            },
            {
                name:"体育博彩",
                url:"/sports",
                url_type:0,
                img:"",
                hot:false,
                style:1,  // son_end
                children:[
                ]
            },
            {
                name:"真人荷官",
                url:"/visual",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[
                    {
                        cname:"AG",
                        type:'AG',      //查询 余额名称
                        // id:"qjt",
                        gid:"1",
                        name:"AG旗舰厅",
                        url:"",
                        url_type:0,
                        // img:"image/daohang/qj.png",
                        hot:false,
                        style:0,
                    },
                    {                        
                        cname:"AG",
                        type:'AG',
                        // id:"gjt",
                        gid:"2",
                        name:"AG国际厅",
                        url:"",
                        url_type:0,
                        // img:"image/daohang/gj.png",
                        hot:false,
                        style:0,
                    },
                    {
                        type:'BY',
                        // id:"dt",
                        gid:"live",
                        name:"BBIN娱乐厅",
                        cname:"BBIN",
                        url:"",
                        url_type:0,
                        // img:"image/daohang/yul.png",
                        hot:false,
                        style:0,
                    },
                    {
                        type:'BG',
                        // id:"",
                        gid:"1",
                        name:"BG视讯大厅",
                        cname:"BG",
                        url:"",
                        url_type:0,
                        img:"image/daohang/bg-sxdt.png",
                        hot:false,
                        style:0,
                    }
                ]
            },
            {
                name:"娱乐场",
                url:"/game",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[
                    {
                        cname:"AG",
                        type:'AG',
                        name:"AG电子游艺",
                        id:"dz",
                        gid:"8",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BBIN",
                        type:"BY",
                        gid:"YP800",
                        name:"BBIN电子游艺",
                        id:"dz",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"AG",
                        type:"AG",
                        name:"YP水果机",
                        id:"yp",
                        gid:"YP800",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"MG电子",
                        type:"MG",
                        name:"MG冰球突破",
                        id:"1229",
                        gid:"1229",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    {
                        cname:"BG电子",
                        type:"BG",
                        name:"BG国王的财富",
                        id:"39",
                        gid:"39",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                    // =====================
                    {
                        type:"FY",
                        name:"泛亚游戏大厅",
                        gid:"-",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"FG",
                        name:"FG电子",
                        gid:"NETENT_CAS reelrush_not_mobile_sw",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"HB",
                        name:"哈巴电游",
                        gid:"SGFaCaiShen",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"LY",
                        name:"乐游电子",
                        gid:"8180",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"CQ",
                        name:"CQ9电子",
                        gid:"138",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },{
                        type:"sw",
                        name:"SW电子",
                        gid:"sw_kxcs",
                        url:"",
                        url_type:0,
                        img:"",
                        hot:false,
                        style:1,  // class='min_li'
                    },
                ]
            },
            {
                name:"快乐彩",
                url:"/lottery",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[
                   
                ]
            },
            {
                name:"优惠活动",
                url:"/activity",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[]
            },
            {
                name:"备用网址",
                url:"/bywz",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[]
            },
            {
                name:"加入我们",
                url:"/register",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[]
            },{
                name:"手机下注",
                url:"/phone",
                url_type:0,
                img:"",
                hot:false,
                style:0,
                children:[]
            }
        ],
}


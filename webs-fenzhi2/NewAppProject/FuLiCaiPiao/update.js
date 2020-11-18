var LineSwitch=true    //路线切换

var Line = [{
		title: '默认线路',
		url: 'https://www.4dfg56hgsw54ffhfghdfas.com',
		config: 'https://www.4dfg56hgsw54ffhfghdfas.com/M1/webConfig/config.js'
	},
	{
		title: '国内线路',
		url: 'https://www.681153.com',
		config: 'https://www.681153.com/M1/webConfig/config.js'
	},
	{
		title: '备用线路',
		url: 'https://www.flcp6606.com',
		config: 'https://www.flcp6606.com/M1/webConfig/config.js'
	},
	{
		title: '国际线路',
		url: 'https://www.flcp8808.com',
		config: 'https://www.flcp8808.com/M1/webConfig/config.js'
	}
	// {
	// 	title: '0698aa',
	// 	url: 'https://www.0698aa.com',
	// 	config: 'https://www.0698aa.com/M1/webConfig/config.js'
	// }
];
// plus.navigator.closeSplashscreen();
document.addEventListener('plusready', function() {
	plus.navigator.closeSplashscreen();
	var wgtVer;

	var checkBaseUrl = "http://222.186.43.23:8081/flcpupdate"
	// 检测更新  
	var checkUrl = checkBaseUrl + "/version.txt";
	// 下载wgt文件
	var wgtUrl = checkBaseUrl + "/update.wgt";

	function checkUpdate() {
		// plus.nativeUI.showWaiting("检测更新...");
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			console.log('检测更新:'+JSON.stringify(xhr))
			switch (xhr.readyState) {
				case 4:
					plus.nativeUI.closeWaiting();

					if (xhr.status == 200) {
						console.log("检测更新成功：" + xhr.responseText);
						var responseText = xhr.responseText;
						var newVer;
						var downloadApp = false;

						var verData = JSON.parse(responseText);
						newVer = verData.version;
						downloadApp = verData.downloadApp;

						if (wgtVer && newVer && (wgtVer != newVer)) {
							if (downloadApp) {
								plus.nativeUI.alert("App已更新，请重新下载");
							} else {
								downWgt(); // 下载升级包
							}
						} else {
							console.log('无新版本可更新！')
						}

					} else {
						console.log("检测更新失败！");
						plus.nativeUI.alert("检查更新失败，请重新下载");
					}
					break;
				default:
					break;
			}
		}
		xhr.open('GET', checkUrl);

		// xhr.setRequestHeader("If-Modified-Since", "0");
		xhr.setRequestHeader("Cache-Control", "no-cache");

		xhr.send();
	}

	function downWgt() {
		plus.nativeUI.showWaiting("正在更新...");
		
		try {
			debugger
			var down = plus.downloader.createDownload(wgtUrl, {
				filename: "_doc/update/"
			}, function(d, status) {
				debugger
				if (status == 200) {
					console.log("下载wgt成功：" + d.filename);
					installWgt(d.filename); // 安装wgt包  
				} else {
					console.log("下载wgt失败！");
					plus.nativeUI.alert("下载更新失败，请重新下载");
				}
				plus.nativeUI.closeWaiting();
			});
		
			let progressVal = 0; //写成局部变量试试
			down.addEventListener('statechanged', (task) => {
				if (!down) {
					return;
				}
		
				switch (task.state) {
					case 1:
						console.log('开始下载');
						break;
					case 2:
						console.log('链接到服务器...');
						break;
					case 3:
						progressVal = Math.ceil(task.downloadedSize / task.totalSize * 100);
		
						console.log(progressVal)
						// plus.nativeUI.closeWaiting();
						plus.nativeUI.toast(
								"更新进度:" + progressVal + "%",
								{
									type:'text',
									duration:60,
									richTextStyle:{align:'center'}
								}
							);
						break;
		
					case 4:
						cnosole.log('监听下载完成');
						break;
				}
			});
		
			down.start();
		} catch (e) {
			debugger
			console.log(e);
		}
	}

	// 更新应用资源  
	function installWgt(path) {
		plus.nativeUI.showWaiting("正在安装更新...");
		plus.runtime.install(path, {}, function() {
			plus.nativeUI.closeWaiting();
			console.log("安装wgt文件成功！");
			plus.nativeUI.alert("应用资源更新完成！", function() {
				plus.runtime.restart();
			});
		}, function(e) {
			plus.nativeUI.closeWaiting();
			console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
			plus.nativeUI.alert("安装更新失败，请重新下载");
		});
	}

	// 获取本地应用资源版本号  
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		wgtVer = inf.version;

		if (plus.runtime.appid !== 'HBuilder') {
			checkUpdate();
		}

		console.log("当前应用版本：" + wgtVer);
	});

}, false);



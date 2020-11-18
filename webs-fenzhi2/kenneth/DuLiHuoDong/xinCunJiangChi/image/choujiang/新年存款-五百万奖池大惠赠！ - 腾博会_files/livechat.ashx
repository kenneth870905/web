window["comm100main"] = (function (bundleJsName) {
	window["Comm100API"] = window["Comm100API"] || {};
	var api = window["Comm100API"];
	api.call = function (name) {
		return (new Function('return ' + name)).call();
	};
	api.chat_buttons = api.chat_buttons || [];
	return function (main, standby, vue) {
		api.main = main;
        api.standby = standby;
        api.vue = vue;
		var src = vue + '/js/' + bundleJsName;

		var iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.id = "comm100-iframe";
		document.body.appendChild(iframe);
		var innerDoc = iframe.contentDocument;
		innerDoc.open();
		innerDoc.write('<!doctype html><head><script src="' + src + '" async type="text/javascript" charset="utf-8"></script></head><body></body>');
		innerDoc.close();
	};
}('bundle.099e61e16efedea507ca37360f78f15f.js'));
window.comm100main('https://appchatserver.comm100.chat', 'https://appmax1service.comm100.com/chatserver', 'https://vue.comm100.com');
delete window.comm100main;
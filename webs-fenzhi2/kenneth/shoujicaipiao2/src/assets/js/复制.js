
import { Toast, Dialog } from 'vant';
export default (this_1, text) => {
    if (navigator.userAgent.indexOf("Html5Plus") < 0) {
        this_1.$copyText(text).then((e) => {
            Toast('复制成功')
            
        }, (e) => {
            Dialog.alert({
                title: '复制失败，请手动复制以下内容',
                message:`<input class="可复制" type="text" value="${text}" readonly />`
            }).then(() => { });
        })
    } else {
        // console.log('app复制')
        try {
            let name = plus.os.name
            if (name == 'iOS') {
                var UIPasteboard = plus.ios.importClass("UIPasteboard");
                var generalPasteboard = UIPasteboard.generalPasteboard();
                // 设置/获取文本内容:  
                generalPasteboard.setValueforPasteboardType(text, "public.utf8-plain-text");
                // var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");  
            } else {
                var Context = plus.android.importClass("android.content.Context");
                var main = plus.android.runtimeMainActivity();
                var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
                plus.android.invoke(clip, "setText", text);
            }
        } catch (error) {
            Dialog.alert({
                title: '复制失败，请手动复制以下内容.',
                message:`<input class="可复制" type="text" value="${text}" readonly />`
            }).then(() => { });
            return
        }
        Toast('复制成功')
    }
};




// export default ()=>{
//     this.property = true;
// };
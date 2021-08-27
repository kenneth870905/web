function  adapt(designWidth,  rem2px , max) {
	var  d  =  window.document.createElement('div');
	d.style.width  =  '1rem';  
	d.style.display  =  "none";  
	var  head  =  window.document.getElementsByTagName('head')[0];  
	head.appendChild(d);  
    var  defaultFontSize  =  parseFloat(window.getComputedStyle(d,null).getPropertyValue('width'));
	//这行是自己添加的
	defaultFontSize=16;
//	console.log(defaultFontSize);
    d.remove();
	// var w = window.innerWidth
	var w = window.document.querySelector('body').offsetWidth
        if(max){
            w = w > max ? max : w
        }
    // console.log(w,designWidth,rem2px,defaultFontSize)
    // console.log( w /  designWidth  *  rem2px  /  defaultFontSize  *  100  +  '%')
    // console.log(w / designWidth * 100 +'px')
	// document.documentElement.style.fontSize  =  w /  designWidth  *  rem2px  /  defaultFontSize  *  100  +  '%';
	document.documentElement.style.fontSize  =  w / designWidth * 100 +'px';
	var  st  =  document.createElement('style');
	var  portrait  =  "@media screen and (min-width:" + w + "px) {html{font-size:" + ((w / (designWidth / rem2px) / defaultFontSize) * 100)  + "%;}}";  
	var  landscape  =  "@media screen and (min-width:" + window.innerHeight + "px) {html{font-size:" + ((window.innerHeight / (designWidth / rem2px) / defaultFontSize) * 100)  + "%;}}"  
    st.innerHTML  =  portrait  +  landscape;
	head.appendChild(st);
	return  defaultFontSize
};
// $(window).resize(function() {
// 	adapt(750,  100);
// })
window.onresize=function(){
    adapt(375,100,1200);
}
adapt(375,  100,1200);

var mySwiper = new Swiper('.swiper-container', {
	effect: 'fade',
	autoplay: 3000,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	lazy: {
		loadPrevNext: true
	}
})

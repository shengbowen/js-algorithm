function debounce(func, wait = 20, immediate = true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if(!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if(callNow) func.apply(context, args);
	}
}


function checkSlide(e) {
	sliderImages.forEaach(slideImage => {
		//half way through the image
		const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height /2;
		const imageBottom = sliderImage.offsetTop + sliderImage.height;
		const isHalfShown = slideInAt > sliderImage.offsetTop;
		const isNotScrolledPast = window.scrollY < imageBottom;
		if(isHalfShown && isNotScrolledPast) {
			slideImage.show()
		}else {
			sliderImage.hide()
		}
	})
}
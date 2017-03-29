$(function () {
	//
	var carouselList = $("#carouselScreen ul");
	var durationTime = 15000;
	var skipDistance = 400;
	var slideLeftOffset = 800; /*powinno byc wyliczane... */
	var interval;
	var actualSlide = 3;
	//
	//markId

	startSliderMove();

	//

	function startSliderMove() {
		interval = setInterval(function () {
				changeSlide(-1);
			}, durationTime);
	}

	// RestartMove()
	// słuzy uniknieciu "spręzynowania" po kliku w prawo
	// lub przyslieszaniu przy kliku w lewo
	// patrz -> obsługa buttonów
	function RestartMove() {
		clearInterval(interval);
		startSliderMove();
	}

	function changeSlide(direction, slideSpeed) {
		if (!slideSpeed && !(slideSpeed===0)) {
			var slideSpeed = 500;
		}
		carouselList.animate({
			'marginLeft': -slideLeftOffset + skipDistance * direction
		}, slideSpeed, function () {
			setActualSlideValue(direction)
			setSliderMarkers();
			moveFirstSlide(direction);
		});
	}

	function setActualSlideValue(direction) {
		actualSlide -= direction;
		if (actualSlide < 1) {
			actualSlide = 5;
		}
		if (actualSlide > 5) {
			actualSlide = 1;
		}
	}

	function setSliderMarkers() {
		$(".js-mark").css({
			"background-color": "#fff"
		});
		$(".js-mark[markId='" + actualSlide + "']").css({
			"background-color": "#ccc"
		});
	}

	function moveFirstSlide(direction) {
		var firstItem = carouselList.find("li:first");
		var lastItem = carouselList.find("li:last");

		if (direction < 1) {
			lastItem.after(firstItem);
		} else {
			firstItem.before(lastItem);
		}

		carouselList.css({
			marginLeft: -slideLeftOffset
		});
	}

	//

	$("#js-toLeft").on("click", function () {
		RestartMove();
		changeSlide(-1);
	});

	$("#js-toRight").on("click", function () {
		RestartMove();
		changeSlide(1);
	});

	$(".js-mark").on("click", function () {
		var targetSlide = parseInt($(this).attr("markId"));
		var differenceBtwSlides = targetSlide - actualSlide;
		if (differenceBtwSlides < 0) {
			differenceBtwSlides = differenceBtwSlides + 5;
		}
		while (differenceBtwSlides > 0) {
			changeSlide(-1,0);
			differenceBtwSlides--;
		}
	});

});

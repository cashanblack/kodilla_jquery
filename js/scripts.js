$(function () {
	
	var durationTime = 5000;
	var interval;
	var imageTable = [];
	var currentImage = 0;
	var reClickBlocker = false;
	
	// fill image table
	// initiate
	initiate();
	
	//
	// functions
	//
	
	function initiate(){
		generatefileTable();
		generateBullets();
		runCarousel();
	}

	function generatefileTable(){
		imageTable[0] = 'images/slider1.jpg';
		imageTable[1] = 'images/slider2.jpg';
		imageTable[2] = 'images/slider3.jpg';
		imageTable[3] = 'images/slider4.jpg';
		imageTable[4] = 'images/slider5.jpg';	
	}

	function generateBullets(){
		for (var i = 0; i < imageTable.length ; i++) {
			$( '#markersContainer' ).append('<div class="js-mark" markid="' + i + '"></div>');
		}
	}
	
	function runCarousel() {
		setSliderMarkers();
		setImageSrc("#imgbase",imageTable[currentImage]);
		interval = setInterval(function () {
				changeSlide(-1);
			}, durationTime);
	}
	
	
	function setImageSrc(imgTrg,imgSrc) {
		$(imgTrg).attr('src',imgSrc)
	}

	function changeSlide(direction,target) {
		(target) ? currentImage = target : setCurrentImage(direction);
		addCoverImage(currentImage);
		moveImage(direction);
		setSliderMarkers();
	}
	
	function setCurrentImage(direction){
		currentImage -= direction;
		if (currentImage < 0) {
			currentImage = 4;
		}
		if (currentImage > 4) {
			currentImage = 0;
		}
	}

	function addCoverImage(currentImage){
		$( '#carouselScreen' ).append('<img id="imgcover">');
		setImageSrc('#imgcover',imageTable[currentImage]);
	}
	
	function moveImage(direction){
		var basePicTarget;
		if (direction > 0 ){
			$( '#imgcover' ).addClass( 'onleft' );
			basePicTarget = '400px';
		} else {
			$( '#imgcover' ).addClass( 'onright' );
			basePicTarget = '-400px';
		}
		$( '#imgcover' ).animate({left: '0px'});
		$( '#imgbase' ).animate({left: basePicTarget},{complete: removeCoverImage});
	}
	
	function removeCoverImage(){
		backCurrentToPosition()
		$( '#imgcover' ).remove();
		reClickBlocker = false;
	}
	
	function backCurrentToPosition(){
		setImageSrc('#imgbase',imageTable[currentImage]);
		$("#imgbase").css('left','0px');
	}

	function restartMove() {
		clearInterval(interval);
		runCarousel();
	}
		
	function setSliderMarkers() {
		$(".js-mark").css({
			"background-color": "#fff"
		});
		$(".js-mark[markId='" + currentImage + "']").css({
			"background-color": "#ccc"
		});
	}
	
	// buttons
	

	$("#js-toLeft").on("click", function () {
		if ( reClickBlocker != true ){
			restartMove();
			changeSlide(1);
			reClickBlocker = true;
		}
	});

	$("#js-toRight").on("click", function () {
		if ( reClickBlocker != true ){
			restartMove();
			changeSlide(-1);
			reClickBlocker = true;
		}
	});

	$(".js-mark").on("click", function () {
		if ( reClickBlocker != true ){
			restartMove();
			var target = parseInt($(this).attr("markid"));
			changeSlide(1,target);
		}
	});
	
});
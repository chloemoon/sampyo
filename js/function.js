$(function() {
	//변수선언
	const $gnb = $('.header_wrapper > nav > .gnb > li');
	const $lnb = $('.header_wrapper > nav > .gnb .lnb');
	const $indicator = $('.slides > .slides-indicator > li > a');
	const $slides = $('.slides > .slides-container ');
	const $slide = $('.slides');
	const $prev = $('.slides>.slides-previous');
	const $next = $('.slides>.slides-next');
	let nowIdx = 0;
	let intervalID = null;
	const $btnAuto = $('.slides > .slides-btn');
	const $secslide = $('.article2 > .section-slides > .slides-container > li');
	const $secindicator = $('.article2 > .section-slides > .slides-indicator > li>a');
	//함수
	const moveFn = function() {
		//인디케이터 활성화
		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
		//슬라이드이동
		$slides.stop().animate({
			left: 940 * -nowIdx
		});
	};
	//자동재생 함수
	const autoPlay = function() {
		clearInterval(intervalID);
		intervalID = setInterval(function() {
			$('.slides-next').trigger('click');
		}, 3000);

		$btnAuto.addClass('pause').text('일시정지');
	};
	//재생정지 함수
	const autoStop = function() {
		clearInterval(intervalID);
		$btnAuto.removeClass('pause').text('자동재생');
	};
	autoPlay();

	//gnb 메뉴 이벤트

	$gnb.on('mouseover', function() {
		nowIdx = $(this).index();
		$lnb.eq(nowIdx).show();
	});

	$gnb.on('mouseout', function() {
		nowIdx = $(this).index();
		$lnb.eq(nowIdx).hide();
	});

	//슬라이드
	//인디케이터 클릭이벤트
	$indicator.on('click', function(evt) {
		//인덱스추출
		nowIdx = $indicator.index(this);
		moveFn();
		evt.preventDefault();
	});

	//이전다음버튼
	//호버했을때 나타나기
	$slide.on('mouseover', function() {
		$prev.stop().animate(
			{
				left: 0
			},
			200
		);
		$next.stop().animate(
			{
				right: 0
			},
			200
		);
	});
	$slide.on('mouseout', function() {
		$prev.stop().animate({
			left: -42
		});
		$next.stop().animate({
			right: -42
		});
	});
	//이전다음버튼 클릭이벤트
	$prev.on('click', function(evt) {
		if (nowIdx > 0) {
			nowIdx--;
		} else {
			nowIdx = 2;
		}
		moveFn(nowIdx);
		evt.preventDefault();
	});
	$next.on('click', function(evt) {
		if (nowIdx < 2) {
			nowIdx++;
		} else {
			nowIdx = 0;
		}
		moveFn(nowIdx);
		evt.preventDefault();
	});

	//자동재생클릭이벤트 등록
	$btnAuto.on('click', function(evt) {
		if ($(this).hasClass('pause')) {
			autoStop();
		} else {
			autoPlay();
		}
		evt.preventDefault();
	});

	//섹션슬라이드
	//인디케이터 눌렀을때 슬라이드 이동
	$secindicator.on('click', function(evt) {
		//인덱스추출
		nowIdx = $secindicator.index(this);

		//슬라이드 이동
		$secslide.filter('on').stop().fadeOut(1000).removeClass('on');
		$secslide.eq(nowIdx).stop().fadeIn(1000).addClass('on');

		evt.preventDefault();
	});
});

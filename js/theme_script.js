$(document).ready(function () {


	const windowOn = $(window);
	let larger = 1600;
	let xxl = 1400;
	let xl = 1200;
	let lg = 992;
	let md = 768;
	let sm = 576;
	const device_width = window.innerWidth;

	/**
	 * Sticky header on scroll
	 */

	const selectHeader = document.querySelector('#header');
	if (selectHeader) {
		document.addEventListener('scroll', () => {
			window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
		});
	}



	// Banner Slider
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		centeredSlides: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			// dynamicBullets: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// Autoplay
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		speed: 2000,
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
	});



	// Read More
	$('div.expander').expander({
		slicePoint: 550,
		widow: 2,
		expandSpeed: 0,
		// userCollapseText: '[^]'
	});

	$('div.expander').expander();

	// Upgrade slider
	var mySwiper2 = new Swiper('.swiper-upgrade', {
		direction: 'horizontal', // or 'vertical'
		loop: true,
		speed: 1000,
		slidesPerView: 1.4,

		autoplay: {
			delay: 8000,
			disableOnInteraction: false,
		},
		spaceBetween: 20,
		allowSlidePrev: false,
		breakpoints: {
			1920: {
				slidesPerView: 3.2,
				spaceBetween: 30
			},
			1028: {
				slidesPerView: 3.2,
				spaceBetween: 30
			},
			767: {
				slidesPerView: 2.2,
				spaceBetween: 30
			},
			480: {
				slidesPerView: 1.4,
				spaceBetween: 0
			}
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			// dynamicBullets: true,
		},
	});

	// Gsap RegisterPlugin
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);


	// Smooth Scroll
	if ($('#smooth-wrapper').length > 0) {
		let smoother = ScrollSmoother.create({
			wrapper: "#smooth-wrapper",
			content: "#smooth-content",
			ignoreMobileResize: true,
			//preventDefault: true,
			smooth: 0.8,
			ease: "Power3.easeOut",
			effects: true,
			onUpdate: (self) => {
				progress = self.progress;
			}
		})
	}


	// Charchater Come long Animation
	let homebd_banner__anim = gsap.timeline()
	let bd_banner__anim = document.querySelector(".bd_banner__anim")
	let split_bd_banner__anim = new SplitText(bd_banner__anim, {
		type: "chars"
	})
	homebd_banner__anim.from(split_bd_banner__anim.chars, {
		duration: 0.5,
		x: 70,
		autoAlpha: 0,
		stagger: 0.08
	});

	/*======================================
	29. Title Animation
	========================================*/
	if (device_width > 576) {
		let splitTitleLines = gsap.utils.toArray(".title-anim");

		splitTitleLines.forEach(splitTextLine => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: splitTextLine,
					start: 'top 90%',
					end: 'bottom 60%',
					scrub: false,
					markers: false,
					toggleActions: 'play none none none'
				}
			});

			const itemSplitted = new SplitText(splitTextLine, {
				type: "words, lines"
			});
			gsap.set(splitTextLine, {
				perspective: 400
			});
			itemSplitted.split({
				type: "lines"
			})
			tl.from(itemSplitted.lines, {
				duration: 1,
				delay: 0.3,
				opacity: 0,
				rotationX: -80,
				force3D: true,
				transformOrigin: "top center -50",
				stagger: 0.3
			});
		});
	}

	// Paragraph Animation
	if (device_width > 576) {
		let textIntoView = $(".p-text");

		gsap.utils.toArray(textIntoView).forEach(function (elem) {
			const innerSplit = new SplitText(elem, {
				type: "lines",
				linesClass: "text-line"
			});
			const outerSplit = new SplitText(elem, {
				type: "lines",
				linesClass: "text-mask"
			});

			const splitTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: elem,
					scrub: false,
					pin: false,
					start: "top 90%",
					end: "bottom 0%"
				},
				onComplete: () => {
					outerSplit.revert(),
						innerSplit.revert()
				}
			});

			splitTimeline.to(innerSplit.lines, {
				duration: 1.1,
				autoAlpha: 1,
				y: 0,
				ease: "Power4.easeOut",
				stagger: 0.20
			})
				.to(elem, {
					duration: 0,
					autoAlpha: 1
				}, "<");

		});
	}
});


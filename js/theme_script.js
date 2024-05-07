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



	// // Read More
	$('.expander').expander({
		slicePoint: 500,
		widow: 2,
		expandSpeed: 0,
		// userCollapseText: '[^]'
	});

	$('.expander').expander();
	// // Get all elements with the class 'link'
	$('a.more-link').click(function (e) {
		e.stopPropagation();
		console.log("more link")
	});
	$('a.less-link').click(function (e) {
		e.stopPropagation();
		console.log("less link")
	});

	var links = document.querySelectorAll('.more-link');

	// Update href attribute for each link
	links.forEach(function (link) {
		link.href = "javascript:void(0);";
	});


	// Upgrade slider
	var mySwiper2 = new Swiper('.swiper-upgrade', {
		direction: 'horizontal', // or 'vertical'
		loop: true,
		speed: 1000,
		allowTouchMove: true,
		slidesPerView: 1.4,

		autoplay: {
			delay: 800,
			disableOnInteraction: false,
		},
		spaceBetween: 20,
		// allowSlidePrev: false,
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


	/*======================================
	30. Charchater Come Animation 
	========================================*/
	let char_come = document.querySelectorAll(".animation__char_come")

	char_come.forEach((char_come) => {
		let split_char = new SplitText(char_come, {
			type: "chars, words,"
		})
		gsap.from(split_char.chars, {
			duration: 1,
			x: 70,
			autoAlpha: 0,
			stagger: 0.06
		});
	})
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

	/*======================================
	40. Fade in Left Animation
	========================================*/
	// Get Device width
	if (device_width > sm) {
		gsap.set(".bdFadeLeft", {
			x: -80,
			opacity: 0
		});
		const fadeArray = gsap.utils.toArray(".bdFadeLeft")
		fadeArray.forEach((item, i) => {
			let fadeTl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top center+=200",
				}
			})
			fadeTl.to(item, {
				x: 0,
				opacity: 1,
				ease: "power2.out",
				duration: 1,
			})
		})
	}


	// bdFadeUp
	if (device_width > 576) {
		gsap.set(".bdFadeUp", {
			y: 30,
			opacity: 0
		});
		const fadeUpArray = gsap.utils.toArray(".bdFadeUp")
		fadeUpArray.forEach((item, i) => {
			let fadeTl = gsap.timeline({
				scrollTrigger: {
					trigger: item,
					start: "top bottom-=150",
				}
			})
			fadeTl.to(item, {
				y: 0,
				opacity: 1,
				ease: "power2.out",
				duration: 1.3,
			})
		})
	}
});

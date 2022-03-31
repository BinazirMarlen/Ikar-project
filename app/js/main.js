$(function() {
    // sliders
    const sliderPrev = '<svg class="slider-arrow slider-arrow__left" width="12" height="23" viewBox="0 0 12 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.5712 22.5721C11.4418 22.667 11.2965 22.7104 11.1509 22.6977C11.0053 22.685 10.8649 22.6166 10.7448 22.5L0.344419 12.3544C0.238146 12.2506 0.151299 12.1121 0.0913162 11.9507C0.031332 11.7894 0 11.6099 0 11.4277C0 11.2456 0.031332 11.0661 0.0913162 10.9047C0.151299 10.7433 0.238146 10.6048 0.344419 10.5011L10.7448 0.355477C10.8646 0.237624 11.0052 0.168413 11.1511 0.155389C11.297 0.142365 11.4426 0.186028 11.5721 0.281619C11.7016 0.377209 11.81 0.521057 11.8854 0.69748C11.9609 0.873903 12.0005 1.07613 12 1.28211V21.5733C12 21.7791 11.9601 21.981 11.8845 22.157C11.8089 22.3331 11.7005 22.4766 11.5712 22.5721ZM10.3999 3.43411L2.20528 11.4277L10.3999 19.4213V3.43411Z" fill="#2D3533"/></svg>'
    const sliderNext = '<svg class="slider-arrow slider-arrow__right" width="12" height="23" viewBox="0 0 12 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.428819 22.6919C0.558235 22.7872 0.703541 22.8309 0.849138 22.8181C0.994735 22.8053 1.13513 22.7366 1.25525 22.6193L11.6556 12.4195C11.7619 12.3152 11.8487 12.176 11.9087 12.0138C11.9687 11.8515 12 11.6711 12 11.4879C12 11.3048 11.9687 11.1244 11.9087 10.9621C11.8487 10.7999 11.7619 10.6607 11.6556 10.5564L1.25525 0.356558C1.13535 0.238075 0.9948 0.168494 0.848909 0.155401C0.703018 0.142307 0.557389 0.186204 0.4279 0.282305C0.298411 0.378406 0.190032 0.523022 0.114578 0.700387C0.039125 0.877752 -0.000506547 1.08106 4.88801e-06 1.28814V21.6877C-1.91775e-05 21.8946 0.0399286 22.0976 0.115518 22.2746C0.191108 22.4516 0.299456 22.5959 0.428819 22.6919ZM1.60006 3.45163L9.79472 11.4879L1.60006 19.5243V3.45163Z" fill="#2D3533"/></svg>' 

    $('.home-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: true,
        speed: 1000,
        nextArrow: sliderPrev,
        prevArrow: sliderNext
    })


    CraftySlider = function (el, params) {
        this.init = function (el, params) {
            let container = $(el)
            let options = {}
    
            container.addClass('about-slider')
    
            options.container = container
            options.wrapper = $('.slider-wrapper', container)
            options.slidesCount = $('.slide', container).length
            options.currentSlide = Math.floor(options.slidesCount / 2)
            options.currentSlide = options.currentSlide > 0 ? options.currentSlide - 1 : 0
    
            this.options = { ...options, ...params }
            this.render()
            this.bindEvents()
        };
  
        this.render = function () {
            let options = this.options
    
            let currentSlide = $('.slide', options.container).eq(
                options.currentSlide
            )
            let prevSlide = currentSlide.prev()
            let nextSlide = currentSlide.next()
    
            $('.slide', options.container).attr({ class: 'slide' })
            currentSlide.addClass('current-slide first-layer-slide')
    
            $('.slide:lt(' + options.currentSlide + ')').addClass('left-side-slider')
            $('.slide:gt(' + options.currentSlide + ')').addClass(
                'right-side-slider'
            );
    
            prevSlide.addClass('prev-slide second-layer-slide')
            nextSlide.addClass('next-slide second-layer-slide')
    
            $('.slide:not(.second-layer-slide):not(.first-layer-slide)').addClass(
                'third-layer-slide'
            );
            if (-1 < options.currentSlide - 1) {
                // есть скрытые слайды слева
                $('.slide:lt(' + (options.currentSlide - 1) + ')').addClass(
                'hidden-slider'
                )
            }
    
            if (options.slidesCount > options.currentSlide + 1) {
                // есть скрытые слайды справа
                $('.slide:gt(' + (options.currentSlide + 1) + ')').addClass(
                'hidden-slider'
                )
            }
    
            if (undefined != this.options.nextArrow) {
                if (options.currentSlide >= options.slidesCount - 1) {
                    this.options.nextArrow.addClass('disabled')
                } else {
                    this.options.nextArrow.removeClass('disabled')
                }
            }
    
            if (undefined != this.options.prevArrow) {
                if (options.currentSlide <= 0) {
                    this.options.prevArrow.addClass('disabled')
                } else {
                    this.options.prevArrow.removeClass('disabled')
                }
            }
    
            options.wrapper.addClass('calculated')
        };
  
        this.nextSlide = function () {
            let maxValue = this.options.slidesCount

            if (maxValue - 1 > this.options.currentSlide) {
                this.options.currentSlide++
            }

            this.render()
        };
  
        this.prevSlide = function () {
            if (1 <= this.options.currentSlide) {
                this.options.currentSlide--
            }
            this.render()
        }
  
        this.bindEvents = function () {
            nextArrow = this.options.nextArrow || null
            prevArrow = this.options.prevArrow || null
    
            $('.slide a', this.options.container).on('click', function (e) {
                console.log($(this).attr('class'))
                if (!$(this).parent().hasClass('current-slide')) {
                    e.preventDefault()
                    e.stopPropagation()
                    let slider = $(this).parents('.about-slider').eq(0).data('crafty')
                    slider.options.currentSlide = $(this).parent().index()
                    slider.render()
                }
            });
  
            if (nextArrow) {
                nextArrow.click(function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                    let slider = $(this).parents('.about-slider').eq(0).data('crafty')
                    slider.nextSlide()
                })
            }
  
            if (prevArrow) {
                prevArrow.click(function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                    let slider = $(this).parents('.about-slider').eq(0).data('crafty')
                    slider.prevSlide()
                })
            }
        }
  
        this.init(el, params)
        $(el).data('crafty', this)
    }
  
      // craftySlider.init('.crafty-slider');
      $('.about-slider').each(function (index, el) {
        let slider = $(el)
  
        cs = new CraftySlider('.about-slider', {
            nextArrow: $('.slider-arrows__next', slider),
            prevArrow: $('.slider-arrows__prev', slider),
        })
    })

    // end sliders

    // show content
    function showContent(toggle) {
        const toggles = document.querySelectorAll(toggle)
    
        if (toggles) {
            toggles.forEach((toggle) => {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault()
                    toggle.classList.toggle('is-active')
                    toggle.nextElementSibling.classList.toggle('is-active')
                })
            })
        }
    }

    showContent('.js-drop-click')
    // end show content

    // header fixed
    function headerFixed() {
        const header = document.querySelector('.js-header-fixed')
        const toggle = document.querySelector('.menu-control')

        if (window.pageYOffset > 0) {
            header.classList.add('is-fixed')
            toggle.classList.add('is-fixed')
        } else {
            header.classList.remove('is-fixed')
            toggle.classList.remove('is-fixed')
        }
    }

    window.addEventListener('scroll', headerFixed)
    // end header fixed

    // menu
    function showMenu(control, content) {
        const btn = document.querySelector(control) 
        const menu = document.querySelector(content)

        if (btn && menu) {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
    
                btn.classList.toggle('is-active')
                menu.classList.toggle('is-active')
                document.body.classList.toggle('o-hidden')
            })
        }
    }

    showMenu('.menu-control', '.menu')
    //  end menu

    // phone mask
    $('input[type="tel"]').mask("+7 (999) 999-99-99");
    // end phone mask
})
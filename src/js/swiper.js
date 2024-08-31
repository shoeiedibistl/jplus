import Swiper from 'swiper/bundle';

import $ from 'jquery';

const BREAKPOINT = 1280;

export function swiperInit() {
  const slider = $('[data-slider-id]');

  if (slider.length) {
    slider.each(function () {
      const slider_el = $(this);
      const slider_id = slider_el.data('slider-id');
      const slider_prev_id = slider_el.data('slider-prev');
      const slider_next_id = slider_el.data('slider-next');
      const slider_prev = $(`[data-slider-button="${slider_prev_id}"]`);
      const slider_next = $(`[data-slider-button="${slider_next_id}"]`);
      const slider_buttons = $('[data-slider-buttons]');
      let pagination;
      let loop;

      if (slider_el.attr('data-pag-id')) {
        const id = slider_el.data('pag-id');
        pagination = document.querySelector(`[data-pag-wrapper="${id}"]`);
      }
      if (slider_el.attr('data-swiper-loop')) {
        loop = true;
      }

      if (slider_buttons.length) {
        const slides_count = slider_el.find('.swiper-slide').length;
        const min_count = slider_buttons.data('slider-buttons');

        if (slides_count < +min_count) {
          slider_buttons.addClass('hidden');
        }
      }

      let slider_options = {
        slidesPerView: 'auto',

        spaceBetween: 10,
        speed: 1000,
        loop: loop,
        pagination: {
          el: pagination,
          clickable: true,
        },

        breakpoints: {
          [BREAKPOINT]: {
            spaceBetween: 20,
          },
        },
      };

      switch (slider_id) {
        case 'history-years':
          slider_options = {
            ...slider_options,
            spaceBetween: 0,
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            breakpoints: {
              [1200]: {
                spaceBetween: 0,
              },
            },
          };
          break;
        case 'history-images':
          slider_options = {
            ...slider_options,
            spaceBetween: 0,
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            breakpoints: {
              [1200]: {
                spaceBetween: 0,
              },
            },
          };
          break;
        case 'history-texts':
          slider_options = {
            ...slider_options,
            spaceBetween: 0,
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            allowTouchMove: false,
            breakpoints: {
              [1200]: {
                spaceBetween: 20,
              },
            },

            on: {
              init: function () {
                const activeSlide = $(this.el).find('.swiper-slide-active');
                const myHeight = activeSlide.height();
                $(this.el.parentNode).height(`${myHeight}px`);

                const myHistoryBtnsWrapper = document.querySelector('.about-history__btns');
                const myHistoryBtns = myHistoryBtnsWrapper.querySelectorAll('[data-history-btn]');
                const myImagesSlider = document.querySelector(
                  '[data-slider-id="history-images"]'
                ).swiper;
                const myYearsSlider = document.querySelector(
                  '[data-slider-id="history-years"]'
                ).swiper;

                myHistoryBtns.forEach((myBtn, i) => {
                  myBtn.addEventListener('click', () => {
                    this.slideToLoop(i);
                    myImagesSlider.slideToLoop(i);
                    myYearsSlider.slideToLoop(i);

                    myHistoryBtns.forEach((btn) => {
                      btn.classList.remove('active');
                    });
                    myBtn.classList.add('active');
                  });
                });
              },

              slideChange: function () {
                if (window.innerWidth > 1200) return;
                const myHistoryBtnsWrapper = document.querySelector('.about-history__btns');
                const myHistoryBtns = myHistoryBtnsWrapper.querySelectorAll('[data-history-btn]');

                setTimeout(() => {
                  const activeSlide = $(this.el).find('.swiper-slide-active');
                  const myHeight = $(activeSlide).height();
                  $(this.el.parentNode).animate({ height: `${myHeight}px` }, 500);
                }, 0);

                myHistoryBtns.forEach((btn) => {
                  btn.classList.remove('active');
                });

                myHistoryBtns[this.realIndex].classList.add('active');
              },
            },
          };
          break;
      }

      const slider_swiper = new Swiper(slider_el[0], slider_options);

      slider_prev.on('click', () => {
        slider_swiper.slidePrev();
      });
      slider_next.on('click', () => {
        slider_swiper.slideNext();
      });
    });
  }
}

// swiper
{
  $(window).on('load', () => {
    swiperInit();
  });
}

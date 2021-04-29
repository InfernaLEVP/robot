// import Modals from './modal.js';
import customSelect from './customSelect.js';
import Courses from './courses.js';
import Reviews from './reviews.js';
import Forms from './forms.js';
import Address from './address.js';

window.addEventListener('DOMContentLoaded', (event) => {

  // Modals();
  setupMap();
  customSelect();
  Courses();
  Reviews();
  Forms();
  Address();

  const teamSlider = new Swiper('#team-slider', {
      // Optional parameters
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
          // when window width is >= 320px
          992: {
            slidesPerView: 3,
            spaceBetween: 0
          },
      },
    
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
  });

  document.querySelector('.team-button-prev').addEventListener('click', () => {
    teamSlider.slidePrev();
  });
  document.querySelector('.team-button-next').addEventListener('click', () => {
    teamSlider.slideNext();
  });


  // Photogallery slider

  const photogallerySlider = new Swiper('#photogallery-slider', {
    // Optional parameters
    loop: false,
    slidesPerView: 1,
    spaceBetween: 10,
    // slidesPerView: 'auto',
    centeredSlides: true,
    initialSlide: 1,
    autoplay: {
      delay: 8000,
    },
    pagination: {
      el: '.photogallry__pagination',
      clickable: true,
    },
    breakpoints: {
        // when window width is >= 320px
        992: {
          // slidesPerView: 3,
          slidesPerView: 'auto',
          spaceBetween: 120
        },
    },
  
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
  });

  document.querySelector('.photogallery-button-prev').addEventListener('click', () => {
    photogallerySlider.slidePrev();
  });
  document.querySelector('.photogallery-button-next').addEventListener('click', () => {
    photogallerySlider.slideNext();
  });

  // 

  // Reviews lider
  const reviewsSlider = new Swiper('#reviews-slider', {
    // Optional parameters
    loop: false,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    autoplay: {
      delay: 8000,
    },
    breakpoints: {
        // when window width is >= 320px
        992: {
          slidesPerView: 1,
          spaceBetween: 10
        },
    },
  
  });

  document.querySelector('.reviews-button-prev').addEventListener('click', () => {
    reviewsSlider.slidePrev();
  });
  document.querySelector('.reviews-button-next').addEventListener('click', () => {
    reviewsSlider.slideNext();
  });
  // 

  // Navigation
  const burger = document.getElementById('burger');
  const navClose = document.getElementById('navigation-close');
  const navigation = document.getElementById('navigation');
  const routesLinks = document.querySelectorAll('.menu a');

  if(burger){
    burger.addEventListener('click', () => {
      navigation.classList.add('opened');
    });
  }

  if(navClose){
    navClose.addEventListener('click', () => {
      navigation.classList.remove('opened');
    });
  }

  if(routesLinks){
    routesLinks.forEach(el => {
      el.addEventListener('click', () => {
        navigation.classList.remove('opened')
      });
    });
  }

  window.addEventListener('resize', () => {
    
    teamSlider.update();
    photogallerySlider.update();
    reviewsSlider.update();
  });

});

function setupMap() {

  setTimeout(() => {
    const d = document;
    const yaMap = d.createElement('script'); 
    yaMap.type = 'text/javascript'; 
    yaMap.async = true;
    yaMap.src = 'https://api-maps.yandex.ru/2.1/?apikey=d86147cd-522f-4052-bd58-2df194780b62&lang=ru_RU'; 
    yaMap.onload = () => {
      ymaps.ready(init);
      function init() {
          const myMap = new ymaps.Map("map", {
            center: [45.301254, 34.576812],
            zoom: 8,
          });
          
          const placemarks = [
            [44.977950, 34.099006],
            [45.711863, 34.398675],
            [45.355953, 36.469409],
            [44.577843, 33.457843]
          ];
          placemarks.forEach( el => {
            const placemark = new ymaps.Placemark(el , {}, {
              iconColor: '#ff0000'
            });
  
            myMap.geoObjects.add(placemark);
          });
          

          // Init addresses clicks
          const links = document.querySelectorAll('.city-location');

          links.forEach( (el) => {

            el.addEventListener('click', () => {
              const coords = el.dataset.coords.split(',');

              myMap.setCenter(coords, 16, {
                checkZoomRange: true
              });
            });

          });
      };

    };
    const existedScript = document.getElementById('modal-3'); 
    existedScript.parentNode.insertBefore(yaMap, existedScript);
  }, 6000);
}

let slideCheck = true;
let slideUp = (target, duration=500) => {
  slideCheck = false;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    slideCheck = true;
  }, duration);
}

let slideDown = (target, duration=500) => {
  slideCheck = false;
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    slideCheck = true;
  }, duration);
}

const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('.header__burger, .header__nav-mob, body'),
    burger = document.querySelector('.header__burger'),
    header = document.querySelector('.header');


let thisTarget;
body.addEventListener('click', function (event) {

    thisTarget = event.target;
    function $(arg) {
      return thisTarget.closest(arg);
    }

    // =-=-=-=-=-=-=-=-=-=- <Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-

    if (thisTarget.closest('.header__burger')) {
        menu.forEach(element => {
            element.classList.toggle('_active')
        })
    }

    // =-=-=-=-=-=-=-=-=-=- </Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-



    // =-=-=-=-=-=-=-=-=-=- <header-drop-down> -=-=-=-=-=-=-=-=-=-=-

    let headerDropDownTarget = $('.header__drop-down--target'),
        headerDropDown = document.querySelectorAll('.header__drop-down');
    if (headerDropDownTarget) {

      const parent = headerDropDownTarget.closest('.header__drop-down');
      if(parent.classList.contains('_active')) {
        headerDropDown.forEach(headerDropDown => {
          headerDropDown.classList.remove('_active');
        })
      } else {
        headerDropDown.forEach(headerDropDown => {
          headerDropDown.classList.remove('_active');
        })
        parent.classList.add('_active');
      }

    } else if(!$('.header__drop-down')) {
      
      headerDropDown.forEach(headerDropDown => {
        headerDropDown.classList.remove('_active');
      })

    }

  // =-=-=-=-=-=-=-=-=-=- </header-drop-down> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <header-drop-down> -=-=-=-=-=-=-=-=-=-=-

  let headerNotificationsTarget = $('.header__notifications--toggle-btn'),
      headerNotifications = document.querySelectorAll('.header__notifications');
  if (headerNotificationsTarget) {

  const parent = headerNotificationsTarget.closest('.header__notifications');
  if(parent.classList.contains('_active')) {
    headerNotifications.forEach(headerNotification => {
      headerNotification.classList.remove('_active');
    })
  } else {
    headerNotifications.forEach(headerNotification => {
      headerNotification.classList.remove('_active');
    })
    parent.classList.add('_active');
  }

  } else if(!$('.header__notifications')) {

    headerNotifications.forEach(headerNotification => {
      headerNotification.classList.remove('_active');
    })

  }

  // =-=-=-=-=-=-=-=-=-=- </header-drop-down> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <custom-select> -=-=-=-=-=-=-=-=-=-=-

  let customSelectTarget = $('.custom-select__target'),
      customSelects = document.querySelectorAll('.custom-select._active');

  if(customSelectTarget && slideCheck) {

    const parent = customSelectTarget.closest('.custom-select'),
          block = parent.querySelector('.custom-select__block');

    if(parent.classList.contains('_active')) {
      
      customSelects.forEach(customSelect => {
        const block = customSelect.querySelector('.custom-select__block');
        slideUp(block);
      })

      setTimeout(() => {parent.classList.remove('_active')},500)
      
    } else {

      customSelects.forEach(customSelect => {
        const block = customSelect.querySelector('.custom-select__block');
        slideUp(block);
      })

      slideDown(block);
      parent.classList.add('_active')

    }


  }

  // =-=-=-=-=-=-=-=-=-=- </custom-select> -=-=-=-=-=-=-=-=-=-=-


  // =-=-=-=-=-=-=-=-=-=- <video click on preview> -=-=-=-=-=-=-=-=-=-=-
  let videoPreview = $('.video__preview');
  if(videoPreview) {
    const parent = videoPreview.closest('.video__wrapper');
          video = parent.querySelector('.video__block');

    videoPreview.classList.add('_hidden');
    video.play();
  }

  // =-=-=-=-=-=-=-=-=-=- </video click on preview> -=-=-=-=-=-=-=-=-=-=-

})


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

/* let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
  if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
    resizeCheck[String(size)] = false;
    maxWidth(); // < size
  }

  if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
    resizeCheck[String(size)] = true;
    minWidth(); // > size
  }
} */

function resize() {

  html.style.setProperty('--height-screen', body.offsetHeight + 'px');
  
  /* windowSize = window.innerWidth

  resizeCheckFunc(992,
    function () {  // screen > 992px

      

  },
  function () {  // screen < 992px



  }); */

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

const topElement = document.createElement('div');
topElement.classList.add('top-element');
body.append(topElement)

let offsetTop = 0;

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

function scroll() {
  offsetTop = getCoords(topElement).top;
  
  if(offsetTop <= 0) {
    
    header.classList.add('_on-top');
  } else {
    header.classList.remove('_on-top');
  }

}

scroll()

window.onscroll = scroll;

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let slider = new Swiper('.intro__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    
    /* navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, */
    /* breakpoints: {
      992: {
        slidesPerView: 3,
        centeredSlides: true,
    
      },
      600: {
        slidesPerView: 2,
        centeredSlides: false,
      },
    } */
}); 

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
  // Global settings:
  duration: 700,
  disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  

});

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=



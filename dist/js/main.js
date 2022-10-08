
document.addEventListener('DOMContentLoaded', function() {
  testWebP(document.body)
})

function testWebP(elem) {
  const webP = new Image();
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  webP.onload = webP.onerror = function () {
    webP.height === 2 ? elem.classList.add('webp-true') : elem.classList.add('webp-false')
  }
  //console.log(webP)
}

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


// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

(function () {
  var FX = {
      easing: {
          linear: function (progress) {
              return progress;
          },
          quadratic: function (progress) {
              return Math.pow(progress, 2);
          },
          swing: function (progress) {
              return 0.5 - Math.cos(progress * Math.PI) / 2;
          },
          circ: function (progress) {
              return 1 - Math.sin(Math.acos(progress));
          },
          back: function (progress, x) {
              return Math.pow(progress, 2) * ((x + 1) * progress - x);
          },
          bounce: function (progress) {
              for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                  if (progress >= (7 - 4 * a) / 11) {
                      return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                  }
              }
          },
          elastic: function (progress, x) {
              return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
          }
      },
      animate: function (options) {
          var start = new Date;
          var id = setInterval(function () {
              var timePassed = new Date - start;
              var progress = timePassed / options.duration;
              if (progress > 1) {
                  progress = 1;
              }
              options.progress = progress;
              var delta = options.delta(progress);
              options.step(delta);
              if (progress == 1) {
                  clearInterval(id);
  
                  options.complete();
              }
          }, options.delay || 10);
      },
      fadeOut: function (element, options) {
          var to = 1;
          this.animate({
              duration: options.duration,
              delta: function (progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function (delta) {
                  element.style.opacity = to - delta;
              }
          });
      },
      fadeIn: function (element, options) {
          var to = 0;
          element.style.display = 'block';
          this.animate({
              duration: options.duration,
              delta: function (progress) {
                  progress = this.progress;
                  return FX.easing.swing(progress);
              },
              complete: options.complete,
              step: function (delta) {
                  element.style.opacity = to + delta;
              }
          });
      }
  };
  window.FX = FX;
})()
  
let popupCheck = true, popupCheckClose = true;
function popup(arg) {

  const body = document.querySelector('body'),
        html = document.querySelector('html');
  
  let duration = 200, idOnURL = false, url;
  
  if(arg) {

      if(typeof arg.duration == 'number') {
          duration = arg.duration;
      }

      if(arg.idOnURL === true) {
      idOnURL = true;

      url = new URL(window.location);
      }

  }
  
  function popupOpen(idPopup) {
      if (popupCheck) {
          popupCheck = false;

          let popup,
              id = idPopup;

          popup = document.querySelector(id);

          if(popup) {

              body.classList.remove('_popup-active');
              html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
              body.classList.add('_popup-active');

              popup.classList.add('_active');
              
              if(idOnURL) history.pushState('', "", id);

              FX.fadeIn(popup, {
                  duration: duration,
                  complete: function () {
                      popupCheck = true;
                  }
              });

          }

      }
  }

  if(idOnURL) {
      if(url.hash) {
        let timeoutDuration = duration;
        duration = 0;
        popupOpen(url.hash);
        setTimeout(() => {
          duration = timeoutDuration;
        }, timeoutDuration)
      }
    }

  function remHash() {
      let uri = window.location.toString();
      if (uri.indexOf("#") > 0) {
          let clean_uri = uri.substring(0, uri.indexOf("#"));
          window.history.replaceState({}, document.title, clean_uri);
      }
  }

  let thisTarget
  body.addEventListener('click', function(event) {

      thisTarget = event.target;

      let popupClose = thisTarget.closest('.popup-close');
      if(popupClose) {
          //event.preventDefault();
          
          if (popupCheckClose) {
              popupCheckClose = false;

              const popup = popupClose.closest('.popup');

              FX.fadeOut(popup, {
                  duration: duration,
                  complete: function () {
                      popup.style.display = 'none';

                      if(idOnURL) remHash();

                      body.classList.remove('_popup-active');
                      html.style.setProperty('--popup-padding', '0px');
                      popup.classList.remove('_active');

                      popupCheckClose = true;
                  }
              });
              
          }
      }

      let btnPopup = thisTarget.closest('.open-popup');
      if(btnPopup) {
          event.preventDefault();
          popupOpen(btnPopup.getAttribute('href'));
      }

  });

}

popup({
  //duration: 200,
  //idOnURL: false,
});


// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=

new ClipboardJS('.copy-btn');

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


  // =-=-=-=-=-=-=-=-=-=- <превью для видео> -=-=-=-=-=-=-=-=-=-=-

  let videoPreview = $('.video__preview');
  if(videoPreview) {
    const parent = videoPreview.closest('.video__wrapper');
          video = parent.querySelector('.video__block');

    videoPreview.classList.add('_hidden');
    video.play();
  }

  // =-=-=-=-=-=-=-=-=-=- </превью для видео> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <кнопки для пополнения баланса> -=-=-=-=-=-=-=-=-=-=-

  let accountBalanceMinBtn = $('.account-balance__min-btn');
  if(accountBalanceMinBtn) {
    
    const parent = accountBalanceMinBtn.closest('.account-balance__block'),
          input = parent.querySelector('.account-balance__input'),
          value = accountBalanceMinBtn.dataset.value;

    input.value = value;

  }

  // =-=-=-=-=-=-=-=-=-=- </кнопки для пополнения баланса> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <кнопка выбора типа пополнения баланса> -=-=-=-=-=-=-=-=-=-=-

  let accountBalanceTarget = $('.account-balance__target');
  if(accountBalanceTarget) {
    
    accountBalanceTarget.classList.toggle('_active');

  } else if(!$('.account-balance__target') && !$('.account-balance__list')) {
    document.querySelectorAll('.account-balance__target').forEach(accountBalanceTarget => {
      accountBalanceTarget.classList.remove('_active')
    })
  }

  let accountBalanceListBtn = $('.account-balance__list--btn');
  if(accountBalanceListBtn) {
    
    const block = document.querySelector(`#${accountBalanceListBtn.dataset.id}`),
          blocks = document.querySelectorAll('.account-balance__block');

    blocks.forEach(block => {
      block.classList.remove('_visible')
    })

    setTimeout(() => {
      block.classList.add('_visible');
    }, 200)

    document.querySelectorAll('.account-balance__target').forEach(accountBalanceTarget => {
      accountBalanceTarget.classList.remove('_active')
    })

  } else if(!$('.account-balance__target') && !$('.account-balance__list')) {
    document.querySelectorAll('.account-balance__target').forEach(accountBalanceTarget => {
      accountBalanceTarget.classList.remove('_active')
    })
  }

  // =-=-=-=-=-=-=-=-=-=- </кнопка выбора типа пополнения баланса> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <табы> -=-=-=-=-=-=-=-=-=-=-

  let tabBtn = $('.tab-btn');
  if(tabBtn) {
    if(!tabBtn.classList.contains('_active')) {

      event.preventDefault()
      
      const wrapper = tabBtn.closest('.tab-wrapper'),
            block = wrapper.querySelector(tabBtn.getAttribute('href')),
            activeBlock = wrapper.querySelector('.tab-block._active');
        
      wrapper.style.minHeight = wrapper.offsetHeight + 'px';
      
      
      activeBlock.classList.remove('_visible');

      setTimeout(() => {
        activeBlock.classList.remove('_active');

        block.classList.add('_active');

        wrapper.querySelector('.tab-btn._active').classList.remove('_active')
        tabBtn.classList.add('_active');

        setTimeout(() => {

          block.classList.add('_visible');
          
        },200)
      },200)

      
          
      

      wrapper.style.minHeight = 0 + 'px';

    }
  }

  // =-=-=-=-=-=-=-=-=-=- </табы> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <показывать блоки при нажатии на "показать ещё"> -=-=-=-=-=-=-=-=-=-=-

  let hiddenBlockBtn = $('.hide-blocks-btn');
  if(hiddenBlockBtn) {
    event.preventDefault()

    const wrapper = hiddenBlockBtn.closest('.hide-blocks-wrapper'),
          list = wrapper.querySelector('.hide-blocks-list');

    list.classList.add('_visible');
    hiddenBlockBtn.classList.add('_hidden');
  }
  
  // =-=-=-=-=-=-=-=-=-=- </показывать блоки при нажатии на "показать ещё"> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <показывать весь текст при нажатии на "больше"> -=-=-=-=-=-=-=-=-=-=-

  let textMoreBtn = $('.page-game__descr--text-more-btn');
  if(textMoreBtn) {
    event.preventDefault()

    const text = textMoreBtn.parentElement.querySelector('.page-game__descr--text');

    if(!textMoreBtn.classList.contains('_active')) {

      text.classList.add('_visible');
      textMoreBtn.classList.add('_active');
      textMoreBtn.textContent = textMoreBtn.dataset.visibleText;

    } else {

      text.classList.remove('_visible');
      textMoreBtn.classList.remove('_active');
      textMoreBtn.textContent = textMoreBtn.dataset.hideText;

    }

    
  }
  
  // =-=-=-=-=-=-=-=-=-=- </показывать весь текст при нажатии на "больше"> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <FAQ> -=-=-=-=-=-=-=-=-=-=-

  let faqItemQuestion = $('.faq__item--question');
  if(faqItemQuestion) {
    
    const item = faqItemQuestion.closest('.faq__item'),
          answear = item.querySelector('.faq__item--answear');

    if(!item.classList.contains('_sliding')) {
      item.classList.add('_sliding')

      if(item.classList.contains('_active')) {
        slideUp(answear,500)
        answear.style.display = "block";
        item.classList.remove('_active');
        
      } else {
        slideDown(answear,500);
        item.classList.add('_active');

      }

      setTimeout(() => {
        item.classList.remove('_sliding')
      },500)

    }

    

  }

  // =-=-=-=-=-=-=-=-=-=- </FAQ> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <Удаления увидомления> -=-=-=-=-=-=-=-=-=-=-

  let notificationItemCloseBtn = $('.notification-item__close-btn');
  if(notificationItemCloseBtn) {
    const item = notificationItemCloseBtn.closest('.notification-item');

    if(!item.classList.contains('_removing')) {

      item.classList.add('_removing');

      slideUp(item);

      setTimeout(() => {
        item.remove();
      },500)

    }
  }

  // =-=-=-=-=-=-=-=-=-=- </Удаления увидомления> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <Кнопка микрофона и чата> -=-=-=-=-=-=-=-=-=-=-

  let gameCommunicationBtn = $('.game__communication--btn');
  if(gameCommunicationBtn) {
    gameCommunicationBtn.classList.toggle('_active');
  }

  let gameChatCloseBtn = $('.game__chat--close-btn'),
      chatBtn = document.querySelector('.chat-btn');
  if(gameChatCloseBtn) {

    chatBtn.classList.remove('_active');

  }

  // =-=-=-=-=-=-=-=-=-=- </Кнопка микрофона и чата> -=-=-=-=-=-=-=-=-=-=-

  

  // =-=-=-=-=-=-=-=-=-=- <История ходов> -=-=-=-=-=-=-=-=-=-=-

  let gameHistoryHeader = $('.game__history--header');
  if(gameHistoryHeader && slideCheck) {

    const wrapper = gameHistoryHeader.closest('.game__history--wrapper'),
          list = wrapper.querySelector('.game__history--list');

    if(!wrapper.classList.contains('_active')) {

      wrapper.classList.add('_active')
      slideDown(list);

    } else {

      slideUp(list);
      list.style.display = "block";
      
      setTimeout(() => {
        wrapper.classList.remove('_active')
      },0)

    }

  }

  // =-=-=-=-=-=-=-=-=-=- </История ходов> -=-=-=-=-=-=-=-=-=-=-

  

})

/* document.querySelectorAll(".custom-select").forEach(customSelect => {
  NiceSelect.bind(customSelect, {searchable: false});
}) */
new lc_select('.custom-select', {

  // (bool) whether to enable fields search
  enable_search : false,
  addit_classes : ['lcslt-dark'],
  labels : [ 
    'Поиск вариантов',
    'Добавить вариант',
    'Выберите вариант ..',
    '.. нет подходящих вариантов ..',
],
});

document.querySelectorAll('.custom-multiple-select').forEach(customMultipleSelect => {
  new lc_select(customMultipleSelect, {

    // (bool) whether to enable fields search
    enable_search : false,
    addit_classes : ['lcslt-dark'],
    labels : [ 
      'Поиск вариантов',
      'Добавить вариант',
      (customMultipleSelect.dataset.placeholder) ? customMultipleSelect.dataset.placeholder : 'Выберите вариант ..',
      '.. нет подходящих вариантов ..',
  ],
  });
})


// =-=-=-=-=-=-=-=-=-=-=-=- <email validator> -=-=-=-=-=-=-=-=-=-=-=-=

function validate(email, event) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let address = email.value;
  if(reg.test(address) == false) {
      event.preventDefault();
      email.classList.add('_error');
      email.onblur = function () {
        email.classList.remove('_error');
      }
      return false;
  }
}

const emailInputs = document.querySelectorAll('.email-valid-input');
emailInputs.forEach(emailInput => {
  const form = emailInput.closest('form'),
        submit = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (event) {

    validate(emailInput, event);

  })

  if(submit.classList.contains('_disabled')) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    emailInput.addEventListener('input', function(event) {
      let address = event.target.value;
      if(reg.test(address) == true) {
        submit.classList.remove('_disabled')
      } else {
        submit.classList.add('_disabled')
      }
    })
    
  }

  

})

// =-=-=-=-=-=-=-=-=-=-=-=- </email validator> -=-=-=-=-=-=-=-=-=-=-=-=






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

let hToDown = 50,
    hToUp = 50,

    headerPos = getCoords(header),

    hPosToDown, hPosToUp, hCheck = [true, true], hPosCheck = false,
    hTopCheck = false, scrolled = [0, 0], checkScrolled = '';

function headerScrollFunc() {
    
  scrolled[0] = headerPos.top
  headerPos = getCoords(header);
  scrolled[1] = headerPos.top
  
  if (!hPosCheck) {

      hPosCheck = true;

      hPosToDown = headerPos.top + hToDown;
      hPosToUp = headerPos.top - hToUp;

  }

  if (scrolled[0] > scrolled[1]) {checkScrolled = 'up'; } else if (scrolled[0] < scrolled[1]) { checkScrolled = 'down'; }

  if (!hTopCheck && headerPos.top > 0) {
    hTopCheck = true;

    header.classList.remove('_on-top');
  } else if (headerPos.top == 0) {
    hTopCheck = false;
    header.classList.add('_on-top');
  }
  
  if (checkScrolled == 'down') hPosToUp = headerPos.top - hToUp;
  if (checkScrolled == 'up') hPosToDown = headerPos.top + hToDown;
  
  if (hPosToUp >= headerPos.top && hCheck[0]) {
    hCheck[0] = false; hCheck[1] = true;

    header.classList.remove('_hide'); // SHOW HEADER
  }

  if (hPosToDown <= headerPos.top && hCheck[1]) {
    hCheck[1] = false; hCheck[0] = true;

    header.classList.add('_hide'); // HIDE HEADER
  }

}

headerScrollFunc();

function scroll() {
  offsetTop = getCoords(topElement).top;

  html.style.setProperty('--height-screen', window.innerHeight + 'px');
  html.style.setProperty('--height-header', header.offsetHeight + 'px');
  
  /* if(offsetTop <= 0) {
    
    header.classList.add('_on-top');
  } else {
    header.classList.remove('_on-top');
  } */

  headerScrollFunc();

}

scroll()

window.onscroll = scroll;

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.intro__slider')) {
  let introSlider = new Swiper('.intro__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    effect: 'fade',
    fadeEffect: {
      crossFade: true
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
}

let onlineGamesSlider;

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
  // Global settings:
  duration: 700,
  disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function

});

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
  if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
    resizeCheck[String(size)] = false;
    maxWidth(); // < size
  }

  if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
    resizeCheck[String(size)] = true;
    minWidth(); // > size
  }
}

function resize() {

  html.style.setProperty('--height-screen', body.offsetHeight + 'px');
  html.style.setProperty('--height-header', header.offsetHeight + 'px');
  
  windowSize = window.innerWidth

  resizeCheckFunc(768,
    function () {  // screen > 768px

      if(document.querySelector('.online-games__slider')) {
        onlineGamesSlider = new Swiper('.online-games__slider', {
  
          spaceBetween: 16,
          slidesPerView: 3,
          centeredSlides: false,
        
          //loop: true,
          
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            800: {
              slidesPerView: 4,
            },
          }
        }); 
      }

  },
  function () {  // screen < 768px

    if(onlineGamesSlider) {
      onlineGamesSlider.destroy(true, true);
    }
    

  });

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=

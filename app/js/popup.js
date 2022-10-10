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
  
  class Popup {
  
    static body = document.querySelector('body');
    static html = document.querySelector('html');
    static idOnUrl = false;
    static duration = 200;
  
    static popupCheck = true;
    static popupCheckClose = true;
  
    static remHash() {
      let uri = window.location.toString();
      if (uri.indexOf("#") > 0) {
          let clean_uri = uri.substring(0, uri.indexOf("#"));
          window.history.replaceState({}, document.title, clean_uri);
      }
    }
  
    static open(id) {
      
      if(Popup.popupCheck) {
        Popup.popupCheck = false;
  
        let popup = document.querySelector(id);
  
        if(popup) {
  
            Popup.body.classList.remove('_popup-active');
            Popup.html.style.setProperty('--popup-padding', window.innerWidth - Popup.body.offsetWidth + 'px');
            Popup.body.classList.add('_popup-active');
  
            popup.classList.add('_active');
            
            if(Popup.idOnURL) history.pushState('', "", id);
  
            FX.fadeIn(popup, {
                duration: Popup.duration,
                complete: function () {
                  Popup.popupCheck = true;
                  
                }
            });
  
        } else {
          return new Error(`Not found "${id}"`)
        }
      }
    }
  
    static close(popupClose) {
      
      if (Popup.popupCheckClose) {
        Popup.popupCheckClose = false;
  
        const popup = popupClose.closest('.popup');
  
        FX.fadeOut(popup, {
            duration: Popup.duration,
            complete: function () {
                popup.style.display = 'none';
  
                if(Popup.idOnURL) Popup.remHash();
  
                Popup.body.classList.remove('_popup-active');
                Popup.html.style.setProperty('--popup-padding', '0px');
                popup.classList.remove('_active');
  
                Popup.popupCheckClose = true;
            }
        });
        
    }
    }
  
    static start() {
      let thisTarget
      Popup.body.addEventListener('click', function(event) {
  
          thisTarget = event.target;
  
          let popupOpen = thisTarget.closest('.open-popup');
          if(popupOpen) {
              event.preventDefault();
  
              Popup.open(popupOpen.getAttribute('href'))
          }
  
          let popupClose = thisTarget.closest('.popup-close');
          if(popupClose) {

              Popup.close(popupClose)
              
          }
  
      });
  
      if(Popup.idOnURL) {
        let url = new URL(window.location);
        if(url.hash) {
          let timeoutDuration = Popup.duration;
          Popup.duration = 0;
          Popup.open(url.hash);
          setTimeout(() => {
            Popup.duration = timeoutDuration;
          }, timeoutDuration)
        }
      }
    };
  
    constructor () {
      Popup.start()
    }
  }
  
var targ = function(a) {
    var b = [];

    function Reach(elements) {
      if (typeof a == "string") {
        b.length = elements.length;
        for (var i = 0; i < b.length; i++) {
          b[i] = elements[i];
        }
      } else {
        b.push(elements);
      }
    }
    Reach.prototype.listen = function(evt, fn) {
      for (var i = 0; i < b.length; i++) {
        if (b[i].addEventListener) {
          b[i].addEventListener(evt, fn, false);
        } else if (b[i].attachEvent) {
          b[i].attachEvent('on' + evt, fn);
        } else {
          return false;
        }
      }
    };
    return (typeof a == "string") ? new Reach(document.querySelectorAll(a)) : new Reach(a);
  },
  docu = document.documentElement || document.body,
  sect = document.getElementsByTagName('section'),
  dowescroll = false,
  page = locate() || 0,
  wait = false,
  brows = navigator.userAgent || navigator.vendor || window.opera,
  isTouchDevice = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(brows) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(brows.substr(0, 4)),
  isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints)),
  touchStartY = 0,
  touchStartX = 0,
  touchEndY = 0,
  touchEndX = 0,
  touchSensitivity = 5,
  scrollable,
  scrollspeed = 1000; // SCROLL SPEED in milliseconds

// EVENTS BEFORE ARRIVING PAGE N°*
function callbefore(n) {
  switch (n) {
    case 1:
      console.log('Heading page 1');
      break;
    case 2:
      console.log('Heading page 2');
      break;
    case 3:
      console.log('Heading page 3');
      break;
    case 4:
      console.log('Heading page 4');
      break;
  }
}

// EVENTS WHEN ARRIVED PAGE N°*
function callback(n) {
  switch (n) {
    case 1:
      console.log('Arrived page 1');
      break;
    case 2:
      console.log('Arrived page 2');
      break;
    case 3:
      console.log('Arrived page 3');
      break;
    case 4:
      alert('Welcome on page 4 !');
      break;
  }
}
function locate() {
  var a = docu.scrollTop,
    b = [];
  for (var i = 0; i < sect.length; i++) {
    var x = sect[i].getBoundingClientRect().top + a;
    b.push(Math.abs(x - a));
  }
  var c = Math.min(...b),
    d = b.indexOf(c);
  if (sect[d].getBoundingClientRect().top + a !== a) {
    page = d;
    go(d);
  }
  return d;
}

function wheelto(event) {
  if (wait) return false;
  wait = false;

  var a = window.event || event || event.originalEvent,
      b = Math.max(-1, Math.min(1, -a.wheelDelta || a.detail));

  if (dowescroll && dowescroll.offsetHeight < dowescroll.scrollHeight) {

    if (dowescroll.scrollTop + dowescroll.offsetHeight >= dowescroll.scrollHeight && b == 1) {
      go("down");
    }
    if (dowescroll.scrollTop === 0 && b == -1) {
      go("up");
    }
  } else if (b == 1) {
    go("down");
  } else if (b == -1) {
    go("up");
  }
}

function getEventsPage(e) {
  var events = [],
      isReallyTouch = typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';

  events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
  events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

  if (isTouch && isReallyTouch) {
    events.y = e.touches[0].pageY;
    events.x = e.touches[0].pageX;
  }
  return events;
}

function swipeMove(event) {
  event.preventDefault();
  var e = window.event || event || event.originalEvent,
      getWindowHeight = ('innerHeight' in window) ? window.innerHeight : document.documentElement.offsetHeight,
      touchEvents = getEventsPage(e);
  touchEndY = touchEvents.y;
  touchEndX = touchEvents.x;
  if (Math.abs(touchStartY - touchEndY) > (getWindowHeight / 100 * touchSensitivity)) {
    if (touchStartY > touchEndY) {
      go('down');
    } else if (touchEndY > touchStartY) {
      go('up');
    }
  }
}

function swipeStart(event) {
  var e = window.event || event || event.originalEvent;
  var touchEvents = getEventsPage(e);
  touchStartY = touchEvents.y;
  touchStartX = touchEvents.x;
}

function go(dir) {
  if (wait === true || dir == "down" && page == sect.length - 1 || dir == "up" && page === 0) return false;
  wait = true;

  var a, b;

  if (typeof dir === "number") {
    a = dir,
      b = scrollspeed * Math.max(Math.abs(page - a), 1);
  } else {
    b = scrollspeed;
    if (dir == "up") {
      a = page - 1;
    } else if (dir == "down") {
      a = page + 1;
    }
  }
  callbefore(a+1);
  var start = docu.scrollTop,
    yposi = sect[a].getBoundingClientRect().top + start,
    change = yposi - start,
    time = 0,
    scrollIt = function() {
      time += 20,
        docu.scrollTop = -change / 2 * (Math.cos(Math.PI * time / b) - 1) + start;
      if (time < b) {
        setTimeout(scrollIt, 10);
      } else {
        wait = false,
          page = a;
        callback(a+1);
      }
    };
  scrollIt();
}

targ('.link').listen('click', function(event) {
  event.preventDefault();
  var nb = Number(this.getAttribute('href').replace('#page', '')) - 1;
  wait = false;
  go(nb);
});

var w8;
targ(window).listen('resize', function() {
  clearTimeout(w8);
  w8 = setTimeout(function() {
    wait = false;
    go(page);
  }, 500);
});

targ(document).listen("DOMContentLoaded", function() {
  document.body.style.overflow = 'hidden';
  document.body.classList.remove("scrollsnap");
  scrollable = document.getElementsByClassName("scrollable");
  var g = scrollable.length;
  if (scrollable.length > 0) {
    for (var j = 0; j < g; j++) {
      let k = scrollable[j];
      targ(k).listen('mouseover', function() {
        dowescroll = this;
      });
      targ(k).listen('mouseout', function() {
        dowescroll = false;
      });
    }
  }
});

targ(docu).listen('keydown', function(e) {
  switch (e.which || e.keyCode || e.charCode) {
    case 38:
      go('up');
      break;
    case 40:
      go('down');
  }
});

targ(docu).listen('mousewheel', wheelto);
targ(docu).listen('DOMMouseScroll', wheelto);
targ(docu).listen('touchstart', swipeStart);
targ(docu).listen('touchmove', swipeMove);

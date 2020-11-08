const Koa = require('koa');
const app = new Koa();

const final = (ctx, next) => {
    console.log('-----request start-----');
    ctx.body = {
        text: 'hello world'
    }
}

app.use(final)
app.listen(3004)

var countToNumber = function (element, number, suffix, duration) {
  $({count: parseInt(element.text().split("+")[0].replace(/\,/g, ''))}).animate({count: number}, {
    duration: duration ? duration : 1000,
    easing: 'swing', 
    step: function (now) {
      element.text((Math.floor(now) + suffix).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    },
    complete: function () {
      countingFromZero = false;
    }
  });
}
countToNumber($('.images'), 500, '', 200);

function setNum(){
  countToNumber($('.images'), $("#txt_start").val(), '', $("#txt_end").val());
}

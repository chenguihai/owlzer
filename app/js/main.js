var M = document.getElementById('M'),
  owlzerOBj = {
      // urlLogin: 'https://api.owlzer.com:18091',
      // urlLogin: 'https://192.168.3.12:18091',
      urlLogin: 'http://192.168.3.12:18090',
      url: 'http://192.168.3.12:18090',
      // url: 'http://api.owlzer.com:18090',
      G_DDP_SEESION_CHECK: 30 * 60 * 1000,
      API: new SendAPI(),
      UTILE: new UtileObj(),
      isDebug: false
  };

Q.reg('owlzer', function () {
    M.innerHTML = $("#M").load("./views/main.html");
}).reg([
    ['technology', function () {
        M.innerHTML = 'technology页面';
    }],
    ['app', function () {
        M.innerHTML = 'app页面~';
    }],
    ['spec', function () {
        M.innerHTML = $("#M").load("./views/spec.html");
        // owlzerOBj.UTILE.lazyloadCCS('./styles/spec.css', 'spec.css');
    }],
    ['support', function () {
        M.innerHTML = 'support页面~';
    }],
    ['login', function () {
        M.innerHTML = $("#M").load("./views/login.html");
        // owlzerOBj.UTILE.lazyloadCCS('./styles/login.css', 'login.css');
        owlzerOBj.UTILE.lazyloadJS('./js/login.js');
    }],
    ['table', function () {
        M.innerHTML = $("#M").load("./views/table.html");
        // owlzerOBj.UTILE.lazyloadCCS('./styles/table.css', 'table.css');
        owlzerOBj.UTILE.lazyloadJS('./js/table.js');
    }],
    ['privacy-policy', function () {
        M.innerHTML = $("#M").load("./views/privacy-policy.html");
    }],
]);
Q.init({
    index: 'owlzer', /* 首页地址 */
    pop: navchange = function (L) {/* 每次有url变更时都会触发pop回调 */
        /* L 为当前回调函数名称（目前仅支持关键字回调情况） */
        var $hash = $('.am-nav a[href="#!' + L + '"]');
        if (sessionStorage.getItem('loginInfo')) {
            $('#loginA').css("display", 'none');
            $('#tableA').css("display", 'block');
        } else {
            $('#loginA').css("display", 'block');
            $('#tableA').css("display", 'none');
        }
        if (L === 'privacy-policy') {
            $('.am-nav a').removeClass('nav_downline');
            return;
        }
        if ($hash) { //如果存在这个DOM
            // console.log(L);
            $hash.addClass("nav_downline").parent().siblings('li').children().removeClass('nav_downline');
        }
    }
});
function UtileObj() {
    this.Pagination = function (pageTotal, pageCount, currentPage) {
        this.pageNumArray = [];
        var pageStart,pageEnd;
        if (currentPage <= pageCount / 2 + 1) {
            pageStart = 1;
            pageEnd = pageCount;
        } else if (currentPage > pageCount / 2 + 1) {
            pageStart = currentPage - pageCount / 2;
            pageEnd = currentPage + pageCount / 2 - 1;
        }
        // 对pageEnd 进行校验，并重新赋值
        if (pageEnd > pageTotal) {
            pageEnd = pageTotal;
        }
        if (pageEnd <= pageCount) {// 当不足pageNum数目时，要全部显示，所以pageStart要始终置为1
            pageStart = 1;
        }
        for (var i = pageStart; i <= pageEnd; i++) {
            this.pageNumArray.push(i);
        }
        return (this.pageNumArray);
    };
    this.lazyloadJS = function (url) {
        var t = document.createElement("script");
        t.src = url;
        document.body.appendChild(t);
    };
    this.lazyloadCCS = function (url,name) {
        var t = document.createElement("link");
        t.id = name;
        t.href = url;
        t.rel = "stylesheet";
        document.head.appendChild(t);
    };
    this.formatTime = function (date, type){
        var date = new Date(date),
         year = date.getFullYear(),
         month = date.getMonth() + 1,
         day = date.getDate(),
         hour = date.getHours(),
         minute = date.getMinutes(),
         second = date.getSeconds();
        switch (type) {
            case 'hh:mm:ss YYYY-MM-dd':
                return hour < 12? 'AM':'PM'+ ' ' +[hour, minute, second].map(this.formatNumber).join(':')+ ' ' + [year, month, day].map(this.formatNumber).join('-');
            case 'dd-MM-YY':
              //   一月：Jan .二月：Feb.三月：Mar. 四月：Apr.五月：May. 六月：Jun.
              // 七月：Jul.八月：Aug.九月：Sept.十月：Oct.十一月：Nov.十二月：Dec.
              var monthCn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
                return [day, monthCn[month-1],year].map(this.formatNumber).join('-');
        }
    };
    this.formatNumber = function (n){
        n = n.toString();
        return n[1] ? n : '0' + n
    };
    this.jeDateLinkage = function(timeId) {
        var startTime = {
            multiPane: true,
            onClose: false,
            isClear: false,
            isToday: false,      //是否显示清空
            minDate: '2013-01-01 0:0:0',
            maxDate: $.nowDate({DD: 0}), //最大日期 当前日期的前一天
            format: 'YYYY-MM-DD',
            language:{
                name   : "en",
                month  : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                weeks  : [ "SUN","MON","TUR","WED","THU","FRI","SAT" ],
                times  : ["Hour","Minute","Second"],
                timetxt: ["Time","Start Time","End Time"],
                backtxt: "Back",
                clear  : "Clear",
                today  : "Now",
                yes    : "Confirm",
                close  : "Close"
            },
            okfun: function(obj){
                table_param.time = (new Date(obj.val)).getTime();
            },
            clearfun:function(elem, val) {
                table_param.time = '';
            }
        };
        $('#' + timeId).jeDate(startTime);
    };
    this.timeoutLogin = function() {
        var curtime = new Date().getTime(),
          a = sessionStorage.getItem('loginTime') - (-owlzerOBj.G_DDP_SEESION_CHECK);
        if (a < curtime) {
            sessionStorage.clear();
            Q.go('login');
        } else {
            sessionStorage.setItem('loginTime',curtime);
        }
    };
    // 提示框
    this.alertP = function(msg, time) {
        var t = time || 1000,$alertId = $('#alertId');
        $alertId.css('display','block');
        $('#alertId .boostTip').html(msg);
        var a = setTimeout(function () {
            $alertId.css('display','none');
            clearTimeout(a)
        }, t)
    }
}

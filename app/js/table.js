var table_param = {
      pageNum: 1,
      pageSize: 30,
      uuid: "",
      time: ""
  }, tableObj = {}, markImgObj = {},
  time = setTimeout(function () {
      $('#userName').html(JSON.parse(sessionStorage.getItem('loginInfo')).username);
      // if(!$("#table.css").length){
      //     owlzerOBj.UTILE.lazyloadCCS('./styles/table.css','table.css');
      // }
      owlzerOBj.UTILE.jeDateLinkage("dateId");
      clearTimeout(time);
  }, 100);
queryUserDevsFun();
stateGo(table_param.pageNum);


$('body').on("change", "#cameraId", function () {
    table_param.uuid = $(this).val();
}).on('click', "#searchBtn", function () {
    table_param.pageNum = 1;
    queryDevMsgPageSearchFun();
}).on('click', '.carListPage', function (e) {
    goToPage(parseInt(e.target.dataset.index));
}).on('click', '#carListPre', function () {
    var num = parseInt(table_param.pageNum) - 1 > 0 ? parseInt(table_param.pageNum) - 1 : 1;
    goToPage(num);
}).on('click', '#carListAfter', function () {
    var num = tableObj.table_totalPage > parseInt(table_param.pageNum) ? parseInt(table_param.pageNum) + 1 : tableObj.table_totalPage;
    goToPage(num);
}).on('click', '#goToPage', function (e) {
    var num = $("input[ name='goToPage'] ").val();
    goToPage(num);
}).on('click', '.showBigImg', function (e) {
    // var $showBigImg = $('.showBigImg');
    // markImgObj = {
    //     one:$showBigImg.attr("data-one"),
    //     second:$showBigImg.attr("data-second"),
    //     index:$showBigImg.attr("data-index")
    // };
    markImgObj = e.target.dataset;
    checkBigImg();
}).on('click', '.closeIconClass', function (e) {
    hideBigImgPopup();
}).on('click', '#prevBigImg', function (e) {
    prevBigImg();
}).on('click', '#nextBigImg', function (e) {
    nextBigImg();
}).on('click', '#downloadId', function (e) {
    var img = $('#bigPhoto').attr("src"),
      index = img.lastIndexOf("\/");
    str = img.substring(index + 1, img.length);
    downloadIamge('#bigPhoto', str);
}).on('click', '#logoutBtn', function (e) {
    $('#logoutId').css('display', 'block');
}).on('click', '#confirmLogout', function (e) {
    getLogout();
});

function downloadIamge(selector, name) {
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous');
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, image.width, image.height);
        if(isIE()){
            saveFileForIE(canvas, name);
        }{
            var url = canvas.toDataURL('image/jpg');
            // 生成一个a元素
            var a = document.createElement('a');
            // 创建一个单击事件
            var event = new MouseEvent('click');
            // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
            a.download = name || new Date().getTime();
            // 将生成的URL设置为a.href属性
            a.href = url;
            // 触发a的单击事件
            a.dispatchEvent(event)
        }
    };
    image.src = document.querySelector(selector).src
}
function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}
function saveFileForIE(canvas, fileName) {
    try {
        var blob = canvas.msToBlob();
        navigator.msSaveBlob(blob, fileName);
    }catch (e) {
        owlzerOBj.UTILE.alertP('Please upgrade your browser');
    }
}

function queryDevMsgPageFun(pageNum, pageSize) {
    var param = {
        pageNum: pageNum,
        pageSize: pageSize,
    }, url = owlzerOBj.url + '/device/api/v2/termdev/queryDevMsgPage';
    commonFun(url, param);
}

function queryDevMsgPageSearchFun() {
    var url = owlzerOBj.url + '/device/api/v2/termdev/queryDevMsgPage';
    commonFun(url, table_param);
}

function commonFun(url, param) {
    owlzerOBj.API.postJson(url, param, function (data) {
        tableObj = {
            table_list: data.error_info.data,
            table_total: data.error_info.total,
            table_totalPage: data.error_info.totalPage,
            table_allPages: owlzerOBj.UTILE.Pagination(data.error_info.totalPage, table_param.pageSize, table_param.pageNum)
        };
        // list = "", timeTd = '',
        var pageList = '<li class="carListPre" id="carListPre"></li>',
          $pagId = $("#paginationId"),
          $table = $('#table_list'), $noRecord = $(".noRecord");
        // 清空内容
        $table.children().remove();
        $pagId.children().remove();
        if (tableObj.table_list.length) {
            $pagId.css('display', 'table');
            $noRecord.css('display', 'none');
            // 分页
            $.each(tableObj.table_allPages, function (i, items) {
                pageList += '<li class="carListPage" data-index="' + items + '">' + items + '</li>';
            });
            pageList += '<li id="carListAfter" class="carListAfter"></li><li class="carListPageTo"><span>Go To</span><input type="text" name="goToPage"/></li><li class="carListSure"><span id="goToPage">Confirm</span></li>';
            $table.html(listComonFun(data.error_info.data));
            $pagId.html(pageList);
            $("#paginationId").find(".carListPage").eq(table_param.pageNum - 1).addClass("bluePage").siblings().removeClass('bluePage');
        } else {
            $pagId.css('display', 'none');
            $noRecord.css('display', 'block');
            $table.html('');
            $pagId.html('');
        }
    }, function (err) {
        tableObj = {
            table_list: [],
            table_total: 0,
            table_totalPage: 0,
            table_allPages: 0
        };
    });
}

function listComonFun(data) {
    var str = '';
    for (var h = 0; h < data.length; h++) {
        var list = "";
        if (data[h].length) {
            var timeRow = 0;
            $.each(data[h], function (i, item) {
                var listFor = '';
                // 图片
                $.each(item, function (j, items) {
                    timeRow = owlzerOBj.UTILE.formatTime(items.time, "dd-MM-YY");
                    listFor += '<img data-one="'+h+'" data-index="' + i + '" data-second="' + j + '" data-url="' + items.files.files[0].thumb + '" class="showBigImg" src="' + items.files.files[0].thumb + '" alt="picture">';
                });
                if (i === 0) {
                    list += '<tr class="table_bg"><td class="tc" rowspan="' + data[h].length + '">' + timeRow + '</td><td class="cameraTh">' + item[0].nickname + '</td><td>' + listFor + '</td></tr>';

                } else {
                    list += '<tr class="table_bg"><td class="cameraTh">' + item[0].nickname + '</td><td>' + listFor + '</td></tr>';
                }
            });
            str += list;
        }
    }
    return str;
}

// 退出登录
function getLogout() {
    var url = owlzerOBj.url + '/logout';
    owlzerOBj.API.getLogout(url, function (data) {
        if (data.error_code === 0) {
            sessionStorage.clear();
            var count  = 0 ;
            if(count === 0){
                location.reload();
            }
            Q.go('login');
        } else {
            // owlzerOBj.UTILE.alertP('退出失败');
            owlzerOBj.UTILE.alertP('Exit failure');
        }
    }, function (err) {
    })
}

//跳页
function goToPage(page) {
    if (page) {
        if (page > 0 && page <= tableObj.table_totalPage) { //总的页数
            stateGo(page);
        } else {
            if (page <= 0) {
                stateGo(1);
            }
            if (page > tableObj.table_totalPage) {
                stateGo(tableObj.table_totalPage);
            }
        }
    } else {
        stateGo(1);
    }
}

// if(table_param.pageNum === 1){
//     $('.carListPre').addClass('carListPreFirst');
// }else if(table_param.pageNum === tableObj.table_totalPage){
//     $('.carListAfter').addClass('carListAfterLast')
// }else{
//     // $('.carListPre').removeClass('carListPreFirst');/
//     // $('.carListAfter').removeClass('carListAfterLast')
// }
// $state.go的公共的方法
function stateGo(pageNum) {
    table_param.pageNum = pageNum;
    $("#paginationId").find(".carListPage").eq(pageNum - 1).addClass("bluePage").siblings().removeClass('bluePage');
    if (table_param.time === '' && table_param.uuid === '') {
        queryDevMsgPageFun(pageNum, table_param.pageSize);
    } else {
        queryDevMsgPageSearchFun()
    }
}

// 远端云设备列表
function queryUserDevsFun() {
    var url = owlzerOBj.url + "/device/api/v2/termdev/authorityMgr/queryUserDevs";
    owlzerOBj.API.getJson(url, function (data) {
        var list = '<option value="">All</option>';
        $.each(data.error_info, function (i, items) {
            list += '<option class="select_li" value="' + items.uuid + '">' + items.name + '</option>';
        });
        $('#cameraId').html(list);
    }, function (err) {

    })
}

// 查看大图片
function checkBigImg() {
    $('#checkBigImg').css('display', 'block');
    showArrowsCommonFun();
}

// 上一张
function prevBigImg() {
    if (markImgObj.second > 0) {
        markImgObj.second -= 1;
    } else {
        markImgObj.second = 0;
    }
    showArrowsCommonFun();
}

// 下一张
function nextBigImg() {
    if (markImgObj.second < tableObj.table_list[parseInt(markImgObj.one)][markImgObj.index]) {
        markImgObj.second -= -1;
    } else {
        markImgObj.second = tableObj.table_list[parseInt(markImgObj.one)][markImgObj.index];
    }
    showArrowsCommonFun();
}

// 关闭弹框
function hideBigImgPopup() {
    $('#checkBigImg').css('display', 'none');
    $('#logoutId').css('display', 'none');
}

function showArrowsCommonFun() {
    var text = tableObj.table_list[parseInt(markImgObj.one)],
      obj = text[markImgObj.index],
      $prevBigImg = $('#prevBigImg'), $nextBigImg = $('#nextBigImg');
    $('#photoIndex').html(markImgObj.second - (-1) + '/' + obj.length);
    $('#bigPhoto').attr('src', obj[markImgObj.second].files.files[0].thumb);
    // $('#timeMaskId').html(owlzerOBj.UTILE.formatTime(text[markImgObj.index][0].time, 'hh:mm:ss YYYY-MM-dd'));
    $('#timeMaskId').html(owlzerOBj.UTILE.formatTime(obj[markImgObj.second].time, 'hh:mm:ss YYYY-MM-dd'));
    $('#cameraMaskId').html(text[markImgObj.index][0].nickname);
    // $('#downloadId').attr('href',obj[markImgObj.second].thumb);
    if (markImgObj.second == 0 && markImgObj.second == obj.length - 1) {
        $prevBigImg.css('display', 'none');
        $nextBigImg.css('display', 'none');
    } else {
        if (markImgObj.second == 0) {
            $prevBigImg.css('display', 'none');
            $nextBigImg.css('display', 'block');
        } else if (markImgObj.second == obj.length - 1) {
            $prevBigImg.css('display', 'block');
            $nextBigImg.css('display', 'none');
        } else {
            $prevBigImg.css('display', 'block');
            $nextBigImg.css('display', 'block');
        }
    }
}
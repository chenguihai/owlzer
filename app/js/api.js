function SendAPI() {
    this.getJson = function (url, fn, errFun) {
        if (!owlzerOBj.isDebug) {
            this.httpCommonFun(url, '', 'get', fn, errFun);
        } else {
            var res = Mock.mock({
                "error_code": 0,
                "error_info|10": [{
                    "uuid|+1": "20170311-1689-11D3-0030-000000006512",
                    "macAddr": "00:7e:56:88:96:76",
                    "name": "@title(1,3)",
                    "productName": "@title(1, 2)",
                    "ssid": "@title(1, 2)",
                    "bssid": "00:7e:56:88:96:76",
                    "wifiPwd": "@integer(131000000,189999999)",
                    "version": "00:7e:56:88:96:76",
                    "orderNum": "@integer(3, 6)",
                    "testDate": '@datetime("yyyy-MM-dd A HH:mm:ss")',
                    "sn|+1": "@title(2)-@integer(0517042600000,0517042606666)",
                    "username": "@ctitle(3, 6)",
                    "company": "0x10005",
                    "network": "1001",
                    "iccid": '@natural(20)',
                    "cellNum": "@integer(13100000000,18999999999)",
                    "runTime": 11500,
                    "productDate": '@datetime("yyyy-MM-dd A HH:mm:ss")',
                    "devType": 1,
                    "opensl": 0,
                }]
            });
            console.log(JSON.stringify(res, null, 2));
            fn(res);
        }
    };
    this.getLogout = function (url, fn, errFun) {
        if (!owlzerOBj.isDebug) {
            this.httpCommonFun(url, '', 'get', fn, errFun);
        } else {
            var res = Mock.mock({
                "error_code": 0,
            });
            console.log(JSON.stringify(res, null, 2));
            fn(res);
        }
    };
    this.postJson = function (url, param, fn, errFun) {
        if (!owlzerOBj.isDebug) {
            this.httpCommonFun(url, param, 'post', fn, errFun);
        } else {
            var res = Mock.mock({
                'error_info': {
                    "total": 100,
                    "totalPage": 10,
                    "data|10": [
                      {
                        "id|+1": 1,
                        "nickname": "@ctitle(5, 10)-@integer(13100000000,18999999999)",
                        "files": {
                            "imagenum": 3,
                            "files|3": [
                                {
                                    "size": 3686400,
                                    "thumb": "http://7xiba5.com2.z0.glb.clouddn.com/07202017-1601-0000-0030-000000000098/20180517150931/file/image/M_20180517150923_0000_T.jpg",
                                    "name": "M_20180517150923_0000.jpg",
                                    "type": 0,
                                    "url": " "
                                }
                            ]
                        },
                        "time": 1526541008590
                    }]
                },
                "error_code": 0
            });
            console.log(JSON.stringify(res, null, 2));
            fn(res);
        }
    };
    // "Access-Control-Allow-Origin":"*"
    this.loginJson = function (url, param, fn, errFun) {
        if (!owlzerOBj.isDebug) {
            $.ajax({
                url: url + '/login',
                type: "post",
                data: param,
                // headers: {
                // 'Content-Type': "application/x-www-form-urlencoded",
                // },
                xhrFields: {
                    withCredentials: true
                },
                success: function (data, status) {
                    owlzerOBj.UTILE.timeoutLogin();
                    return fn(data);
                },
                error: function (err) {
                    owlzerOBj.UTILE.alertP('Server failure',2000);
                    return errFun(err);
                }
            });
        } else {
            var res = Mock.mock({
                "error_code": 0,
                "error_info":
                  {
                      "session": "fs22gewg-fsg564sg-sdfgs",
                      "system_time": 1102563000,
                      "username": "hello@ddpai.com",
                      "session_timeout": "1800",
                      "user_id": 100,
                      "termscode": "20180510",
                      "termslink": "http://cdn.statichw.ddpai.com/appweb/treadty_en_US.html",
                      "termstoken": "lsjlf-jsljfaosd645-sljfpajop"
                  }
            });
            console.log(JSON.stringify(res, null, 2));
            fn(JSON.stringify(res));
        }
    };
    this.httpCommonFun = function (url, data, method, seccFun, failFun) {
        $.ajax({
            url: url,
            method: method ? method : 'get',
            data: data ? JSON.stringify(data) : '',
            dataType: "json",
            headers: {
                'Content-Type': "application/json; charset=utf-8",
            },
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                owlzerOBj.UTILE.timeoutLogin();
                return seccFun(res);
            }, error: function (err) {
                owlzerOBj.UTILE.alertP('Server failure',2000);
                owlzerOBj.UTILE.timeoutLogin();
                return failFun(err);
            }
        });
    }
}

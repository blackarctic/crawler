(function () {

    var setup = function () {
        var page = require("webpage").create();
        page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36";
        page.clearCookies();
        return page;
    };

    var crawl = function (page, data, check, onReady, timeOut, next) {
        try {
            var _eval = function (page, check, onReady, timeOut, next) {
                page.includeJs("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js", function () {
                    waitFor(function () {
                        return page.evaluate(check)
                    }, function () {
                        next(page.evaluate(onReady));
                    }, timeOut); // timeOut in ms
                });
            };
            if (data.url) {
                page.open(data.url, function(status) {
                    if (status !== "success") { throw status; }
                    _eval(page, check, onReady, timeOut, next);
                });
            }
            else {
                _eval(page, check, onReady, timeOut, next);
            }
        }
        catch (error) {
            console.log(error);
            phantom.exit(1);
        }
    };

    var close = function (code) {
        phantom.exit(code);
    };

    var waitFor = function(testFx, onReady, timeOutMillis) {
        // from https://github.com/ariya/phantomjs/blob/master/examples/waitfor.js
        var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
            start = new Date().getTime(),
            condition = false,
            interval = setInterval(function() {
                if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                    // If not time-out yet and condition not yet fulfilled
                    condition = testFx();
                } else {
                    if(!condition) {
                        // If condition still not fulfilled (timeout but condition is 'false')
                        // console.log("'waitFor()' timeout");
                        phantom.exit(1);
                    } else {
                        // Condition fulfilled (timeout and/or condition is 'true')
                        // console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                        onReady(); //< Do what it's supposed to do once the condition is fulfilled
                        clearInterval(interval); //< Stop this interval
                    }
                }
            }, 250); //< repeat check every 250ms
    };

    module.exports = {
        setup: setup,
        crawl: crawl,
        close: close,
    };

})();
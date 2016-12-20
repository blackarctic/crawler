var crawler = require("./lib/crawler");
var page = crawler.setup();

var initialCrawl = function (next) {
    crawler.crawl(page,
    {
        url: "http://testing-ground.scraping.pro/ajax",
    },
    function () {
        // check the page is ready (with $)...
        return $("#ajaxJson a").length;
    },
    function () {
        // interact with the page (with $)...
        $("#ajaxJson a").click();
    },
    5000,
    function (result) {
        // onto the next crawl...
        next();
    });
}

var followUpCrawl = function () {
    crawler.crawl(page, {},
    function () {
        // check the page is ready (with $)...
        return $("#ajaxJson ul li").length;
    },
    function () {
        // crawl the page (with $)...
        var items = [];
        $("#ajaxJson ul li").each(function (i, elem) {
            items.push($(elem).html());
        });
        return items;
    },
    5000,
    function (result) {
        // process the result...
        result.map(function (elem) {
            console.log(elem);
        });
        crawler.close(0);
    });
}

initialCrawl(function () {
    followUpCrawl();
});


var crawler = require("./lib/crawler");
var page = crawler.setup();

/* include these if you need them... */
// var fs = require("fs");
// var system = require("system");


/* edit "crawl" calls to your liking... */

crawler.crawl(page,

    // data...
    {
        url: "https://example.com" // set a url to navigate
                                   // or leave blank
    },

    // check...
    function () {
        // check the page is ready (with $)...

        // here: you must return a boolean of whether
        //       or not the desired content is ready
        //
        // ex:   return $("#main li").length

        return true;
    },

    // interact...
    function () {
        // crawl the page (with $)...

        // here: you may return a result
        //
        // ex:   return $("#main li").first().html()

    },

    // timeout limit...
    5000, // set the timeout (ms) for checking that the page is ready

    // process...
    function (result) {
        // process the result...

        // here: you may process the result
        //
        // ex:   console.log(result)

        crawler.close(0);
    }
);
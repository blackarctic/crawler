# Crawler

A boilerplate for web crawling with PhantomJS

## Get Started

1) Install PhantomJS:

```sh
npm i
```

2) Run the example

```sh
npm run example
```

You should see something like...

```sh
George
Eric
Alice
```

## Create Your Own

1) Open `crawl.js` and edit the call to `crawl`

```js
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
```

TIP: You can also chain multiple `crawl` calls for more advanced crawling (see `crawl-example.js`).

2) Run your crawler

```sh
npm start
```

## Questions?

Tweet to me [@blackarctic](https://twitter.com/_blackarctic). Happy to talk.
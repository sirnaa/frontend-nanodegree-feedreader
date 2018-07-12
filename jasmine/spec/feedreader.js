/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        describe('URL in RSS feeds', function() {
            allFeeds.forEach(function(feed) {
                it('exists', function() {
                    expect(feed.url).toBeDefined();
                });
                it('path has content', function() {
                    expect(feed.url.length).not.toBe(0);
                });
                it('begins with http/https', function() {
                    expect(feed.url).toContain('http' || 'https');
                });
            });
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        describe('RSS Feeds', function() {
            allFeeds.forEach(function(feed) {
                it('have a name', function() {
                    expect(feed.name).toBeDefined();
                });
                it('contains a valid name', function() {
                    expect(feed.name).not.toBe(0);
                });
            });
        });

    });


    describe('The menu', function() {

        /* a test that ensures the menu element is
         * hidden by default.
         */

        it('is hidden by default', function() {
            expect(document.body.className).toContain('menu-hidden');
        });

        /* a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * has two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('displays when clicked, hides when clicked again', function() {
            $('.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden');
            $('.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden');
        });


    });




    describe('Initial Entries', function() {
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        beforeEach((done) => {
            loadFeed(0, () => {
                done();
            });
        });
        it('contains at least a single entry in the feed container', function(done) {
            let entriesNum = document.querySelector('.feed').getElementsByClassName('entry-link').length;
            expect(entriesNum).toBeGreaterThan(0);
            done();
        });

    });


    describe('New Feed Selection', function() {
        let initialContent;
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                initialContent = document.querySelector('.feed').innerHTML;
                loadFeed(1, () => {
                    done();
                });
            });
        });
        it('changes the content of the page', function(done) {
            let newContent = document.querySelector('.feed').innerHTML;
            expect(newContent).not.toBe(initialContent);
            done();
        });
    });


}());

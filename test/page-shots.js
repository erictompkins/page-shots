const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;

const main = require('../src/main');
const pageShots = main.pageShots;

// Confirm that the base URL is properly set
describe('setBaseUrl', function() {
    it ('should set valid base URL', function() {
        let url = 'http://mysite.com';
        pageShots.setBaseUrl(url);
        assert.equal(url, pageShots.baseUrl);
    });
    it ('should set valid base URL with the / removed', function() {
        let url = 'http://mysite.com/',
            finalUrl = 'http://mysite.com';
        pageShots.setBaseUrl(url);
        assert.equal(finalUrl, pageShots.baseUrl);
    });
    it ('should be set in the URL object', function() {
        let baseUrl = 'http://mysite.com';
        let url = '/page';
        pageShots.urls = [];
        pageShots.setBaseUrl(baseUrl);
        pageShots.addUrl(url);
        let urlObj = pageShots._setupUrl(pageShots.urls[0]);
        assert.equal(baseUrl, urlObj.baseUrl);
        assert.equal(baseUrl + url, urlObj.url);
    });
    it ('should remove the trailing "/"', function() {
        let baseUrl = 'https://mysite.com/';
        let url = '/page';
        pageShots.setBaseUrl(baseUrl);
        pageShots.urls = [];
        pageShots.addUrl(url);
        let urlObj = pageShots._setupUrl(pageShots.urls[0]);
        assert.equal('https://mysite.com', urlObj.baseUrl);
        assert.equal('https://mysite.com/page', urlObj.url);
    });
    it ('should add a / between the base URL and the page if the base URL does not end with "/" and the URL does not start with "/"', function() {
        pageShots.urls = [];
        pageShots.setBaseUrl('https://www.mysite.com');
        pageShots.addUrl('my-page');
        let urlObj = pageShots._setupUrl(pageShots.urls[0]);
        assert.equal('https://www.mysite.com/my-page', urlObj.url);
    });
    it ('should ensure that only one "/" is between the base URL and the page URL', function() {
        pageShots.urls = [];
        pageShots.setBaseUrl('https://www.mysite.com/');
        pageShots.addUrl('/my-page');
        let urlObj = pageShots._setupUrl(pageShots.urls[0]);
        assert.equal('https://www.mysite.com/my-page', urlObj.url);
    });
});


// Confirm that the directory gets properly set
describe('setDirectory', function() {
    it('should set the directory', function() {
        let dir = 'testdir';
        pageShots.setDir(dir);
        assert.equal(dir, pageShots.dir);
    });
});

// Confirm that the file type gets properly set
describe('setFileType', function() {
    it('should set the file type to png', function() {
        let type = 'png';
        pageShots.setFileType(type);
        assert.equal(type, pageShots.fileType);
    });
    it('should set the file type to jpg', function() {
        let type = 'jpg';
        pageShots.setFileType(type);
        assert.equal(type, pageShots.fileType);
    });
    it('should not allow an invaliid page type to be set', function() {
        let type = 'gif';
        let originalType = pageShots.fileType;
        pageShots.setFileType(type);
        assert.equal(originalType, pageShots.fileType);
    });
});


// Confirm that adding URL works
describe('addUrl', function() {
    it('adding a single URL should increment the URLs array by 1', function() {
        let numUrls = pageShots.urls.length;
        pageShots.addUrl('URL');
        expect(pageShots.urls).to.have.lengthOf(numUrls + 1);
    });
    it('adding 2 URLs should increment the URLs array by 2', function() {
        let numUrls = pageShots.urls.length;
        pageShots.addUrl(['URL', 'URL2']);
        expect(pageShots.urls).to.have.lengthOf(numUrls + 2);
    });
});
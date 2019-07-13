const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const assert = chai.assert;

const main = require('../src/main');
const pageShots = main.pageShots;


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
    it('should set the file type', function() {
        let type = 'png';
        pageShots.setFileType(type);
        assert.equal(type, pageShots.fileType);
    });
});


// Confirm that adding a single URL works
describe('addUrl', function() {
    it('adding URL should increment the URLs array by 1', function() {
        let numUrls = pageShots.urls.length;
        pageShots.addUrl('URL');
        expect(pageShots.urls).to.have.lengthOf(numUrls + 1);
    });
});
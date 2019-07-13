/**
 * Main file to process the screenshot
 */
const puppeteer = require('puppeteer'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    sanitize = require('sanitize-filename'),
    ora = require('ora');

/**
 * Main class to run and process the screenshots
 */
class PageShots {
    /**
     * Constructor
     */
    constructor() {
        this.baseUrl = '';
        // The directory that screenshots are saved in
        this.dir = '';
        // The list of URLs to get screenshots for
        this.urls = [];
        // The time that the script started running
        this.startTime = process.hrtime();
        // Holds the time for when a page started
        this.pageStartTime = 0;
        // The file type to save the screenshots as
        this.fileType = 'jpg';
        // Holds the image quality if the screenshot is a jpg
        this.quality = 100;
        // Holds the spinner
        this.spinner = null;
        // Holds the viewport width to get the screenshot in
        this.width = 1300;
        // Holds the viewport height to get the screenshot in
        this.height = 900;
        // Holds whether or not the screenshot should be full page
        this.fullPage = true;
        // Holds an object which specifies clipping region of the page.
        this.clip = false;
        // Holds the browser object
        this.browser = null;
        // Holds the page object
        this.page = null;
    }

    async init() {
        let _self = this;
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();

        this.page.on('load', function() {
            _self.spinner.succeed(chalk.green(this.url() + ' loaded in ' + _self._getPageElapsedTime()));
        });
    }

    /**
     * Sets the base URL.
     * This is not required, but if it's set, then the base URL will be
     * prepended to all other URLs
     * @param {string} url The base URL
     */
    setBaseUrl(url) {
        if (typeof url === 'string' && url.length > 1) {
            if (url.substring(url.length -1) == '/') {
                url = url.substring(0, url.length -1);
            }
            this.baseUrl = url.trim();
        }
    }

    /**
     * Set the directory to output the screenshots to
     * @param {string} dir The directory relative to where the script is run to output the screenshots to
     */
    setDir(dir) {
        if (typeof dir === 'string' && dir.length > 0) {
            this.dir = dir.trim();
        }
    }

    /**
     * Sets the file type to save screenshots as
     * @param {string} type The file type to save screenshots as
     */
    setFileType(type) {
        type = this._validateType(type);
        if (type) {
            this.fileType = type;
        }
    }

    /**
     * Validates that the file type is allowed
     * @param {string} type The file type
     * @return {string|boolean} The valid file type or false if the type is not valid
     */
    _validateType(type) {
        let returnVal = false;
        if (typeof type === 'string' && type.length > 0) {
            type = type.toLowerCase();
            if (type === 'jpg' || type == 'jpeg' || type === 'png' || type == 'pdf') {
                if (type == 'jpeg') {
                    type = 'jpg';
                }
                returnVal = type;
            }
        }
        return returnVal;
    }

    /**
     * Adds a URL to get a screenshot for
     * @param {string|Array|object} url 
     */
    addUrl(url) {
        if (Array.isArray(url)) {
            for (let u of url) {
                this._addUrl(u);
            }
        } else {
            this._addUrl(url);
        }
    }

    /**
     * Adds a URL to get a screenshot for
     * @param {string|object} url 
     */
    _addUrl(url) {
        if (typeof url === 'string') {
            if (url.length > 0) {
                this.urls.push({url: url});
            }
        } else if (typeof url === 'object' && typeof url.url !== 'undefined') {
            this.urls.push(url);
        }
    }

    /**
     * Sets the width of the viewport to take the screenshot in
     * @param {integer} width 
     */
    setWidth(width) {
        width = parseInt(width);
        if (width > 0) {
            this.width = width;
        }
    }

    /**
     * Sets the height of the viewport to take the screenshot in
     * @param {integer} height 
     */
    setHeight(height) {
        height = parseInt(height);
        if (height > 0) {
            this.height = height;
        }
    }

    /**
     * Sets whether or not to get a full page screenshot
     * @param {string|boolean} full 
     */
    setFullScreen(full) {
        if (full === 'y' || full === 'yes' || full === true || full === 'true') {
            this.fullPage = true;
        } else {
            this.fullPage = false;
        }
    }

    /**
     * Sets the file name for the first URL
     * @param {string} name The file name
     */
    setName(name) {
        if (typeof name === 'string' && name.length > 0) {
            this.urls[0]['name'] = name;
            let ext = this._validateType(path.extname(name).toLowerCase().replace('.', ''));
            if (ext) {
                this.urls[0]['type'] = ext;
            }
        }
    }

    /**
     * Sets the quality to save jpg images as
     * @param {integer} quality
     */
    setQuality(quality) {
        quality = parseInt(quality);
        if (quality > 0 && quality <= 100) {
            this.quality = quality;
        }
    }

    setClip(x, y, w, h) {
        x = parseInt(x);
        y = parseInt(y);
        w = parseInt(w);
        h = parseInt(h);
        if (x >= 0 && y >= 0 && w >= 0 && h >= 0) {
            this.clip = {
                x: x,
                y: y,
                width: w,
                height: h
            }
        }
    }

    /**
     * Get the screenshots of all of the URLs
     */
    async run() {
        let spinner;
        try {
            console.log('');

            for (let url of this.urls) {
                this.pageStartTime = process.hrtime();
                url = this._setupUrl(url);
                this._createDir(url.dir);
                this.spinner = ora({text: 'Loading ' + url.url, spinner: 'arc'}).start();
                await this.page.goto(url.url);
                
                if (url.type !== 'pdf') {
                    // Save image screenshot
                    spinner = ora({text: 'Starting ' + url.type + ' screenshot ' + url.path + ' (' + url.width + 'px / ' + url.height + 'px)', spinner: 'arc'}).start();
                    await this.page.setViewport(this._getViewportConfig(url));
                    await this.page.screenshot(this._getScreenshotConfig(url));
                    spinner.succeed(chalk.green('Saved ' + url.path + ' (' + url.width + 'px / ' + url.height + 'px)'));
                } else {
                    // Save PDF. 
                    spinner = ora({text: 'Starting PDF screenshot ' + url.path, spinner: 'arc'}).start();
                    await this.page.setViewport(this._getViewportConfig(url));
                    // Not sure that setting "screen" works as the PDF view seems to only captures the "print" view of the page
                    await this.page.emulateMedia('screen');
                    await this.page.pdf(this._getPdfConfig(url));
                    spinner.succeed(chalk.green('Saved PDF ' + url.path));
                }
                console.log('');
            }

            await this.browser.close();

            this._printElapsedTime();
        } catch (err) {
            if (typeof spinner !== 'undefined') {
                spinner.stop();
            }
            await this.die();
            console.log(err);
            return null;
        }
    }

    /**
     * Kills everything in case of an error
     */
    async die() {
        if (this.spinner !== null) {
            this.spinner.stop();
        }
        if (this.browser !== null) {
            await this.browser.close();
        }
    }

    /**
     * Creates the directory if it doesn't exist already
     */
    _createDir(dir) {
        if (dir.length > 0 && !fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

    /**
     * Sets up the options for the URL
     * @param {object} url The URL object
     * @return {object}
     */
    _setupUrl(url) {
        url.baseUrl = this._getBaseUrl(url);

        // Set the URL to be made up of the baseURL and the URL value if necessary
        if (url.baseUrl.length > 0) {
            if (url.url.substring(0, url.baseUrl.length) !== url.baseUrl && url.url.match(/^http(s?):\/\//) === null) {
                if (url.url.substring(0, 1) !== '/') {
                    url.url = '/' + url.url;
                }
                url.url = url.baseUrl + url.url;
            }
            
        }

        url.clip = this._getClip(url);
        url.dir = this._getDir(url);
        url.filename = this._getFilename(url);
        url.fullPage = this._getFullPage(url);
        url.height = this._getHeight(url);
        url.path = this._getPath(url);
        url.quality = this._getQuality(url);
        url.type = this._getType(url);
        url.width = this._getWidth(url);

        
        return url;
    }

    /**
     * Gets the base URL if available
     * @param {object} url The URL object
     * @return {string}
     */
    _getBaseUrl(url) {
        let baseUrl = this.baseUrl;
        if (typeof url.baseUrl === 'string' && url.baseUrl.length > 0) {
            baseUrl = url.baseUrl;
        }
        return baseUrl;
    }

    /**
     * Gets the screenshot clip object if available
     * @param {object} url The URL object
     * @return {object|boolean}
     */
    _getClip(url) {
        let clip = this.clip,
            x,y,w,h;
        if (
            typeof url.clip !== 'undefined' 
            && typeof url.clip.x !== 'undefined' 
            && typeof url.clip.y !== 'undefined'
            && typeof url.clip.width !== 'undefined'
            && typeof url.clip.height !== 'undefined'
        ) {
            x = parseInt(url.clip.x);
            y = parseInt(url.clip.y);
            w = parseInt(url.clip.width);
            h = parseInt(url.clip.height);
            if (x >= 0 && y >= 0 && w >= 0 && h >= 0) {
                clip = {
                    x: x,
                    y: y,
                    width: w,
                    height: h
                }
            }
        }
        return clip;
    }

    /**
     * Gets the directory to save the screenshot or PDF in
     * @param {object} url The URL object
     * @return {string}
     */
    _getDir(url) {
        let dir = this.dir;
        if (typeof url.dir === 'string' && url.dir.length > 0) {
            dir = url.dir;
        }
        return dir;
    }

    /**
     * Gets the file name to save the screenshot or PDF as
     * @param {string} url 
     * @returns {string}
     */
    _getFilename(url) {
        let filename = '',
            type = this._getType(url),
            ext,
            setExt = true;

        if (typeof url.name !== 'undefined') {
            filename = url.name;
        } else {
            // Create the filename based on the URL
            filename = url.url.replace(/http(s?):\/\//, '');
            filename = sanitize(filename, {replacement: '-'});
            filename = filename.replace(/\.+/g, '-');
            filename = filename.replace(/-{2,}/g, '-');
            if (filename.substring(filename.length - 1) == '-') {
                filename = filename.substring(0, filename.length -1);
            }
        }

        // Add the extension
        ext = this._validateType(path.extname(filename).toLowerCase().replace('.', ''));
        if (ext) {
            setExt = false
        }
        if (setExt) {
            filename += '.' + type;
        }

        return filename;
    }

    /**
     * Gets whether or not the screenshot should be full screen for the URL
     * @param {object} url The URL object
     * @return {boolean}
     */
    _getFullPage(url) {
        let fullPage = this.fullPage;
        if (typeof url.fit !== 'undefined') {
            if (url.fit === true || url.fit === 'true' || url.fit === 'y' || url.fit === 'yes') {
                fullPage = false;
            } else {
                fullPage = true;
            }
        }
        if (typeof url.full !== 'undefined') {
            if (url.full === true || url.full === 'true' || url.full === 'y' || url.full === 'yes') {
                fullPage = true;
            } else {
                fullPage = false;
            }
        }
        return fullPage;
    }

    /**
     * Gets the height to view the page as
     * @param {object} url The URL object
     * @return {integer}
     */
    _getHeight(url) {
        let height = this.height;
        if (typeof url.height === 'number') {
            let num = parseInt(url.height);
            if (num > 1) {
                height = num;
            }
        }
        return height;
    }

    /**
     * Gets the path to save the screenshot or PDF at
     * @param {object} url The URL object
     * @return string
     */
    _getPath(url) {
        return path.join(this._getDir(url), this._getFilename(url));
    }

    /**
     * Gets whether or not the screenshot should be full screen for the URL
     * @param {object} url The URL object
     * @return {integer}
     */
    _getQuality(url) {
        let quality = this.quality;
        if (typeof url.quality === 'number') {
            let num = parseInt(url.quality);
            if (num > 0 && num <= 100) {
                quality = num;
            }
        }
        return quality;
    }

    /**
     * The file type to save the screenshot or PDF as
     * @param {object} url The URL object
     * @return {string}
     */
    _getType(url) {
        let type = this.fileType;
        if (typeof url.type !== 'undefined') {
            let urlType = this._validateType(url.type);
            if (urlType) {
                type = urlType;
            }
        }
        return type;
    }

    /**
     * Gets the width to view the page as
     * @param {object} url The URL object
     * @return {integer}
     */
    _getWidth(url) {
        let width = this.width;
        if (typeof url.width === 'number') {
            let num = parseInt(url.width);
            if (num > 1) {
                width = num;
            }
        }
        return width;
    }

    /**
     * Gets the configuration object for changing the page viewport
     * @param {object} url The URL information
     * @returns {object}
     */
    _getViewportConfig(url) {
        let config = {
            width: url.width,
            height: url.height
        };
        return config;
    }

    /**
     * Gets the configuration object for taking a screenshot
     * @param {object} url The URL information
     * @returns {object}
     */
    _getScreenshotConfig(url) {
        let config = {
            fullPage: url.fullPage,
            path: url.path
        };
        if (url.type == 'jpg') {
            config.quality = url.quality;
        }
        if (url.clip) {
            config.fullPage = false;
            config.clip = url.clip;
        }
        return config;
    }

    /**
     * Gets the configuration for saving the page as a PDF
     * @param {object} url The URL object
     */
    _getPdfConfig(url) {
        let config = {
            path: url.path,
            preferCSSPageSize: true
        };
        return config;
    }

    /**
     * Prints the total time that it took to get all screenshots
     * @return {string}
     */
    _getPageElapsedTime() {
        let diff = process.hrtime(this.pageStartTime);
        let time = diff[0] + diff[1] / 1e9;
        return time + 's';
    }

    /**
     * Prints the total time that it took to get all screenshots
     */
    _printElapsedTime() {
        let diff = process.hrtime(this.startTime);
        let time = diff[0] + diff[1] / 1e9;
        console.log(chalk.bold('Total time to get screenshots: ') + time + 's');
    }
}

exports.pageShots = new PageShots();
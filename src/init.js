const fs = require('fs'),
    path = require('path')
    chalk = require('chalk'),
    sanitize = require('sanitize-filename'),
    ora = require('ora');

/**
 * Initialize the JSON file used to configure the URLs to get screenshots of
 */
class InitJson {
    /**
     * Constructor
     */
    constructor() {
        this.dir = '';
        this.filename = 'shots.json';
    }

    /**
     * Set the name of the directory to save the file in
     * @param {string} dir The name of the diectory to save the file in
     */
    setDir(dir) {
        if (typeof dir === 'string') {
            dir = dir.trim();
            if (dir.length > 1) {
                if (dir.substring(dir.length -1) !== '/') {
                    dir = dir + '/';
                }
                this.dir = dir;
            }
        }
    }

    /**
     * Set the file name for the JSON file
     * @param {string} name The filename for the JSON file
     */
    setFilename(name) {
        let ext = path.extname(name).toLowerCase().replace('.', '');
        if (ext !== 'json') {
            name += '.json';
        }
        name = sanitize(name, {replacement: '-'})
        this.filename = name;
    }

    /**
     * Builds and saves the json file
     */
    build() {
        let json = {
            baseUrl: '',
            nameFormat: '{url}-{width}',
            type: 'jpg',
            urls: [],
            sizes: [
                '1300x800'
            ]
        }
        let filePath = path.join(this.dir, this.filename),
            spinner = ora({text: 'Creating ' + this.filename, spinner: 'arc'}).start();

        const writeStream = fs.createWriteStream(filePath, {flags: 'w'});
        writeStream.write(JSON.stringify(json, null, 4));
        writeStream.close();
        spinner.succeed(chalk.green(this.filename + ' created'));
    }
}

exports.json = new InitJson;
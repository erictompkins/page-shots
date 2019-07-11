
const puppeteer = require('puppeteer'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    sanitize = require('sanitize-filename'),
    ora = require('ora');

const config = {
    urls: [
        'https://www.revere.org',
        'https://www.revere.org/departments'
    ]
}

async function run(config) {
    let dir = 'screenshots',
        startTime = process.hrtime();

    // Create the output directory
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    console.log(`${chalk.bold('Directory to save screenshots in') dir}`);

    // Launch the browser
    const browser = await puppeteer.launch();
    console.log(`Browser version: ${chalk.bold(await browser.version())}`);
    console.log(`User Agent: ${chalk.bold(await browser.userAgent())}`);

    const page = await browser.newPage();
    let spinner;
    page.on('load', function() {
        
        spinner.succeed(this.url() + 'loaded');
        //console.log('page loaded');
    });

    for (let url of config.urls) {
        let filename = sanitize(url, {replacement: '-'}) + '.jpg';
        spinner = ora('Loading ' + url).start();
        //console.log(`Loading ${chalk.bold(url)}`);
        await page.goto(url);

        // await page.setViewport({width: 1300, height: 900});
        // await page.screenshot({
        //     fullPage: true,
        //     path: path.join(dir, filename)
        // })
    }

    // Close the browser instance
    await browser.close();
}

run(config);
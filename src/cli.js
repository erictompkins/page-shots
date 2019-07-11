/**
 * Command line interface
 */
const program = require('commander'),
    pkg = require('../package.json'),
    main = require('./main'),
    pageShots = main.pageShots;


/**
 * Collect multiple parameter values into one array
 * @param {string} val 
 * @param {array} values 
 */
function collect(val, values) {
    values.push(val);
    return values;
}

// Set up command line arguments
program
  .version(pkg.version, '-v, --version')
  .description(pkg.description)
  .option('-u, --url <string>', 'URL to get the screenshot of.', collect, [])
  .option('-d, --dir <string>', 'The directory relative to where the script is run to output the screenshots to.')
  .option('-H, --height <integer>', 'Integer height of the viewport to take the screenshot in.', 1300)
  .option('-W, --width <integer>', 'Integer width of the viewport to take the screenshot in.', 900)
  .option('-f, --fit', 'Fit the screenshot to the provided height and width.')
  .option('-t, --type <string>', 'The file type to use for the screenshots. "jpg" or "png"', 'jpg')
  .option('-q, --quality <integer>', 'The quality of the jpg image, between 0-100. Not applicable to png image.', 100)
  .option('-n, --name <string>', 'The name of the file to save the screenshot as. Only applies to the first URL.')
  .option('--clipX <integer>', 'The x-coordinate of top-left corner of clip area.')
  .option('--clipY <integer>', 'The y-coordinate of top-left corner of clip area.')
  .option('--clipW <integer>', 'The width of clip area.')
  .option('--clipH <integer>', 'The height of clip area.');  

// Output some additional examples
program.on('--help', function() {
    console.log('');
    console.log('Examples:')
    console.log('  page-shots -d images -u https://www.mysite.com');
    console.log('  page-shots -u https://www.mysite.com -u https://www.mysite.com/page');
    console.log('  page-shots -d images -u https://www.mysite.com -w 900');
    console.log('  page-shots -d images -u https://www.mysite.com -w 900 -q 80');
    console.log('  page-shots -d images -u https://www.mysite.com -w 900 -t png');
    console.log('  page-shots -d images -u https://www.mysite.com -w 450 -h 800 --fit');
    console.log('');
});

program.parse(process.argv);

/**
 * Main function to run the CLI
 */
async function cli() {
    try {
        // Initialize pageShots
        await pageShots.init();

        // Handle the arguments
        if (program.dir) {
            pageShots.setDir(program.dir);
        }
        if (program.url) {
            pageShots.addUrl(program.url);
        }
        if (program.height) {
            pageShots.setHeight(program.height);
        }
        if (program.width) {
            pageShots.setWidth(program.width);
        }
        if (program.fit) {
            pageShots.setFullScreen(false);
        }
        if (program.type) {
            pageShots.setFileType(program.type);
        }
        if (program.quality) {
            pageShots.setQuality(program.quality);
        }
        console.log('clipX: ', program.clipX);
        if (
            typeof program.clipX !== 'undefined' 
            && typeof program.clipY !== 'undefined'
            && typeof program.clipW !== 'undefined' 
            && typeof program.clipH !== 'undefined'
        ) {
            pageShots.setClip(program.clipX, program.clipY, program.clipW, program.clipH);
        }
        // The name must be set after the URLs are set because it only applies to the first URL
        if (program.name) {
            pageShots.setName(program.name);
        }
        pageShots.run();
    } catch (err) {
        await pageShots.die();
        console.log(err);
    }
}

/**
 * Output any unhandled rejections
 */
process.on('unhandledRejection', function(err) {
    console.log('----- ERROR ------');
    console.log(err);
});

exports.cli = cli;
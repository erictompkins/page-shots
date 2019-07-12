Page Shots
====

Page Shots is a command line interface for taking screenshots of one or more pages of a website.

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![LGPL-3.0 licensed][shield-license]][info-license]

On the command line:

```
page-shots -u https://www.branchcms.com
```

There are, of course, a lot more configuration options.

Table Of Contents
-----------------

- [Requirements](#requirements)
- [Install](#install)
- [Command Line Options](#command-line-options)
- [Filenames and Directories](#files-and-directories)
- [Full Screen and Fixed Size Screenshots](#full-screen-and-fixed-size-screenshots)
- [Command Line Examples](#command-line-examples)
- [License](#license)


Requirements
-----------------

Page Shots requires [Node.js][node] to run.



Install
-----------------

```
npm install -g page-shots
```

Command Line Options
-----------------

<span class="toc" markdown="1">

| Argument                | Description |
| :---------------------- | :---------- |
| -d, --dir <string>      | The directory relative to where the script is run to output the screenshots to. |
| -f, --fit               | Fit the screenshot to the provided height and width. |
| -H, --height <integer>  | Integer height of the viewport to take the screenshot in. Defaults to 900 |
| -n, --name <string>     | The name of the file to save the screenshot as. Only applies to the first URL so it's only useful if getting just one screenshot. |
| -t, --type <string>     | The file type to use for the screenshots. "jpg" or "png". Defaults to "jpg". |
| -q, --quality <integer> | The quality of the jpg image, between 0-100. Not applicable to png image. Defaults to 100 |
| -u, --url <string>      | URL to get the screenshot of. You can specify this parameter multiple times to get a screenshot of multiple web pages. |
| -W, --width <integer>   | Integer width of the viewport to take the screenshot in. Defaults to 1300 |
| -v, --version           | Output the version number |
| --clipH <integer>       | The height of the clip area. |
| --clipW <integer>       | The width of the clip area. |
| --clipX <integer>       | The x-coordinate of top-left corner of clip area. |
| --clipY <integer>       | The y-coordinate of top-left corner of clip area. |

</span>

<style>
.toc th:first-child, .toc td:first-child {width: 150px;}
</style>

Filenames and Directories
-----------------

By default the screenshot will be saved in the same directory that you call the command in and by default the file name will be based on the URL of the page. Also, by default, the screenshot will be a jpg image.

For example, if the URL is `https://www.branchcms.com` then the file name will be `www-branchcms-com.jpg`.

You can specify a file name for the screenshot. The file name can be just the name without the extension, or if can include the "jpg" or "png" extension. If the file name does not have an extension or it doesn't match either "jpg" or "png" extension then the correct extension based on the `type` argument will be used.

You can specify a directory to save the screenshot(s) in. The directory will be relative to where you call the command. If the directory does not exist then it will be created.


Full Size and Fixed Size Screenshots
-----------------

By default all screenshots will capture the entire page, not just within the height and width specified. You can use the `--fit` option to only capture the page within the specified height and width.

You can go even further and capture just a clip of the page by using the `-clipH`, `-clipW`, `-clipX`, and `-clipY` options. You must specify all four parameters for a clip to be taken.


Command line examples
-----------------

Usage

```
page-shots [options]
```

### Get a screenshot of just one URL and output it in the same directory.

```
page-shots -u https://www.branchcms.com
```

### Get a screenshot of just one URL and specify the directory and file name.

```
page-shots -u https://www.branchcms.com -d screenshots -n home
```

### Get screenshots for multiple URLs and save to a specific directory.

```
page-shots -u https://www.branchcms.com -u https://www.aptuitiv.com -d screenshots
```

### Save the screenshot as a png image.

```
page-shots -u https://www.branchcms.com -t png
```

### Change the image quality for the jpg screenshot to 80.

```
page-shots -u https://www.branchcms.com -q 80
```

### Capture a smaller screen size to simulate a mobile device.

```
page-shots -u https://www.branchcms.com -W 415
```

### Get a screenshot at a specific height and width.

```
page-shots -u https://www.branchcms.com -W 1200 -H 800 --fit
```

### Capture just a clip on the page 100px down from the top that is 900px wide and 400px tall.

```
page-shots -u https://www.branchcms.com -W 1200 --clipH 400 --clipW 900 --clipX 0 --clipY 100
```

License
-------

Page Shots is licensed under the [MIT][info-license].


[node]: http://nodejs.org/

[info-license]: LICENSE
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg

[info-node]: package.json
[shield-node]: https://img.shields.io/badge/node.js%20support-8-brightgreen.svg

[info-npm]: https://www.npmjs.com/package/page-shots
[shield-npm]: https://img.shields.io/npm/v/page-shots.svg

[info-build]: https://travis-ci.org/erictompkins/page-shots
[shield-build]: https://img.shields.io/travis/erictompkins/page-shots/master.svg





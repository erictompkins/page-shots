Page Shots
====

Page Shots is a command line interface for taking screenshots of one or more pages of a website.

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
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
- [Setting URLs](#setting-urls)
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

| Argument                 | Description |
| :----------------------- | :---------- |
| <pre>-b, --base</pre>    | The base URL value. If set then the URL will be appended to this value. |
| <pre>-d, --dir</pre>     | The directory relative to where the script is run to output the screenshots to. |
| <pre>-f, --fit</pre>     | Fit the screenshot to the provided height and width. |
| <pre>-H, --height</pre>  | Integer height of the viewport to take the screenshot in. Defaults to 900 |
| <pre>--jpg</pre>         | Set the image type for screenshots to be "jpg". Alternate method to using -t. |
| <pre>-n, --name</pre>    | The name of the file to save the screenshot as. Only applies to the first URL so it's only useful if getting just one screenshot. |
| <pre>--png</pre>         | Set the image type for screenshots to be "png". Alternate method to using -t. |
| <pre>-t, --type</pre>    | The file type to use for the screenshots. "jpg" or "png". Defaults to "jpg". |
| <pre>-q, --quality</pre> | The quality of the jpg image, between 0-100. Not applicable to png image. Defaults to 100 |
| <pre>-u, --url</pre>     | URL to get the screenshot of. You can specify this parameter multiple times to get a screenshot of multiple web pages. |
| <pre>-W, --width</pre>   | Integer width of the viewport to take the screenshot in. Defaults to 1300 |
| <pre>-v, --version</pre> | Output the version number |
| <pre>--clipH</pre>       | The height of the clip area. |
| <pre>--clipW</pre>       | The width of the clip area. |
| <pre>--clipX</pre>       | The x-coordinate of top-left corner of clip area. |
| <pre>--clipY</pre>       | The y-coordinate of top-left corner of clip area. |


Filenames and Directories
-----------------

By default the screenshot will be saved in the same directory that you call the command in and by default the file name will be based on the URL of the page. Also, by default, the screenshot will be a jpg image.

For example, if the URL is `https://www.branchcms.com` then the file name will be `www-branchcms-com.jpg`.

You can specify a file name for the screenshot. The file name can be just the name without the extension, or if can include the "jpg" or "png" extension. If the file name does not have an extension or it doesn't match either "jpg" or "png" extension then the correct extension based on the `type` argument will be used.

### Dynamic file names

Instead of specifying a specific file name you can specify a format to follow. There are a few placeholders that you can use in the file name to be replaced with information about the screenshot.

| Placeholder | Description  |
| :---------- | :----------- |
| {height}    | The height of the screenshot or viewport. |
| {quality}   | The image quality of the jpg image |
| {url}       | The filename friendly version of the URL |
| {width}     | The width of the screenshot. |

The default file name format is `{url}`.

When you set the file name format you can optionally set the extension. As long as the extension is "jpg" or "png" then the image will be saved as a "jpg" or "png" image, respectively.

### Directories

You can specify a directory to save the screenshot(s) in. The directory will be relative to where you call the command. If the directory does not exist then it will be created.


Full Size and Fixed Size Screenshots
-----------------

By default all screenshots will capture the entire page, not just within the height and width specified. You can use the `--fit` option to only capture the page within the specified height and width.

You can go even further and capture just a clip of the page by using the `-clipH`, `-clipW`, `-clipX`, and `-clipY` options. You must specify all four parameters for a clip to be taken.

Setting URLs
-----------------

You can specify the full URL for each web page to capture. Or, if you're getting multiple screenshots in the same website, then you can set the base URL and then just specify the URL path for each web page.

For example, let's say that your website is `https://www.mysite.com` and you're wanting to capture the home page, the "about us" page and the contact page. You can first set the base URL to be `https://www.mysite.com` and then simply specify `/` for the home page, `about-us` for the about us page, and `contact` for the contact page.

Note, Page Shots is smart enough to ensure that there is only one `/` between the base URL and the page path.

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

### Get a screenshot of just one URL and specify the directory and file name. The file will be saved as a "png" because of the file name extension.

```
page-shots -u https://www.branchcms.com -d screenshots -n home.jpg
```

### Specify a file name format

```
page-shots -u https://www.branchcms.com -n home-{width}
```

### Specify a file name format and set the image to be a png based on the file name

```
page-shots -u https://www.branchcms.com -n home-{width}.png
```

### Get screenshots for multiple URLs and save to a specific directory.

```
page-shots -u https://www.branchcms.com -u https://www.aptuitiv.com -d screenshots
```

### Set a base URL and get a screenshot of multiple URLs in the save website

```
page-shots -b https://www.branchcms.com -u /pricing -u / -u /docs
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

Page Shots is licensed under the [MIT][info-license] license.


[node]: http://nodejs.org/

[info-license]: LICENSE
[shield-license]: https://img.shields.io/badge/license-MIT-blue.svg

[info-node]: package.json
[shield-node]: https://img.shields.io/badge/node.js%20support-8-brightgreen.svg

[info-npm]: https://www.npmjs.com/package/page-shots
[shield-npm]: https://img.shields.io/npm/v/page-shots.svg

[info-build]: https://travis-ci.org/erictompkins/page-shots
[shield-build]: https://img.shields.io/travis/erictompkins/page-shots/master.svg





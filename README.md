Page Shots
====

Page Shots is a command line interface for taking screenshots of one or more pages of a website.

[![NPM version][shield-npm]][info-npm]
[![Node.js version support][shield-node]][info-node]
[![Build status][shield-build]][info-build]
[![LGPL-3.0 licensed][shield-license]][info-license]

On the command line:

```sh
page-shots -u https://www.branchcms.com
```

There are, of course, a lot more configuration options.

Table Of Contents
-----------------

- [Requirements](#requirements)
- [Install](#install)
- [Command Line Options](#command-line-options)


Requirements
-----------------

Page Shots requires [Node.js][node] to run.



Install
-----------------

```
npm install -g page-shots
```

Command line options
-----------------

```
Usage: page-shots [options]

Options:

  -v, --version            output the version number
  -u, --url <string>       URL to get the screenshot of. (default: [])
  -d, --dir <string>       The directory relative to where the script is run to output the screenshots to.
  -H, --height <integer>   Integer height of the viewport to take the screenshot in. (default: 900)
  -W, --width <integer>    Integer width of the viewport to take the screenshot in. (default: 1300)
  -f, --fit                Fit the screenshot to the provided height and width.
  -t, --type <string>      The file type to use for the screenshots. "jpg" or "png" (default: "jpg")
  -q, --quality <integer>  The quality of the jpg image, between 0-100. Not applicable to png image. (default: 100)
  -n, --name <string>      The name of the file to save the screenshot as. Only applies to the first URL.
  --clipX <integer>        The x-coordinate of top-left corner of clip area.
  --clipY <integer>        The y-coordinate of top-left corner of clip area.
  --clipW <integer>        The width of clip area.
  --clipH <integer>        The height of clip area.
  -h, --help               output usage information
```

| Argument | Description |
| :------- | :---------- |
| -v, --version | Output the version number |
| -u, --url <string> | URL to get the screenshot of. (default: []) |





## Command line usage

```
page-shots [options]
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





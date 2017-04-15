<p align="center">
	<img src="https://raw.githubusercontent.com/devedge/ineed-cli/master/ic.png"/>
	<br><br>
	A cli interface for the <code><a href="https://github.com/inikulin/ineed">ineed</a></code> web scraping package
</p>
	
[![Licence](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/devedge/ineed-cli/blob/master/LICENSE) 
[![npm version](https://badge.fury.io/js/ineed-cli.svg?style=flat-square)](https://badge.fury.io/js/ineed-cli)
	
<hr>

# Install
Install globally with `npm install -g ineed-cli`

## Example usage:

`ineed -i techcrunch.com | sort -u | xargs -n1 curl -O`

where

`ineed -i techcrunch.com`

generates a list of image links,

`sort -u`

removes duplicates, and 

`xargs -n1 curl -O`

downloads each of them to the current directory.

You can also grep the results, pipe them to other tools, etc..

`ineed -l news.ycombinator.com/best | grep -v ycombinator | less`

lists all the best outbound links from Hacker News, and pipes them into `less`

## Options

_Also available with `ineed -h`_

The url and at least one flag is required (`-u/--url` doesn't need to be explicitly set):

`ineed --title techcrunch.com`

`ineed --url techcrunch.com --comments`

To filter results that have a certain search string, pass the string in with the `-s/--search` flag:

`ineed --javascript --search "google" techcrunch.com`

When the `-v/--verbose` flag is set, `ineed-cli` will log its status throughout program execution.

<br>

A full list of available flags is listed below:

```
-u, --url           The url to scrape. Required, but the flag is optional
-i, --images        List all images found
-l, --links         List all links on the page
-j, --javascript    List all external JavaScript imports
-c, --css           List all external CSS imports
-t, --title         List the title of the page
-x, --texts         List any text found on the page found within the <body></body> tags

-m, --ejs           List all embedded JavaScript
-n, --ecss          List all embedded CSS
-k, --comments      List all HTML comments in the page
-e, --everything    List everything, eg. all the options above

-s, --search        Display only results that contain this search string
-v, --verbose       Log extraneous information about program status
-h, --help          This usage guide

```

## Dependencies
- [ineed](https://github.com/inikulin/ineed), for webpage requests and HTML parsing
- [command-line-args](https://github.com/75lb/command-line-args), to parse command line flags and user input
- [command-line-usage](https://github.com/75lb/command-line-usage), to display prettified program usage
- [normalize-url](https://github.com/sindresorhus/normalize-url), to handle urls that don't have an explicitly specified prefix, eg. `https://`


## License
[MIT](https://github.com/devedge/ineed-cli/blob/master/LICENSE)

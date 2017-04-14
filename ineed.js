const ineed = require('ineed');

// Get user input from the command line
// const cli = require('./cli');

let images = true;
let hyperlinks = true;
let scripts = true;
let stylesheets = true;
let title = true;

let texts = true;
let jsCode = true;
let cssCode = true;
let comments = true;

let searchstring = '';

let url = process.argv[2];

// console.time('init');

// TODO cache the last result for faster re-search

// Collect everything at once. Unofficial timing tests and ineed's 
// one-pass strategy means that there is no appreciable time 
// difference. Requests + ineed's parsing took anywhere from 
// 300 to 900 ms.
ineed
	.collect
		.images			// Links to all images
		.hyperlinks		// All external hyperlinks
		.scripts		// Links to external JavaScript links
		.stylesheets	// Links to external CSS links
		.title			// The page title
		.texts			// Any non-css/non-js text found between the <body></body> tags in the page
		.jsCode			// Inline JavaScript
		.cssCode		// Inline CSS
		.comments		// HTML comments
		.from(url, (err, response, result) => {


	// On a fatal error, log it and quit
	if (err) {
		console.log('Error: URL is probably not valid');
		process.exit(1);
	} 
	
	// If the status code is not normal, log it
	if (response.statusCode !== 200) {
		console.log('Error Status Code: ' + response.statusCode);
	}
	
	
	// 
	if (images) {
		outputResult(result.images, 'src');
	}
	if (hyperlinks) {
		outputResult(result.hyperlinks, 'href');
	}
	if (scripts) {
		outputResult(result.scripts);
	}
	if (stylesheets) {
		outputResult(result.stylesheets);
	}
	if (title) {
		if (searchstring) {
			if (result.title.indexOf(searchstring) !== -1) {
				console.log(result.title);
			}
		} else {
			console.log(result.title);
		}
	}
	if (texts) {
		outputResult(result.texts);
	}
	if (jsCode) {
		outputResult(result.jsCode);
	}
	if (cssCode) {
		outputResult(result.cssCode);
	}
	if (comments) {
		outputResult(result.comments);
	}
});


/**
 * [outputResult description]
 * @method outputResult
 * @param  {[type]} elementArray [description]
 * @param  {[type]} selector     [description]
 * @return {[type]}              [description]
 */
function outputResult(elementArray, selector) {
	if (selector) {
		elementArray.forEach((item) => {
			if (searchstring) {
				if (item[selector].indexOf(searchstring) !== -1) {
					console.log(item[selector]);
				}
			} else {
				console.log(item[selector]);
			}
		});

	} else {
		elementArray.forEach((item) => {
			if (searchstring) {
				if (item.indexOf(searchstring) !== -1) {
					console.log(item);
				}
			} else {
				console.log(item);
			}
		});
	}
}

const ineed = require('ineed');
const normalizeUrl = require('normalize-url');

// Get user input from the command line
const cli = require('./cli');
let searchstring = '';

if (cli.search) {
	searchstring = cli.search;
}

// console.time('init');

// TODO cache the last result for faster re-search

if (cli.verbose) { console.log('Request sent to ' + normalizeUrl(cli.url)) }

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
		.from(normalizeUrl(cli.url), (err, response, result) => {

	if (cli.verbose) { console.log('Response successful and parsing finalized') }

	// On a fatal error, log it and quit
	if (err) {
		console.log('Error: URL is probably not valid');
		process.exit(1);
	} 
	
	// If the status code is not normal, log it
	if (response.statusCode !== 200) {
		console.log('Error Status Code: ' + response.statusCode);
	}
	
	if (cli.verbose) { console.log('Printing results to stdout') }
	
	// Print the user-selected results
	if (cli.images) {
		outputResult(result.images, 'src');
	}
	if (cli.links) {
		outputResult(result.hyperlinks, 'href');
	}
	if (cli.javascript) {
		outputResult(result.scripts);
	}
	if (cli.css) {
		outputResult(result.stylesheets);
	}
	if (cli.title) {
		if (searchstring) {
			if (result.title.indexOf(searchstring) !== -1) {
				console.log(result.title);
			}
		} else {
			console.log(result.title);
		}
	}
	if (cli.texts) {
		outputResult(result.texts);
	}
	if (cli.ejs) {
		outputResult(result.jsCode);
	}
	if (cli.ecss) {
		outputResult(result.cssCode);
	}
	if (cli.comments) {
		outputResult(result.comments);
	}
	
	if (cli.verbose) { console.log('Printing results complete') }
});


/**
 * The method to sequentially print results to standard out
 * @method outputResult
 * @param  {Array} elementArray The array of elements returned by ineed
 * @param  {String} selector     If an item is a value in an object, this 
 *                               'selector' string can be used to retrieve it
 * @return {stdout}              Prints results to standard out with 'console.log()'
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

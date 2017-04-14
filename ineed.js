const ineed = require('ineed');

// Get user input from the command line
// const cli = require('./cli');

let images = true;
let hyperlinks = true;
let scripts = false;
let stylesheets = false;
let title = false;

let texts = false;
let jsCode = false;
let cssCode = false;
let comments = false;

let searchstring = '';

let url = process.argv[2];

console.time('init');

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

	if (response.statusCode !== 200) {
		console.log(response.statusCode);
	}
	
	if (images) {
		output(result.images, 'src');
	}
	if (hyperlinks) {
		output(result.hyperlinks, 'href');
	}
	if (scripts) {
		
	}
	if (stylesheets) {
		
	}
	if (title) {
		
	}
	if (texts) {
		
	}
	if (jsCode) {
		
	}
	if (cssCode) {
		
	}
	if (comments) {
		
	}
	
	console.timeEnd('init');
});


function output(elementArray, selector) {
	elementArray.forEach((item) => {
		console.log(item[selector]);
	});
}

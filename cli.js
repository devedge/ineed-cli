const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage'); 
const header = `_________________________________________________
                                                 
    ,                         /             /   ,
--------__----__----__----__-/--------__---/-----
  /   /   ) /___) /___) /   /  ===  /   ' /   /  
_/___/___/_(___ _(___ _(___/_______(___ _/___/___
`;

// Define all possible cli options
const optionDefinitions = [
    { name: 'url', alias: 'u', type: String, multiple: false, defaultOption: true },
    { name: 'images', alias: 'i', type: Boolean, defaultValue: false },
    { name: 'links', alias: 'l', type: Boolean, defaultValue: false },
    { name: 'javascript', alias: 'j', type: Boolean, defaultValue: false },
    { name: 'css', alias: 'c', type: Boolean, defaultValue: false },
    { name: 'title', alias: 't', type: Boolean, defaultValue: false },
	
	{ name: 'texts', alias: 'x', type: Boolean, defaultValue: false },
	{ name: 'ejs', alias: 'm', type: Boolean, defaultValue: false }, // embedded JavaScript
	{ name: 'ecss', alias: 'n', type: Boolean, defaultValue: false }, // embedded CSS
	{ name: 'comments', alias: 'k', type: Boolean, defaultValue: false },
	
	{ name: 'everything', alias: 'e', type: Boolean, defaultValue: false },
    
	{ name: 'search', alias: 's', type: String, multiple: false },
	
	{ name: 'help', alias: 'h', type: Boolean, defaultValue: false }
];

const helpSection = [
	{
		content: header,
		raw: true
	},
	{
		header: 'ineed-cli',
		content: 'A cli interface for ineed web scraping package'
	},
	{
		header: 'Example usage',
		content: [
			'ineed techcrunch.com',
			'ineed -il -s techcrunch.com',
			'ineed --everything techcrunch.com',
			'ineed -jcmn -s google techcrunch.com'
		]
	},
	{
		header: 'Options',
		content: [
			{
				name: 'url',
				alias: 'u',
				description: 'The url to scrape. Required, but the flag is optional'
			},
			{
				name: 'images',
				alias: 'i',
				description: 'List all images found'
			},
			{
				name: 'links',
				alias: 'l',
				description: 'List all links on the page'
			},
			{
				name: 'javascript',
				alias: 'j',
				description: 'List all external JavaScript imports'
			},
			{
				name: 'css',
				alias: 'c',
				description: 'List all external CSS imports'
			},
			{
				name: 'title',
				alias: 't',
				description: 'List the title of the page'
			},
			{
				name: 'texts',
				alias: 'x',
				description: 'List any text found on the page found within the <body></body> tags'
			},
			{
				name: 'ejs',
				alias: 'm',
				description: 'List all embedded JavaScript'
			},
			{
				name: 'ecss',
				alias: 'n',
				description: 'List all embedded CSS'
			},
			{
				name: 'comments',
				alias: 'k',
				description: 'List all HTML comments in the page'
			},
			{
				name: 'everything',
				alias: 'e',
				description: 'List everything, eg. all the options above'
			},
			{
				name: 'search',
				alias: 's',
				description: 'Display only results that contain this search string'
			},
			{
				name: 'help',
				alias: 'h',
				description: 'This usage guide'
			}
		]
	}
];


const usage = getUsage(helpSection);
console.log(usage);

// TE MWT Assessment, Digital Skills Academy 
// Student ID: D14128497
// by Andrei Rjabokon 
// andrei.rjabokon att techelevate.net 
// updated 28/06/2015 
// ver1.5 
																	// Variables
var myList = '#myList';
var dataDiv = "#dynamic-data";										//handle for the main data div
var dbArray = [];													// to keep items from JSON file
var searchForImages = 5;											// limit of results displayed
var mainDiv = "#mainDiv";

var hostingFolder = "/assessment";									// path to folder that includes index.html !!!
var jsonFile = "/JSON/agents.txt";

function bodyInitialise() {											// onload and event handler for buttons and functions
	jsonLoad();
}

function jsonLoad() {
	//console.log('in function');
	$.getJSON((hostingFolder + jsonFile), { format: "json" })		// read JSON file
	.done(function(data, status) {									// when done and JSON file read - call the function
	//console.log(status);
	
	$.each(data, function(i,item) {									// for each JSON object - push it into array for sorting

	//console.log(item.index);
	//console.log(item.agent);
	//console.log(item.codename);
	//console.log(item.url);
			
	dbArray.push({"agent":item.agent, "codename": item.codename, "index":item.index, "id":item.id, "url":item.url, "details":item.about});
	dbArray.sort(compare);											// sort by agent name A-Z
	});
		
	dbArray.forEach(function(item){									// for each element of the array
	//console.log(item.agent);
		
		liString = '<li data-icon="info"><a href="#' + item.index + '" data-transition="flip">' + item.agent + ' - ' + item.codename + 
					'<img alt="Agents photo" src="' + hostingFolder + item.url + '", height="80">'+
					'</a></li>';
		//console.log(liString);
		//console.log(liString);
			
		$(myList).append(liString);										// add li to the DOM
			
		divString = '<div id="' + item.index + '" data-role="page" data-theme="d">'+
						'<div data-role="header">'+
							'<a href="#mainDiv" data-icon="back" data-rel="back" data-iconpos="notext">Back</a>'+
							'<h3>' + item.agent + '</h3>'+
						'</div>'+ 
						'<div class="ui-grid-a">'+
							'<div class="ui-block-a"><img class="personalPhoto" alt="Agents photo" src="' + hostingFolder + item.url + '", width="190"></div>'+
							'<div class="ui-block-b">'+
								'<strong><p>ID:</p></strong><p>00' + item.index + '</p></br>'+
								'<strong><p>Name: </p></strong><p>' + item.agent + '</p></br>'+
								'<strong><p>Codename: </p></strong><p>' + item.codename + '</p></br></br>'+
								'<strong><p>Badge ID: </p></strong><p>' + item.id + '</p></br>'+
								'<strong><p>Details: </p></strong><p>' + item.details + '</p></br>'+
							'</div>'+
						'</div>'+
						'<a href="#mainDiv" data-rel="back" class="ui-btn ui-shadow ui-corner-all ui-btn-a ui-icon-back ui-btn-icon-left">Back</a>'+
						'<div data-role="footer" data-position="fixed"><p class="footlabel">&copy Andrei Rjabokon 2015</p></div>'+
					'</div>';
					
		$(dataDiv).append(divString);								// add div to the DOM
		});
		
		$(myList).listview("refresh");								// refresh the list to show new list options
		//console.log(dbArray);
    
}).fail(function(jqXHR) {											// when done and JSON file read
    if (jqXHR.status == 404) {
        alert("JSON file not found! Please check the path and 'hostingFolder' value in myJs.js file");
    } else {
        alert("Other non-handled error type");
    }
});
}

function compare(a,b) {												// compare 'agent' fields for .sort
  if (a.agent < b.agent)
    return -1;
  if (a.agent > b.agent)
    return 1;
  return 0;
}
																	// Change theme on radio button click
function changeTheme(radio){
    //console.log(radio);
	if (radio.id == "radio-choice-h-6a") {
		//console.log("a");
		$.mobile.changeGlobalTheme("d");
	}
	
	if (radio.id == "radio-choice-h-6b") {
		//console.log("b");
		$.mobile.changeGlobalTheme("c");
	}
	
	if (radio.id == "radio-choice-h-6c") {
		//console.log("c");
		$.mobile.changeGlobalTheme("f");
	}
}

																	// Dynamically changes the theme of all UI elements on all pages,
																	// also pages not yet rendered (enhanced) by jQuery Mobile.
$.mobile.changeGlobalTheme = function(theme)
{
																	// These themes will be cleared, add more swatch letters as needed.

    var themes = "a b c d e f";

																	// Updates the theme for all elements that match the
																	// CSS selector with the specified theme class.
    function setTheme(cssSelector, themeClass, theme)
    {
        $(cssSelector)
            .removeClass(themes.split(" ").join(" " + themeClass + "-"))
            .addClass(themeClass + "-" + theme)
            .attr("data-theme", theme);
    }

																	// Add more selectors/theme classes as needed.
    setTheme(".ui-mobile-viewport", "ui-overlay", theme);
    setTheme("[data-role='page']", "ui-body", theme);
    setTheme("[data-role='header']", "ui-bar", theme);
    setTheme("[data-role='listview'] > li", "ui-bar", theme);
    setTheme(".ui-btn", "ui-btn-up", theme);
    setTheme(".ui-btn", "ui-btn-hover", theme);
};

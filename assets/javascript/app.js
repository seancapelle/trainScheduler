//Variables
//User input
var trainName = '';
var destination = '';
var firstTime = 0;
var frequency = 0;

//moment.js input
var nextArrival = 0;
var minutesAway = 0;

//Functions
//Submit button clicked
$('button').on('click', function(){

	//Grab input value and set to variables
	trainName = $('#train-name').val().trim();
	destination = $('#destination').val().trim();
	firstTime = $('#first-time').val();
	frequency = $('#frequency').val();

	//Add variables to localStorage
	localStorage.setItem("train-name", trainName);
	localStorage.setItem("train-destination", destination);
	localStorage.setItem("first-time", firstTime);
	localStorage.setItem("train-frequency", frequency);

	timeCalc();
	
	//Clear input
	//RESET BUTTON?
});

//Calculate train's next arrival and how far away it is
var timeCalc = function() {

	//Retrieve localStorage data
	var firstTimeCalc = localStorage.getItem("first-time");
	var frequencyCalc = localStorage.getItem("train-frequency");

	//Use moment.js to pull current time
	var currentTime = moment().format("MM/DD/YY hh:mm A");
	
	//Determine nextArrival
	nextArrival = moment(currentTime).format("hh:mm");
	
	//Determine minutesAway
	minutesAway = moment(currentTime).diff( frequencyCalc, "minutes");

	//Calls update function
	updateDisplay();

};

//Displays info on table
var updateDisplay = function() {

	//Display input in table
	$('.table').append('<tr>' + '<td>' + trainName  + '<td>' + destination + '<td>' + frequency + '<td>' + nextArrival + '<td>' + minutesAway + '</tr>');

};


//Functions
//Calculate train's next arrival and how far away it is
var timeCalc = function(firstTime, frequency) {

	var firstMoment = moment(firstTime, "hh:mm");

	var currentMoment = moment();

	var totalRunTime = currentMoment.diff(firstMoment, "minutes");

	var numberOfRuns = Math.floor(totalRunTime / frequency);

	var lastRunMoment = firstMoment.add(numberOfRuns * frequency, "minutes");

	var nextRunMoment = lastRunMoment.add(frequency, "minutes");

	return {

		nextArrival: nextRunMoment.format('hh:mm A'),
		minutesAway: nextRunMoment.from(currentMoment, "minutes")
	}

};

//Displays info on table
var updateDisplay = function(trainName, destination, firstTime, frequency) {

	var future = timeCalc(firstTime, frequency);

	//Display input in table
	$('.table').append('<tr>' + '<td>' + trainName  + '<td>' + destination + '<td>' + frequency + '<td>' + future.nextArrival + '<td>' + future.minutesAway + '</tr>');

};

var currentSchedule = JSON.parse(localStorage.getItem('currentSchedule')) || []

for (i = 0; i < currentSchedule.length; i++) {

	var line = currentSchedule[i];

	updateDisplay(line.trainName, line.destination, line.firstTime, line.frequency);
}

//Submit button clicked
$('button').on('click', function(){

	//Grab input value and create schedule object
	var schedule = {
		trainName: $('#train-name').val().trim(),
		destination: $('#destination').val().trim(),
		firstTime: $('#first-time').val(),
		frequency: $('#frequency').val(),
	}	

	currentSchedule.push(schedule);

	localStorage.setItem('currentSchedule', JSON.stringify(currentSchedule));

	updateDisplay(schedule.trainName, schedule.destination, schedule.firstTime, schedule.frequency);

});

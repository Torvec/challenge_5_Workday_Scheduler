// TODO LIST: GIVEN I am using a daily planner to create a schedule
    // WHEN I click into a time block
      // THEN I can enter an event
    // WHEN I click the save button for that time block
      // THEN the text for that event is saved in local storage
    // WHEN I refresh the page
      // THEN the saved events persist

// TODO: Add a listener for click events on the save button.
  // This code should use the id in the containing time-block as a key to save the user input in local storage. 
  // HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?

// TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements.
  // HINT: How can the id attribute of each time-block be used to do this?

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  
  // Access the advanced format plugin
  dayjs.extend(window.dayjs_plugin_advancedFormat);
  // Display the current day/date in this format: Monday, June 5th, 2023 and append it to currentDay ID
  var today = dayjs().format('dddd, MMMM Do, YYYY');
  $('#currentDay').append(today);

  var container = $('.container-fluid');

  // Create an Array of DayJS objects
  var startHours = 9;
  var endHours = 17;
  var workHours = [];
  for (var i = startHours; i <= endHours; i++) {
    var hourObj = dayjs().hour(i);
    workHours.push(hourObj);
  }

  var relativeTime = '';// For past, present, or future class
  var currentTime = dayjs();// To compare the current time DayJS object with the workHours array of DayJS objects

  for (var i = 0; i < workHours.length; i++) {

    if (currentTime.isBefore(workHours[i])) {
      relativeTime = 'future'
    } 
    if (currentTime.isAfter(workHours[i])) {
      relativeTime = 'past';
    } 
    if (currentTime.isSame(workHours[i])) {
      relativeTime = 'present';
    }

    var hour = workHours[i].format('h');
    var hourText = workHours[i].format('hA')

    // Create the necessary elements dynamically
    var divHoursId = $('<div>').attr('id', 'hour-' + hour).addClass('row time-block ' + relativeTime);
    var divHourClass = $('<div>').addClass('col-2 col-md-1 hour text-center').text(hourText);
    var textAreaDesc = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    var iElement = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

    // Slap those elements on the page
    $(divHoursId).append(divHourClass);
    $(divHoursId).append(textAreaDesc);
    $(divHoursId).append(saveButton);
    $(saveButton).append(iElement);
    $(container).append(divHoursId);
  }

});
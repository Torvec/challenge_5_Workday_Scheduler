// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  
  // Access the advanced format plugin so I can have 'th', 'nd', 'st' after the day number
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

  var relativeTime;// For past, present, or future css class
  var currentTime = dayjs();// To compare the current time DayJS object with the workHours array of DayJS objects

  for (var i = 0; i < workHours.length; i++) {

    // Determine if the time is past, present, or future
    if (workHours[i].isBefore(currentTime)) {
      relativeTime = 'past'
    } 
    if (workHours[i].isAfter(currentTime)) {
      relativeTime = 'future';
    } 
    if (workHours[i].isSame(currentTime)) {
      relativeTime = 'present';
    }

    // Create variables for the hour and hour text
    var hour = workHours[i].format('h');
    var hourText = workHours[i].format('h A')

    // Get the saved text from local storage so it appears if the page is refreshed
    var getSavedText = localStorage.getItem('hour-' + hour);

    // Create the necessary elements dynamically
    var divHoursId = $('<div>').attr('id', 'hour-' + hour).addClass('row time-block ' + relativeTime);
    var divHourClass = $('<div>').addClass('col-2 col-md-1 hour text-center').text(hourText);
    var textAreaDesc = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3').text(getSavedText);
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    var iElement = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');
    
    // Slap those elements on the page
    $(divHoursId).append(divHourClass);
    $(divHoursId).append(textAreaDesc);
    $(divHoursId).append(saveButton);
    $(saveButton).append(iElement);
    $(container).append(divHoursId);
    
    // Event listener for the save button
    $(container).on('click', '.saveBtn', function () {
      var hourId = $(this).parent().attr('id');
      var textAreaValue = $(this).siblings('textarea').val();
      localStorage.setItem(hourId, textAreaValue);
    });    
  }

  // Create the clear button
  var clearButtonDiv = $('<div>').addClass('row');
  var clearButton = $('<button>').addClass('btn clearBtn col-4 col-md-2 mx-auto mt-3').attr('aria-label', 'clear').text('Clear Schedule');
  $(clearButtonDiv).append(clearButton);
  $(container).append(clearButtonDiv);

  // Event listener for the clear button
  $(container).on('click', '.clearBtn', function () {
    // Clear the local storage for each hour block
    for (var i = 0; i < workHours.length; i++) {
      var hourBlock = '#hour -' + workHours[i].format('h');
      localStorage.clear(hourBlock);
    }
    // Clear the text area
    $('.description').val('');
    location.reload();
  });

});
$(document).ready(function () {
    setUpStyles();
    getSteps();
    registerEvents();
});

function setUpStyles() {

    $('.range-slider').jRange({
        from: 0,
        to: 30000,
        step: 1000,
        scale: [0, 5000, 10000, 15000, 20000, 25000, 30000],
        format: '%s Kč',
        width: 250,
        showLabels: true,
        isRange: true,
        theme: "theme-blue",
        snap: true
    });

    //Set to default range
    $('.range-slider').jRange('setValue', '5000,15000');
}

/* =================== BEGIN NAVIGATION/STEPS =================== */

//Global variables
var steps = [];
var currentIndex = 0;

//Buttons
var button_next;
var button_back;

function registerEvents() {
    button_next = $('next');
    button_back = $('back');
    button_next.click(nextStep);
    button_back.click(previousStep);
}

/**
 * Gets and stores all the steps in the @var steps
 * 
 * @returns An array containing all the steps elements
 */
function getSteps() {
    steps = $('.step');
    return steps;
}


/**
 * Gets and returns the current step element
 * 
 * @returns the current step element
 */
function getCurrentStep() {
    return $('.active');
}

function nextStep() {
    if (currentIndex === steps.length - 1) { //End of the line, throw an error
        throw "Final step reached, cannot go forward";
    }

    $(steps[currentIndex]).removeClass('active'); //Need to convert to jQuery element first, in order to use .removeClass();
    $(steps[currentIndex + 1]).addClass('active');
    currentIndex++;
}

function previousStep() {
    if (currentIndex === 0) { //End of the line, throw an error
        throw "First step reached, cannot go backwards";
    }

    $(steps[currentIndex]).removeClass('active'); //Need to convert to jQuery element first, in order to use .removeClass();
    $(steps[currentIndex - 1]).addClass('active');
    currentIndex--;
}

/* =================== END NAVIGATION/STEPS =================== */
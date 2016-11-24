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

    $('select').on('change', onSelect);
}


/**
 * Triggered whenever the user selects something in the Machine Use slide;
 */
function onSelect() {
    var value = $(this).val();

    if (value === null) { //User didn't select category, prompt him to select one.
        alert("Vyberte prosím kategorii");
        return;
    }

    $('.' + value) //Select the selected category
        .removeClass(value) //Remove the temp class, show the element
        .addClass('step'); //Add class step so we are able to cache it

    getSteps(); //Readd all the steps

    //Show the next button
    if ($('next').hasClass('hidden')) {
        $('back').removeClass('hidden');
        $('next').addClass('visible');
    }
}

/**
 * Slide-specific logic goes here
 */
function onFormChange() {

    //Auto hide Back button
    if (currentIndex === 0) {
        if (!$('back').hasClass('hidden')) {
            $('back').addClass('hidden');
        }
        if ($('back').hasClass('visible')) {
            $('back').removeClass('visible');
        }
    } else {
        if (!$('back').hasClass('visible')) {
            $('back').addClass('visible');
        }
        if ($('back').hasClass('hidden')) {
            $('back').removeClass('hidden');
        }
    }

    // "There's no going back..", hide the Back button after the user has selected Machine Use
    if (currentIndex > 1) {
        if ($('back').hasClass('visible')) {
            $('back').removeClass('visible');
            $('back').addClass('hidden');
        }
    }

    //Hide the Next button if selecting Machine Use, will be shown when user has Selected an option - onSelect()
    if (getCurrentStep().attr('id') === "pouziti") {
        if ($('next').hasClass('visible')) {
            $('next').removeClass('visible');
            $('next').addClass('hidden');
        }
    } else {
        if ($('next').hasClass('hidden')) {
            $('next').removeClass('hidden');
            $('next').addClass('visible');
        }
    }
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
    onFormChange();
}

function previousStep() {
    if (currentIndex === 0) { //End of the line, throw an error
        throw "First step reached, cannot go backwards";
    }

    $(steps[currentIndex]).removeClass('active'); //Need to convert to jQuery element first, in order to use .removeClass();
    $(steps[currentIndex - 1]).addClass('active');
    currentIndex--;
    onFormChange();

}

/* =================== END NAVIGATION/STEPS =================== */

/* =================== BEGIN MAGIC =================== */


//Basic data format
var data = {
    price: [{
        min: 0,
        max: 0
    }],
    use: 1, //1 - Basic, 2 - Gaming, 3 - Workstation
    basic: {
        hard_disk: false //True - HDD + SSD, False - just SSD
    },
    gaming: {
        vr: true,
        fourk: true
    },
    workstation: {
        hard_disk: false, //True - HDD + SSD, False - just SSD
        virtualization: true,
        graphics
    },
    misc: {
        wifi: true
    }
};

/**
 * Pulls the data from the slides and stores them in an object
 */
function getData() {

}
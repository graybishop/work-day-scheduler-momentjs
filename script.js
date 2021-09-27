//map to hold time block values
const valuesMap = new Map();

// need to add date and weekday<p>id="currentDay" class="lead"
const updateDateOnTop = () => {
    let currentDayEl = $('#currentDay');
    currentDayEl.text(moment().format('dddd, MMMM Do'));
};

//code to generate time blocks
// each time block contains: .hour div with hour am/pm, then text area with class(.past, .present, or .future), then .saveBtn
const generateTimeBlock = (index, hourLabel, task, state) => {
    let timeBlockEl = $('<div>');
    timeBlockEl.addClass('row');
    timeBlockEl.addClass('time-block');
    timeBlockEl.data('index', index);

    //hour label at the front of the row
    let hourEl = $(`<div class='hour'>${hourLabel}</div>`);
    //text area in the middle of the row
    let textAreaEl = $(`<textarea class='${state} description'>${task}</textarea>`);
    //save button at the end of the row
    let saveBtn = $(`<div class='saveBtn'><i class ='far fa-save'></i></div>`);
    //ties click event to each button
    saveBtn.on('click', storeData);

    //appends all elements to the container, and assembles the rows
    $('.container').append(timeBlockEl);
    $(timeBlockEl).append(hourEl);
    $(timeBlockEl).append(textAreaEl);
    $(timeBlockEl).append(saveBtn);

};

//use momentJS to  compare time. 
const getCurrentState = (testTime) => {
    let now = moment();
    //add plus one because we are testing the range of an hour. 
    testTime = moment(testTime + 1, `h`);
    //gives minutes until we reach the test time.
    let differenceMinutes = testTime.diff(now, `minutes`);

    //logic for determining the current state of the rows. 
    if (differenceMinutes < 0) {
        return `past`;
    } else if (differenceMinutes < 60 && differenceMinutes >= 0) {
        return `present`;
    } else {
        return `future`;
    }
};

//generates whole table by calling the row function several times. 
const generateTable = () => {
    for (let index = 9; index < 18; index++) {
        let textValue = ``;

        //get's the data from the map to pass onto the time block builder
        if (valuesMap.get(index)) {
            textValue = valuesMap.get(index);
        }
        //https://momentjs.com/docs/#/displaying/ for the display time
        generateTimeBlock(index, moment(index, 'h').format('hA'), textValue, getCurrentState(index));

    }
};

const storeData = (event) => {
    //for the button clicked
    //grabs index of the row
    let indexOfRow = Number($(event.currentTarget).parent().data('index'));
    //grabs text inside of the text box.
    let textAreaValue = $(event.currentTarget).siblings().eq(1).val().trim();

    //checks for empty string
    valuesMap.set(indexOfRow, textAreaValue);
    localStorage.setItem(indexOfRow, textAreaValue);
};

const readData = () => {
    //reads each local storage point, then adds none empty values to map. runs on load. 
    for (let index = 9; index < 18; index++) {
        const storageValue = localStorage.getItem(index);
        if (storageValue) {
            console.log(storageValue);
            valuesMap.set(index, storageValue);
        }
    }
};

//code that runs on load. 
const init = () => {
    updateDateOnTop();
    readData();
    generateTable();
};

init();


// need to add date and weekday<p>id="currentDay" class="lead"
const updateDateOnTop = () => {
    let currentDayEl = $('#currentDay');
    currentDayEl.text(moment().format('dddd, MMMM Do YYYY'));
};

//<div class="container">Timeblocks go here </div> need to add code to generate timeblocks

// each time block contains: .hour div with hour am/pm, then text area with class(.past, .present, or .future), then .saveBtn

const generateTimeBlock = (hourLabel, task) => {
    console.log(`i've been called`)
    let timeBlockEl = $('<div>')
    timeBlockEl.addClass('row')
    timeBlockEl.addClass('time-block')
    
    let hourEl = $(`<div class='hour'>${hourLabel}</div>`)

    let textAreaEl = $(`<textarea class='${getCurrentState(hourLabel)} description'>${task}</textarea>`)
    textAreaEl.css('flex','1 1')

    let saveBtn = $(`<div class='saveBtn'>SaveIcon</div>`)
    console.log(hourEl)
    
    $('.container').append(timeBlockEl)
    $(timeBlockEl).append(hourEl)
    $(timeBlockEl).append(textAreaEl)
    $(timeBlockEl).append(saveBtn)
    
    
}

//use momentJS to check how to compare time. 
const getCurrentState = (testTime) => {
    if (false) {
        return `past`
    } else if (false){
        return `present`
    } else {
        return `future`
    }
}

const init = () => {
    updateDateOnTop();
    generateTimeBlock(`1PM`, `Do the dishes`, `present`)
};

init();




// need to add date and weekday<p>id="currentDay" class="lead"
const updateDateOnTop = () => {
    let currentDayEl = $('#currentDay');
    currentDayEl.text(moment().format('dddd, MMMM Do YYYY'));
};

//<div class="container">Timeblocks go here </div> need to add code to generate timeblocks
// each time block contains: .hour div with hour am/pm, then text area with class(.past, .present, or .future), then .saveBtn
const generateTimeBlock = (index, hourLabel, task, state) => {
    let timeBlockEl = $('<div>')
    timeBlockEl.addClass('row')
    timeBlockEl.addClass('time-block')
    timeBlockEl.data('index', index)
    
    let hourEl = $(`<div class='hour'>${hourLabel}</div>`)

    let textAreaEl = $(`<textarea class='${state} description'>${task}</textarea>`)
    // textAreaEl.css('flex','1 1')

    let saveBtn = $(`<div class='saveBtn'><i>SaveIcon</i></div>`)
    
    saveBtn.on('click', storeData)
    
    $('.container').append(timeBlockEl)
    $(timeBlockEl).append(hourEl)
    $(timeBlockEl).append(textAreaEl)
    $(timeBlockEl).append(saveBtn)
    
}

//use momentJS to  compare time. 
const getCurrentState = (testTime) => {
    let now = moment()
    //add plus one because we are testing the range of an hour. 
    testTime = moment(testTime +1 , `h`)
    //gives minutes until we reach the test time.
    let differenceMinutes = testTime.diff(now, `minutes`)

    if (differenceMinutes < 0) {
        return `past`
    } else if (differenceMinutes < 60 && differenceMinutes >= 0 ){
        return `present`
    } else {
        return `future`
    }
}

const generateTable = () => {

    for (let index = 9; index < 20; index++) {

        //https://momentjs.com/docs/#/displaying/ for the display time
        generateTimeBlock(index, moment(index, 'h').format('hA'), `test ${Math.floor(Math.random() * index)}`,getCurrentState(index))
        
    }
}

const storeData = (event) => {
    let indexOfRow = $(event.currentTarget).parent().data('index')
    let textAreaValue = $(event.currentTarget).siblings().eq(1).val()
    // console.log($(event.currentTarget).siblings().eq(0).text())
    // console.log($(event.currentTarget).parent().data('index'))
    
    localStorage.setItem(indexOfRow, textAreaValue)
}

const init = () => {
    updateDateOnTop();
    // generateTimeBlock(`17`, `Do the dishes`, `present`)
    generateTable()
};

init();


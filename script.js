
// need to add date and weekday<p>id="currentDay" class="lead"
const updateDateOnTop = () => {
    let currentDayEl = $('#currentDay');
    currentDayEl.text(moment().format('dddd, MMMM Do YYYY'));
};

const init = () => {
    updateDateOnTop();
};

init();

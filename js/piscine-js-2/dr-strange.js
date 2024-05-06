function addWeek(date) {
    let start = new Date('0001-01-01');

    let a = ((date - start) / (60 * 60 * 24 * 1000) / 7) % 2;

    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    let b = days[date.getDay()];

    if (a % 2 === 0 || a < 1) {
        return b
    } else {
        return 'second' + b
    }

}
function timeTravel({ date, hour, minute, second }) {
    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(second)
    return (date)
}
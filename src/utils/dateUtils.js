function convertToTwoDigits(str) {
    return ('' + str).padStart(2, '0');
}

module.exports.getCurrentDate = function () {
    let date = new Date();
    return convertToTwoDigits(date.getFullYear()) + '_' +
        convertToTwoDigits(date.getMonth() + 1) + '_' +
        convertToTwoDigits(date.getDate()) + '_' +
        convertToTwoDigits(date.getHours()) + '_' +
        convertToTwoDigits(date.getMinutes()) + '_' +
        convertToTwoDigits(date.getSeconds());
}

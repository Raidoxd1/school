function invert(object) {
    var result = {}
    Object.keys(object).forEach(key => {
        result[object[key]] = key;
    })
    return result
}
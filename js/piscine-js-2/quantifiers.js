function every(arr, func) {
    let control
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            control = true
        } else {
            return false
        }
    }
    return control
}

function some(arr, func) {
    let control
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            return true
        } else {
            control = false
        }
    }
    return control
}

function none(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        if (func(arr[i])) {
            return false
        }
    }
    return true
}
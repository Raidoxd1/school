function fold(arr, func, acc = 0) {
    for (let i = 0; i < arr.length; i++) {
        acc = (func(acc, arr[i]))
    }
    return acc
}

function foldRight(arr, func, acc = 0) {
    for (let i = arr.length - 1; i >= 0; i--) {
        acc = (func(acc, arr[i]))
    }
    return acc
}

function reduce(arr, func) {
    let acc
    if (typeof arr[0] === 'number') {
        acc = 0
    } else {
        acc = ''
    }
    for (let i = 0; i < arr.length; i++) {
        acc = (func(acc, arr[i]))
    }
    return acc
}

function reduceRight(arr, func) {
    let acc
    if (typeof arr[0] === 'number') {
        acc = 0
    } else {
        acc = ''
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        acc = (func(acc, arr[i]))
    }
    return acc
}
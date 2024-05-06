function filterKeys(obj, func) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (func(key)) result[key] = obj[key];
    });
    return result;
}

function mapKeys(obj, func) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        result[func(key)] = obj[key];
    });
    return result;
}

function reduceKeys(obj, func, acc) {
    const result = {
        ...obj,
    };
    if (acc || acc == 0) {
        return Object.keys(result).reduce(func, acc);
    } else {
        acc = '';
        return acc + Object.keys(result).reduce(func);
    }
}
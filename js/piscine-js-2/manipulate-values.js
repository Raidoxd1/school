function filterValues(obj, func) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        if (func(obj[key])) result[key] = obj[key];
    });
    return result;
}

function mapValues(obj, func) {
    const result = new Object(obj);
    Object.keys(result).forEach((key) => {
        result[key] = func(result[key]);
    });
    return result;
}

function reduceValues(obj, func, acc) {
    acc ? acc : (acc = 0);
    const result = {
        ...obj,
    };
    return acc + Object.values(result).reduce(func);
}
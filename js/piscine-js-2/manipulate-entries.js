function filterEntries(obj, func) {
    let result = {};
    Object.entries(obj)
        .filter(func)
        .map((each) => {
            result[each[0]] = each[1];
        });
    return result;
};

function mapEntries(obj, func) {
    let result = {};
    Object.entries(obj)
        .map(func)
        .map((each) => {
            result[each[0]] = each[1];
        });
    return result;
};

function reduceEntries(obj, func, acc) {
    const result = new Object(obj)
    if (acc || acc == 0) {
        return Object.entries(result).reduce(func, acc);
    } else {
        acc = "";
        return acc + Object.entries(result).reduce(func);
    }
};

function totalCalories(obj) {
    return reduceEntries(
        mapEntries(obj, ([key, value]) => [
            `${key}`, (Math.round(nutritionDB[key]["calories"] * value) / 1000) * 10,
        ]),
        (acc, [key, value]) => acc + value, 0
    );
};

function lowCarbs(obj) {
    return filterEntries(
        obj, ([key, value]) => (value / 100) * nutritionDB[key]["carbs"] < 50
    );
};

function cartTotal(obj) {
    return mapEntries(obj, ([key, value]) => {
        let result = {};
        for (let [k, v] of Object.entries(nutritionDB[key]))
            result[k] = parseFloat(((v * value) / 100).toFixed(3));
        return [key, result];
    });
};
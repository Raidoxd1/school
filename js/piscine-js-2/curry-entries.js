function defaultCurry(first) {
    return (second) => {
        let newObj = { ...first };
        Object.entries(second).forEach(([key, _]) => (newObj[key] = second[key]));
        return newObj;
    }
}

function mapCurry(func) {
    return (obj) => {
        let newObj = {};
        Object.entries(obj)
            .map(func)
            .map((each) => {
                newObj[each[0]] = each[1];
            })
        return newObj;
    }
}

function reduceCurry(func) {
    return (obj, acc) => {
        const newObj = {
            ...obj,
        };
        if (acc || acc == 0) {
            return Object.entries(newObj).reduce(func, acc);
        } else {
            acc = "";
            return acc + Object.entries(newObj).reduce(func);
        }
    }
}

function filterCurry(func) {
    return (obj) => {
        let newObj = {};
        Object.entries(obj)
            .filter(func)
            .map((each) => {
                newObj[each[0]] = each[1];
            })
        return newObj;
    }
}

function reduceScore(obj, acc) {
    return reduceCurry((acc, [_, val]) => {
        return acc + val.shootingScore + val.pilotingScore;
    })(filterCurry(([_, v]) => v["isForceUser"])(obj), acc);
}

function filterForce(obj) {
    return filterCurry(([_, v]) => v.shootingScore >= 80)(
        filterCurry(([_, v]) => v["isForceUser"])(obj)
    )
}

function mapAverage(obj) {
    return mapCurry(([k, v]) => {
        let newObj = { ...v };
        newObj["averageScore"] = (v.shootingScore + v.pilotingScore) / 2;
        return [k, newObj];
    })(obj);
}
function deepCopy(object) {
    let objectCopy;
    let value;
    let key;
    if (
        typeof object !== "object" ||
        object === null ||
        object instanceof RegExp
    ) {
        return object;
    }

    objectCopy = Array.isArray(object) ? [] : {};
    for (key in object) {
        value = object[key];
        objectCopy[key] = deepCopy(value);
    }
    return objectCopy;
}
function debounce(func, ms) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            func.apply(context, args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, ms);
    }
}

const opDebounce = (func, ms, op) => {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (op !== undefined) if (!op.leading) func.apply(context, args);
        }
        let callNow;
        if (op !== undefined) {
            callNow = op.leading && !timeout;
        }
        clearTimeout(timeout);
        timeout = setTimeout(later, ms);
        if (callNow) func.apply(context, args);
    }
}
function mult2(num) {
    return function (a) {
        return num * a;
    }
}

function add3(num) {
    return function (a) {
        return function (b) {
            return num + a + b;
        }
    }
}

function sub4(num) {
    return function (a) {
        return function (b) {
            return function (c) {
                return num - a - b - c;
            }
        }
    }
}
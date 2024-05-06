function round(a) {
    let i;
    let b;
    let c = a;
    if (a < 0) {
        c = -a;
    }
    i = c % 1;
    if (i < 0.5) {
        b = c - i;
    } else if (i > 0.5) {
        b = c - i + 1;
    }
    if (a < 0) {
        b = -b;
    }

    return b
}
function floor(a) {
    let b
    let c
    b = a % 1
    if (a > 0 && b != 0) {
        return c = a - b
    } else if (b === 0) {
        return a
    } else {
        let x
        x = 1 + b
        return c = a - x
    }
}
function trunc(a) {
    let b
    let c
    b = a % 1
    if (a > 0 && b != 0) {
        c = a - b
        return c
    }
    if (a == 0) {
        return 0
    }
    if (a < 0 && b != 0) {
        c = a - b 
        return c
    }
}
function ceil(a) {
    let b
    let c
    let f
    
    b = a % 1
    f= 1-b
    if (a > 0 && b != 0) {
        return c = a + f
    } else if (b === 0) {
        return a
    } else {
        let x
        x = 1 - f
        return c = a - x
    }
    
}
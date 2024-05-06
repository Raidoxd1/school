function slice(a, b = 0, c = a.length) {
    if (b < 0) {
        b = -b
        b = a.length - b
    }
    if (c < 0) {
        c = -c
        c = a.length - c
    }
    let e = ''
    let f = []
    for (let i = 0; i <= a.length - 1; i++) {
        if (i >= b && i < c) {
            if (typeof a == 'string') {
                e += a[i]
            } else if (Array.isArray(a)) {
                f.push(a[i])
            }
            
        }
    }
    if (typeof a == 'string') {
        return e
    }
    return f
}

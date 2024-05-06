function chunk(arr, int) {
    let c;
    let f = [];
    c = arr.splice(int);
    f.push(arr);
    f.push(c);
    return f
}
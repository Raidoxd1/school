



is.num = function (a) {
    if (a===undefined)return false
    if (a !== 0&&!isNaN(a))return false
    return true
}

/*console.log("siin")
console.log(is.num(0))
console.log(is.num(NaN))
console.log(is.num(undefined))
console.log(is.num(true))
console.log(is.num(''))*/



/*is.nan = function (a) {
    if (a==NaN){
        return true
    }else{
        return false
    }
}
is.str = function (a) {
    if (a==String){
        return true
    }else{
        return false
    }
}

is.bool = function (a) {
    if (a==Boolean){
        return true
    }else{
        return false
    }
}
is.undef = function (a) {
    if (a==undefined){
        return true
    }else{
        return false
    }
}*/
/*
    NaN,
    true,
    '',
    '💩',
    undefined,
    t,
    [],
    {},
    [1, Array(1), [], 2],
    { length: 10 },
    Object.create(null),
    null,
    console.log,
    void 0,))*/
    /*is.num = function (a) {
        let a = [
            0,
            NaN
        ]
        return  a
    }*/
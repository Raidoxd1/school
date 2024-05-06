function get(src,path) {
    let arr = path.split('.')
    let current=src
    arr.forEach((element) => {
        if(current===undefined){
            return current
        }
        current = current[element]
    });
    return current
}
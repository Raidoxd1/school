function triangle(str,int){
    let a = ''
    for(let i = 1;i<=int;i++){
        for(let j = 0;j<i;j++){
            a += str
        }
        if(i === int){
            return a
        }
        a += '\n'
    }
    return a
}
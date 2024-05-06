/*const sourceObject = {
    num: 42,
    bool: true,
    str: 'some text',
    log: console.log,
  }*/

function get (a){
    return sourceObject[a]
}
function set (c,d){
   // console.log(c,d)
    sourceObject[c] = d
    //console.log(sourceObject[c])
    return sourceObject[c]
}
/*
set('num',55)
console.log(sourceObject.num)*/
function words(a){
const myArray = a.split(" ");
return myArray
}
function sentence(a){
    const myArray= a.join(" ");
    return myArray
}
function yell (a){
    a = a.toUpperCase()
    return a
}
function whisper(a){
    a = a.toLowerCase()
    return '*'+a+'*'
}
function capitalize(a){
    a= a.toUpperCase()[0] + a.slice(1).toLowerCase()
    return a
}
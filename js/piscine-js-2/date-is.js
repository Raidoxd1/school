function isValid(a) {
    if (isNaN(a)||a==0){
        return false
    }else{
        return true
    }
}
function isAfter(a,b){
    if (a>b){
        return true
    }else{
        return false
    }
}
function isBefore(a,b){
    if (a<b){
        return true
    }else{
        return false
    }
}
function isFuture(a) {
    if (isNaN(a)||a==0){
        return false
    }else if (a>Date.now()){
        return true
    }
}
function isPast(a) {
    if (isNaN(a)||a==0){
        return false
    }else if (a<Date.now()){
        return true
    }
}



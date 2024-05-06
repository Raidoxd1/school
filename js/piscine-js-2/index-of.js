function indexOf(a, b, d) {
    let i = 0;
    if (d != undefined) {
         i = d;
    }
    let c = a[d];
    while (c != b) {
        i++;
        c = a[i];
        if (i > a.length) {
            return -1;
        }
    }
    return i
}
function lastIndexOf(a, b, d) {

    let i = a.length - 1;
    if (d != undefined) {
         i = d;

    }
    let c = a[i];

    while (c != b) {

        i--;
        c = a[i];
        if (i < 0) {
            return -1
        }
    }
    return i
}
function includes(a, b) {
    let i 

    for(i=0;i<a.length-1;i++){
        if (a[i]== b){
            return true
        }
    }
    return false
  }
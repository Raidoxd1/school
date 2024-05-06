function sameAmount(a,b,c) {
    const rb = RegExp(b, 'g');
    const rc = RegExp(c, 'g');
    let d= a.match(rb)
    let f= a.match(rc)
    if ((d != null&&f!= null)&&(d.length===f.length)){
        return true
    }
    return false
}
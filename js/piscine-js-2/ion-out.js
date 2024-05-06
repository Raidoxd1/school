function ionOut(a) {
    const c = /[a-zA-z]+?[t](?=ion)/g
    const f = a.match(c)
    if (f!=null){
        return f
    }
    return []
}
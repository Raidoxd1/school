function letterSpaceNumber(a) {
    const yes= /[a-zA-Z]\s\d\b/g
    let f= []
    let mby = a.match(yes)
    if (mby==null){
        mby = []
        return mby
    }
    return mby
}
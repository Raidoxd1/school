function pyramid(str, int) {
    let a = ''
    
    for (let i = 1; i <= int; i++) {
        a += ' '.repeat(int - i).repeat(str.length)
        a += str.repeat(i * 2 - 1)
        if (i === int) {
            return a
        }
        a += '\n'
    }

    return a
}
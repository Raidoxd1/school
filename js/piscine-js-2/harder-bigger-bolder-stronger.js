export function generateLetters() {
    let letter
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let j = 11
    
    for (let i = 120; i > 0; i--) {
        letter = document.createElement('div')
        document.body.append(letter)
        let randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)]
        letter.innerHTML = randomCharacter
        letter.style.fontSize = j + "px"
        console.log(letter.style.fontSize)
        j++
        if (i<=40){
            letter.style.fontWeight = "600"
        }
        if (i>40&&i<=80){
            letter.style.fontWeight = "400"
        }
        if (i>80){
            letter.style.fontWeight = "300"
        }
    }


    return letter
}
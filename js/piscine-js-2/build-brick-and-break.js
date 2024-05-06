export function build(x){
    let i = 1
    let block = ''
    let counterFoundation = 2
    let interval = setInterval(function(){
        block = document.createElement('div')
        document.body.append(block)
        block.innerHTML = i
        block.id = 'brick-'+i
        ++i
        if(counterFoundation === 3){
        block.dataset.foundation = true
        counterFoundation = 0
        }
        ++counterFoundation
        if(i===x+1){
            clearInterval(interval)
        }
    },100,i)
    return block
}
export function repair(...repairs){
    for (let i = 0; i < repairs.length; i++) {
        let elem = document.getElementById(repairs[i])
        let n = repairs[i].replace('brick-', '')
        if(n%3===2){
            elem.setAttribute('data-repaired',"in progress")
            elem.innerHTML = n
        }else{
            elem.setAttribute("data-repaired","true")
            elem.innerHTML = n
        }
    }
}

export function destroy(){
    let elements = document.querySelectorAll('div[id^="brick"]')
    elements[elements.length-1].remove()
}
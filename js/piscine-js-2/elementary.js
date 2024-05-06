function multiply(a, b) {
    let f = 0
    let g=a
    let h=b
    if (a!=0 && b!=0){
        if (a<0 || b<0){
            if (a<0){
                g = -a
            }
            if (b<0){
                h = -b
            }
            f = "c".repeat(g).repeat(h).length
            f = -f
            if (a<0&&b<0){
                f = -f
            }
        }else{   
            f = "c".repeat(a).repeat(b).length
        }
    }
    return f
  }
  function divide(a,b){
    let g = a
    let h = b
    if (a<0){
        g = -a
    }
    if (b<0){
        h = -b
    }

    if (g<h || a==0 || b==0){
       return 0
    }
    if (a==b){
        return 1
    }
    let i
    let c = 0
   

    for(i = -1;g>c;i++){
       c = c + h
    }



    if (a<0||b<0){
        i = -i
    }
    if (a<0&&b<0){
        i = -i
    }
    return i
    
 }
 
 function modulo(a,b) {
   
   let c = a- multiply(divide(a,b),b)
   return c
    
 }

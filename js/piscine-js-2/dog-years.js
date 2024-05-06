
function dogYears (a,b){
    var c =b/31557600
    if (a != ""&&b != 0){
    
    if (a == "earth"){
        b=c
    }else if(a=="mercury"){
        b = c/0.2408467
    }else if(a=="venus"){
        b = c/0.61519726
    }else if(a=="mars"){
        b = c/1.8808158
     }else if(a=="jupiter"){
        b = c/11.862615
     }else if(a=="saturn"){
        b = c/29.447498
     }else if(a=="uranus"){
        b = c/84.016846
    }else{
        b = c/164.79132
    }
    b = b*7
    b = b.toFixed(2)
    return parseFloat(b)
    }
}
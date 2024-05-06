const vowels = /[aeiouAEIOU]/g;
function vowelDots(a) {
    
    const c = a.match(vowels);
  
    let b = '';
    let j = 0;
    if (c === null) {
      return a;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== c[j]) {
        b += a[i];
      }
      if (a[i] === c[j]) {
        b += a[i] + '.';
        j++;
      }
      if (j === c.length) {
        b += a.slice(i + 1);
        return b;
      }
    }
    return b;
  }
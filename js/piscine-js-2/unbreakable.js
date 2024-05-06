function split(a, d) {
    let b = [];
  
    for (let i = 0; i < a.length - d.length + 1; i++) {
      if (a.slice(i, i + d.length) == d) {
        b.push(a.slice(0, i));
        a = a.slice(i + d.length);
        i=0
      }
    }
    b.push(a);
    return b;
  }
  function join(a,d){
    let b = '';
  for (var i = 0; i < a.length; i++) {
    if (b) {
      b += d;
    }
    b += a[i];
  }
  return b;
  }
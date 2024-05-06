function cutFirst(a) {
    let i;
    let b = '';
    for (i = 2; i < a.length; i++) {
      b = b + a[i];
    }
    return b
  }
  function cutLast(a) {
    let i;
    let b = '';
    for (i = 0; i < a.length - 2; i++) {
      b = b + a[i];
    }
    return b
  }
  function cutFirstLast(a) {
    let i;
    let b = '';
    let c = '';
    for (i = 2; i < a.length; i++) {
      b = b + a[i];
    }
    for (i = 0; i < b.length - 2; i++) {
      c = c + b[i];
    }
    return c
  }
  function keepFirst(a) {
    let i;
    i = a.slice(0, 2);
    return i
  }
  function keepLast(a) {
    let i;
    i = a.slice(-2);
    return i
  }
  function keepFirstLast(a) {
    let i;
    let j;
    let c;
    let k;
    i = a.slice(0, 2);
    j = a.slice(-2);
    if (a.length >= 4) {
      c = i + j;
    }
    if (a.length == 2) {
      c = i;
    }
    if (a.length == 3) {
      k = a.slice(0, 3);
      c = k;
    }
    return c
   
  
  }
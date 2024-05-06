function reverse(a) {
    let i;
    let b = '';
    let arr = [];
    for (i = a.length - 1; i >= 0; i--) {
      if (Array.isArray(a)) {
        arr.push(a[i]);
      } else {
        b = b + a[i];
      }
    }
    if (Array.isArray(a)) {
      return arr
    } else {
      return b
    }
  }
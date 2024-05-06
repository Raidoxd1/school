function nasa(N) {
    let f = '';
    let i = 1;
  
    while (i < N + 1) {
        
      if (i % 3 === 0 && i % 5 === 0) {
        f += 'NASA';
      } else if (i % 5 === 0) {
        f += 'SA';
      } else if (i % 3 === 0) {
        f += 'NA';
      } else {
        f += i;
      }
  
      i++;
      if (i != N + 1) {
        f += ' ';
      }
    }
    
  
    return f;
  }
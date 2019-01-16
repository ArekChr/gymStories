export const progressNormalize = (progress, name) => {
  return progress
    .filter(x => x[name] !== 0 && x[name] !== null)
    .map(x => {
      var result = {}
      Object.keys(x).filter(key => {
        if(key === name){
          result = {...result, value: x[name]}
        }
        else if(key === 'createdAt'){
          result = {...result, date: new Date(x.createdAt)}
        }
      })
      return result;
    })
}

export const progressSort = (progress) => {
  return progress.sort(function(a, b) {
    a = a.createdAt || a.date;
    b = b.createdAt || b.date;
    return a>b ? -1 : a<b ? 1 : 0;
  });
}
import { Progress } from "../store/progress/types";

export const progressNormalize = (progress: Progress[], name: string) => {
  return progress
    .filter((x: Progress) => x[name] !== 0 && x[name] !== null)
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

export const progressSort = (progress: Progress[]) => {
  return progress.sort(function(a: Progress, b: Progress) {
    return a.createdAt>b.createdAt ? -1 : a.createdAt<b.createdAt ? 1 : 0;
  });
}
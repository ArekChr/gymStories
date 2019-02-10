import { Progress } from "../store/progress/types";

export const progressNormalize = (progress: Progress[], name: keyof Progress) => {
  return progress
    .filter((x: Progress) => x[name] !== 0 && x[name] !== null)
    .map((x: Progress): any => {
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

interface ProgressChartData {
  date: Date
  value: number
}

type Names = keyof Progress;

export const progressNormalize2 = (progress: Progress[], selector: (x: Progress) => ProgressChartData) => {
  return progress.map(selector).filter(x => x !== null)
}

// var progres: Progress[]; 

// progres = progres[1].biceps = 2;
// var asb = progressNormalize2(progres, x => ({ value: x["calf"] as number, date: new Date(x.createdAt)}));

export const progressSort = (progress: any) => {
  return progress.sort(function(a: Progress, b: Progress) {
    return a.createdAt>b.createdAt ? -1 : a.createdAt<b.createdAt ? 1 : 0;
  });
}
interface IExercise {
  Id: string
  RoutineId: string
  Name: string
  Description?: string
  MusclePart: string
  Results?: Array<IResult>
}
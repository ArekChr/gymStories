interface IRoutine {
  Id: string
  TrainingId: string
  Name: string
  Exercises?: Array<IExercise>
}
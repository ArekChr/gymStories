interface ITraining {
  readonly Id: string
  readonly Name: string
  readonly Description: string
  readonly Difficulty: number
  readonly Routines?: Array<IRoutine>
}
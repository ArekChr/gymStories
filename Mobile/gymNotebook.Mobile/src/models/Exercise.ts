interface Exercise {
  Id: AAGUID
  RoutineId: AAGUID
  Name: string
  Description?: string
  MusclePart: string
  Results?: Array<Result>
}
interface Training {
  Id: AAGUID
  Name: string
  Description: string
  Difficulty: number
  Routines?: Array<Routine>
}
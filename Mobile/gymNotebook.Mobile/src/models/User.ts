interface User {
  Id: string
  UserName: string
  Email: string
  Role: string
  Trainings?: Array<Training>
  Progress?: Array<Progress>
  Friends?: Array<Friend>
}
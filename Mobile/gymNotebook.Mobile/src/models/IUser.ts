interface IUser {
  Id: string
  UserName: string
  Email: string
  Role: string
  Trainings?: Array<ITraining>
  Progress?: Array<IProgress>
  Friends?: Array<IFriend>
}
export class Initializer {

  public exercises: Array<Exercise> = [
    {
      Id: 'exercise1-0000-0000-0000-000000000000',
      Description: 'Bench Rress',
      MusclePart: 'Chest',
      Name: 'Bench Rress',
      RoutineId: 'routine01-0000-0000-0000-000000000000'
    },
    {
      Id: 'exercise2-0000-0000-0000-000000000000',
      Description: 'Bent Over Row',
      MusclePart: 'Back',
      Name: 'Bent Over Row',
      RoutineId: 'routine01-0000-0000-0000-000000000000'
    },
    {
      Id: 'exercise3-0000-0000-0000-000000000000',
      Description: 'Over Head Press',
      MusclePart: 'Shoulders',
      Name: 'Over Head Press',
      RoutineId: 'routine01-0000-0000-0000-000000000000'
    },
    {
      Id: 'exercise4-0000-0000-0000-000000000000',
      Description: 'Standing Barbell Curl',
      MusclePart: 'Biceps',
      Name: 'Standing Barbell Curl',
      RoutineId: 'routine01-0000-0000-0000-000000000000'
    },
    {
      Id: 'exercise5-0000-0000-0000-000000000000',
      Description: 'Tricep Dips',
      MusclePart: 'Triceps',
      Name: 'Tricep Dips',
      RoutineId: 'routine01-0000-0000-0000-000000000000'
    }
  ]
  public routines: Array<Routine> = [
    {
      Id: 'routine01-0000-0000-0000-000000000000',
      TrainingId: 'training0-0000-0000-0000-000000000000',
      Name: 'Monday',
      Exercises: this.exercises
    },
    {
      Id: 'routine02-0000-0000-0000-000000000000',
      TrainingId: 'training0-0000-0000-0000-000000000000',
      Name: 'Wednesday',
      Exercises: this.exercises
    },
    {
      Id: 'routine03-0000-0000-0000-000000000000',
      TrainingId: 'training0-0000-0000-0000-000000000000',
      Name: 'Friday',
      Exercises: this.exercises
    }
  ]
  public trainings: Array<Training> = [
    {
      Id: 'training0-0000-0000-0000-000000000000',
      Name: 'FBW',
      Description: 'Full body workout',
      Difficulty: 3,
      Routines: this.routines
    }
  ]
  public user: User = {
    Id: '00000000-USER-0000-0000-000000000000',
    UserName: 'ArekAras',
    Email: 'arekmos2@gmail.com',
    Role: 'User',
    Trainings: this.trainings
  }
}
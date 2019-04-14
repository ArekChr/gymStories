export type Exercise = {
  name: string
  label: string
  musclePart: MusclePart[]
}

export type MusclePart = {
  index: number
  name: MusclePartTypes
}

export type MusclePartTypes = 
  | 'Biceps'
  | 'Triceps'
  | 'Chest'
  | 'Shoulders'
  | 'Forearm'
  | 'Back'
  | 'Thigh'
  | 'Waist'
  | 'Abs'
  | 'Calf' // łydki
  | 'Quadriceps' // mięsień czworogłowy uda
  | 'Gluteal muscle' // mięsień pośladkowy
  | 'Biceps femoris' // mięsień dwugłowy uda
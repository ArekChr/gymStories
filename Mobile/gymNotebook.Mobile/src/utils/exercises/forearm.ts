import { Exercise, MuscleTypes } from "./types";

const forearm: Exercise[] = [
  {
    name: 'Uginanie nadgarstków podchwytem w siadzie',
    label: 'Uginanie nadgarstków podchwytem w siadzie',
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Przedramie
      }
    ]
  },
  {
    name: 'Uginanie nadgarstków nachwytem w siadzie',
    label: 'Uginanie nadgarstków nachwytem w siadzie',
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Przedramie
      }
    ]
  }
]

export default forearm
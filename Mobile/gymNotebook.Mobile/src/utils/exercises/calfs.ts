import { Exercise, MuscleTypes } from "./types";

const calfs: Exercise[] = [
  {
    name: 'Wspiecia na palce w staniu',
    label: 'Wspiecia na palce w staniu',
    muscle: MuscleTypes.Lydki,
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Lydki,
        minPower: 100
      }
    ]
  },
  {
    name: 'Wspięcia na palce w siadzie',
    label: 'Wspięcia na palce w siadzie',
    muscle: MuscleTypes.Lydki,
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Lydki,
        minPower: 100
      }
    ]
  },
  {
    name: 'Ośle wspięcia',
    label: 'Ośle wspięcia',
    muscle: MuscleTypes.Lydki,
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Lydki,
        minPower: 100
      }
    ]
  },
  {
    name: 'Wspięcia na palce na hack-maszynie',
    label: 'Wspięcia na palce na hack-maszynie',
    muscle: MuscleTypes.Lydki,
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Lydki,
        minPower: 100
      }
    ]
  },
  {
    name: 'Wypychanie ciężaru na maszynie/suwnicy palcami nóg',
    label: 'Wypychanie ciężaru na maszynie/suwnicy palcami nóg',
    muscle: MuscleTypes.Lydki,
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Lydki,
        minPower: 100
      }
    ]
  },
  {
    name: 'Odwrotne wspięcia w staniu',
    label: 'Odwrotne wspięcia w staniu',
    muscle: MuscleTypes.Lydki,
    muscleSupport: [
      {
        index: 1,
        name: MuscleTypes.Lydki,
        minPower: 100
      }
    ]
  }
]

export default calfs
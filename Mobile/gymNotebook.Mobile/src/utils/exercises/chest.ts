import { Exercise, MuscleTypes } from "./types";

const chest: Exercise[] = [
{
  name: 'Wyciskanie sztangi w leżeniu na ławce poziomej',
  label: 'Wyciskanie sztangi w leżeniu na ławce poziomej',
  muscle: MuscleTypes.Klatka,
  muscleSupport: [
    {
      index: 1,
      name: MuscleTypes.Klatka,
      minPower: 60,
      maxPower: 80
    },
    {
      index: 2,
      name: MuscleTypes.Triceps,
      minPower: 20,
      maxPower: 40
    }
  ]
},
{
  name: 'Wyciskanie sztangielek w leżeniu na ławce poziomej',
  label: 'Wyciskanie sztangielek w leżeniu na ławce poziomej',
  muscleSupport: [
    {
      index: 1,
      name: MuscleTypes.Klatka
    },
    {
      index: 2,
      name: MuscleTypes.Triceps
    }
  ]
},
{
  name: 'Wyciskanie sztangi w leżeniu na ławce skośnej w góre',
  label: 'Wyciskanie sztangi w leżeniu na ławce skośnej w góre',
  muscleSupport: [
    {
      index: 1,
      name: MuscleTypes.Klatka
    },
    {
      index: 2,
      name: MuscleTypes.Triceps
    }
  ]
},
{
  name: 'Wyciskanie sztangielek w leżeniu na ławce skośnej w górę',
  label: 'Wyciskanie sztangielek w leżeniu na ławce skośnej w górę',
  muscleSupport: [
    {
      index: 1,
      name: MuscleTypes.Klatka
    },
    {
      index: 2,
      name: MuscleTypes.Triceps
    }
  ]
},
{
  name: 'Wyciskanie sztangi w leżeniu na ławce skośnej w dół',
  label: 'Wyciskanie sztangi w leżeniu na ławce skośnej w dół',
  muscleSupport: [
    {
      index: 1,
      name: MuscleTypes.Klatka
    },
    {
      index: 2,
      name: MuscleTypes.Triceps
    }
  ]
},
{
  name: 'Wyciskanie sztangielek w leżeniu na ławce skośnej-głową w dół',
  label: 'Wyciskanie sztangielek w leżeniu na ławce skośnej-głową w dół',
  muscleSupport: [
    {
      index: 1,
      name: MuscleTypes.Klatka
    },
    {
      index: 2,
      name: MuscleTypes.Triceps
    }
  ]
},
{
name: 'Rozpiętki ze sztangielkami w leżeniu na ławce poziomej',
label: 'Rozpiętki ze sztangielkami w leżeniu na ławce poziomej',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
]
},
{
name: 'Rozpiętki ze sztangielkami w leżeniu na ławce skośnej - głową do góry',
label: 'Rozpiętki ze sztangielkami w leżeniu na ławce skośnej - głową do góry',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
]
},
{
name: 'Wyciskanie sztangi w leżeniu na ławce poziomej wąskim uchwytem',
label: 'Wyciskanie sztangi w leżeniu na ławce poziomej wąskim uchwytem',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
]
},
{
name: 'Przenoszenie sztangielki w leżeniu w poprzek ławki poziomej',
label: 'Przenoszenie sztangielki w leżeniu w poprzek ławki poziomej',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
]
},
{
name: 'Pompki na poręczach',
label: 'Pompki na poręczach',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
]
},
{
name: 'Rozpiętki w siadzie na maszynie',
label: 'Rozpiętki w siadzie na maszynie',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
]
},
{
name: 'Krzyżowanie linek wyciągu w staniu',
label: 'Krzyżowanie linek wyciągu w staniu',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
]
},
{
name: 'Wyciskania poziome w siadzie na maszynie',
label: 'Wyciskania poziome w siadzie na maszynie',
muscleSupport: [
  {
    index: 1,
    name: MuscleTypes.Klatka
  },
  {
    index: 2,
    name: MuscleTypes.Triceps
  }
],
}
]

export default chest
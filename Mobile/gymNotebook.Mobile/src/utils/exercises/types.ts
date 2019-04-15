export interface Exercise {
  name: string
  label: string
  muscle?: MuscleTypes
  muscleSupport: MusclePart[]
}

export type MusclePart = {
  index: number
  name: MuscleTypes
  minPower?: number
  maxPower?: number
}

export enum MuscleTypes {
  'Biceps' = 'Biceps',
  'Triceps' = 'Triceps',
  'Barki' = 'Barki',
  'Przedramie' = 'Przedramie',
  'Plecy' = 'Plecy',
  'Waist' = 'Waist',
  'Brzuch' = 'Brzuch',
  'Lydki' = 'Lydki',
  'Czworoglowy_uda' = 'Czworoglowy_uda',
  'Posladki' = 'Posladki',
  'Dwuglowy_uda' = 'Dwuglowy_uda',
  'Klatka' = 'Klatka'
}

export type MuscleTypesNames =
  | 'biceps'
  | 'triceps'
  | 'barki'
  | 'przedramie'
  | 'plecy'
  | 'brzuch'
  | 'lydki'
  | 'nogi'
  | 'posladki'
  | 'klatka'

export enum MuscleNames {
  'Głowa długa',
  'Głowa krótka',
  'Mięsień ramienny',
  'Głowa boczna',
  'Głowa przyśrodkowa',
  'Mięsień piersiowy wiekszy dolny',
  'Mięsień piersiowy wiekszy środkowy',
  'Mięsień piersiowy większy górny',
  'Mięsień zębaty przedni',
  'Mięsień piersiowy mniejszy'
}

//export type muscleTypes = keyof typeof muscles

type Muscles = {
  [key in MuscleTypes]: any
}

// export const muscles: Muscles = {
//   Biceps: {
//     glowa_dluga: 'Głowa długa',
//     glowa_krotka: 'Głowa krótka',
//     miesien_ramienny : 'Mięsień ramienny'
//   },
//   Triceps: {
//     glowa_dluga: 'Głowa długa',
//     glowa_boczna: 'Głowa boczna',
//     glowa_przysrodkowa: 'Głowa przyśrodkowa',
//   },
//   Klatka: {
//     miesien_piersiowy_wiekszy_dolny: 'Mięsień piersiowy wiekszy dolny',
//     miesien_piersiowy_wiekszy_srodkowy: 'Mięsień piersiowy wiekszy środkowy',
//     miesien_piersiowy_wiekszy_gorny: 'Mięsień piersiowy większy górny',
//     miesien_zebaty_przedni: 'Mięsień zębaty przedni',
//     miesien_piersiowy_mniejszy: 'Mięsień piersiowy mniejszy'
//   }
// }

export type MuscleDefinition = {
  muscle: string
  parts: MuscleTypes[]
}

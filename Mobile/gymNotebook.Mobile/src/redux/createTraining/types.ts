import { Exercise } from "../../utils/exercises/types";

export enum CreateTrainingActionTypes {
  ADD_EXERCISES = '@createTraining/ADD_EXERCISES',
  EDIT_EXERCISES = "@createTraining/EDIT_EXERCISES"
} 

export interface CreateTrainingState {
  addExercises: Exercise[]
}

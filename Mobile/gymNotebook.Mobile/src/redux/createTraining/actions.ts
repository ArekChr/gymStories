import { Exercise } from "../../utils/exercises/types";
import { Dispatch } from "redux";
import { CreateTrainingActionTypes } from "./types";

export const addExercises = (exercises: Exercise[]) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: CreateTrainingActionTypes.ADD_EXERCISES, payload: exercises })
  }
}

export const editExercises = (exercises: any[]) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: CreateTrainingActionTypes.EDIT_EXERCISES, payload: exercises})
  }
}
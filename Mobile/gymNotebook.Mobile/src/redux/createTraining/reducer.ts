import { CreateTrainingState, CreateTrainingActionTypes } from './types'
import { Reducer } from 'redux';
import { Exercise } from '../../utils/exercises/types';

const initialState: CreateTrainingState = {
  addExercises: []
}

const createTraining: Reducer<CreateTrainingState> = (state = initialState, action) => {
  switch (action.type) {
    case CreateTrainingActionTypes.ADD_EXERCISES: {
      return {
        ...state,
        addExercises: [
          ...action.payload.map((exercise: Exercise, index: number) => ({
            key: index,
            ...exercise
          }))
        ]
      }
    }
    case CreateTrainingActionTypes.EDIT_EXERCISES: {
      return {
        ...state,
        addExercises: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default createTraining
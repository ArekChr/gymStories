import { Action } from 'redux'

export interface Progress {
  Weight: number
  Biceps: number
  Chest: number
  Thigh: number
  Claf: number
  Waist: number
  Shoulders: number
  Neck: number
  CreatedAt: Date
}

export const enum ProgressActionTypes {
  FETCH_REQUEST = '@@progress/FETCH_REQUEST',
  FETCH_SUCCESS = '@@progress/FETCH_SUCCESS',
  FETCH_ERROR = '@@progress/FETCH_ERROR',
  SELECTED = '@@progress/SELECTED'
}

export interface ProgressState {
  readonly progress: Progress[] | undefined
}

export type Actions = 
  IFetchProgress
  | IFetchSuccess

export interface IFetchProgress extends Action<ProgressActionTypes> {
  type: ProgressActionTypes.FETCH_REQUEST
}

export interface IFetchSuccess extends Action<ProgressActionTypes> {
  type: ProgressActionTypes.FETCH_SUCCESS
  progress: Progress[] | undefined
}
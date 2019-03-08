import { Action } from "redux";

export enum ProgresActionTypes {
  FETCH_PROGRESS_REQ = 'progress/FETCH_PROGRESS_REQ',
  FETCH_PROGRESS_SUC = 'progress/FETCH_PROGRESS_SUC',
  FETCH_PROGRESS_ERR = 'progress/FETCH_PROGRESS_ERR',
  CREATE_PROGRESS_REQ = 'progress/CREATE_PROGRESS_REQ',
  CREATE_PROGRESS_SUC = 'progress/CREATE_PROGRESS_SUC',
  CREATE_PROGRESS_ERR = 'progress/CREATE_PROGRESS_ERR',
  UPDATE_PROGRESS_REQ = 'progress/UPDATE_PROGRESS_REQ',
  UPDATE_PROGRESS_SUC = 'progress/UPDATE_PROGRESS_SUC',
  UPDATE_PROGRESS_ERR = 'progress/UPDATE_PROGRESS_ERR',
  DELETE_PROGRESS_REQ = 'progress/DELETE_PROGRESS_REQ',
  DELETE_PROGRESS_SUC = 'progress/DELETE_PROGRESS_SUC',
  DELETE_PROGRESS_ERR = 'progress/DELETE_PROGRESS_ERR',
  SELECTED_PROGRESS = 'progress/SELECTED_PROGRESS',
  HANDLE_PROGRESS_MODAL = 'progress/HANDLE_PROGRESS_MODAL',
  HANDLE_CALENDAR_MODAL = 'progress/HANDLE_CALENDAR_MODAL',
  SELECT_DATE = 'progress/SELECT_DATE',
  PICK_DATE = 'progress/PICK_DATE',
  SET_LAST_PROGRESS = 'progress/SET_LAST_PROGRESS'
}

export interface IFetchProgressAction extends Action<ProgresActionTypes.FETCH_PROGRESS_SUC>{
  progress: Progress[]
}

export interface IUpdateProgressAction extends Action<ProgresActionTypes.UPDATE_PROGRESS_SUC>{
  type: ProgresActionTypes.UPDATE_PROGRESS_SUC
}

export type ProgressActions =
  | IFetchProgressAction
  | IUpdateProgressAction

export type ProgressKey = keyof Progress;

export interface Progress {
  id: string
  weight: number
  biceps: number
  chest: number
  thigh: number
  calf: number
  waist: number
  shoulders: number
  neck: number
  createdAt: string
}

export interface ProgressState {
  progress: Progress[]
  progressLoading: boolean
  error: any
  selectedProgress: keyof Progress
  modal: boolean
  lastProgress: number
  calendarModal: boolean
  selectedDate: string
  pickedDate: string
}

export interface SelectedProgress {
  [x: string]: string
  createdAt: string
}

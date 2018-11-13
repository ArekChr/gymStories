import keys from '../ActionTypeKeys'

export interface GetTrainingsFailAction {
  readonly type: keys.GET_TRAININGS_FAIL
  readonly payload: {
    readonly error: Error;
  }
}

export interface GetTrainingsInProgressAction {
  readonly type: keys.GET_TRAININGS_INPROGRESS
}

export interface GetTrainingsSuccessAction {
  readonly type: keys.GET_TRAININGS_SUCCESS
  readonly payload: {
    readonly groups: ReadonlyArray<Training>;
  }
}
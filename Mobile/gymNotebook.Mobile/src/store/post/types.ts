export enum PostActionTypes {
  FETCH_POST_REQ = 'post/FETCH_REQ',
  FETCH_POST_SUC = 'post/FETCH_SUC',
  UPDATE_POST_REQ = 'post/UPDATE_REQ',
  UPDATE_POST_SUC = 'post/UPDATE_SUC',
  CREATE_POST_REQ = 'post/CREATE_REQ',
  CREATE_POST_SUC = 'post/CREATE_SUC',
  DELETE_POST_REQ = 'post/DELETE_REQ',
  DELETE_POST_SUC = 'post/DELETE_SUC'
}

export interface PostState {
  loading: boolean
  posts?: any[]
}
  
export const FETCH_IMAGE_REQ = 'image/FETCH_IMAGE_REQ';
export const FETCH_IMAGE_SUC = 'image/FETCH_IMAGE_SUC';

export enum ImageActionTypes {
  FETCH_IMAGE_REQ = 'image/FETCH_IMAGE_REQ',
  FETCH_IMAGE_SUC = 'image/FETCH_IMAGE_SUC'
}

export interface Image {
  path: string
}

export interface ImageState {
  loading: boolean
  path?: string
}
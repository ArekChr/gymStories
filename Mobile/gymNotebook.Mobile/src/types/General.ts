export interface PickedImage {
  cropRect: {
    height: number
    width: number
    x: number
    y: number
  }
  height: number
  mime: string
  modificationDate: string
  path: string
  size: number
  width: number
}

export interface CreatedAt {
  createdAt: number
}
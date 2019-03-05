export enum PostActionTypes {
  FETCH_POST_REQ = 'post/FETCH_POST_REQ',
  FETCH_POST_SUC = 'post/FETCH_POST_SUC',
  UPDATE_POST_REQ = 'post/UPDATE_REQ',
  UPDATE_POST_SUC = 'post/UPDATE_SUC',
  CREATE_POST_REQ = 'post/CREATE_REQ',
  CREATE_POST_SUC = 'post/CREATE_SUC',
  DELETE_POST_REQ = 'post/DELETE_REQ',
  DELETE_POST_SUC = 'post/DELETE_SUC',
  FETCH_COMMENT_REQ = "post/FETCH_COMMENT_REQ",
  FETCH_COMMENT_SUC = "post/FETCH_COMMENT_SUC",
  CREATE_COMMENT_REQ = "post/CREATE_COMMENT_REQ",
  CREATE_COMMENT_SUC = "post/CREATE_COMMENT_SUC",
  CLEAR_COMMENTS = "post/CLEAR_COMMENTS",
  FETCH_MY_POST_REQ = "post/FETCH_MY_POST_REQ",
  FETCH_MY_POST_SUC = "post/FETCH_MY_POST_SUC"
}

export interface PostsState {
  loading: boolean
  loadingComments: boolean
  posts: Post[]
  myPosts: MyPost[]
  comments?: Comment[]
}

export interface CreatePostModel {
  description: string
  filePath: string
  profileId: string
  timeStamp: number
  likesCount: number
  likes: string[]
}

export interface CreatePostComment {
  postId: string
  content: string
}


export interface Comment {
  id?: string
  userId?: string
  content: string
  createdAt: Date
  userName: string
  imageURL: string
  likes: number
}

export interface MyPost {
  id: string
  description: string
  likesCount: number
  createdAt: number
  imageURL: string
  commentCount: number
  comments: Comment[]
  likes: string[]
}

export interface Post {
  id: string
  description: string
  likesCount: number
  createdAt: number
  imageURL: string
  commentCount: number
  likes: string[]
  profileId?: string
}